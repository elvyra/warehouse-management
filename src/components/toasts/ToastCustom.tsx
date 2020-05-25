import React, { useState } from "react";
import { Toast } from "react-bootstrap";
import { IToast, delayToast, ToastType } from "../interfaces/interfaces";

type PropsType = {
  toast: IToast;
};

const ToastCustom: React.FC<PropsType> = ({ toast }: PropsType) => {
  const [show, setShow] = useState(true);

  return (
    <Toast
      show={show}
      onClose={() => setShow(false)}
      delay={delayToast}
      autohide
      className={`toast-${ToastType[toast.type]}`}
    >
      <Toast.Header>
        <strong className="mr-auto">{toast.title}</strong>
      </Toast.Header>
      <Toast.Body>{toast.text}</Toast.Body>
    </Toast>
  );
};

export default ToastCustom;
