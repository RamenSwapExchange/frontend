import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { polygonMumbai } from 'wagmi/chains'

interface AppState {
    popUp: boolean
    isAccountCanvas: boolean
    localChainId: number
}

const initialState: AppState = {
    popUp: false,
    isAccountCanvas: false,
    localChainId: polygonMumbai.id,
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
        changeLocalChainId: (state, action: PayloadAction<number>) => {
            state.localChainId = action.payload
        },
    },
})

export const { showPopUp, showAccountCanvas, changeLocalChainId } = appSlice.actions

export const selectPopUp = (state: RootState) => state.app.popUp
export const selectAccountCanvas = (state: RootState) => state.app.isAccountCanvas
export const selectLocalChainId = (state: RootState) => state.app.localChainId

export default appSlice.reducer
