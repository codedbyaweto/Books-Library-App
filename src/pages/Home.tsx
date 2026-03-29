import {useGetBooksQuery} from "../service/BooksApi.ts";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader.tsx";
import {Link} from "react-router-dom";

const Home = () => {

    const {data, isLoading} = useGetBooksQuery();
    console.log(data);

    if (isLoading) return <Loader />;

    return (
        <div className="home">
            <div className="home-header">
                <SearchBar />

                <Link to="/add" className="btn btn-primary add-btn">
                    Add Book
                </Link>
            </div>

            <div className="book-grid">
                {data?.data.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>

    )
}

export default Home;