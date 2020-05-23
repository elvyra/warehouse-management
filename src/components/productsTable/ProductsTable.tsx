import React, { useState, useEffect } from "react";
import {
  IProduct,
  IPriceHistory,
  IQuantityHistory,
  numberOfRecords,
} from "../interfaces/interfaces";
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
      (p) =>
        p.id ===
        ((event.currentTarget as unknown) as HTMLInputElement).dataset.id
    );
    if (!isNullOrUndefined(item)) {
      item.active = !item.active;
      let list: IProduct[] = items;
      list.splice(items.indexOf(item), 1, item);
      SaveData(list);
      setItems(list);
    }
  };

  const getInputData = (event: React.KeyboardEvent) => {
    return {
      itemId: ((event.currentTarget as unknown) as HTMLInputElement).dataset.id,
      value: ((event.currentTarget as unknown) as HTMLInputElement).value,
    };
  };

  const handlePriceUpdate = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      let inputData = getInputData(event);
      let item: IProduct | undefined = items.find(
        (p) => p.id === inputData.itemId
      );
      let price: IPriceHistory = {
        price: Number(inputData.value),
        date: Date.now(),
      };
      let list: IProduct[] = items;
      item!.priceHistory.unshift(price);
      if (item!.priceHistory.length > numberOfRecords)
        item!.priceHistory.length = numberOfRecords;
      list.splice(items.indexOf(item!), 1, item!);
      SaveData(list);
      setItems(list);
    }
  };

  const handleQuantityUpdate = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      let inputData = getInputData(event);
      let item: IProduct | undefined = items.find(
        (p) => p.id === inputData.itemId
      );
      let quantity: IQuantityHistory = {
        quantity: Number(inputData.value),
        date: Date.now(),
      };
      let list: IProduct[] = items;
      item!.quantityHistory.unshift(quantity);
      if (item!.quantityHistory.length > numberOfRecords)
        item!.quantityHistory.length = numberOfRecords;
      list.splice(items.indexOf(item!), 1, item!);
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
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <ProductRow
                  key={item.id}
                  item={item}
                  handleActiveChange={handleActiveChange}
                  handlePriceUpdate={handlePriceUpdate}
                  handleQuantityUpdate={handleQuantityUpdate}
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
