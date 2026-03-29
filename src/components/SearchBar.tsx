import type { Book } from "../types/BooksTypes";
import { type ChangeEvent, useState } from "react";
import { useSearchBooksQuery } from "../service/BooksApi";
import { Link } from "react-router-dom";

const SearchBar = () => {
    const [query, setQuery] = useState<string>("");

    const { data } = useSearchBooksQuery(query, {
        skip: !query,
    });

    return (
        <div className="search">
            <input
                className="search-input"
                placeholder="Search books..."
                value={query}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setQuery(e.target.value)
                }
            />

            <div className="search-results">
                {data?.data.map((book: Book) => (
                    <Link
                        key={book.id}
                        to={`/book/${book.id}`}
                        className="search-item"
                    >
                        {book.title}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;