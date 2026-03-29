import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import BookDetails from "./pages/BookDetails.tsx";
import AddBook from "./pages/AddBook.tsx";
import EditBook from "./pages/EditBook.tsx";
import "./App.css"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/book/:id" element={<BookDetails />}/>
                <Route path="/add" element={<AddBook />}/>
                <Route path="/edit/:id" element={<EditBook />}/>
            </Routes>
        </BrowserRouter>

    )
}
export default App;