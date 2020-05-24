import React from "react";
import { NavLink } from "react-router-dom";
import { IProduct, ProductType, ProductColor } from "../interfaces/interfaces";
import { Button, ButtonGroup, Form } from "react-bootstrap";

type PropsType = {
  key?: string;
  item: IProduct;
  handleActiveChange: any;
  handlePriceUpdate: any;
  handleQuantityUpdate: any;
  handleDelete: any;
};

const ProductRow: React.FC<PropsType> = ({
  item,
  handleActiveChange,
  handlePriceUpdate,
  handleQuantityUpdate,
  handleDelete,
}: PropsType) => {
  return (
    <tr className={item.quantityHistory[0].value <= 0 ? "highlight" : ""}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.EAN}</td>
      <td>{ProductType[item.type]}</td>
      <td>{item.weight}</td>
      <td>{ProductColor[item.color]}</td>
      <td>
        <Form.Check
          type="checkbox"
          name="active"
          defaultChecked={item.active}
          data-id={item.id}
          onChange={handleActiveChange}
        />
      </td>
      <td>
        <Form.Control
          type="number"
          name="price"
          min="0"
          data-id={item.id}
          defaultValue={item.priceHistory[0].value}
          onKeyUp={handlePriceUpdate}
          className={
            item.priceHistory[0].value <= 0 ? "border-danger text-danger" : ""
          }
        />
      </td>
      <td>
        <Form.Control
          type="number"
          name="quantity"
          min="0"
          data-id={item.id}
          defaultValue={item.quantityHistory[0].value}
          onKeyUp={handleQuantityUpdate}
          className={
            item.quantityHistory[0].value <= 0
              ? "border-danger text-danger"
              : ""
          }
        />
      </td>
      <td>
        <ButtonGroup>
          <NavLink
            to={`/products/${item.id}`}
            className="btn btn-outline-primary"
          >
            View
          </NavLink>
          <NavLink
            to={`/products/${item.id}/edit`}
            className="btn btn-outline-secondary"
          >
            Edit
          </NavLink>
          <Button variant="danger" data-id={item.id} onClick={handleDelete}>
            Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
};

export default ProductRow;
