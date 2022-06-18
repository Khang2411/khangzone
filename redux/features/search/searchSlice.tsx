import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import callAPI from '../../../pages/api/callApi';
import type { RootState } from "../../app/store"

// Define a type for the slice state
// interface CategoryState {
//     id: number,
//     name: string,
//     created_at: string,
//     updated_at: string
// }

// // Define the initial state using that type
// const initialState= [] as CategoryState [] // state phải dạng mảng

export const fetchSearchProduct: any = createAsyncThunk(
    '/product/Seacrh',
    async (data: string) => {
        const response = await callAPI("GET", `product/search/${data.search}`, null, null)
        return response.data
    }
)

export const searchSlice = createSlice({
    name: 'search',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState: [],
    reducers: {
        notInputSearch: state => {
            return state = []
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearchProduct.fulfilled, (state, action) => {
            return state = action.payload

        })
    }
})

export const { notInputSearch } = searchSlice.actions // khai báo action bắt buộc phải có action trống cũng dc nếu kh thì xóa dòng này

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.search

export default searchSlice.reducer