import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { IProduct } from "../interfaces/interfaces";
import { GetData, SaveData } from "../localStorage/LocalStorage";
import { isNullOrUndefined } from "util";
import ProductForm from "../productForm/ProductForm";
import { CreateEditedProduct } from "../productForm/CreateProductFromFormData";

interface PropsType extends RouteComponentProps {
  id: string;
}

const ProductEdit: React.FC<PropsType> = (props: PropsType) => {
  let id: string = (props.match.params as PropsType).id;
  let items: IProduct[] = GetData();
  let item: IProduct | undefined = items.find((p) => p.id === id);
  let index: number = isNullOrUndefined(item) ? -1 : items.indexOf(item);

  const handleChangeActive = () => {};

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    let product: IProduct = CreateEditedProduct(event);
    let list: IProduct[] = items.slice(0);
    list.splice(index, 1, product);
    SaveData(list);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="id" defaultValue={id} hidden />
      <ProductForm product={item} handleChangeActive={handleChangeActive} />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default ProductEdit;
