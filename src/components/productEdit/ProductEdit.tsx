import React from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  IProduct,
  IPriceHistory,
  IQuantityHistory,
  numberOfRecords,
} from "../interfaces/interfaces";
import { getData, saveData } from "../localStorage/LocalStorage";
import { isNullOrUndefined } from "util";
import ProductForm from "../productForm/ProductForm";
import { CreateEditedProduct } from "../productForm/CreateProductFromFormData";

interface PropsType extends RouteComponentProps {
  id: string;
}

const ProductEdit: React.FC<PropsType> = (props: PropsType) => {
  let id: string = (props.match.params as PropsType).id;
  let items: IProduct[] = getData();
  let item: IProduct | undefined = items.find((p) => p.id === id);
  let index: number = isNullOrUndefined(item) ? -1 : items.indexOf(item);

  const handleChangeActive = () => {};

  const handleChangeProps = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    let product: IProduct = CreateEditedProduct(event);
    product.priceHistory = item!.priceHistory;
    let list: IProduct[] = items.slice(0);
    list.splice(index, 1, product);
    saveData(list);
  };

  const handleUpdatePrice = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    let price: IPriceHistory = {
      price: Number(event.currentTarget.price.value),
      date: Date.now(),
    };
    item!.priceHistory.unshift(price);
    if (item!.priceHistory.length > numberOfRecords)
      item!.priceHistory.length = numberOfRecords;
    let list: IProduct[] = items.slice(0);
    list.splice(index, 1, item!);
    saveData(list);
  };

  const handleUpdateQuantity = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    let quantity: IQuantityHistory = {
      quantity: Number(event.currentTarget.quantity.value),
      date: Date.now(),
    };
    item!.quantityHistory.unshift(quantity);
    if (item!.quantityHistory.length > numberOfRecords)
      item!.quantityHistory.length = numberOfRecords;
    let list: IProduct[] = items.slice(0);
    list.splice(index, 1, item!);
    saveData(list);
  };

  return (
    <>
      <form onSubmit={handleChangeProps}>
        <input type="text" name="id" defaultValue={id} hidden />
        <ProductForm product={item} handleChangeActive={handleChangeActive} />
        <input type="submit" value="Submit" />
      </form>
      <form onSubmit={handleUpdatePrice}>
        <input type="text" name="id" defaultValue={id} hidden />
        <label>
          Price:
          <input
            type="text"
            name="price"
            placeholder={item!.priceHistory[0].price.toString()}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>
        <b>Price history:</b>
      </p>
      {item!.priceHistory.map((ph: IPriceHistory) => (
        <p key={ph.date}>
          <b>Price:</b> {ph.price} (<b>Updated:</b>{" "}
          {new Date(ph.date).toLocaleString()})
        </p>
      ))}
      <form onSubmit={handleUpdateQuantity}>
        <input type="text" name="id" defaultValue={id} hidden />
        <label>
          Quantity:
          <input
            type="text"
            name="quantity"
            placeholder={item!.quantityHistory[0].quantity.toString()}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>
        <b>Quantity history:</b>
      </p>
      {item!.quantityHistory.map((qh: IQuantityHistory) => (
        <p key={qh.date}>
          <b>Quantity:</b> {qh.quantity} (<b>Updated:</b>
          {new Date(qh.date).toLocaleString()})
        </p>
      ))}
    </>
  );
};

export default ProductEdit;
