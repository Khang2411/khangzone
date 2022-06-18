import { configureStore } from '@reduxjs/toolkit'
import cartSlice from '../features/cart/cartSlice'
import categorySlice from '../features/category/categorySlice'
import commentSlice from '../features/comment/commentSlice'
import homeProductSlice from '../features/home product/homeProductSlice'
import loginSlice from '../features/login/loginSlice'
import productSlice from '../features/product/productSlice'
import searchSlice from '../features/search/searchSlice'
// ...

export const store = configureStore({
  reducer: {
    category:categorySlice,
    login:loginSlice,
    homeProduct:homeProductSlice,
    product:productSlice,
    comment:commentSlice,
    cart:cartSlice,
    search:searchSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch