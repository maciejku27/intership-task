import { EResourceType } from '../enums/file';
import { TExtendedPrice } from './price';
import { TModify, TNullable } from './utils';

export type TPost = TPreviewPost | TOriginalPost;

export type TOriginalPost = TModify<
  TPostBase,
  {
    description: string;
    likes: number;
    content_files_urls: { file: string; type: EResourceType }[];
  }
>;

export type TPreviewPost = TPostBase;

export type TPostBase = {
  pk: number;
  product: TPostProduct;
  description: null;
  likes: 0;
  is_liked_by_user: boolean;
  instant_share: boolean;
  is_buy_one_gift_one: boolean;
  publish_time: string;
  user_impressions: null;
  placeholders_urls: { file: string; type: EResourceType }[];
  content_files_urls: [];
};

export type TPostProduct = {
  is_subscription: boolean;
  is_freemium: boolean;
  creator_username: string;
  quantity_limit: TNullable<number>;
  datetime_limit: TNullable<string>;
  price: TExtendedPrice;
  pk: number;
};
