import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BooksRes, BookReq, BookRes } from "../types/BooksTypes";

export const BooksApi = createApi({
    reducerPath: "booksApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://books-backend-teal.vercel.app/api/",
    }),
    tagTypes: ["Books"],
    endpoints: (builder) => ({

        getBooks: builder.query<BooksRes, void>({
            query: () => "books",
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map((book) => ({ type: "Books" as const, id: book.id })),
                        { type: "Books", id: "LIST" },
                    ]
                    : [{ type: "Books", id: "LIST" }],
        }),

        getBookById: builder.query<BookRes, string>({
            query: (id) => `books/${id}`,
            providesTags: (_, __, id) => [{ type: "Books", id }],
        }),

        searchBooks: builder.query<BooksRes, string>({
            query: (search) => `books/search?query=${search}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map((book) => ({ type: "Books" as const, id: book.id })),
                        { type: "Books", id: "LIST" },
                    ]
                    : [{ type: "Books", id: "LIST" }],
        }),

        createBook: builder.mutation<BookRes, BookReq>({
            query: (newBook) => ({
                url: "books",
                method: "POST",
                body: newBook,
            }),
            invalidatesTags: [{ type: "Books", id: "LIST" }],
        }),

        updateBook: builder.mutation<BookRes, { id: string; data: Partial<BookReq> }>({
            query: ({ id, data }) => ({
                url: `books/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (_, __, { id }) => [
                { type: "Books", id },
                { type: "Books", id: "LIST" },
            ],
        }),

        deleteBook: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (_, __, id) => [
                { type: "Books", id },
                { type: "Books", id: "LIST" },
            ],
        }),

    }),
});

export const {
    useGetBooksQuery,
    useGetBookByIdQuery,
    useSearchBooksQuery,
    useCreateBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
} = BooksApi;