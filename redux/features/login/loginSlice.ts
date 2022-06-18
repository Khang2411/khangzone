import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import callAPI from '../../../pages/api/callApi';
import type { RootState } from "../../app/store"

export const fetchThirdPartyLogin: any = createAsyncThunk(
    'thirdPartyLogin/login',
    async (dataSend: any) => {
        const response = await callAPI("POST", `auth/login`, dataSend, null)
        return response.data;
    }
)
export const fetchAddThirdParty: any = createAsyncThunk(
    'thirdPartyLogin/add',
    async (dataSend: any) => {
        const response = await callAPI("POST", `auth/add`, dataSend, null)
        return response.data;
    }
)

export const fetchMe: any = createAsyncThunk(
    'Me/check',
    async (access_token: string) => {
        const response = await callAPI("POST", `auth/me`, null, `Bearer ${access_token} `)
        return response.data;
    }
)
export const fetchLogout = createAsyncThunk(
    'logout/fetch',
    async (access_token:string) => {
        const response = await callAPI("POST", "auth/logout", null, `Bearer ${access_token} `)
        return response.data
    }
);

export const fetchAddress = createAsyncThunk(
    'address/fetch',
    async (id:number) => {
        const response = await callAPI("GET", `address/${id}`, null, null)
        return response.data
    }
);




export const loginSlice = createSlice({
    name: 'login',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState: { data: "", access_token: "",address:"" },
    reducers: {
        increment: state => {

        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchThirdPartyLogin.fulfilled, (state, action) => {
            console.log(action.payload)
            state.access_token = action.payload.token
        })
        builder.addCase(fetchMe.fulfilled, (state, action) => {
            state.data = action.payload
        })
        builder.addCase(fetchLogout.fulfilled, (state, action) => {
            state.data = ""
        })
        builder.addCase(fetchAddress.fulfilled, (state, action) => {
            state.address = action.payload
        })
    }
})

export const { increment } = loginSlice.actions // khai báo action bắt buộc phải có action trống cũng dc nếu kh thì xóa dòng này

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.category

export default loginSlice.reducer