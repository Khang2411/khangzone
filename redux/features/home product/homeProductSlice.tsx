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

export const fetchHomeProduct: any = createAsyncThunk(
    'home/product/Show',
    async () => {
        const response = await callAPI("GET", `home/product/show`, null,null)
        return response.data
    }
)

export const homeProductSlice = createSlice({
    name: 'homeProduct',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState:{homeLaptop:[],homeComputer:[]},
    reducers: {
        increment: state => {

        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHomeProduct.fulfilled, (state, action) => {
            // console.log(action.payload);
             state.homeLaptop = action.payload.homeLaptop;
             state.homeComputer = action.payload.homeComputer;
        })
    }
})

export const { increment } = homeProductSlice.actions // khai báo action bắt buộc phải có action trống cũng dc nếu kh thì xóa dòng này

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.category

export default homeProductSlice.reducer