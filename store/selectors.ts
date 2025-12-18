import { RootState } from "./store";
import { ICard } from "../types";

export const getFiltersState = (state: RootState) => state.catalogPage.filtersState;

export const getResultsState = (state: RootState) => state.catalogPage.resultsState;

export const getCardsData = (state: RootState) => state.catalogPage.resultsState.cardsData;

export const getIsLoading = (state: RootState) => state.catalogPage.resultsState.isLoading;

export const getError = (state: RootState) => state.catalogPage.resultsState.error;

export const getCardById = (state: RootState, cardId: string | null): ICard | null => {
  if (!cardId) return null;
  return state.catalogPage.resultsState.cardsData.find((c) => c.id === cardId) ?? null;
};
