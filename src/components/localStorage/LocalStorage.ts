import { IProduct } from "../interfaces/interfaces";
import { isNullOrUndefined } from "util";

export const GetData = () => {
  let list: string | null | undefined = localStorage.getItem("stock");
  return JSON.parse(isNullOrUndefined(list) ? "[]" : list);
};

export const SaveData = (list: IProduct[]) => {
  localStorage.setItem("stock", JSON.stringify(list));
};
