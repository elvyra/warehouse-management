import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductTable from "../productsTable/ProductsTable";
import ProducCreate from "../productCreate/ProductCreate";
import ProductPreview from "../productPreview/ProductPreview";
import ProductEdit from "../productEdit/ProductEdit";

const App: React.FC = () => {
  return (
    <Router>
      <h1>Warehouse management</h1>
      <Switch>
        <Route exact path="/products" component={ProductTable} />
        <Route exact path="/products/create" component={ProducCreate} />
        <Route path="/products/:id/edit" component={ProductEdit} />
        <Route path="/products/:id" component={ProductPreview} />
      </Switch>
    </Router>
  );
};

export default App;
