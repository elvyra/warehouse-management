import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import dataSeed from "../dataSeed/dataSeed";
import ToastsContext from "../../context/ToastsContext";
import { ToastType, ToastTemplate } from "../interfaces/interfaces";

const HomePage: React.FC = (): JSX.Element => {
  const { saveToast } = useContext(ToastsContext);

  const handleClick = (event: any) => {
    dataSeed();
    saveToast(ToastType.success, ToastTemplate.seeded);
  };

  return (
    <>
      <Button onClick={handleClick}>Seed Data</Button>
      <NavLink to="/products" className="navbar-brand">
        Warehouse management
      </NavLink>
    </>
  );
};

export default HomePage;
