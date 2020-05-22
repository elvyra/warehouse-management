import React from "react";
import { IProduct, ProductType, ProductColor } from "../interfaces/interfaces";
import { isNullOrUndefined } from "util";

type PropsType = {
  product?: IProduct;
  handleChangeActive: any;
};

const ProductForm: React.FC<PropsType> = ({
  product,
  handleChangeActive,
}: PropsType) => {
  return (
    <>
      <label>
        Name:
        <input
          type="text"
          name="name"
          defaultValue={!isNullOrUndefined(product) ? product.name : ""}
        />
      </label>
      <label>
        EAN:
        <input
          type="text"
          name="ean"
          defaultValue={!isNullOrUndefined(product) ? product.EAN : ""}
        />
      </label>
      <label>
        Type:
        <select
          defaultValue={!isNullOrUndefined(product) ? product.type : 0}
          name="type"
        >
          {Object.keys(ProductType)
            .filter((key) => !isNaN(Number(key)))
            .map((key) => (
              <option key={key} value={key}>
                {ProductType[Number(key)]}
              </option>
            ))}
        </select>
      </label>
      <label>
        Weight:
        <input
          type="text"
          name="weight"
          defaultValue={!isNullOrUndefined(product) ? product.weight : 0}
        />
      </label>
      <label>
        Color:
        <select
          defaultValue={!isNullOrUndefined(product) ? product.color : 0}
          name="color"
        >
          {Object.keys(ProductColor)
            .filter((key) => !isNaN(Number(key)))
            .map((key) => (
              <option key={key} value={key}>
                {ProductColor[Number(key)]}
              </option>
            ))}
        </select>
      </label>
      <label>
        Active:
        <input
          type="checkbox"
          name="active"
          defaultChecked={!isNullOrUndefined(product) ? product.active : true}
          onChange={handleChangeActive}
        />
      </label>
    </>
  );
};

export default ProductForm;
