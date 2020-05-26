import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import dataSeed from "../dataSeed/dataSeed";

const HomePage: React.FC = (): JSX.Element => {
  const handleClick = (event: any) => {
    dataSeed();
  };

  return (
    <Container>
      <Button onClick={handleClick}>Seed Data</Button>
      <NavLink to="/products" className="navbar-brand">
        Warehouse management
      </NavLink>
    </Container>
  );
};

export default HomePage;
