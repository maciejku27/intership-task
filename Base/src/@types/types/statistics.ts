import { TNullable } from './utils';

export type TOTPStats = {
  revenue: TNullable<number>;
  user_views: number;
  likes: number;
  likes_convertions: TNullable<number>;
  purchases_quantity: number;
  buy_rate: TNullable<number>;
  bogo_visitors: TNullable<number>;
};

export type TSubscriptionPostStats = {
  revenue: number;
  new_subscriptions: number;
  no_access_users_views: number;
  access_users_views: number;
  buy_rate: TNullable<number>;
  total_subscriptions: number;
  likes: number;
  impression_percentage: TNullable<number>;
  instant_share_visitors: number;
};

export type TPostStats = TSubscriptionPostStats | TOTPStats;
