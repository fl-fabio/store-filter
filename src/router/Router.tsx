import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProductDetails from '../pages/ProductDetalis/ProductDetails';
import Products from '../pages/Products/Products';
import Sort from 'components/Sort/Sort';

const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <div>Home</div>,
        },
        {
            path: "/products/:productId",
            element: <ProductDetails />
        },
        {
            path: "/products",
            element: <Products />
        },
        {
            path: "/filters",
            element: <Sort />
        },
        {
            path: "*",
            element: <h2>Page not found</h2>
        },
    ]);

  return (
    <RouterProvider router={router} />
  );
};

export default Router;
