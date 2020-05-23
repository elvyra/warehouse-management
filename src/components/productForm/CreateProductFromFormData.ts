import { IProduct } from "../interfaces/interfaces";

export const CreateNewProduct = (
  event: React.FormEvent<HTMLFormElement>
): IProduct => {
  let target = event.currentTarget;
  return {
    id: "",
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
    quantityHistory: [
      {
        quantity: Number(
          ((target.quantity as unknown) as HTMLInputElement).value
        ),
        date: Date.now(),
      },
    ],
  };
};

export const CreateEditedProduct = (
  event: React.FormEvent<HTMLFormElement>
): IProduct => {
  let target = event.currentTarget;
  return {
    id: ((target.id as unknown) as HTMLInputElement).value,
    name: ((target.name as unknown) as HTMLInputElement).value,
    EAN: ((target.ean as unknown) as HTMLInputElement).value,
    type: Number(((target.type as unknown) as HTMLInputElement).value),
    weight: Number(((target.weight as unknown) as HTMLInputElement).value),
    color: Number(((target.color as unknown) as HTMLInputElement).value),
    active: ((target.active as unknown) as HTMLInputElement).checked,
    priceHistory: [],
    quantityHistory: [],
  };
};
