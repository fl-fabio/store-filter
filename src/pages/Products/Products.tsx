import "./Products.scss";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import ProductListing from "../../components/ProductListing/ProductListing";
import React from "react";
import Filters from "components/Filters/Filters";

const Products = () => {
  return (
    <>
      <BreadCrumb title="products" />
      <div className="products-container">
        <div className="row">
          <div className="col-12 col-lg-3">
            <Filters />
          </div>
          <div className="col-12 col-lg-9">
            <ProductListing />
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Products;
