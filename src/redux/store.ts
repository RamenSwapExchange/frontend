import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appSlice'
import tokensModalReducer from './tokensModalSlice'

export const store = configureStore({
    reducer: {
        app: appReducer,
        tokensModal: tokensModalReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
