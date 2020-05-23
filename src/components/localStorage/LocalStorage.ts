import {
  IProduct,
  IPriceHistory,
  numberOfRecords,
  IQuantityHistory,
} from "../interfaces/interfaces";
import { isNullOrUndefined } from "util";

// Returns list of IProduct from local storage
export const getData = (): IProduct[] => {
  let list: string | null | undefined = localStorage.getItem("stock");
  return JSON.parse(isNullOrUndefined(list) ? "[]" : list);
};

// Saves list of IProduct to localstorage
export const saveData = (list: IProduct[]): void => {
  localStorage.setItem("stock", JSON.stringify(list));
};

// Toggles item active prop, returns updated item or null if not found
export const toggleActive = (id: string): IProduct | null => {
  let items: IProduct[] = getData();
  let item: IProduct | undefined = items.find((p) => p.id === id);
  if (isNullOrUndefined(item)) {
    return null;
  } else {
    item.active = !item.active;
    items.splice(items.indexOf(item), 1, item);
    saveData(items);
    return item;
  }
};

// Updates item price history, returns updated item or null if not found
export const updatePrice = (
  id: string,
  price: IPriceHistory
): IProduct | null => {
  let items: IProduct[] = getData();
  let item: IProduct | undefined = items.find((p) => p.id === id);
  if (isNullOrUndefined(item)) {
    return null;
  } else {
    item.priceHistory.unshift(price);
    if (item.priceHistory.length > numberOfRecords)
      item.priceHistory.length = numberOfRecords;
    items.splice(items.indexOf(item), 1, item);
    saveData(items);
    return item;
  }
};

// Updates item quantity history, returns updated item or null if not found
export const updateQuantity = (
  id: string,
  quantity: IQuantityHistory
): IProduct | null => {
  let items: IProduct[] = getData();
  let item: IProduct | undefined = items.find((p) => p.id === id);
  if (isNullOrUndefined(item)) {
    return null;
  } else {
    item.quantityHistory.unshift(quantity);
    if (item.quantityHistory.length > numberOfRecords)
      item.quantityHistory.length = numberOfRecords;
    items.splice(items.indexOf(item), 1, item);
    saveData(items);
    return item;
  }
};

// Deletes item from localstorage list, returns deleted item or null if not found
export const deteleFromList = (id: string): IProduct | null => {
  let items: IProduct[] = getData();
  let item: IProduct | undefined = items.find((p) => p.id === id);
  if (isNullOrUndefined(item)) {
    return null;
  } else {
    items.splice(items.indexOf(item), 1);
    saveData(items);
    return item;
  }
};
