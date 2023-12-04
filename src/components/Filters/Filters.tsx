import React from "react";
import { FaTimes } from "react-icons/fa"; // Icona per il pulsante di reset
import "./Filters.scss"; // Importazione del file SCSS
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import getUniqueValues from "utils/utils";
import { updateFilters, clearFilters, filterProducts } from "store/slices/filterSlice";

const Filters = () => {
/*   const {
    filters: { text, category, min_price, max_price, price },
    updateFilters,
    all_products: products,
    clearFilters,
  } = useFilterContext(); */

  const dispatch = useDispatch();
  const { filters, all_products: products } = useSelector(
    (state: RootState) => state.filters
  );
  const { text, category, price } = filters;

  const categories = getUniqueValues(products, "category");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (e.target.type === 'button') {
      value = e.target.dataset.category ?? "";
    }
    dispatch(updateFilters({ name, value }));
    dispatch(filterProducts());
  };

  const handleCategoryClick = (cat: string) => {
    dispatch(updateFilters({ name: 'category', value: cat }));
    dispatch(filterProducts());
  };

    return (
      <div className="filters-wrapper">
        <div className='content'>
          <form className='filter__form' onSubmit={(e) => e.preventDefault()}>
            <div className='form__control'>
              <input
                type='text'
                name='text'
                placeholder='Search'
                className='search__input'
                value={text}
                onChange={handleFilterChange}
              />
            </div>
            <div className='form__control'>
              <h4>Categories</h4>
              <div className='form__categories'>
                {categories.map((cat, index) => (
                  <button
                    key={index}
                    type='button'
                    name='category'
                    className={category === cat ? "active" : ""}
                    onClick={() => handleCategoryClick(cat)}
                    data-category={cat}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className='form__control'>
              <h4>Price</h4>
              <p className='price'>${price}</p>
              <input
                type='range'
                name='price'
                min={0}
                max={1000}
                value={price}
                onChange={handleFilterChange}
              />
            </div>
          </form>
          <button className='clear-btn' onClick={
            () => {
            dispatch(clearFilters());
            dispatch(filterProducts());
          }}>
            <FaTimes /> Reset Filters
          </button>
        </div>
      </div>
    );
  }


export default Filters;
