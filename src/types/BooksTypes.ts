export type Book = {
    id: string;
    title: string;
    author: string;
    genre: string;
    published_year: number;
    summary: string;
    created_at: string;
    book_url: string;
    bookUrl: string;
};

export type BooksRes = {
    data: Book[];
    count: number;
    limit: number;
    offset: number;
};

export type BookRes = {
    data: Book;
};

export type BookReq = {
    title: string;
    author: string;
    genre: string;
    published_year: number;
    summary: string;
    bookUrl: string;
};