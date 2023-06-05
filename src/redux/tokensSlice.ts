import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import tokensApi from '../common/tokensApi'

export const fetchAsyncTokenDetails = createAsyncThunk('tokensModal/fetchAsyncTokenDetails', async (id: string) => {
    const response = await tokensApi.get(`tokens?addresses=${id}`)
    return response.data.tokens
})

export interface TokensType {
    name: string
    symbol: string
    key: string
    image: string
    images: string[]
    network: string
    price: number
    address: string
    updatedAt: string
    createdAt: string
    liquidity: number
}

interface selectedTokenConfig {
    id: number
    token: TokensType
}

interface TokensState {
    apiTokens: TokensType[]
    tokensFilter: string
    choosenTokens: [TokensType, TokensType] | [TokensType, null] | [null, null]
    selectedTokenDetail: null | TokensType[]
}

const initialState: TokensState = {
    apiTokens: [],
    tokensFilter: '',
    choosenTokens: [null, null],
    selectedTokenDetail: [],
}

export const tokensSlice = createSlice({
    name: 'tokensModal',
    initialState,
    reducers: {
        clearTokens: (state) => {
            state.apiTokens = []
        },
        filterTokens: (state, action: PayloadAction<string>) => {
            state.tokensFilter = action.payload
        },
        swapTokens: (state) => {
            const temp = state.choosenTokens[0]
            state.choosenTokens[0] = state.choosenTokens[1]
            state.choosenTokens[1] = temp
        },
        resetChoosenTokens: (state) => {
            state.choosenTokens[0] = null
            state.choosenTokens[1] = null
        },
        chooseToken: (state, action: PayloadAction<selectedTokenConfig>) => {
            state.choosenTokens[action.payload.id] = action.payload.token
        },
        removeSelectedToken: (state) => {
            state.selectedTokenDetail = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTokens.pending, () => {})
        builder.addCase(fetchTokens.rejected, () => {})
        builder.addCase(fetchTokens.fulfilled, (state, { payload }) => {
            const prevTokens = state.apiTokens
            const uniqueTokens = payload.filter(
                (token: TokensType) => !prevTokens.some((prevToken) => prevToken.key === token.key)
            )
            state.apiTokens = [...prevTokens, ...uniqueTokens]
        })
        builder.addCase(fetchAsyncTokenDetails.fulfilled, (state, { payload }) => {
            state.selectedTokenDetail = payload
        })
    },
})

export const { clearTokens, filterTokens, chooseToken, swapTokens, resetChoosenTokens, removeSelectedToken } =
    tokensSlice.actions

export const fetchTokens = createAsyncThunk('networks/fetchAsyncNetworks', async (request: string) => {
    const response = await tokensApi.get(`${request}`)
    return response.data.tokens
})

export const selectTokens = (state: RootState) => state.tokens.apiTokens
export const selectTokensFilter = (state: RootState) => state.tokens.tokensFilter
export const selectChoosenTokens = (state: RootState) => state.tokens.choosenTokens
export const selectProductDetail = (state: RootState) => state.tokens.selectedTokenDetail

export default tokensSlice.reducer
