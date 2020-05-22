import React, { useState, useEffect } from "react";
import { IProduct } from "../interfaces/interfaces";
import { GetData, SaveData } from "../localStorage/LocalStorage";
import { isNullOrUndefined } from "util";
import ProductRow from "./ProductRow";

const ProductsTable: React.FC = () => {
  const [items, setItems] = useState<IProduct[]>([]);

  useEffect(() => {
    let list: IProduct[] = GetData();
    if (list.length > 0) setItems(list);
  }, []);

  const handleActiveChange = (event: any) => {
    let item: IProduct | undefined = items.find(
      (p) => p.id === event.currentTarget.id
    );
    if (!isNullOrUndefined(item)) {
      item.active = !item.active;
      let list: IProduct[] = items;
      list.splice(items.indexOf(item), 1, item);
      SaveData(list);
      setItems(list);
    }
  };

  const handleDelete = (event: any) => {
    let item: IProduct | undefined = items.find(
      (p) => p.id === event.currentTarget.id
    );
    if (!isNullOrUndefined(item)) {
      let list: IProduct[] = items.slice(0);
      list.splice(items.indexOf(item), 1);
      setItems(list);
      SaveData(list);
    }
  };

  return (
    <>
      {items.length === 0 ? (
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
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <ProductRow
                  key={item.id}
                  item={item}
                  handleActiveChange={handleActiveChange}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default ProductsTable;
