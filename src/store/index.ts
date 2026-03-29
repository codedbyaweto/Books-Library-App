import { configureStore } from '@reduxjs/toolkit'
import {BooksApi} from "../service/BooksApi.ts";

export const store = configureStore({
    reducer: {
        [BooksApi.reducerPath]: BooksApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(BooksApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch