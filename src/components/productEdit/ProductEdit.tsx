import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import {
  IProduct,
  IHistory,
  currency,
  unit,
  ToastType,
  ToastTemplate,
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
import { Form, Button, CardDeck, Card } from "react-bootstrap";
import ToastsContext from "../../context/ToastsContext";
import HistoryEdit from "./HistoryEdit";

interface MatchParams {
  id: string;
}
interface PropsType extends RouteComponentProps<MatchParams> {}

const ProductEdit: React.FC<PropsType> = (props: PropsType): JSX.Element => {
  const [item, setItem] = useState<IProduct | null>(null);
  const { saveToast } = useContext(ToastsContext);

  useEffect(() => {
    let product: IProduct | null | undefined = getItem(props.match.params.id);
    if (!isNullOrUndefined(product)) setItem(product);
  }, [props.match.params.id]);

  const handleChangeActive = () => {};

  const handleChangeProps = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setItem(updateProps(CreateEditedProduct(event)));
    saveToast(
      ToastType.success,
      ToastTemplate.updated,
      "id misssing",
      "Product properties updated"
    );
  };

  const handleUpdatePrice = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    let id: string | undefined = ((event.currentTarget
      .price as unknown) as HTMLInputElement).dataset.id;
    let price: IHistory = {
      value: Number(event.currentTarget.price.value),
      date: Date.now(),
    };
    if (!isNullOrUndefined(id)) {
      setItem(updatePrice(id, price));
      if (price.value > 0) {
        saveToast(
          ToastType.success,
          ToastTemplate.updated,
          id,
          `Current price ${price.value} ${currency}`
        );
      } else {
        saveToast(
          ToastType.warning,
          ToastTemplate.updated,
          id,
          `Current price ${price.value} ${currency}`
        );
      }
    }
  };

  const handleUpdateQuantity = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    let id: string | undefined = ((event.currentTarget
      .quantity as unknown) as HTMLInputElement).dataset.id;
    let quantity: IHistory = {
      value: Number(event.currentTarget.quantity.value),
      date: Date.now(),
    };
    if (!isNullOrUndefined(id)) {
      setItem(updateQuantity(id, quantity));
      if (quantity.value > 0) {
        saveToast(
          ToastType.success,
          ToastTemplate.updated,
          id,
          `Current stock: ${quantity.value} ${unit}`
        );
      } else {
        saveToast(
          ToastType.warning,
          ToastTemplate.updated,
          id,
          `Current stock: ${quantity.value} ${unit}`
        );
      }
    }
  };

  /*
  const handlePriceUpdate = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      let inputData: InputData = getInputData(event);
      let price: IHistory = {
        value: Number(inputData.value),
        date: Date.now(),
      };
      updateItems(updatePrice(inputData.id, price));
      saveToast(
        ToastType.success,
        ToastTemplate.updated,
        inputData.id,
        `Current price: ${price.value} ${currency}`
      );
    }
  }; */

  return (
    <>
      {isNullOrUndefined(item) ? (
        <p>Product not found</p>
      ) : (
        <CardDeck>
          <Card style={{ flex: "1 1 100%" }} className="mb-4">
            <Card.Body>
              <Card.Title>Product details</Card.Title>
              <Card.Subtitle>ID: {item.id}</Card.Subtitle>
              <Form onSubmit={handleChangeProps} className="mt-4">
                <Form.Control
                  type="text"
                  name="id"
                  defaultValue={item.id}
                  plaintext
                  readOnly
                  hidden
                />
                <ProductForm
                  product={item}
                  handleChangeActive={handleChangeActive}
                />
                <Form.Row>
                  <NavLink
                    to="/products"
                    className="btn btn-link text-secondary ml-auto mr-2"
                  >
                    Back to list
                  </NavLink>
                  <Button type="submit">Save</Button>
                </Form.Row>
              </Form>
            </Card.Body>
          </Card>

          <HistoryEdit
            title="Price"
            id={item.id ? item.id : ""}
            history={item.priceHistory}
            units={currency}
            action={handleUpdatePrice}
          />

          <HistoryEdit
            title="Quantity"
            id={item.id ? item.id : ""}
            history={item.quantityHistory}
            units={unit}
            action={handleUpdateQuantity}
          />
        </CardDeck>
      )}
    </>
  );
};

export default ProductEdit;
