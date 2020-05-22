export interface IProduct {
  id?: string;
  name: string;
  EAN: string;
  type: ProductType;
  weight: number;
  color: ProductColor;
  active: boolean;
  priceHistory: IPriceHistory[];
  quantityHistory: IQuantityHistory[];
}

export const currency = "€";
export const color = "red";

export interface IPriceHistory {
  price: number;
  date: number;
}

export interface IQuantityHistory {
  quantity: number;
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
