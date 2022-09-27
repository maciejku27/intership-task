export type TPaymentMethod = {
  pk: number;
  source_id: string;
  is_card: boolean;
  last4: string;
  brand: string;
  exp_year: string;
  exp_month: string;
};
