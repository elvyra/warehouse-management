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
import Navbar from "../navbar/Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <ToastsProvider>
        <Toasts />
        <Navbar />
        <Container>
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
