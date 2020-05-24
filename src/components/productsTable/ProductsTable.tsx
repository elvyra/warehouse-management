import React, { useState, useEffect } from "react";
import {
  currency,
  unit,
  IProduct,
  IPriceHistory,
  IQuantityHistory,
} from "../interfaces/interfaces";
import {
  getData,
  toggleActive,
  updatePrice,
  updateQuantity,
  deteleFromList,
} from "../localStorage/LocalStorage";
import { isNullOrUndefined } from "util";
import ProductRow from "./ProductRow";
import { Table } from "react-bootstrap";

// Used for receiving Price and Quantity input data
type InputData = {
  id: string;
  value: string;
};

const ProductsTable: React.FC = () => {
  const [items, setItems] = useState<IProduct[]>([]);

  useEffect(() => {
    let list: IProduct[] = getData();
    if (list.length > 0) setItems(list);
  }, []);

  // Gets data from input data-id attribute and value and returns as tuple InputData = { id, value }

  const getInputData = (event: React.KeyboardEvent): InputData => {
    let id:
      | string
      | undefined = ((event.currentTarget as unknown) as HTMLInputElement)
      .dataset.id;
    let value:
      | string
      | undefined = ((event.currentTarget as unknown) as HTMLInputElement)
      .value;
    return {
      id: isNullOrUndefined(id) ? "" : id,
      value: isNullOrUndefined(value) ? "" : value,
    };
  };

  // Updates items list (useState hook) with new item info
  const updateItems = (item: IProduct | null | undefined) => {
    if (!isNullOrUndefined(item)) {
      let oldItem: IProduct | undefined = items.find((p) => p.id === item.id);
      if (!isNullOrUndefined(oldItem)) {
        let list: IProduct[] = items;
        list.splice(items.indexOf(oldItem), 1, item);
        setItems(list);
      }
    }
  };

  // Deletes item from items list (useState hook)
  const deleteItem = (item: IProduct | null | undefined) => {
    if (!isNullOrUndefined(item)) {
      console.log(item.id);
      let list: IProduct[] = items.slice();
      let itemInList = items.find((p) => p.id === item.id);
      if (!isNullOrUndefined(itemInList)) {
        list.splice(items.indexOf(itemInList), 1);
        setItems(list);
      }
    }
  };

  // Handle item toggle active
  const handleActiveChange = (event: any) => {
    let id:
      | string
      | undefined = ((event.currentTarget as unknown) as HTMLInputElement)
      .dataset.id;
    if (!isNullOrUndefined(id)) {
      updateItems(toggleActive(id));
    }
  };

  // Handle item price update
  const handlePriceUpdate = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      let inputData: InputData = getInputData(event);
      let price: IPriceHistory = {
        price: Number(inputData.value),
        date: Date.now(),
      };
      updateItems(updatePrice(inputData.id, price));
    }
  };

  // Handle item quantity update
  const handleQuantityUpdate = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      let inputData: InputData = getInputData(event);
      let quantity: IQuantityHistory = {
        quantity: Number(inputData.value),
        date: Date.now(),
      };
      updateItems(updateQuantity(inputData.id, quantity));
    }
  };

  // Handle item delete
  const handleDelete = (event: any) => {
    let id:
      | string
      | undefined = ((event.currentTarget as unknown) as HTMLInputElement)
      .dataset.id;
    if (!isNullOrUndefined(id)) {
      deleteItem(deteleFromList(id));
    }
  };

  return (
    <>
      {items.length === 0 ? (
        <p>No products found</p>
      ) : (
        <>
          <h3>Products Table</h3>
          <Table hover responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>EAN</th>
                <th>Type</th>
                <th>Weight</th>
                <th>Color</th>
                <th>Active</th>
                <th>Price, {currency}</th>
                <th>Quantity, {unit}</th>
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
          </Table>
        </>
      )}
    </>
  );
};

export default ProductsTable;
