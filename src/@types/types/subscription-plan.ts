import { TPrice } from '@types';

export type TSubscriptionPlan = {
  pk: number;
  name: string;
  is_freemium: boolean;
  price: TPrice;
};
