import React from "react";
import { NavLink } from "react-router-dom";
import {
  IProduct,
  ProductType,
  ProductColor,
  unit,
} from "../interfaces/interfaces";
import { ButtonGroup, Form } from "react-bootstrap";
import ConfirmModal from "../confirmModal/ConfirmModal";

type PropsType = {
  key?: string;
  item: IProduct;
  handleActiveChange: any;
  handleDelete: any;
};

const ProductRow: React.FC<PropsType> = ({
  item,
  handleActiveChange,
  handleDelete,
}: PropsType) => {
  return (
    <tr className={item.quantityHistory[0].value <= 0 ? "highlight" : ""}>
      <td hidden>{item.id}</td>
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
        <NavLink to={`/products/${item.id}`}>{item.name}</NavLink>
      </td>
      <td>{item.EAN}</td>
      <td>{item.weight.toFixed(3)}</td>
      <td>{ProductType[item.type]}</td>
      <td>{ProductColor[item.color]}</td>
      <td>{item.priceHistory[0].value.toFixed(2)}</td>
      <td>{item.quantityHistory[0].value}</td>
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
            className="btn btn-outline-primary"
          >
            Edit
          </NavLink>
          <ConfirmModal
            id={item.id ? item.id : ""}
            title={`Deleting product "${item.name}"`}
            text={`Product Id: ${item.id}, in stock ${item.quantityHistory[0].value} ${unit}. Are you sure?`}
            action={() => handleDelete(item.id)}
            actionTitle="Delete"
          />
        </ButtonGroup>
      </td>
    </tr>
  );
};

export default ProductRow;
