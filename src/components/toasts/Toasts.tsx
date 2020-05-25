import React, { useContext } from "react";
import Toast from "./ToastCustom";
import { IToast } from "../interfaces/interfaces";
import { ToastContext } from "./ToastsProvider";

const Toasts: React.FC = (): JSX.Element => {
  const { toasts } = useContext<{ toasts: IToast[] }>(ToastContext);

  return (
    <div className="toast-top-right">
      {toasts.map((toast: IToast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default Toasts;
