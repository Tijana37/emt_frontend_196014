import './App.css';
import {React, Component} from "react";
import Header from "../Header/header";
import BookAppService from "../../repository/booksRepository";
import BookAdd from "../Books/bookAdd";
import BookEdit from "../Books/bookEdit";
import Categories from '../Categories/categories';
import Authors from '../Authors/authors';
import Books from "../Books/books";
import {BrowserRouter as Router, Redirect, Route, Routes} from 'react-router-dom';
import {Navigate} from 'react-router-dom';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            categories: [],
            authors: [],
            countries: [],
            selectedBook: {}
        }
    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className="container">
                        <Routes>
                            <Route path={"/categories"} element={<Categories categories={this.state.categories}/>}/>

                            <Route path={"/books/add"} element={
                                <BookAdd categories={this.state.categories}
                                         authors={this.state.authors}
                                         onAddBook={this.addBook}/>}/>
                            <Route path={"/books/edit/:id"} element={
                                <BookEdit categories={this.state.categories}
                                          authors={this.state.authors}
                                          onEditBook={this.editBook}
                                          book={this.state.selectedBook}/>}/>
                            <Route path={"/books"} element={
                                <Books books={this.state.books}
                                       onDelete={this.deleteBook}
                                       onEdit={this.getBook}
                                       onMarkAsTaken={this.markAsTakenBook}/>}/>
                            <Route path={"/books"}/>

                        </Routes>

                    </div>


                </main>
            </Router>
        )
    }

    componentDidMount() {

        this.loadBooks();
        this.loadCategories();
        this.loadAuthors();
    }

    loadBooks = () => {

        BookAppService.fetchBooks().then((data) => {
            this.setState({
                books: data.data
            })
        });
    }

    loadCategories = () => {
        BookAppService.fetchCategories().then((data) => {
            this.setState({
                categories: data.data
            })
        });
    }
    loadAuthors = () => {

        BookAppService.fetchAuthors().then((data) => {
            this.setState({
                authors: data.data
            })
        });
    }


    getBook = (id) => {
        BookAppService.getBook(id).then((data) => {
            this.setState({
                selectedBook: data.data
            })
        });
    }

    deleteBook = (id) => {
        BookAppService.deleteBook(id).then(() => {
            this.loadBooks();
        });
    }

    addBook = (name, category, author, availableCopies) => {
        BookAppService.addBook(name, category, author, availableCopies)
            .then(() => {
                this.loadBooks()
            });
    }

    editBook = (id, name, category, author, availableCopies) => {
        BookAppService.editBook(id, name, category, author, availableCopies)
            .then(() => {
                this.loadBooks()
            });
    }

    markAsTakenBook = (id) => {
        BookAppService.markAsTaken(id).then((data) => {
            this.loadBooks()
        });
    }
}

export default App;
