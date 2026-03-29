import {type ChangeEvent, useState} from "react";
import type {SubmitEvent} from "react";
import type {BookReq} from "../types/BooksTypes.ts";
import {useCreateBookMutation} from "../service/BooksApi.ts";
import {useNavigate} from "react-router-dom";

const AddBook = () => {

    const [form, setForm] = useState<BookReq>({
        title: "",
        author: "",
        genre: "",
        published_year: 0,
        summary: "",
        bookUrl: "",
    })

    const [createBook] = useCreateBookMutation();
    const navigate = useNavigate();

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createBook(form);
        navigate("/");
    }

    return (

        <form onSubmit={handleSubmit} className="form">
            <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/")}
            >
                ← Back to Home
            </button>
            <h2 className="form-title">Add Book</h2>


            <input
                className="form-input"
                placeholder="Title"
                value={form.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setForm({...form, title: e.target.value})
                }
            />

            <input
                className="form-input"
                placeholder="Author"
                value={form.author}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setForm({...form, author: e.target.value})
                }
            />

            <input
                className="form-input"
                placeholder="Genre"
                value={form.genre}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setForm({...form, genre: e.target.value})
                }
            />

            <input
                className="form-input"
                type="number"
                placeholder="Year"
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
                placeholder="Image URL"
                value={form.bookUrl}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setForm({...form, bookUrl: e.target.value})
                }
            />

            <textarea
                className="form-textarea"
                placeholder="Summary"
                value={form.summary}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setForm({...form, summary: e.target.value})
                }
            />

            <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                    Add Book
                </button>
            </div>

        </form>
    )
}

export default AddBook;