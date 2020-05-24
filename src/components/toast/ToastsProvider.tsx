import React, { createContext, useState } from "react";
import { IToast } from "../interfaces/interfaces";

export const ToastContext = createContext<any>([]);

type PropsType = {
  children: any;
};

const ToastsProvider: React.FC<PropsType> = ({ children }: PropsType) => {
  const [toasts, setToasts] = useState<IToast[]>([
    { id: 1, title: "post 1", text: "Quisque cursus, metus vitae pharetra" },
    { id: 2, title: "post 2", text: "Quisque cursus, metus vitae pharetra" },
  ]);

  const saveToast = (toast: IToast) => {
    const newToast: IToast = {
      id: Math.random(), // for testing only
      title: toast.title,
      text: toast.text,
    };
    console.log(newToast);
    setToasts([...toasts, newToast]);
  };

  return (
    <ToastContext.Provider value={{ toasts, saveToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastsProvider;
