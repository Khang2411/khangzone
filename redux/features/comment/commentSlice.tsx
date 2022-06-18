import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import callAPI from '../../../pages/api/callApi';
import type { RootState } from "../../app/store"


export const fetchCommentByPage: any = createAsyncThunk(
    'comment/Show',
    async (dataSend: any) => {
        const response = await callAPI("GET", `comment/star=${dataSend.star}&id=${dataSend.id}?page=${dataSend.page}`, null, null)
        return response.data
    }
)
export const fetchUpdateUnlikeComment: any = createAsyncThunk(
    'updateUnlike/update',
    async (id) => {
        let dataSend = {
            id: id
        }
        const response = await callAPI("POST", `comment/unlike`, dataSend, null)
        return response.data
    }
)
export const fetchUpdateLikeComment: any = createAsyncThunk(
    'updateLike/update',
    async (id) => {
        let dataSend = {
            id: id
        }
        const response = await callAPI("POST", `comment/like`, dataSend, null)
        return response.data
    }
)
export const fetchAddComment: any = createAsyncThunk(
    'comment/add',
    async (dataSend) => {
        const response = await callAPI("POST", `add/comment`, dataSend, null)
        return response.data
    }
)


export const commentSlice = createSlice({
    name: 'comment',
    initialState: { star: 0, data: [], last_page: 0, current_page: 0 },
    reducers: {
        voteStar: (state, action) => {
            state.star = action.payload
        },
        pushComment: (state: any, action) => {
            console.log(action.payload)
            state.data.splice(0, 0, action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCommentByPage.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.last_page = action.payload.last_page;
            state.current_page = action.payload.current_page;
        })


    }
})

export const { voteStar, pushComment } = commentSlice.actions // khai báo action bắt buộc phải có action trống cũng dc nếu kh thì xóa dòng này

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.comment

export default commentSlice.reducer