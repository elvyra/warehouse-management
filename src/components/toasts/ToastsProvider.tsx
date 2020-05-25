import React, { createContext, useState } from "react";
import { IToast } from "../interfaces/interfaces";

export const ToastContext = createContext<any>([]);

type PropsType = {
  children: any;
};

const ToastsProvider: React.FC<PropsType> = ({
  children,
}: PropsType): JSX.Element => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const saveToast = (toast: IToast): void => {
    const newToast: IToast = {
      id: Math.random(), // for testing only
      type: toast.type,
      title: toast.title,
      text: toast.text,
    };
    setToasts([...toasts, newToast]);
  };

  return (
    <ToastContext.Provider value={{ toasts, saveToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastsProvider;
