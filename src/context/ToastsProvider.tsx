import React, { useState } from "react";
import AppContext from "./ToastsContext";
import {
  IToast,
  ToastType,
  ToastTemplate,
  currentTime,
} from "../components/interfaces/interfaces";

type PropsType = {
  children: any;
};

const ToastsProvider: React.FC<PropsType> = ({
  children,
}: PropsType): JSX.Element => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const saveToast = (
    type: ToastType,
    template: ToastTemplate,
    id: string,
    text?: string
  ): void => {
    const newToast: IToast = {
      id: Math.random(), // for testing only
      type: type,
      template: template,
      title: id,
      text: text ? text : "",
      time: currentTime(),
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
