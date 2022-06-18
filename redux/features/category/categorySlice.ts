import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import callAPI from '../../../pages/api/callApi';
import type { RootState } from "../../app/store"

export const fetchCategory: any = createAsyncThunk(
    'category/Show',
    async () => {
        const response = await callAPI("GET", `category/show`, null, null)
        return response.data
    }
)
export const fetchProductByCategory: any = createAsyncThunk(
    'productByCategory/Show',
    async (category) => {
        const response = await callAPI("GET", `category/products/productsbycategory=${category}`, null, null)
        return response.data
    }
)
export const fetchProductByFilter: any = createAsyncThunk(
    'productByFilter/Show',
    async (data: any) => {
        const response = await callAPI("GET", `category/products/productsbyfilter/cateid=${data.cateid}&producer=${data.producer}&price=${data.price}`, null, null)
        return response.data
    }
)


export const categorySlice = createSlice({
    name: 'category',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState: { category: [], products: [] },
    reducers: {
        increment: state => {

        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.category = action.payload;
        })
        builder.addCase(fetchProductByCategory.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.products = action.payload.data;
        })
        builder.addCase(fetchProductByFilter.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.products = action.payload.data;
        })
    }
})

export const { increment } = categorySlice.actions // khai báo action bắt buộc phải có action trống cũng dc nếu kh thì xóa dòng này

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.category

export default categorySlice.reducer