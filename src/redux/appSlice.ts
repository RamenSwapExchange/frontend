import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface AppState {
  popUp: boolean
}

const initialState: AppState = {
  popUp: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    showPopUp: (state, action: PayloadAction<boolean>) => {
      state.popUp = action.payload;
    },
  },
})

export const { showPopUp } = appSlice.actions

export const selectPopUp = (state: RootState) => state.app.popUp

export default appSlice.reducer