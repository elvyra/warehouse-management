import React, { useState } from "react";
import AppContext from "./ToastsContext";
import { IToast } from "../components/interfaces/interfaces";

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
    <AppContext.Provider value={{ toasts, saveToast }}>
      {children}
    </AppContext.Provider>
  );
};

export default ToastsProvider;
