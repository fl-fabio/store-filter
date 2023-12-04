import React, { useEffect } from "react";
import "./ProductDetails.scss";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  removeSelectedProduct,
  setError,
  setProduct,
} from "../../store/features/setProduct/setProductSlice";

import { fetchProductById } from "../../store/api/productsAPI";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  // Assuming 'singleProduct' is the correct state slice and it directly contains the product object

  const product = useSelector(
    (state: RootState) => state.selectedProduct.product
  );


  useEffect(() => {
    const loadProduct = async () => {
      if (productId) {
        try {
          const productData = await fetchProductById(productId);
          dispatch(setProduct(productData));
        } catch (error) {
          console.error("Failed to fetch product:", error);
          dispatch(setError("Failed to fetch product"));
        }
      }
    };
  
    loadProduct();
  
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [dispatch, productId]);

  useEffect(() => {
    console.log(product);
  }, [product]);

  // Check if product is not null before rendering
  if (!product) {
    return <div className="container-detail mt-5">Loading...</div>;
  }

  const { image, title, price, category, description } = product;

  return (
    <div className="container-detail mt-5">
      <div className="row">
        <div className="col-md-6 img-container">
          <img src={image} alt={title} className="image" />
        </div>
        <div className="col-md-6">
          <h1>{title}</h1>
          <h2 className="text-primary">${price}</h2>
          <h3>{category}</h3>
          <p>{description}</p>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
