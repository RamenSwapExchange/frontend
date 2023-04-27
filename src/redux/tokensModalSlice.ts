import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import tokensApi from '../common/tokensApi'

export const fetchAsyncTokens = createAsyncThunk('networks/fetchAsyncNetworks', async (request: string) => {
    const response = await tokensApi.get(`${request}`)
    return response.data.tokens
})

export interface TokensType {
    name: string
    symbol: string
    key: string
    image: string
    images: string[]
    network: string
}

interface AppState {
    tokens: TokensType[]
    modal: boolean
    page: number
}

const initialState: AppState = {
    tokens: [],
    modal: false,
    page: 0,
}

export const tokensModalSlice = createSlice({
    name: 'tokensModal',
    initialState,
    reducers: {
        changePage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        clearTokens: (state) => {
            state.tokens = []
        },
        showModal: (state, action: PayloadAction<boolean>) => {
            state.modal = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncTokens.pending, () => {})
        builder.addCase(fetchAsyncTokens.rejected, () => {})
        builder.addCase(fetchAsyncTokens.fulfilled, (state, { payload }) => {
            state.tokens = payload
        })
    },
})

export const { changePage, clearTokens, showModal } = tokensModalSlice.actions

export const selectTokens = (state: RootState) => state.tokensModal.tokens
export const selectModal = (state: RootState) => state.tokensModal.modal
export const selectPage = (state: RootState) => state.tokensModal.page

export default tokensModalSlice.reducer
