import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  IProduct,
  ProductType,
  ProductColor,
  unit,
} from "../interfaces/interfaces";
import { Button, ButtonGroup, Form, Modal, ListGroup } from "react-bootstrap";

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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <tr className={item.quantityHistory[0].value <= 0 ? "highlight" : ""}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.EAN}</td>
      <td>{ProductType[item.type]}</td>
      <td>{item.weight}</td>
      <td>{ProductColor[item.color]}</td>
      <td>
        <Form.Check
          type="checkbox"
          name="active"
          defaultChecked={item.active}
          data-id={item.id}
          onChange={handleActiveChange}
        />
      </td>
      <td>{item.priceHistory[0].value}</td>
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
            className="btn btn-outline-secondary"
          >
            Edit
          </NavLink>
          <Button variant="danger" data-id={item.id} onClick={handleShow}>
            Delete
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Product will be deleted</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
              {item.id} {item.name} {item.EAN} {item.quantityHistory[0].value}
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
                  <b>In stock: </b> {item.quantityHistory[0].value} {unit}
                </ListGroup.Item>
              </ListGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="danger"
                /* onClick={() =>
                  // handleClose();
                  handleDelete
                } */
                data-id={item.id}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </ButtonGroup>
      </td>
    </tr>
  );
};

export default ProductRow;
