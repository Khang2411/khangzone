import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import callAPI from '../../../pages/api/callApi';
import type { RootState } from "../../app/store"


export const fetchProduct: any = createAsyncThunk(
    '/product/Show',
    async (id) => {
        const response = await callAPI("GET", `product/detail/productbyid=${id}`,null,null)
        return response.data
    }
)

export const productSlice = createSlice({
    name: 'product',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState:{},
    reducers: {
        increment: state => {

        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            // console.log(action.payload);
            return state = action.payload;
        })
    }
})

export const { increment } = productSlice.actions // khai báo action bắt buộc phải có action trống cũng dc nếu kh thì xóa dòng này

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.category

export default productSlice.reducer