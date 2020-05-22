import React from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import {
  IProduct,
  ProductType,
  ProductColor,
  IPriceHistory,
} from "../interfaces/interfaces";
import { GetData } from "../localStorage/LocalStorage";
import { isNullOrUndefined } from "util";

interface PropsType extends RouteComponentProps {
  id: string;
}

const ProductsPreview: React.FC<PropsType> = (props: PropsType) => {
  let id: string = (props.match.params as PropsType).id;
  let items: IProduct[] = GetData();
  let item: IProduct | undefined = items.find((p) => p.id === id);

  if (isNullOrUndefined(item)) return <p>Product not found</p>;
  else
    return (
      <>
        <p>
          <b>Id: </b> {item.id}
        </p>
        <p>
          <b>Name: </b> {item.name}
        </p>
        <p>
          <b>EAN: </b> {item.EAN}
        </p>
        <p>
          <b>Type: </b> {ProductType[item.type]}
        </p>
        <p>
          <b>Weight: </b> {item.weight}
        </p>
        <p>
          <b>Color: </b> {ProductColor[item.color]}
        </p>
        <p>
          <b>Active: </b> {item.active ? "active" : "not active"}
        </p>
        <p>
          <b>Price history:</b>
        </p>
        {item.priceHistory.map((p: IPriceHistory) => (
          <p>
            {p.price} ({new Date(p.date).toLocaleString()})
          </p>
        ))}
        <NavLink to="/products">Back to list</NavLink>
      </>
    );
};

export default ProductsPreview;
