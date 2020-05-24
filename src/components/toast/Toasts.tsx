import React, { useState, useContext } from "react";
import ToastCustom from "./ToastCustom";
import { IToast } from "../interfaces/interfaces";
import { ToastContext } from "../toast/ToastsProvider";

const Toasts: React.FC = () => {
  /* const [toasts, setToasts] = useState<IToast[]>([
    { id: 1, title: "post 1", text: "Quisque cursus, metus vitae pharetra" },
    { id: 2, title: "post 2", text: "Quisque cursus, metus vitae pharetra" },
  ]);*/

  const { toasts } = useContext(ToastContext);

  return (
    <div className="toast-top-right">
      {toasts.map((toast: IToast) => (
        <ToastCustom key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default Toasts;
