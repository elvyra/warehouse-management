import { IProduct } from "../interfaces/interfaces";

export const GetData = () => {
  let list = localStorage.getItem("stock");
  return JSON.parse(list == null ? "[]" : list);
};

export const SaveData = (list: IProduct[]) => {
  localStorage.setItem("stock", JSON.stringify(list));
};
