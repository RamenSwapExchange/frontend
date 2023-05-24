import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { polygonMumbai } from 'wagmi/chains'

interface AppState {
    popUp: boolean
    isAccountCanvas: boolean
    offlineNetId: number
    darkMode: boolean
}

const initialState: AppState = {
    popUp: false,
    isAccountCanvas: false,
    offlineNetId: polygonMumbai.id,
    darkMode: false,
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
        changeOfflineNetId: (state, action: PayloadAction<number>) => {
            state.offlineNetId = action.payload
        },
        triggerDarkMode: (state, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload
        },
    },
})

export const { showPopUp, showAccountCanvas, changeOfflineNetId, triggerDarkMode } = appSlice.actions

export const selectPopUp = (state: RootState) => state.app.popUp
export const selectAccountCanvas = (state: RootState) => state.app.isAccountCanvas
export const selectOfflineNetId = (state: RootState) => state.app.offlineNetId
export const selectDarkMode = (state: RootState) => state.app.darkMode

export default appSlice.reducer
