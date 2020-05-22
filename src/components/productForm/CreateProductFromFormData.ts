import { IProduct } from "../interfaces/interfaces";

export const NewId = () => Math.random().toString(36).substr(2, 9);

export const CreateNewProduct = (event: React.FormEvent<HTMLFormElement>) => {
  let target = event.currentTarget;
  let product: IProduct = {
    id: NewId(),
    name: ((target.name as unknown) as HTMLInputElement).value,
    EAN: ((target.ean as unknown) as HTMLInputElement).value,
    type: Number(((target.type as unknown) as HTMLInputElement).value),
    weight: Number(((target.weight as unknown) as HTMLInputElement).value),
    color: Number(((target.color as unknown) as HTMLInputElement).value),
    active: ((target.active as unknown) as HTMLInputElement).checked,
  };
  return product;
};

export const CreateEditedProduct = (
  event: React.FormEvent<HTMLFormElement>
) => {
  let target = event.currentTarget;
  let product: IProduct = {
    id: ((target.id as unknown) as HTMLInputElement).value,
    name: ((target.name as unknown) as HTMLInputElement).value,
    EAN: ((target.ean as unknown) as HTMLInputElement).value,
    type: Number(((target.type as unknown) as HTMLInputElement).value),
    weight: Number(((target.weight as unknown) as HTMLInputElement).value),
    color: Number(((target.color as unknown) as HTMLInputElement).value),
    active: ((target.active as unknown) as HTMLInputElement).checked,
  };
  return product;
};
