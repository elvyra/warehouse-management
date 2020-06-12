import React from "react";
import { IHistory } from "../interfaces/interfaces";
import { numberOfRecords } from "../interfaces/interfaces";
import Highchart from "./Highchart";
import { Card, CardDeck, ListGroup } from "react-bootstrap";

type PropsType = {
  title: string;
  itemName: string;
  itemEAN: string;
  units: string;
  data: IHistory[];
};

const HistoryPreview: React.FC<PropsType> = ({
  title,
  itemName,
  itemEAN,
  units,
  data,
}: PropsType) => {
  return (
    <CardDeck className="mt-4 mb-4">
      <Card style={{ flex: "1 1" }}>
        <Card.Body>
          <Card.Title>{title} history</Card.Title>
          <Card.Text>
            Last {numberOfRecords} entries are stored in database.
          </Card.Text>
        </Card.Body>
        <ListGroup variant="flush">
          {data.map((p: IHistory) => (
            <ListGroup.Item>
              {p.value} ({new Date(p.date).toLocaleString()})
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
      <Card style={{ flex: "2 1" }}>
        <Highchart
          title={`${title} history`}
          subtitle={`Product name: ${itemName} (EAN: ${itemEAN})`}
          xAxisTitle="Date and time"
          xAxisCategories={data
            .map((c) => new Date(c.date).toLocaleString())
            .reverse()}
          yAxisTitle={title}
          yAxisUnits={units}
          data={data.map((c) => c.value).reverse()}
        />
      </Card>
    </CardDeck>
  );
};

export default HistoryPreview;
