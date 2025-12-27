
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { BudgetCategory, BudgetItem } from './types';
import { INITIAL_DATA } from './constants';
import { BudgetItemRow } from './components/BudgetItemRow';
import { Icon } from './components/Icon';

const STORAGE_KEY = 'egitim_merkezi_butce_verisi';

const App: React.FC = () => {
  // Veriyi localStorage'dan yükle veya varsayılan veriyi kullan
  const [categories, setCategories] = useState<BudgetCategory[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const updateItem = useCallback((catId: string, itemId: string, updates: Partial<BudgetItem>) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id !== catId) return cat;
      return {
        ...cat,
        items: cat.items.map(item => item.id === itemId ? { ...item, ...updates } : item)
      };
    }));
  }, []);

  const deleteItem = useCallback((catId: string, itemId: string) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id !== catId) return cat;
      return {
        ...cat,
        items: cat.items.filter(item => item.id !== itemId)
      };
    }));
  }, []);

  const addItem = useCallback((catId: string) => {
    const category = categories.find(c => c.id === catId);
    const isSalaryCategory = category?.title.toLowerCase().includes('maaş');
    
    const newItem: BudgetItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'Yeni Madde',
      unitPrice: 0,
      quantity: 1,
      months: 1,
      isActive: true,
      isRecurring: !!isSalaryCategory
    };
    setCategories(prev => prev.map(cat => {
      if (cat.id !== catId) return cat;
      return { ...cat, items: [...cat.items, newItem] };
    }));
  }, [categories]);

  const handleSave = () => {
    setIsSaving(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      alert('Veri kaydedilirken bir hata oluştu.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Bütün değişiklikleri silip varsayılan listeye dönmek istediğinize emin misiniz?')) {
      setCategories(INITIAL_DATA);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const grandTotal = useMemo(() => {
    return categories.reduce((sum, cat) => {
      return sum + cat.items.reduce((catSum, item) => {
        if (!item.isActive) return catSum;
        const multiplier = item.isRecurring ? item.months : 1;
        return catSum + (item.unitPrice * item.quantity * multiplier);
      }, 0);
    }, 0);
  }, [categories]);

  const categoryTotals = useMemo(() => {
    return categories.map(cat => {
      const total = cat.items.reduce((sum, item) => {
        if (!item.isActive) return sum;
        const multiplier = item.isRecurring ? item.months : 1;
        return sum + (item.unitPrice * item.quantity * multiplier);
      }, 0);
      return { id: cat.id, total };
    });
  }, [categories]);

  return (
    <div className="min-h-screen pb-40 bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-300 sticky top-0 z-30 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-700 p-2 rounded-lg">
              <Icon name="Calculator" className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 leading-tight">Bütçe Planlayıcı</h1>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">Eğitim Merkezi Gider Yönetimi</p>
            </div>
          </div>
          
          <div className="flex items-center flex-wrap gap-3">
            {/* Action Buttons */}
            <div className="flex items-center space-x-2 mr-2">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className={`flex items-center space-x-2 ${saveSuccess ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} text-white p-2.5 px-5 rounded-xl transition-all text-sm font-black shadow-lg active:scale-95 disabled:opacity-50`}
              >
                <Icon name={saveSuccess ? 'Check' : (isSaving ? 'Loader2' : 'Save')} className={isSaving ? 'animate-spin' : ''} size={18} />
                <span>{saveSuccess ? 'Kaydedildi!' : 'Kaydet'}</span>
              </button>

              <button 
                onClick={() => window.print()}
                className="hidden md:flex items-center space-x-2 bg-slate-800 hover:bg-slate-900 text-white p-2.5 px-5 rounded-xl transition-all text-sm font-black shadow-lg active:scale-95"
              >
                <Icon name="Printer" size={18} />
                <span>PDF Al</span>
              </button>

              <button 
                onClick={handleReset}
                title="Sıfırla"
                className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
              >
                <Icon name="RotateCcw" size={18} />
              </button>
            </div>

            {/* Total Display */}
            <div className="flex items-center space-x-4 bg-white p-2 px-5 rounded-2xl border-2 border-blue-600 shadow-inner">
              <div className="text-right">
                <div className="text-[10px] uppercase font-black text-blue-600 tracking-widest leading-none mb-1">Genel Toplam</div>
                <div className="text-2xl font-black text-slate-900 leading-none">
                  {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(grandTotal)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-12">
          {categories.map(category => {
            const catTotal = categoryTotals.find(t => t.id === category.id)?.total || 0;
            
            return (
              <section key={category.id} className="bg-white rounded-2xl shadow-lg border border-slate-300 overflow-hidden">
                <div className="bg-slate-50 px-6 py-5 border-b-2 border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-50 border-2 border-blue-100 rounded-2xl flex items-center justify-center shadow-sm">
                      <Icon name="FolderOpen" className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-900 leading-tight">{category.title}</h2>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{category.items.length} KALEM</p>
                    </div>
                  </div>
                  <div className="text-right bg-white p-3 px-6 rounded-2xl border-2 border-slate-200 shadow-sm">
                    <span className="text-[10px] text-slate-500 uppercase font-black block leading-none mb-1 tracking-tighter">BÖLÜM TOPLAMI</span>
                    <span className="text-2xl font-black text-blue-800 leading-none">
                       {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(catTotal)}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-slate-200">
                  {category.items.length === 0 ? (
                    <div className="p-16 text-center text-slate-500 font-bold italic bg-slate-50/50">
                      Bu kategoride henüz madde bulunmuyor.
                    </div>
                  ) : (
                    category.items.map(item => (
                      <BudgetItemRow
                        key={item.id}
                        item={item}
                        onUpdate={(updates) => updateItem(category.id, item.id, updates)}
                        onDelete={() => deleteItem(category.id, item.id)}
                      />
                    ))
                  )}
                </div>

                <div className="p-5 bg-slate-50 border-t border-slate-200">
                  <button
                    onClick={() => addItem(category.id)}
                    className="flex items-center space-x-2 text-sm font-black text-white bg-blue-600 hover:bg-blue-700 p-3.5 px-8 rounded-xl shadow-lg transition-all active:scale-95 group"
                  >
                    <Icon name="PlusCircle" size={20} className="group-hover:rotate-90 transition-transform" />
                    <span>Yeni Madde Ekle</span>
                  </button>
                </div>
              </section>
            );
          })}
        </div>
      </main>

      {/* Footer Info */}
      <footer className="max-w-6xl mx-auto px-4 py-16 text-center text-slate-600 text-sm font-bold border-t border-slate-300 mt-12 bg-white/50 rounded-t-[3rem]">
        <div className="flex justify-center space-x-8 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span>Dinamik Hesaplama</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span>Yerel Kayıt Aktif</span>
          </div>
        </div>
        <p className="text-lg text-slate-800">© 2024 Eğitim Merkezi Bütçe Planlama Paneli</p>
        <p className="mt-2 text-slate-500 font-medium italic max-w-md mx-auto">
          Yaptığınız değişiklikler tarayıcınızın hafızasına kaydedilir. "Kaydet" butonuna basarak veriyi güvenceye alabilirsiniz.
        </p>
      </footer>

      {/* Persistent Mobile Action */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <button 
          onClick={handleSave}
          className="bg-slate-900 text-white p-6 rounded-3xl shadow-2xl border-4 border-blue-500 flex flex-col items-center justify-center min-w-[120px]"
        >
          <div className="text-[10px] uppercase font-black text-blue-400 mb-1 tracking-widest leading-none">TOPLAM BÜTÇE</div>
          <div className="text-2xl font-black leading-none mb-2">
            {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(grandTotal)}
          </div>
          <div className="flex items-center space-x-1 bg-blue-600 px-3 py-1 rounded-full text-[10px] font-bold">
            <Icon name="Save" size={10} />
            <span>KAYDET</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default App;
