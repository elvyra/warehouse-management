import React from "react";
import { NavLink } from "react-router-dom";
import { IProduct, ProductType, ProductColor } from "../interfaces/interfaces";
import { Button, Form } from "react-bootstrap";

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
    <tr>
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
          defaultValue={item.priceHistory[0].price}
          onKeyUp={handlePriceUpdate}
        />
      </td>
      <td>
        <Form.Control
          type="number"
          name="quantity"
          min="0"
          data-id={item.id}
          defaultValue={item.quantityHistory[0].quantity}
          onKeyUp={handleQuantityUpdate}
        />
      </td>
      <td>
        <NavLink
          to={`/products/${item.id}`}
          className="mr-2 btn btn-outline-primary"
        >
          View
        </NavLink>
        <NavLink
          to={`/products/${item.id}/edit`}
          className="mr-2 btn btn-outline-secondary"
        >
          Edit
        </NavLink>
        <Button variant="danger" data-id={item.id} onClick={handleDelete}>
          Danger
        </Button>
      </td>
    </tr>
  );
};

export default ProductRow;
