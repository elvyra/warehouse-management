import React from "react";
import { Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "../navbar/Navbar";

const WithNavbarLayout = (props: any) => {
  return (
    <>
      <NavBar />
      <main>
        <Container>{props.children}</Container>
      </main>
    </>
  );
};

const RouteWithNavBar = ({
  component: Component,
  ...rest
}: {
  exact?: any;
  path: string;
  component: any;
}) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <WithNavbarLayout>
          <Component {...props} />
        </WithNavbarLayout>
      )}
    />
  );
};

export default RouteWithNavBar;
