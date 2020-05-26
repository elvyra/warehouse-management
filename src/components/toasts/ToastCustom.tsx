import React, { useState } from "react";
import { Toast } from "react-bootstrap";
import {
  IToast,
  delayToast,
  ToastType,
  ToastTemplate,
} from "../interfaces/interfaces";

const Title = (template: ToastTemplate, text: string): string => {
  switch (template) {
    case ToastTemplate.created:
      return "New Product created";
    case ToastTemplate.updated:
      return `Product Id: ${text} updated`;
    case ToastTemplate.deleted:
      return `Product Id: ${text} deleted`;
    case ToastTemplate.seeded:
      return `Data seeding`;
    default:
      return "";
  }
};

const Text = (template: ToastTemplate, text?: string): string => {
  switch (template) {
    case ToastTemplate.created:
      return "Products created successfully";
    case ToastTemplate.updated:
      return `Product updated successflly. ${text ? text : ""}`;
    case ToastTemplate.deleted:
      return `Product deleted successflly. ${text ? text : ""}`;
    case ToastTemplate.seeded:
      return `Database successfully seeded with demo products.`;
    default:
      return "";
  }
};

type PropsType = {
  toast: IToast;
};

const ToastCustom: React.FC<PropsType> = ({
  toast,
}: PropsType): JSX.Element => {
  const [show, setShow] = useState<boolean>(true);

  return (
    <Toast
      show={show}
      onClose={() => setShow(false)}
      delay={delayToast}
      autohide
      className={`toast-${ToastType[toast.type]}`}
    >
      <Toast.Header>
        <strong className="mr-auto">
          {Title(toast.template, toast.title)}
        </strong>
        <small className="ml-2">{toast.time}</small>
      </Toast.Header>
      <Toast.Body>{Text(toast.template, toast.text)}</Toast.Body>
    </Toast>
  );
};

export default ToastCustom;
