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
      // TODO: реализовать фильтр по странам
    },

    setSortBy(state, action: PayloadAction<SortOption>) {
      state.filtersState.sortBy = action.payload;
      if (action.payload === SORT_BY.PRICE_ASC) {
        state.resultsState.cardsData.sort((a, b) => a.price - b.price);
      } else if (action.payload === SORT_BY.PRICE_DESC) {
        state.resultsState.cardsData.sort((a, b) => b.price - a.price);
      }
    },

    initializeCards(state, action: PayloadAction<ICard[]>) {
      if (state.resultsState.cardsData.length === 0) {
        state.resultsState.cardsData = action.payload;
      }
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
