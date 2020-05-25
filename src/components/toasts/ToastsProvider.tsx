import React, { createContext, useState } from "react";
import { IToast } from "../interfaces/interfaces";

export const ToastContext = createContext<any>([]);

type PropsType = {
  children: any;
};

const ToastsProvider: React.FC<PropsType> = ({ children }: PropsType) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

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
