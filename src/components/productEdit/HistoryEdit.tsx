import React from "react";
import { IHistory } from "../interfaces/interfaces";
import { Card, Form, Row, Col, ListGroup, Button } from "react-bootstrap";

type PropsType = {
  title: string;
  id: string;
  history: IHistory[];
  units: string;
  action: any;
};

const HistoryEdit: React.FC<PropsType> = ({
  title,
  id,
  history,
  units,
  action,
}: PropsType): JSX.Element => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <Form onSubmit={action}>
            <Form.Group as={Row} className="w-100">
              <Form.Label column md="3">
                Current ({units})
              </Form.Label>
              <Col md="7">
                <Form.Control
                  placeholder={history[0].value.toString()}
                  type="text"
                  name="updatedValue"
                  data-id={id}
                />
              </Col>
              <Col md="2">
                <Button type="submit">Update</Button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Text>
      </Card.Body>
      <ListGroup variant="flush">
        {history.map((c: IHistory) => (
          <ListGroup.Item key={c.date}>
            {title}: {c.value} {units} (Updated:{" "}
            {new Date(c.date).toLocaleString()})
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default HistoryEdit;
