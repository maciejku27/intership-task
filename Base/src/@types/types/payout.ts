export type TPayout = {
  pk: number;
  unit_amount: number;
  currency_iso: string;
  created_at: string;
  status: 'REQUEST_PROCESSING' | 'ON_WAY_TO_YOUR_ACCOUNT' | 'DONE';
  expected_arrive_date: string;
};

export type TPayoutFund = {
  available_funds: { amount: number; currency: string }[];
  pending_funds: { amount: number; currency: string }[];
};
