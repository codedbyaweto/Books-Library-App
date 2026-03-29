import type { Book } from "../types/BooksTypes";
import { Link } from "react-router-dom";

type Props = {
    book: Book;
};

const BookCard = ({ book }: Props) => {
    return (
        <div className="book-card">
            <Link to={`/book/${book.id}`} className="book-card-link">
                <div className="book-card-image-wrapper">
                    <img
                        src={book.book_url || book.bookUrl}
                        alt={book.title}
                        className="book-card-image"
                    />
                </div>

                <div className="book-card-content">
                    <h3 className="book-card-title">{book.title}</h3>
                    <p className="book-card-author">{book.author}</p>
                    <p className="book-card-genre">{book.genre}</p>
                </div>
            </Link>

            <div className="book-card-actions">
                <Link to={`/book/${book.id}`} className="btn btn-primary">
                    View
                </Link>
                <Link to={`/edit/${book.id}`} className="btn btn-secondary">
                    Edit
                </Link>
            </div>
        </div>
    );
};

export default BookCard;