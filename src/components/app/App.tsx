import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../homePage/HomePage";
import ProductTable from "../productsTable/ProductsTable";
import ProducCreate from "../productCreate/ProductCreate";
import ProductPreview from "../productPreview/ProductPreview";
import ProductEdit from "../productEdit/ProductEdit";
import { Container } from "react-bootstrap";
import ToastsProvider from "../../context/ToastsProvider";
import Toasts from "../toasts/Toasts";
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

const WithNavBar = ({
  component: Component,
  ...rest
}: {
  exact: true;
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

const App: React.FC = () => {
  return (
    <Router>
      <ToastsProvider>
        <Toasts />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <WithNavBar exact path="/products" component={ProductTable} />
          <Route exact path="/products/create" component={ProducCreate} />
          <Route path="/products/:id/edit" component={ProductEdit} />
          <Route path="/products/:id" component={ProductPreview} />
        </Switch>
      </ToastsProvider>
    </Router>
  );
};

export default App;
