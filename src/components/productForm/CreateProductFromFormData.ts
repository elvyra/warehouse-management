import { IProduct } from "../interfaces/interfaces";

export const NewId = () => Math.random().toString(36).substr(2, 9);

const CreateProduct = (target: any) => {
  return {
    name: ((target.name as unknown) as HTMLInputElement).value,
    EAN: ((target.ean as unknown) as HTMLInputElement).value,
    type: Number(((target.type as unknown) as HTMLInputElement).value),
    weight: Number(((target.weight as unknown) as HTMLInputElement).value),
    color: Number(((target.color as unknown) as HTMLInputElement).value),
    active: ((target.active as unknown) as HTMLInputElement).checked,
    priceHistory: [
      {
        price: Number(((target.price as unknown) as HTMLInputElement).value),
        date: Date.now(),
      },
    ],
  };
};

export const CreateNewProduct = (event: React.FormEvent<HTMLFormElement>) => {
  let target = event.currentTarget;
  let product: IProduct = CreateProduct(target);
  product.id = NewId();
  return product;
};

export const CreateEditedProduct = (
  event: React.FormEvent<HTMLFormElement>
) => {
  let target = event.currentTarget;
  let product: IProduct = CreateProduct(target);
  product.id = ((target.id as unknown) as HTMLInputElement).value;
  return product;
};
