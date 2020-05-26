import React, { useState } from "react";
import { IHistory } from "../interfaces/interfaces";
import { Card, Form, Row, Col, ListGroup, Button } from "react-bootstrap";
import ConfirmModal from "../confirmModal/ConfirmModal";

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
  const [value, setValue] = useState<number>(history[0].value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.currentTarget.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    action(id, value, title);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Form
          onSubmit={handleSubmit}
          data-action={title}
          data-id={id}
          data-value={value}
        >
          <Form.Group as={Row} className="w-100">
            <Form.Label column md="3">
              Current ({units})
            </Form.Label>
            <Col md="7">
              <Form.Control
                value={value}
                type="number"
                name="updatedValue"
                data-id={id}
                onChange={handleChange}
              />
            </Col>
            <Col md="2">
              {value > 0 ? (
                <Button type="submit">Update</Button>
              ) : (
                <ConfirmModal
                  id={id ? id : ""}
                  title={`${title} update`}
                  text={`Current ${title.toLowerCase()} value will be set to ${value}. Are you sure?`}
                  action={() => {
                    action(id, value, title);
                  }}
                  actionTitle="Update"
                />
              )}
            </Col>
          </Form.Group>
        </Form>
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
