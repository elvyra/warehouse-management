import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import ProductForm from "../productForm/ProductForm";
import { CreateNewProduct } from "../productForm/CreateProductFromFormData";
import { createItem } from "../localStorage/LocalStorage";
import { Col, Button, Form, Card } from "react-bootstrap";
import ToastsContext from "../../context/ToastsContext";
import {
  currency,
  unit,
  ToastType,
  ToastTemplate,
} from "../interfaces/interfaces";

const ProductCreate: React.FC = () => {
  const handleChangeActive = () => {};
  const { saveToast } = useContext(ToastsContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    let item = createItem(CreateNewProduct(event));
    if (item.priceHistory[0].value > 0 && item.quantityHistory[0].value > 0) {
      saveToast(ToastType.success, ToastTemplate.created, item.id);
    } else {
      saveToast(
        ToastType.warning,
        ToastTemplate.created,
        item.id,
        "Warning! Price or/and stock info might be incorrect!"
      );
    }
    event.currentTarget.reset();
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Create new product</Card.Title>
        <Form onSubmit={handleSubmit}>
          <ProductForm handleChangeActive={handleChangeActive} />
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Price ({currency})</Form.Label>
              <Form.Control
                type="number"
                min="0"
                name="price"
                defaultValue="0"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Quantity ({unit})</Form.Label>
              <Form.Control
                type="number"
                min="0"
                name="quantity"
                defaultValue="0"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <NavLink
              to="/products"
              tabIndex={-1}
              className="btn btn-link text-secondary ml-auto mr-2"
            >
              Back to list
            </NavLink>
            <Button type="submit">Create</Button>
          </Form.Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ProductCreate;
