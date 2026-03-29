import {useParams, useNavigate} from "react-router-dom";
import {type SubmitEvent, useState, useEffect, type ChangeEvent} from "react";
import {useGetBookByIdQuery, useUpdateBookMutation} from "../service/BooksApi";
import type {BookReq} from "../types/BooksTypes";
import Loader from "../components/Loader.tsx";

const EditBook = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {data, isLoading} = useGetBookByIdQuery(id!, {
        skip: !id,
    });

    const [updateBook] = useUpdateBookMutation();

    const [form, setForm] = useState<BookReq>({
        title: "",
        author: "",
        genre: "",
        published_year: 0,
        summary: "",
        bookUrl: "",
    });

    useEffect(() => {
        if (!data?.data) return;

        const book = data.data;

        setForm({
            title: book.title,
            author: book.author,
            genre: book.genre,
            published_year: book.published_year,
            summary: book.summary,
            bookUrl: book.book_url,
        });
    }, [data?.data]);

    if (isLoading) return <Loader />;

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!id) return;

        await updateBook({id, data: form});

        navigate(`/book/${id}`);
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/")}
            >
                ← Back to Home
            </button>
            <h2 className="form-title">Edit Book</h2>
            <input
                className="form-input"
                value={form.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setForm({...form, title: e.target.value})
                }
            />

            <input
                className="form-input"
                value={form.author}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setForm({...form, author: e.target.value})
                }
            />

            <input
                className="form-input"
                value={form.genre}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setForm({...form, genre: e.target.value})
                }
            />

            <input
                className="form-input"
                type="number"
                value={form.published_year}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setForm({
                        ...form,
                        published_year: Number(e.target.value),
                    })
                }
            />

            <input
                className="form-input"
                value={form.bookUrl}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setForm({...form, bookUrl: e.target.value})
                }
            />

            <textarea
                className="form-textarea"
                value={form.summary}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setForm({...form, summary: e.target.value})
                }
            />

            <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                    Update Book
                </button>
            </div>
        </form>
    );
};

export default EditBook;