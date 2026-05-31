export type Order = {
  id: string;
  customer_name: string;
  customer_email: string;
  product: string;
  category: string;
  amount: number;
  status: 'completed' | 'pending' | 'refunded' | 'cancelled';
  created_at: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  country: string;
  total_spent: number;
  orders_count: number;
  created_at: string;
};

export type DailyMetric = {
  id: string;
  date: string;
  revenue: number;
  orders: number;
  new_customers: number;
  conversion_rate: number;
};
