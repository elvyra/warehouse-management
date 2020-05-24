import React from "react";
import { IProduct, ProductType, ProductColor } from "../interfaces/interfaces";
import { isNullOrUndefined } from "util";
import { Col, Row, Form } from "react-bootstrap";

type PropsType = {
  product?: IProduct;
  handleChangeActive: any;
};

const ProductForm: React.FC<PropsType> = ({
  product,
  handleChangeActive,
}: PropsType) => {
  return (
    <>
      <Form.Group as={Row}>
        <Form.Label column md="2">
          Name
        </Form.Label>
        <Col md="10">
          <Form.Control
            type="text"
            name="name"
            defaultValue={!isNullOrUndefined(product) ? product.name : ""}
            autoFocus
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column md="2">
          EAN
        </Form.Label>
        <Col md="10">
          <Form.Control
            type="text"
            name="ean"
            defaultValue={!isNullOrUndefined(product) ? product.EAN : ""}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column md="2">
          Type
        </Form.Label>
        <Col md="10">
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
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column md="2">
          Weight
        </Form.Label>
        <Col md="10">
          <Form.Control
            type="number"
            min="0"
            name="weight"
            defaultValue={!isNullOrUndefined(product) ? product.weight : 0}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column md="2">
          Color
        </Form.Label>
        <Col md="10">
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
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column md="2">
          Active
        </Form.Label>
        <Col md="10">
          <Form.Check
            type="checkbox"
            name="active"
            defaultChecked={!isNullOrUndefined(product) ? product.active : true}
            onChange={handleChangeActive}
          />
        </Col>
      </Form.Group>
    </>
  );
};

export default ProductForm;
