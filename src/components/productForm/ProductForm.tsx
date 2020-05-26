import React from "react";
import {
  weight,
  IProduct,
  ProductType,
  ProductColor,
} from "../interfaces/interfaces";
import { isNullOrUndefined } from "util";
import { Col, Form } from "react-bootstrap";

type PropsType = {
  product?: IProduct;
  handleChangeActive: any;
};

const ProductForm: React.FC<PropsType> = ({
  product,
  handleChangeActive,
}: PropsType): JSX.Element => {
  return (
    <>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Check
            type="checkbox"
            name="active"
            defaultChecked={!isNullOrUndefined(product) ? product.active : true}
            onChange={handleChangeActive}
            label="Active"
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            defaultValue={!isNullOrUndefined(product) ? product.name : ""}
            autoFocus
          />
        </Form.Group>
        <Form.Group as={Col}>
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
