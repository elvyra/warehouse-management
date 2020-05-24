import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../homePage/HomePage";
import ProductTable from "../productsTable/ProductsTable";
import ProducCreate from "../productCreate/ProductCreate";
import ProductPreview from "../productPreview/ProductPreview";
import ProductEdit from "../productEdit/ProductEdit";
import { Container } from "react-bootstrap";
import ToastsProvider from "../toast/ToastsProvider";
import Toasts from "../toast/Toasts";

const App: React.FC = () => {
  return (
    <Router>
      <ToastsProvider>
        <Container>
          <h1>Warehouse management</h1>
          <Toasts />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/products" component={ProductTable} />
            <Route exact path="/products/create" component={ProducCreate} />
            <Route path="/products/:id/edit" component={ProductEdit} />
            <Route path="/products/:id" component={ProductPreview} />
          </Switch>
        </Container>
      </ToastsProvider>
    </Router>
  );
};

export default App;
