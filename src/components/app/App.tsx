import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../homePage/HomePage";
import ProductTable from "../productsTable/ProductsTable";
import ProducCreate from "../productCreate/ProductCreate";
import ProductPreview from "../productPreview/ProductPreview";
import ProductEdit from "../productEdit/ProductEdit";
import ToastsProvider from "../../context/ToastsProvider";
import Toasts from "../toasts/Toasts";
import RouteWithNavBar from "./RouteWithNavbar";

const App: React.FC = () => {
  return (
    <Router>
      <ToastsProvider>
        <Toasts />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <RouteWithNavBar exact path="/products" component={ProductTable} />
          <RouteWithNavBar
            exact
            path="/products/create"
            component={ProducCreate}
          />
          <RouteWithNavBar path="/products/:id/edit" component={ProductEdit} />
          <RouteWithNavBar path="/products/:id" component={ProductPreview} />
        </Switch>
      </ToastsProvider>
    </Router>
  );
};

export default App;
