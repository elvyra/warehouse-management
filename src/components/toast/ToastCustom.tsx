import React, { useState } from "react";
import { Toast } from "react-bootstrap";
import { delayToast } from "../interfaces/interfaces";

const ToastCustom: React.FC<any> = () => {
  const [show, setShow] = useState(true);

  return (
    <>
      <Toast
        show={show}
        onClose={() => setShow(false)}
        delay={delayToast}
        autohide
        className="toast-top-right"
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
      </Toast>
    </>
  );
};

export default ToastCustom;
