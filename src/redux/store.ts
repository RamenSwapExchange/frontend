import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appSlice'
import tokensReducer from './tokensSlice'

export const store = configureStore({
    reducer: {
        app: appReducer,
        tokens: tokensReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
