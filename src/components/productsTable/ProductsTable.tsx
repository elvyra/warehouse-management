import React, { useState, useEffect } from "react";
import { IProduct } from "../interfaces/interfaces";
import { GetData } from "../localStorage/LocalStorage";
import { isNull } from "util";
import ProductRow from "./ProductRow";

const ProductsTable: React.FC = () => {
  const [products, setProducts] = useState<IProduct[] | null>(null);

  useEffect(() => {
    let list: IProduct[] = GetData();
    if (list.length > 0) setProducts(list);
  }, []);

  return (
    <>
      {isNull(products) ? (
        <p>No products found</p>
      ) : (
        <>
          <h1>Products Table</h1>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>EAN</th>
                <th>Type</th>
                <th>Weight</th>
                <th>Color</th>
                <th>Active</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <ProductRow key={product.id} item={product} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default ProductsTable;
