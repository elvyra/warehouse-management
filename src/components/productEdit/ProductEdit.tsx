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

type newHistoryValue = {
  id: string;
  value: IHistory;
};

enum HistoryUpdateActionTarget {
  "price" = "Price",
  "quantity" = "Quantity",
}

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

  const getNewValue = (
    event: React.FormEvent<HTMLFormElement>
  ): newHistoryValue => {
    let id: string | undefined = ((event.currentTarget
      .updatedValue as unknown) as HTMLInputElement).dataset.id;
    let value: IHistory = {
      value: Number(event.currentTarget.updatedValue.value),
      date: Date.now(),
    };
    return {
      id: id ? id : "",
      value: value,
    };
  };

  const showToastOnUpdatedHistory = (
    text: string,
    item: newHistoryValue
  ): void => {
    if (item.value.value > 0) {
      saveToast(
        ToastType.success,
        ToastTemplate.updated,
        item.id,
        `${text}: ${item.value.value} ${currency}`
      );
    } else {
      saveToast(
        ToastType.warning,
        ToastTemplate.updated,
        item.id,
        `${text}: ${item.value.value} ${currency}`
      );
    }
  };

  const handleHistoryUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let newValue = getNewValue(event);

    switch (event.currentTarget.dataset.action) {
      case HistoryUpdateActionTarget.price:
        console.log("jei, price action");
        setItem(updatePrice(newValue.id, newValue.value));
        showToastOnUpdatedHistory(
          `Current ${HistoryUpdateActionTarget.price.toLowerCase()}`,
          newValue
        );
        break;
      case HistoryUpdateActionTarget.quantity:
        console.log("blet quantity");
        setItem(updateQuantity(newValue.id, newValue.value));
        showToastOnUpdatedHistory(
          `Current ${HistoryUpdateActionTarget.quantity.toLowerCase()}`,
          newValue
        );
        break;
      default:
    }
  };

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
            title={HistoryUpdateActionTarget.price.toString()}
            id={item.id ? item.id : ""}
            history={item.priceHistory}
            units={currency}
            action={handleHistoryUpdate}
          />
          <HistoryEdit
            title={HistoryUpdateActionTarget.quantity.toString()}
            id={item.id ? item.id : ""}
            history={item.quantityHistory}
            units={unit}
            action={handleHistoryUpdate}
          />
        </CardDeck>
      )}
    </>
  );
};

export default ProductEdit;
