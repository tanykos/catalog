import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getCountries, getFiltersState, getIsInitialized, getVisibleCardsCount } from "../store/selectors";
import { setSortBy, resetFilters, toggleCountryFilter } from "../store/reducers/catalogPageSlice";
import styles from "../styles/components/CatalogFilters.module.scss";
import cn from "classnames";
import { ICard, isSortOption, SORT_BY } from "../types";
import ResetIcon from "./icons/ResetIcon";

interface ICatalogFiltersProps {
  initialCards?: ICard[] | null;
}

export default function CatalogFilters({ initialCards = null }: ICatalogFiltersProps) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(getFiltersState);
  const isInitialized = useAppSelector(getIsInitialized);
  const reduxCountries = useAppSelector(getCountries);
  const totalCount = useAppSelector((state) => getVisibleCardsCount(state, initialCards));
  const countries = isInitialized
    ? reduxCountries
    : Array.from(new Set((initialCards ?? []).map((card) => card.country))).sort((a, b) => a.localeCompare(b));

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (isSortOption(value)) {
      dispatch(setSortBy(value));
    }
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const handleCountryToggle = (country: string) => {
    dispatch(toggleCountryFilter(country));
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
            {totalCount}
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
            {countries.map((country) => (
              <label
                key={country}
                className={cn(styles["country-filter__countries-item"], styles["country-filter-item"])}
              >
                <input
                  className={styles["country-filter-item__input_original"]}
                  type="checkbox"
                  checked={filters.selectedCountries.includes(country)}
                  onChange={() => handleCountryToggle(country)}
                />
                <span className={styles["country-filter-item__input_custom"]}/>
                {country}
              </label>
            ))}
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
