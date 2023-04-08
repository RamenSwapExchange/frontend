import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import networksApi from "../common/networksApi";

export const fetchAsyncNetworks = createAsyncThunk(
  "networks/fetchAsyncNetworks",
  async () => {
    const response = await networksApi.get("networks");
    return response.data;
  }
);

interface AppState {
  popUp: boolean;
  networks: string[];
}

const initialState: AppState = {
  popUp: false,
  networks: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showPopUp: (state, action: PayloadAction<boolean>) => {
      state.popUp = action.payload;
    },
  },
});

export const { showPopUp } = appSlice.actions;

export const selectPopUp = (state: RootState) => state.app.popUp;
export const selectNetworks = (state: RootState) => state.app.networks;

export default appSlice.reducer;
