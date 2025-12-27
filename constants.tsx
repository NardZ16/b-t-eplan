
import { BudgetCategory } from './types';

export const INITIAL_DATA: BudgetCategory[] = [
  {
    id: 'cat-1',
    title: 'Grup Sınıfı',
    items: [
      { id: '1-1', name: 'IKEA Torald Masa', unitPrice: 650, quantity: 15, months: 1, link: 'https://www.ikea.com.tr/siparis-adim/sepetim', isActive: true, isRecurring: false },
      { id: '1-2', name: 'Sınıf Sandalyesi', unitPrice: 1210, quantity: 20, months: 1, isActive: true, isRecurring: false },
      { id: '1-3', name: '90x120 Beyaz Tahta', unitPrice: 3750, quantity: 1, months: 1, link: 'https://www.panohane.com/90x120-sabit-ayakli-laminat-beyaz-yazi-tahtasi-tek-tarafli-yg241', isActive: true, isRecurring: false },
    ]
  },
  {
    id: 'cat-2',
    title: 'Premium Sınıf',
    items: [
      { id: '2-1', name: 'Toplantı Masası (8 Kişilik)', unitPrice: 15000, quantity: 1, months: 1, isActive: true, isRecurring: false },
      { id: '2-2', name: '90x120 Beyaz Tahta', unitPrice: 3750, quantity: 1, months: 1, isActive: true, isRecurring: false },
      { id: '2-3', name: 'Kontez Çalışma Sandalyesi', unitPrice: 2650, quantity: 8, months: 1, link: 'https://www.trendyol.com/obc-ofis-buro-concept/kontez-beyaz-kollu-krom-ayakli-calisma-sandalyesi-ofis-koltugu-gri-p-831579762', isActive: true, isRecurring: false },
    ]
  },
  {
    id: 'cat-3',
    title: 'Karşılama - Giriş',
    items: [
      { id: '3-1', name: 'Ofis Takımı (L Masa, Karşılama Koltuğu 2x, Sandalye 1x)', unitPrice: 45000, quantity: 1, months: 1, isActive: true, isRecurring: false },
    ]
  },
  {
    id: 'cat-4',
    title: 'Etüt Alanı',
    items: [
      { id: '4-1', name: 'Traverten Orta Masa', unitPrice: 4600, quantity: 1, months: 1, link: 'https://www.trendyol.com/atolye-casa/90x180cm-traverten-yemek-masasi-sabit-loft-model-p-969761615', isActive: true, isRecurring: false },
      { id: '4-2', name: 'Sandalye', unitPrice: 2000, quantity: 15, months: 1, isActive: true, isRecurring: false },
      { id: '4-3', name: 'Tekli Etüt Masası', unitPrice: 3000, quantity: 10, months: 1, isActive: true, isRecurring: false },
    ]
  },
  {
    id: 'cat-5',
    title: 'Mutfak',
    items: [
      { id: '5-1', name: 'Kapsül Kahve Makinesi', unitPrice: 18000, quantity: 1, months: 1, isActive: true, isRecurring: false },
      { id: '5-2', name: 'Philips LatteGo 3300', unitPrice: 15000, quantity: 1, months: 1, isActive: true, isRecurring: false },
      { id: '5-3', name: 'Türk Kahvesi Makinesi', unitPrice: 7000, quantity: 1, months: 1, isActive: true, isRecurring: false },
      { id: '5-4', name: 'Çaycı', unitPrice: 2000, quantity: 1, months: 1, isActive: true, isRecurring: false },
      { id: '5-5', name: 'Baskılı Karton Bardak', unitPrice: 4000, quantity: 1, months: 1, isActive: true, isRecurring: false },
      { id: '5-6', name: 'Kapsül Kahve Stoku', unitPrice: 6000, quantity: 1, months: 1, isActive: true, isRecurring: false },
    ]
  },
  {
    id: 'cat-6',
    title: 'Maaşlar',
    items: [
      { id: '6-1', name: 'Öğretmen Maaşları', unitPrice: 30000, quantity: 1, months: 6, isActive: true, isRecurring: true },
      { id: '6-2', name: 'Personel Maaşları', unitPrice: 15000, quantity: 1, months: 6, isActive: true, isRecurring: true },
    ]
  },
  {
    id: 'cat-7',
    title: 'Müdür Odası',
    items: [
      { id: '7-1', name: 'Ofis Takımı (Full Set)', unitPrice: 30000, quantity: 1, months: 1, isActive: true, isRecurring: false },
      { id: '7-2', name: 'Fotokopi Makinesi', unitPrice: 30000, quantity: 1, months: 1, isActive: true, isRecurring: false },
    ]
  }
];
