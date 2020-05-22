import React from "react";
import { NavLink } from "react-router-dom";
import { IProduct, ProductType, ProductColor } from "../interfaces/interfaces";

type PropsType = {
  key?: string;
  item: IProduct;
};

const ProductRow: React.FC<PropsType> = ({ item }: PropsType) => {
  const handleChange = () => {};

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
          name="isActive"
          checked={item.active}
          id={item.id}
          onChange={handleChange}
        />
      </td>
      <td>
        <NavLink to={`/products/${item.id}`}>View</NavLink>
        <NavLink to={`/products/${item.id}/edit`}>Edit</NavLink>
        <span>Delete</span>
      </td>
    </tr>
  );
};

export default ProductRow;
