import Plyr from 'plyr';

export type TAspectRatio =
  | '16/9'
  | '9/16'
  | '4/3'
  | '3/4'
  | '21/9'
  | '9/21'
  | '3/2'
  | '2/3'
  | '1/1'
  | 'auto'
  | string;

export type TPlayer = { player: Plyr };
