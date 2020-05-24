import React, { useState } from "react";
import { Toast } from "react-bootstrap";
import { delayToast } from "../interfaces/interfaces";
import { IToast } from "../interfaces/interfaces";

type PropsType = {
  key: number | undefined;
  toast: IToast;
};

const ToastCustom: React.FC<PropsType> = ({ key, toast }: PropsType) => {
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
          <strong className="mr-auto">{toast.title}</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>{toast.text}</Toast.Body>
      </Toast>
    </>
  );
};

export default ToastCustom;
