import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

type PropsType = {
  id: string;
  title: string;
  text: string;
  action: any;
};

const ConfirmModal: React.FC<PropsType> = ({
  id,
  title,
  text,
  action,
}: PropsType): JSX.Element => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" data-id={id} onClick={action}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmModal;
