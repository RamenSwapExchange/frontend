import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import tokensApi from "../common/tokensApi";

export const fetchAsyncTokens = createAsyncThunk(
  "networks/fetchAsyncNetworks",
  async () => {
    const response = await tokensApi.get("tokens");
    return response.data.tokens;
  }
);

interface TokensType {
  name: string;
  symbol: string;
  key: string;
  image: string;
  images: string[];
}

interface AppState {
  popUp: boolean;
  tokens: TokensType[];
}

const initialState: AppState = {
  popUp: false,
  tokens: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showPopUp: (state, action: PayloadAction<boolean>) => {
      state.popUp = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncTokens.pending, () => {});
    builder.addCase(fetchAsyncTokens.rejected, () => {});
    builder.addCase(fetchAsyncTokens.fulfilled, (state, { payload }) => {
      state.tokens = payload;
    });
  },
});

export const { showPopUp } = appSlice.actions;

export const selectPopUp = (state: RootState) => state.app.popUp;
export const selectTokens = (state: RootState) => state.app.tokens;

export default appSlice.reducer;
