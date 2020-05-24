import React, { useState } from "react";
import ToastCustom from "./ToastCustom";
import { IToast } from "../interfaces/interfaces";

const Toasts: React.FC = () => {
  const [toasts, setToasts] = useState<IToast[]>([
    { id: 1, title: "post 1", text: "Quisque cursus, metus vitae pharetra" },
    { id: 2, title: "post 2", text: "Quisque cursus, metus vitae pharetra" },
  ]);

  return (
    <div className="toast-top-right">
      {toasts.map((toast: IToast) => (
        <ToastCustom key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default Toasts;
