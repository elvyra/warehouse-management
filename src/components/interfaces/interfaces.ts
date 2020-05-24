// Currency symbol
export const currency = "€";

// Units symbol
export const unit = "pcs";

// Highlight color code
export const color = "red";

// Number of max price and quantity history records
export const numberOfRecords = 5;

// Toast (alert) show time
export const delayToast = 10000;

export interface IProduct {
  id?: string;
  name: string;
  EAN: string;
  type: ProductType;
  weight: number;
  color: ProductColor;
  active: boolean;
  priceHistory: IHistory[];
  quantityHistory: IHistory[];
}

export interface IHistory {
  value: number;
  date: number;
}

export enum ProductType {
  Outdoor = 0,
  Kitchen = 1,
  "Living Room" = 2,
  Hall = 3,
  Bedroom = 4,
  Nursery = 5,
}

export enum ProductColor {
  White = 0,
  Oak = 1,
  Beech = 2,
  Pine = 3,
  "Cherry Tree" = 4,
}

export interface IToast {
  id?: number;
  title: string;
  subtitle?: string;
  text: string;
}
