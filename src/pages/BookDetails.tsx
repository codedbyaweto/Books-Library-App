import {useParams, useNavigate} from "react-router-dom";
import {useDeleteBookMutation, useGetBookByIdQuery} from "../service/BooksApi.ts";
import Loader from "../components/Loader.tsx";

const BookDetails = () => {

    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data, isLoading } = useGetBookByIdQuery(id!);
    const [deleteBook] = useDeleteBookMutation();

    if(isLoading) return <Loader />;

    const book = data?.data;
    if(!book) return <p>No book found</p>;

    const handleDelete = async () => {
        if(!id) return;

        await deleteBook(id);
        navigate("/");
    }

    return (
        <div className="book-details">
            <div className="book-details-card">
                <img
                    src={book.book_url || book.bookUrl}
                    alt={book.title}
                    className="book-details-image"
                />

                <div className="book-details-content">
                    <h1 className="book-details-title">{book.title}</h1>
                    <p className="book-details-author">{book.author}</p>
                    <p className="book-details-summary">{book.summary}</p>
                </div>

                <div className="book-details-actions">
                    <button onClick={handleDelete} className="btn btn-danger">
                        Delete
                    </button>

                    <button
                        onClick={() => navigate(`/edit/${id}`)}
                        className="btn btn-secondary"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => navigate(`/`)}
                        className="btn btn-light"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    )
}
export default BookDetails;