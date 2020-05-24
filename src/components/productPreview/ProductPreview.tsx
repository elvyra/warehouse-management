import React, { useState } from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import {
  IProduct,
  ProductType,
  ProductColor,
  IHistory,
} from "../interfaces/interfaces";
import { getItem } from "../localStorage/LocalStorage";
import { currency, unit, numberOfRecords } from "../interfaces/interfaces";
import { isNullOrUndefined } from "util";
import Highchart from "./Highchart";
import { Tab, Tabs, Card, CardDeck, ListGroup, Badge } from "react-bootstrap";

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
              <ListGroup className="mt-4 mb-4">
                <ListGroup.Item>
                  <b>Id: </b> {item.id}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Name: </b> {item.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>EAN: </b> {item.EAN}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Type: </b> {ProductType[item.type]}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Weight: </b> {item.weight}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Color: </b> {ProductColor[item.color]}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Active: </b> {item.active ? "active" : "not active"}
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
            </Tab>
            <Tab eventKey="price" title="Price history">
              <CardDeck className="mt-4 mb-4">
                <Card style={{ flex: "1 1" }}>
                  <Card.Body>
                    <Card.Title>Price history</Card.Title>
                    <Card.Text>
                      Last {numberOfRecords} entries are stored in database.
                    </Card.Text>
                  </Card.Body>
                  <ListGroup variant="flush">
                    {item.priceHistory.map((p: IHistory) => (
                      <ListGroup.Item>
                        {p.value} ({new Date(p.date).toLocaleString()})
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card>
                <Card style={{ flex: "2 1" }}>
                  <Highchart
                    title={"Price history"}
                    subtitle={`Product name: ${item.name} (EAN: ${item.EAN})`}
                    xAxisTitle="Date and time"
                    xAxisCategories={item.priceHistory
                      .map((c) => new Date(c.date).toLocaleString())
                      .reverse()}
                    yAxisTitle="Price"
                    yAxisUnits={currency}
                    data={item.priceHistory.map((c) => c.value).reverse()}
                  />
                </Card>
              </CardDeck>
            </Tab>
            <Tab eventKey="quantity" title="Quantity history">
              <CardDeck className="mt-4 mb-4">
                <Card style={{ flex: "1 1" }}>
                  <Card.Body>
                    <Card.Title>Quantity history</Card.Title>
                    <Card.Text>
                      Last {numberOfRecords} entries are stored in database.
                    </Card.Text>
                  </Card.Body>
                  <ListGroup variant="flush">
                    {item.quantityHistory.map((p: IHistory) => (
                      <ListGroup.Item>
                        {p.value} ({new Date(p.value).toLocaleString()})
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card>
                <Card style={{ flex: "2 1" }}>
                  <Highchart
                    title={"Quantity history"}
                    subtitle={`Product name: ${item.name} (EAN: ${item.EAN})`}
                    xAxisTitle="Date and time"
                    xAxisCategories={item.quantityHistory
                      .map((c) => new Date(c.date).toLocaleString())
                      .reverse()}
                    yAxisTitle="Quantity"
                    yAxisUnits={unit}
                    data={item.quantityHistory.map((c) => c.value).reverse()}
                  />
                </Card>
              </CardDeck>
            </Tab>
          </Tabs>
          <NavLink to="/products">Back to list</NavLink>
        </>
      )}
    </>
  );
};

export default ProductsPreview;
