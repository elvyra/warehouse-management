import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  IProduct,
  IPriceHistory,
  IQuantityHistory,
} from "../interfaces/interfaces";
import {
  getItem,
  updateProps,
  updatePrice,
  updateQuantity,
} from "../localStorage/LocalStorage";
import { isNullOrUndefined } from "util";
import ProductForm from "../productForm/ProductForm";
import { CreateEditedProduct } from "../productForm/CreateProductFromFormData";

interface MatchParams {
  id: string;
}
interface PropsType extends RouteComponentProps<MatchParams> {}

const ProductEdit: React.FC<PropsType> = (props: PropsType) => {
  const [item, setItem] = useState<IProduct | null>(null);

  useEffect(() => {
    let product: IProduct | null | undefined = getItem(props.match.params.id);
    if (!isNullOrUndefined(product)) setItem(product);
  }, [props.match.params.id]);

  const handleChangeActive = () => {};

  const handleChangeProps = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setItem(updateProps(CreateEditedProduct(event)));
  };

  const handleUpdatePrice = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    let id: string | undefined = ((event.currentTarget
      .price as unknown) as HTMLInputElement).dataset.id;
    let price: IPriceHistory = {
      price: Number(event.currentTarget.price.value),
      date: Date.now(),
    };
    if (!isNullOrUndefined(id)) {
      setItem(updatePrice(id, price));
    }
  };

  const handleUpdateQuantity = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    let id: string | undefined = ((event.currentTarget
      .quantity as unknown) as HTMLInputElement).dataset.id;
    let quantity: IQuantityHistory = {
      quantity: Number(event.currentTarget.quantity.value),
      date: Date.now(),
    };
    if (!isNullOrUndefined(id)) {
      setItem(updateQuantity(id, quantity));
    }
  };

  return (
    <>
      {isNullOrUndefined(item) ? (
        <p>Product not found</p>
      ) : (
        <>
          <form onSubmit={handleChangeProps}>
            <input type="text" name="id" defaultValue={item.id} hidden />
            <ProductForm
              product={item}
              handleChangeActive={handleChangeActive}
            />
            <input type="submit" value="Save" />
          </form>
          <form onSubmit={handleUpdatePrice}>
            <label>
              Price:
              <input
                type="text"
                name="price"
                data-id={item.id}
                placeholder={item.priceHistory[0].price.toString()}
              />
            </label>
            <input type="submit" value="Update price" />
          </form>
          <p>
            <b>Price history:</b>
          </p>
          {item.priceHistory.map((c: IPriceHistory) => (
            <p key={c.date}>
              <b>Price:</b> {c.price} (<b>Updated:</b>{" "}
              {new Date(c.date).toLocaleString()})
            </p>
          ))}
          <form onSubmit={handleUpdateQuantity}>
            <label>
              Quantity:
              <input
                type="text"
                name="quantity"
                data-id={item.id}
                placeholder={item!.quantityHistory[0].quantity.toString()}
              />
            </label>
            <input type="submit" value="Update Quantity" />
          </form>
          <p>
            <b>Quantity history:</b>
          </p>
          {item.quantityHistory.map((c: IQuantityHistory) => (
            <p key={c.date}>
              <b>Quantity:</b> {c.quantity} (<b>Updated:</b>
              {new Date(c.date).toLocaleString()})
            </p>
          ))}
        </>
      )}
    </>
  );
};

export default ProductEdit;
