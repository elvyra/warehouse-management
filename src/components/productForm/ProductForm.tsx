import React, { useState } from "react";
import {
  weight,
  IProduct,
  ProductType,
  ProductColor,
} from "../interfaces/interfaces";
import { isNullOrUndefined } from "util";
import { Row, Col, Form } from "react-bootstrap";

type PropsType = {
  product?: IProduct;
  handleChangeActive: any;
};

const ProductForm: React.FC<PropsType> = ({
  product,
  handleChangeActive,
}: PropsType): JSX.Element => {
  const [active, setActive] = useState<boolean>(
    !isNullOrUndefined(product) ? product.active : true
  );
  return (
    <>
      <Form.Group as={Row}>
        <Col sm="1">
          <Form.Check
            type="checkbox"
            name="active"
            checked={active}
            onChange={() => {
              setActive(!active);
              handleChangeActive();
            }}
            style={{ marginTop: ".75rem" }}
          />
        </Col>
        <Form.Label column sm="6">
          {active ? "Active" : "Inactive"}
        </Form.Label>
      </Form.Group>
      <Form.Row>
        <Form.Group as={Col} lg="6">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            defaultValue={!isNullOrUndefined(product) ? product.name : ""}
            autoFocus
          />
        </Form.Group>
        <Form.Group as={Col} lg="6">
          <Form.Label>EAN</Form.Label>
          <Form.Control
            type="text"
            name="ean"
            defaultValue={!isNullOrUndefined(product) ? product.EAN : ""}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Type</Form.Label>
          <Form.Control
            as="select"
            defaultValue={!isNullOrUndefined(product) ? product.type : 0}
            name="type"
          >
            {Object.keys(ProductType)
              .filter((key) => !isNaN(Number(key)))
              .map((key) => (
                <option key={key} value={key}>
                  {ProductType[Number(key)]}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} lg="3">
          <Form.Label>Color</Form.Label>
          <Form.Control
            as="select"
            defaultValue={!isNullOrUndefined(product) ? product.color : 0}
            name="color"
          >
            {Object.keys(ProductColor)
              .filter((key) => !isNaN(Number(key)))
              .map((key) => (
                <option key={key} value={key}>
                  {ProductColor[Number(key)]}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} lg="3">
          <Form.Label>Weight ({weight})</Form.Label>
          <Form.Control
            type="number"
            min="0"
            name="weight"
            defaultValue={!isNullOrUndefined(product) ? product.weight : 0}
          />
        </Form.Group>
      </Form.Row>
    </>
  );
};

export default ProductForm;
