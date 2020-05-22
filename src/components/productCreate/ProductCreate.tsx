import React from "react";
import ProductForm from "../productForm/ProductForm";
import { CreateNewProduct } from "../productForm/CreateProductFromFormData";
import { IProduct } from "../interfaces/interfaces";
import { GetData, SaveData } from "../localStorage/LocalStorage";

const ProductCreate: React.FC = () => {
  const handleChangeActive = () => {};

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    let list = GetData();
    let product: IProduct = CreateNewProduct(event);
    list.push(product);
    SaveData(list);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ProductForm handleChangeActive={handleChangeActive} />
      <label>
        Price:
        <input type="text" name="price" defaultValue="0" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default ProductCreate;
