import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface AppState {
    popUp: boolean
    isAccountCanvas: boolean
    selectedChain: string
}

const initialState: AppState = {
    popUp: false,
    isAccountCanvas: false,
    selectedChain: '',
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        showPopUp: (state, action: PayloadAction<boolean>) => {
            state.popUp = action.payload
        },
        showAccountCanvas: (state, action: PayloadAction<boolean>) => {
            state.isAccountCanvas = action.payload
        },
        changeChain: (state, action: PayloadAction<string>) => {
            state.selectedChain = action.payload
        },
    },
})

export const { showPopUp, showAccountCanvas, changeChain } = appSlice.actions

export const selectPopUp = (state: RootState) => state.app.popUp
export const selectAccountCanvas = (state: RootState) => state.app.isAccountCanvas

export default appSlice.reducer
