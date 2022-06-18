import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import callAPI from '../../../pages/api/callApi';
import type { RootState } from "../../app/store"

export const fetchSendOrder: any = createAsyncThunk(
    'order/send',
    async (dataSend:any) => {
        const response = await callAPI("POST", `send/order`, dataSend,null)
        return response.data
    }
)


export const cartSlice = createSlice({
    name: 'cart',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState: {},
    reducers: {
        showCartItems: state => {
            return state = JSON.parse(localStorage.getItem("cart") as any)
        },
        deleteCartItems: (state: any, action) => {
            Object.keys(state).map((key) => {
                if (state[key].id === action.payload) {
                    delete state[key]
                    localStorage.setItem("cart", JSON.stringify(state))
                }
            })
        },
        addIncart: (state: any, action) => {
            Object.keys(state).map((key) => {
                if (state[key].id === action.payload) {
                    state[key].incart += 1
                }
            })
            localStorage.setItem("cart", JSON.stringify(state));

        },
        subtractIncart: (state: any, action) => {
            Object.keys(state).map((key) => {
                if (state[key].id === action.payload) {
                    if (state[key].incart !== 1) {
                        state[key].incart -= 1
                    }
                   
                }
            })
            localStorage.setItem("cart", JSON.stringify(state));
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchSendOrder.fulfilled, (state, action) => {
            console.log(action.payload);
        })
    }

})

export const { showCartItems, addIncart, subtractIncart, deleteCartItems } = cartSlice.actions // khai báo action bắt buộc phải có action trống cũng dc nếu kh thì xóa dòng này

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.category

export default cartSlice.reducer