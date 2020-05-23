import React from "react";
import ProductForm from "../productForm/ProductForm";
import { CreateNewProduct } from "../productForm/CreateProductFromFormData";
import { createItem } from "../localStorage/LocalStorage";

const ProductCreate: React.FC = () => {
  const handleChangeActive = () => {};

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    createItem(CreateNewProduct(event));
  };

  return (
    <form onSubmit={handleSubmit}>
      <ProductForm handleChangeActive={handleChangeActive} />
      <label>
        Price:
        <input type="text" name="price" defaultValue="0" />
      </label>
      <label>
        Quantity:
        <input type="text" name="quantity" defaultValue="0" />
      </label>
      <input type="submit" value="Create" />
    </form>
  );
};

export default ProductCreate;
