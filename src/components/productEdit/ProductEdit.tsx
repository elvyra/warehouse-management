import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { IProduct, IPriceHistory } from "../interfaces/interfaces";
import { GetData, SaveData } from "../localStorage/LocalStorage";
import { isNullOrUndefined } from "util";
import ProductForm from "../productForm/ProductForm";
import { CreateEditedProduct } from "../productForm/CreateProductFromFormData";

interface PropsType extends RouteComponentProps {
  id: string;
}

const ProductEdit: React.FC<PropsType> = (props: PropsType) => {
  let id: string = (props.match.params as PropsType).id;
  let items: IProduct[] = GetData();
  let item: IProduct | undefined = items.find((p) => p.id === id);
  let index: number = isNullOrUndefined(item) ? -1 : items.indexOf(item);

  const handleChangeActive = () => {};

  const handleChangeProps = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    let product: IProduct = CreateEditedProduct(event);
    product.priceHistory = item!.priceHistory;
    let list: IProduct[] = items.slice(0);
    list.splice(index, 1, product);
    SaveData(list);
  };

  const handleUpdatePrice = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(event.currentTarget);
    let price: IPriceHistory = {
      price: Number(event.currentTarget.price.value),
      date: Date.now(),
    };
    console.log(price);
    item!.priceHistory.unshift(price);
    if (item!.priceHistory.length > 5) item!.priceHistory.length = 5;
    let list: IProduct[] = items.slice(0);
    list.splice(index, 1, item!);
    SaveData(list);
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
    </>
  );
};

export default ProductEdit;
