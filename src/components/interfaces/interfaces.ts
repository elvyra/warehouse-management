// Currency symbol
export const currency = "€";

// Units symbol
export const unit = "pcs";

// Weight units symbol
export const weight = "kg";

// Highlight color code
export const color = { current: "#f24c64", primary: "#0a4f70" };

// Number of max price and quantity history records
export const numberOfRecords = 5;

// Toast (alert) show time
export const delayToast = 10000;

// Time snapshot fot Toasts
export const currentTime = (): string =>
  new Date(Date.now()).toLocaleTimeString();

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
  type: ToastType;
  template: ToastTemplate;
  title: string;
  text: string;
  time?: string;
}

export enum ToastType {
  "success" = 0,
  "danger" = 1,
  "warning" = 2,
}

export enum ToastTemplate {
  "created" = 0,
  "updated" = 1,
  "deleted" = 2,
  "seeded" = 3,
}
