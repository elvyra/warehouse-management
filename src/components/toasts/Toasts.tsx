import React, { useContext } from "react";
import Toast from "./ToastCustom";
import { IToast } from "../interfaces/interfaces";
import AppContext from "../app/AppContext";

const Toasts: React.FC = (): JSX.Element => {
  const { toasts } = useContext<{ toasts: IToast[] }>(AppContext);

  return (
    <div className="toast-top-right">
      {toasts.map((toast: IToast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default Toasts;
