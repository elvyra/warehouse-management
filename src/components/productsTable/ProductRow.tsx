import React from "react";
import { NavLink } from "react-router-dom";
import { IProduct, ProductType, ProductColor } from "../interfaces/interfaces";

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
        <input
          type="checkbox"
          name="active"
          defaultChecked={item.active}
          data-id={item.id}
          onChange={handleActiveChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="price"
          data-id={item.id}
          defaultValue={item.priceHistory[0].price}
          onKeyUp={handlePriceUpdate}
        />
      </td>
      <td>
        <input
          type="text"
          name="quantity"
          data-id={item.id}
          defaultValue={item.quantityHistory[0].quantity}
          onKeyUp={handleQuantityUpdate}
        />
      </td>
      <td>
        <NavLink to={`/products/${item.id}`}>View</NavLink>
        <NavLink to={`/products/${item.id}/edit`}>Edit</NavLink>
        <span data-id={item.id} onClick={handleDelete}>
          Delete
        </span>
      </td>
    </tr>
  );
};

export default ProductRow;
