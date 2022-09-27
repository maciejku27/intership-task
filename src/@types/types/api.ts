import { TNullable } from '@types';

export type TApiList<T = unknown> = {
  count: number;
  next: TNullable;
  previous: TNullable;
  results: T[];
};

export type TApiListParams<T = unknown> = Partial<{
  offset: number;
  limit: number;
}> &
  T;

export type TApiSearchListParams<T = unknown> = Partial<{
  offset: number;
  limit: number;
  search: string;
}> &
  T;
