import type { ReactNode } from "react";

export const SORT_BY = {
  DEFAULT: "default",
  PRICE_ASC: "price-asc",
  PRICE_DESC: "price-desc",
} as const;

export type SortOption = (typeof SORT_BY)[keyof typeof SORT_BY];

const SORT_OPTIONS: readonly string[] = Object.values(SORT_BY);

export function isSortOption(value: string): value is SortOption {
  return SORT_OPTIONS.includes(value);
}

export interface ICard {
  id: string;
  title: string;
  description: string;
  avatar: string;
  price: number;
  isFavorite: boolean;
  comments: string[];
  country: string;
}

export interface IFiltersState {
  selectedCountries: string[];
  sortBy: SortOption;
}

export interface IResultsState {
  isInitialized: boolean;
  isLoading: boolean;
  cardsData: ICard[];
  favoriteUpdatingIds: string[];
  error: string | null;
}

export interface ICatalogState {
  filtersState: IFiltersState;
  resultsState: IResultsState;
}

export interface IMainLayoutProps {
  children: ReactNode;
}

export interface IModalProps {
  children: ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

export interface ICardItemProps {
  card: ICard;
  onSelect: (cardId: string) => void;
}

export interface INavigationLoaderProps {
  text?: string;
}

export interface IDetailedCardProps {
  cardId: string | null;
}

export interface IApiResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}
