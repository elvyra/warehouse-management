import React, { useContext } from "react";
import ToastCustom from "./ToastCustom";
import { IToast } from "../interfaces/interfaces";
import { ToastContext } from "../toast/ToastsProvider";

const Toasts: React.FC = () => {
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
