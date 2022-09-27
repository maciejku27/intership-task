export type TUser = {
  pk: string;
  is_active: boolean;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  email: string;
  phone_number: string;
  post_code: string;
  city: string;
  address: string;
  account_number: string;
};

export type TUserMe = {
  pk: number;
  email: string;
  name: string;
  profile_photo: string;
  background_photo: string;
  bio: string;
  instagram_address: string;
  tiktok_address: string;
  facebook_address: string;
  twitter_address: string;
  website_address: string;
  is_creator: boolean;
  is_creator_active: boolean;
  username: string;
};
