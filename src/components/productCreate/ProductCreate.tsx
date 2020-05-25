import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import ProductForm from "../productForm/ProductForm";
import { CreateNewProduct } from "../productForm/CreateProductFromFormData";
import { createItem } from "../localStorage/LocalStorage";
import { Col, Row, Button, Form } from "react-bootstrap";
import ToastsContext from "../../context/ToastsContext";
import { ToastType, ToastTemplate } from "../interfaces/interfaces";

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
    <Form onSubmit={handleSubmit}>
      <ProductForm handleChangeActive={handleChangeActive} />
      <Form.Group as={Row}>
        <Form.Label column md="2">
          Price
        </Form.Label>
        <Col md="10">
          <Form.Control type="number" min="0" name="price" defaultValue="0" />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column md="2">
          Quantity
        </Form.Label>
        <Col md="10">
          <Form.Control
            type="number"
            min="0"
            name="quantity"
            defaultValue="0"
          />
        </Col>
      </Form.Group>
      <Form.Row>
        <Col md="2" />
        <Col md="10">
          <Button type="submit" className="mr-2">
            Create
          </Button>
          <NavLink to="/products" className="btn btn-link text-secondary">
            Back to list
          </NavLink>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default ProductCreate;
