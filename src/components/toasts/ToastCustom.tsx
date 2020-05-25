import React, { useState } from "react";
import { Toast } from "react-bootstrap";
import { delayToast } from "../interfaces/interfaces";
import { IToast } from "../interfaces/interfaces";
import { isNullOrUndefined } from "util";

type PropsType = {
  toast: IToast;
};

const ToastCustom: React.FC<PropsType> = ({ toast }: PropsType) => {
  const [show, setShow] = useState(true);

  return (
    <>
      <Toast
        show={show}
        onClose={() => setShow(false)}
        delay={delayToast}
        autohide
        className="toast-success"
      >
        <Toast.Header>
          <strong className="mr-auto">{toast.title}</strong>
          <small>
            {toast.subtitle}
            {!isNullOrUndefined(toast.subtitle) ? toast.subtitle : ""}
          </small>
        </Toast.Header>
        <Toast.Body>{toast.text}</Toast.Body>
      </Toast>
    </>
  );
};

export default ToastCustom;
