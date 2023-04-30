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
    tokensFilter: string
}

const initialState: AppState = {
    tokens: [],
    modal: false,
    tokensFilter: '',
}

export const tokensModalSlice = createSlice({
    name: 'tokensModal',
    initialState,
    reducers: {
        clearTokens: (state) => {
            state.tokens = []
        },
        showModal: (state, action: PayloadAction<boolean>) => {
            state.modal = action.payload
        },
        filterTokens: (state, action: PayloadAction<string>) => {
            state.tokensFilter = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncTokens.pending, () => {})
        builder.addCase(fetchAsyncTokens.rejected, () => {})
        builder.addCase(fetchAsyncTokens.fulfilled, (state, { payload }) => {
            const prevTokens = state.tokens
            const uniqueTokens = payload.filter(
                (token: TokensType) => !prevTokens.some((prevToken) => prevToken.key === token.key)
            )
            state.tokens = [...prevTokens, ...uniqueTokens]
        })
    },
})

export const { clearTokens, showModal, filterTokens } = tokensModalSlice.actions

export const selectTokens = (state: RootState) => state.tokensModal.tokens
export const selectModal = (state: RootState) => state.tokensModal.modal
export const selectTokensFilter = (state: RootState) => state.tokensModal.tokensFilter

export default tokensModalSlice.reducer
