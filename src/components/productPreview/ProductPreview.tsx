import React from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import {
  IProduct,
  ProductType,
  ProductColor,
  IPriceHistory,
  IQuantityHistory,
} from "../interfaces/interfaces";
import { getData } from "../localStorage/LocalStorage";
import { isNullOrUndefined } from "util";
import Highchart from "./Highchart";

interface PropsType extends RouteComponentProps {
  id: string;
}

const ProductsPreview: React.FC<PropsType> = (props: PropsType) => {
  let id: string = (props.match.params as PropsType).id;
  let items: IProduct[] = getData();
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
        <Highchart
          title={"Price history"}
          subtitle={`Product name: ${item.name} (EAN: ${item.EAN})`}
          xAxisTitle="Date and time"
          xAxisCategories={item.priceHistory
            .map((c) => new Date(c.date).toLocaleString())
            .reverse()}
          yAxisTitle="Price"
          data={item.priceHistory.map((c) => c.price).reverse()}
        />
        <p>
          <b>Price history:</b>
        </p>
        {item.priceHistory.map((p: IPriceHistory) => (
          <p>
            {p.price} ({new Date(p.date).toLocaleString()})
          </p>
        ))}
        <Highchart
          title={"Quantity history"}
          subtitle={`Product name: ${item.name} (EAN: ${item.EAN})`}
          xAxisTitle="Date and time"
          xAxisCategories={item.quantityHistory
            .map((c) => new Date(c.date).toLocaleString())
            .reverse()}
          yAxisTitle="Quantity"
          data={item.quantityHistory.map((c) => c.quantity).reverse()}
        />
        <p>
          <b>Quantity history:</b>
        </p>
        {item.quantityHistory.map((p: IQuantityHistory) => (
          <p>
            {p.quantity} ({new Date(p.date).toLocaleString()})
          </p>
        ))}
        <NavLink to="/products">Back to list</NavLink>
      </>
    );
};

export default ProductsPreview;
