import React, { useState } from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { IProduct, ProductType, ProductColor } from "../interfaces/interfaces";
import { getItem } from "../localStorage/LocalStorage";
import { currency, unit } from "../interfaces/interfaces";
import { isNullOrUndefined } from "util";
import HistoryPreview from "./HistoryPreview";
import { Tab, Tabs, ListGroup, Badge, Card } from "react-bootstrap";

interface MatchParams {
  id: string;
}
interface PropsType extends RouteComponentProps<MatchParams> {}

const ProductsPreview: React.FC<PropsType> = (props: PropsType) => {
  const [key, setKey] = useState("details");

  let item: IProduct | null | undefined = getItem(props.match.params.id);

  return (
    <>
      {isNullOrUndefined(item) ? (
        <p>Product not found</p>
      ) : (
        <>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k: string) => setKey(k)}
          >
            <Tab eventKey="details" title="Product details">
              <Card className="mt-4 mb-4">
                <Card.Body>
                  <Card.Title>
                    <b>Name: </b> {item.name}
                  </Card.Title>
                  <Card.Subtitle>
                    <b>Id: </b> {item.id}
                  </Card.Subtitle>
                </Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <b>Active: </b> {item.active ? "active" : "not active"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>EAN: </b> {item.EAN}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Weight: </b> {item.weight}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Type: </b> {ProductType[item.type]}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Color: </b> {ProductColor[item.color]}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Price: </b> {item.priceHistory[0].value} {currency}
                    {item.priceHistory[0].value <= 0 ? (
                      <Badge variant="warning" className="ml-2">
                        Price inaccuracy
                      </Badge>
                    ) : (
                      <></>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Quantity: </b> {item.quantityHistory[0].value} {unit}
                    {item.quantityHistory[0].value === 0 ? (
                      <Badge variant="warning" className="ml-2">
                        No in stock
                      </Badge>
                    ) : (
                      <></>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Tab>
            <Tab eventKey="price" title="Price history">
              <HistoryPreview
                title="Price"
                itemName={item.name}
                itemEAN={item.EAN}
                units={currency}
                data={item.priceHistory}
              />
            </Tab>
            <Tab eventKey="quantity" title="Quantity history">
              <HistoryPreview
                title="Quantity"
                itemName={item.name}
                itemEAN={item.EAN}
                units={unit}
                data={item.quantityHistory}
              />
            </Tab>
          </Tabs>
          <NavLink to={`/products/${item.id}/edit`} className="btn btn-primary">
            Edit
          </NavLink>
          <NavLink to="/products" className="btn btn-link mr-4">
            Back to list
          </NavLink>
        </>
      )}
    </>
  );
};

export default ProductsPreview;
