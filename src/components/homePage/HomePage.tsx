import React from "react";
import { Container, Button } from "react-bootstrap";
import dataSeed from "../dataSeed/dataSeed";

const HomePage: React.FC = (): JSX.Element => {
  const handleClick = (event: any) => {
    dataSeed();
  };

  return (
    <Container>
      <Button onClick={handleClick}>Seed Data</Button>
    </Container>
  );
};

export default HomePage;
