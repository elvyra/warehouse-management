import React, { useState, useEffect, useContext } from "react";
import {
  currency,
  unit,
  weight,
  IProduct,
  ToastType,
  ToastTemplate,
} from "../interfaces/interfaces";
import {
  getData,
  toggleActive,
  deteleFromList,
} from "../localStorage/LocalStorage";
import { isNullOrUndefined } from "util";
import ProductRow from "./ProductRow";
import { Table, Card } from "react-bootstrap";
import ToastsContext from "../../context/ToastsContext";

const ProductsTable: React.FC = () => {
  const [items, setItems] = useState<IProduct[]>([]);
  const { saveToast } = useContext(ToastsContext);

  useEffect(() => {
    let list: IProduct[] = getData();
    if (list.length > 0) setItems(list);
  }, []);

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
      let itemInList: IProduct | undefined = items.find(
        (p) => p.id === item.id
      );
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
      saveToast(ToastType.success, ToastTemplate.updated, id);
    }
  };

  // Handle item delete
  const handleDelete = (id: string) => {
    console.log(id);
    if (!isNullOrUndefined(id)) {
      deleteItem(deteleFromList(id));
      saveToast(ToastType.danger, ToastTemplate.deleted, id);
    }
  };

  return (
    <>
      {items.length <= 0 ? (
        <p>No products found</p>
      ) : (
        <Card>
          <Card.Body>
            <Card.Title>Products List</Card.Title>
            <Table hover responsive>
              <thead>
                <tr>
                  <th hidden>Id</th>
                  <th>Active</th>
                  <th>Name</th>
                  <th>EAN</th>
                  <th>Weight, {weight}</th>
                  <th>Type</th>
                  <th>Color</th>
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
                    handleDelete={handleDelete}
                  />
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default ProductsTable;
