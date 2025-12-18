import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getFiltersState } from "../store/selectors";
import { setSortBy, resetFilters } from "../store/reducers/catalogPageSlice";
import styles from "../styles/components/CatalogFilters.module.scss";
import cn from "classnames";
import { isSortOption, SORT_BY } from "../types";
import ResetIcon from "./icons/ResetIcon";

export default function CatalogFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(getFiltersState);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (isSortOption(value)) {
      dispatch(setSortBy(value));
    }
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const hasActiveFilters =
    filters.selectedCountries.length > 0 ||
    filters.sortBy !== SORT_BY.DEFAULT;

  return (
    <aside className={cn(styles["catalog-page__filters"], styles["filters"])}>
      <div className={styles["filters__inner"]}>
        <div className={cn(styles["filters__total-count-container"], styles["total-count"])}>
          <span className={styles["total-count__label"]}>Товаров </span>
          <span className={styles["total-count__output"]}>
            {/* TODO: отобразить текущее количество карточек */}
          </span>
        </div>

        <div className={cn(styles["filters__sort-container"], styles["sort-filter"])}>
          <label className={styles["sort-filter__label"]}>Сортировка</label>
          <select
            className={styles["sort-filter__select"]}
            value={filters.sortBy}
            onChange={handleSortChange}
          >
            <option value={SORT_BY.DEFAULT}>По умолчанию</option>
            <option value={SORT_BY.PRICE_ASC}>Цена: по возрастанию</option>
            <option value={SORT_BY.PRICE_DESC}>Цена: по убыванию</option>
          </select>
        </div>

        <div className={cn(styles["filters__country-filter-container"], styles["country-filter"])}>
          <span className={styles["country-filter__label"]}>Страна</span>
          <div className={styles["country-filter__countries-list-container"]}>
            {/* TODO: реализовать фильтр по странам */}
            <label
              className={cn(styles["country-filter__countries-item"], styles["country-filter-item"])}
            >
              <input
                className={styles["country-filter-item__input_original"]}
                type="checkbox"
              />
              <span className={styles["country-filter-item__input_custom"]}/>
              страна
            </label>
          </div>
        </div>

        <button
          type="button"
          className={styles["reset-filters"]}
          onClick={handleResetFilters}
          disabled={!hasActiveFilters}
        >
          <ResetIcon className={styles["reset-filters__icon"]} />
          Сбросить фильтры
        </button>
      </div>
    </aside>
  );
}
