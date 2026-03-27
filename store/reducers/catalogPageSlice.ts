import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ICatalogState, ICard, SortOption, SORT_BY } from "../../types";
import { getCards, updateComments } from "../../api/api";
import { ERROR_MESSAGES } from "../../api/constants";

const getErrorMessage = (payload: unknown, fallback: string): string =>
  typeof payload === "string" ? payload : fallback;

export const fetchCards = createAsyncThunk(
  "catalogPage/fetchCards",
  async (_, { rejectWithValue }) => {
    const result = await getCards();
    if (!result.success) {
      return rejectWithValue(result.error);
    }
    return result.data;
  }
);

export const addCommentAsync = createAsyncThunk(
  "catalogPage/addComment",
  async ({ id, comment, currentComments }: { id: string; comment: string; currentComments: string[] }, { rejectWithValue }) => {
    const newComments = [...currentComments, comment];
    const result = await updateComments(id, newComments);

    if (!result.success) {
      return rejectWithValue(result.error);
    }
    return { id, comments: newComments };
  }
);

const initialState: ICatalogState = {
  filtersState: {
    selectedCountries: [],
    sortBy: SORT_BY.DEFAULT,
  },
  resultsState: {
    isInitialized: false,
    isLoading: false,
    cardsData: [],
    error: null,
  },
};

const catalogPageSlice = createSlice({
  name: "catalogPage",
  initialState,
  reducers: {
    toggleCountryFilter(state, action: PayloadAction<string>) {
      const country = action.payload;
      const isSelected = state.filtersState.selectedCountries.includes(country);

      if (isSelected) {
        state.filtersState.selectedCountries = state.filtersState.selectedCountries.filter(
          (selectedCountry) => selectedCountry !== country
        );
      } else {
        state.filtersState.selectedCountries.push(country);
      }
    },

    setSortBy(state, action: PayloadAction<SortOption>) {
      state.filtersState.sortBy = action.payload;
    },

    initializeCards(state, action: PayloadAction<ICard[]>) {
      state.resultsState.isInitialized = true;
      state.resultsState.cardsData = action.payload;
      state.resultsState.error = null;
      state.resultsState.isLoading = false;
    },

    resetFilters(state) {
      state.filtersState = initialState.filtersState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.resultsState.isLoading = true;
        state.resultsState.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.resultsState.isInitialized = true;
        state.resultsState.isLoading = false;
        state.resultsState.cardsData = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.resultsState.isLoading = false;
        state.resultsState.error = getErrorMessage(action.payload, ERROR_MESSAGES.LOAD_ERROR);
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        const card = state.resultsState.cardsData.find((c) => c.id === action.payload.id);
        if (card) {
          card.comments = action.payload.comments;
        }
      })
      .addCase(addCommentAsync.rejected, () => {
        // Ошибка обрабатывается локально в компоненте
      });
  },
});

export const {
  toggleCountryFilter,
  setSortBy,
  initializeCards,
  resetFilters,
} = catalogPageSlice.actions;

export default catalogPageSlice.reducer;
