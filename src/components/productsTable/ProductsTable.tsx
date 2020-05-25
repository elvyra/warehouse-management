import React, { useState, useEffect, useContext } from "react";
import { currency, unit, IProduct, IHistory } from "../interfaces/interfaces";
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
import { ToastContext } from "../toasts/ToastsProvider";

// Used for receiving Price and Quantity input data
type InputData = {
  id: string;
  value: string;
};

const ProductsTable: React.FC = () => {
  const [items, setItems] = useState<IProduct[]>([]);
  const { saveToast } = useContext(ToastContext);

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
      saveToast({
        title: `Product (Product Id: ${id}) updated`,
        text: `Property "active" toggled successfully `,
      });
    }
  };

  // Handle item price update
  const handlePriceUpdate = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      let inputData: InputData = getInputData(event);
      let price: IHistory = {
        value: Number(inputData.value),
        date: Date.now(),
      };
      updateItems(updatePrice(inputData.id, price));
      saveToast({
        title: `Product (Id: ${inputData.id}) updated`,
        text: `Price updated successfully (${price.value} ${currency}) `,
      });
    }
  };

  // Handle item quantity update
  const handleQuantityUpdate = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      let inputData: InputData = getInputData(event);
      let quantity: IHistory = {
        value: Number(inputData.value),
        date: Date.now(),
      };
      updateItems(updateQuantity(inputData.id, quantity));
      saveToast({
        title: `Product (Id: ${inputData.id}) updated`,
        text: `Quantity updated successfully (${quantity.value} ${unit})`,
      });
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
      saveToast({
        title: `Product (Id: ${id}) deleted`,
        text: `Product deleted successfully`,
      });
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
