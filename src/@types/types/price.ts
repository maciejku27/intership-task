export type TPrice = {
  unit_amount: number;
  currency_iso: string;
};

export type TExtendedPrice = TPrice & {
  pk: number;
  gros_unit_amount: number;
};
