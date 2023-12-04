import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../store/store';
import { Link } from "react-router-dom";
import "./ProductComponent.scss";
import { setError, setLoading, setProducts, updateFilteredProducts } from "../../store/features/products/productsSlice";
import { Product } from "../../interfaces/Product";
import { fetchProducts } from "../../store/api/productsAPI";
import { loadProducts } from "store/slices/filterSlice";

const ProductComponent = () => {
  const dispatch = useDispatch();
  
  // Ottieni i prodotti dallo slice dei prodotti
  const products = useSelector((state: RootState) => state.allProducts.products);
  // Ottieni i prodotti filtrati
  const {filtered_products : filteredProducts, grid_view: gridView}= useSelector((state: RootState) => state.filters);
  
  // Stato del caricamento e errore
  const loading = useSelector((state: RootState) => state.allProducts.loading);
  const error = useSelector((state: RootState) => state.allProducts.error);

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      dispatch(setLoading(true));
      try {
        const data = await fetchProducts();
        if (data) {
          dispatch(setProducts(data));
          // Aggiorna i prodotti filtrati qui
          dispatch(loadProducts(data)); // Assumi che questa azione filtri i prodotti in base ai criteri attuali
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        dispatch(setError('Failed to fetch products'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchAndSetProducts();
  }, [dispatch]);

  useEffect(() => console.log('filtered', filteredProducts), [filteredProducts, products]);

  // Logica di rendering utilizzando `filteredProducts`
  const renderList = (loading && !filteredProducts.length) ? <div>Loading...</div> : filteredProducts.map((product: Product) => {
    const { id, title, price, category, image } = product;
    const productClass = gridView ? "col-lg-3 col-md-4 mb-4" : "col-12 mb-2";

    return (
      <div className={productClass} key={id}>
        <Link to={`/products/${id}`}>
          <div className="card h-100">
            <div className="image">
              <img src={image} className="card-img-top" alt={title} />
            </div>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{price}</p>
              <p className="card-text">{category}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  // Gestione dell'errore
  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div className="products-component">
    <div className="row">{renderList}</div>
  </div>;
};

export default ProductComponent;
