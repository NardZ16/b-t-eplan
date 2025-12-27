
export interface BudgetItem {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  months: number; // For recurring costs like salaries
  link?: string;
  isActive: boolean;
  isRecurring: boolean;
}

export interface BudgetCategory {
  id: string;
  title: string;
  items: BudgetItem[];
}
