
import React from 'react';
import { BudgetItem } from '../types';
import { Icon } from './Icon';

interface BudgetItemRowProps {
  item: BudgetItem;
  onUpdate: (updates: Partial<BudgetItem>) => void;
  onDelete: () => void;
}

export const BudgetItemRow: React.FC<BudgetItemRowProps> = ({ item, onUpdate, onDelete }) => {
  // If not recurring, we treat months as 1 regardless of stored value for safety in display total
  const displayMonths = item.isRecurring ? item.months : 1;
  const rowTotal = item.unitPrice * item.quantity * displayMonths;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-3 items-center p-4 border-b border-slate-200 transition-all ${!item.isActive ? 'opacity-40 grayscale' : ''}`}>
      {/* Active Toggle */}
      <div className="md:col-span-1 flex justify-center">
        <button
          onClick={() => onUpdate({ isActive: !item.isActive })}
          className={`p-2.5 rounded-full transition-colors shadow-sm ${item.isActive ? 'text-blue-700 bg-blue-100 ring-1 ring-blue-200' : 'text-slate-700 bg-slate-300 ring-1 ring-slate-400'}`}
          title={item.isActive ? 'Hesaplamadan Çıkar' : 'Hesaplamaya Ekle'}
        >
          <Icon name={item.isActive ? 'Eye' : 'EyeOff'} size={20} />
        </button>
      </div>

      {/* Name & Link */}
      <div className="md:col-span-3 flex flex-col space-y-1">
        <input
          type="text"
          value={item.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="bg-transparent border-none focus:ring-0 font-black text-slate-900 w-full text-base placeholder:text-slate-400"
          placeholder="Madde Adı"
        />
        <div className="flex items-center space-x-2 text-xs">
          <Icon name="Link" size={12} className="text-slate-600 font-black" />
          <input
            type="text"
            value={item.link || ''}
            onChange={(e) => onUpdate({ link: e.target.value })}
            className="bg-transparent border-none focus:ring-0 text-blue-700 font-bold underline truncate w-full placeholder:text-slate-400"
            placeholder="Link ekleyin..."
          />
          {item.link && (
            <a href={item.link} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-blue-800 shrink-0">
              <Icon name="ExternalLink" size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Unit Price */}
      <div className="md:col-span-2 flex items-center bg-slate-100 border-2 border-slate-300 rounded-xl px-3 focus-within:border-blue-500 focus-within:bg-white transition-all shadow-sm h-12">
        <span className="text-slate-700 font-black text-sm mr-1">₺</span>
        <input
          type="number"
          value={item.unitPrice}
          onChange={(e) => onUpdate({ unitPrice: Number(e.target.value) })}
          className="w-full bg-transparent border-none focus:ring-0 text-sm font-black text-slate-900 placeholder:text-slate-500"
          placeholder="Birim Fiyat"
        />
      </div>

      {/* Quantity (ADET) - Expanded from 1 to 2 cols for better sizing */}
      <div className="md:col-span-2 flex items-center bg-slate-100 border-2 border-slate-300 rounded-xl px-3 focus-within:border-blue-500 focus-within:bg-white transition-all shadow-sm h-12">
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => onUpdate({ quantity: Number(e.target.value) })}
          className="w-full bg-transparent border-none focus:ring-0 text-sm font-black text-slate-900 text-center placeholder:text-slate-500"
          placeholder="Adet"
        />
        <span className="text-slate-700 font-black text-[10px] ml-1 uppercase whitespace-nowrap">Adet</span>
      </div>

      {/* Months (Multiplier) - ONLY for Recurring Items */}
      <div className="md:col-span-1">
        {item.isRecurring ? (
          <div className="flex items-center bg-blue-50 border-2 border-blue-200 rounded-xl px-2 focus-within:border-blue-500 focus-within:bg-white transition-all shadow-sm h-12">
            <input
              type="number"
              value={item.months}
              onChange={(e) => onUpdate({ months: Number(e.target.value) })}
              className="w-full bg-transparent border-none focus:ring-0 text-sm text-center font-black text-blue-900 placeholder:text-blue-400"
              placeholder="Ay"
            />
            <span className="text-blue-700 font-black text-[10px] ml-1 uppercase">Ay</span>
          </div>
        ) : (
          <div className="hidden md:block"></div>
        )}
      </div>

      {/* Total for this line */}
      <div className="md:col-span-2 text-right">
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Satır Toplamı</div>
        <div className="font-black text-slate-900 text-lg leading-tight">
          {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(rowTotal)}
        </div>
      </div>

      {/* Delete */}
      <div className="md:col-span-1 flex justify-end">
        <button
          onClick={onDelete}
          className="p-2.5 text-red-600 hover:text-white hover:bg-red-600 rounded-xl transition-all border border-transparent hover:shadow-md"
        >
          <Icon name="Trash2" size={20} />
        </button>
      </div>
    </div>
  );
};
