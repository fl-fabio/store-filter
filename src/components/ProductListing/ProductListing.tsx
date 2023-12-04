import React from "react";
import "./ProductListing.scss";
import { useSelector } from "react-redux";
import ProductComponent from "../ProductComponent/ProductComponent";
import Sort from "components/Sort/Sort";

const ProductListing = () => {
  const products = useSelector((state: any) => state.allProducts.products);
  console.log(products);
  return (
    <div className="product-listing">
      <div className="container">
        <div className="text-end">
          <Sort />
        </div>
        <ProductComponent />
      </div>
    </div>
  );
};

export default ProductListing;
