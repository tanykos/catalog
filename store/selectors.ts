import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ICard, SORT_BY } from "../types";

export const getFiltersState = (state: RootState) => state.catalogPage.filtersState;

export const getResultsState = (state: RootState) => state.catalogPage.resultsState;

export const getRawCardsData = (state: RootState) => state.catalogPage.resultsState.cardsData;

export const getCardsData = createSelector(
  [getRawCardsData, getFiltersState],
  (cardsData, filtersState) => {
    let filteredCards = cardsData;

    if (filtersState.selectedCountries.length > 0) {
      filteredCards = cardsData.filter((card) =>
        filtersState.selectedCountries.includes(card.country)
      );
    }

    if (filtersState.sortBy === SORT_BY.PRICE_ASC) {
      return [...filteredCards].sort((a, b) => a.price - b.price);
    }

    if (filtersState.sortBy === SORT_BY.PRICE_DESC) {
      return [...filteredCards].sort((a, b) => b.price - a.price);
    }

    return filteredCards;
  }
);

export const getVisibleCardsCount = (state: RootState, initialCards: ICard[] | null = null): number => {
  if (getIsInitialized(state)) {
    return getCardsData(state).length;
  }
  return (initialCards ?? []).length;
};

export const getCountries = createSelector(
  [getRawCardsData],
  (cardsData) => Array.from(new Set(cardsData.map((card) => card.country))).sort((a, b) => a.localeCompare(b))
);

export const getIsInitialized = (state: RootState) => state.catalogPage.resultsState.isInitialized;

export const getIsLoading = (state: RootState) => state.catalogPage.resultsState.isLoading;

export const getError = (state: RootState) => state.catalogPage.resultsState.error;

export const getIsFavoriteUpdating = (state: RootState, cardId: string): boolean =>
  state.catalogPage.resultsState.favoriteUpdatingIds.includes(cardId);

export const getCardById = (state: RootState, cardId: string | null): ICard | null => {
  if (!cardId) return null;
  return state.catalogPage.resultsState.cardsData.find((c) => c.id === cardId) ?? null;
};
