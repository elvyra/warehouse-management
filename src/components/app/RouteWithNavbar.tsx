import React from "react";
import { Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "../navbar/Navbar";
import "../../scss/_layout.scss";

const WithNavbarLayout = (props: any) => {
  return (
    <>
      <aside>
        <NavBar />
      </aside>
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
