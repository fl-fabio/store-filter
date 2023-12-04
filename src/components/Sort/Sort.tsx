import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGridView, setListView, updateSort } from "../../store/slices/filterSlice";
import { BsFillGridFill, BsList } from "react-icons/bs"; 
import { RootState } from "../../store/store"; 


const Sort = () => {
  const dispatch = useDispatch();
  const { filtered_products: products, grid_view, sort } = useSelector(
    (state: RootState) => state.filters 
  );

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateSort(e.target.value));
  };

  const handleGridViewClick = () => {
    dispatch(setGridView());
  };

  const handleListViewClick = () => {
    dispatch(setListView());
  };

  return (
    <div className="sort me-3 mb-3">
      <div className="sort__btns">
        <button
          type="button"
          onClick={handleGridViewClick}
          className={grid_view ? "active" : undefined} // Usa undefined anziché null per il className
        >
          <BsFillGridFill className="my-icon" /> {/* Usa l'icona da react-icons */}
        </button>
        <button
          type="button"
          onClick={handleListViewClick}
          className={!grid_view ? "active" : undefined} // Usa undefined anziché null per il className
        >
          <BsList className="my-icon" /> {/* Usa l'icona da react-icons */}
        </button>
      </div>
      <p className="sort__items">
        <span>{products.length}</span> items found
      </p>
      <div className="sort__line" />
      <form className="sort__form">
        <label htmlFor="sort">sort by :</label>
        <select
          name="sort"
          id="sort"
          className="sort__input"
          value={sort}
          onChange={handleSortChange}
        >
          <option value="price-lowest">price (lowest)</option>
          <option value="price-highest">price (highest)</option>
          <option value="name-a">name (a-z)</option>
          <option value="name-z">name (z-a)</option>
        </select>
      </form>
    </div>
  );
};

export default Sort;
