import logo from '../../logo.svg';
import './App.css';
import {Component} from "react";
import Header from "../Header/header";
import BookAppService from "../../repository/booksRepository";
import BookAdd from "../Books/bookAdd";
import BookEdit from "../Books/bookEdit";
import Categories from '../Categories/categories';
import Authors from '../Authors/authors';
import Books from "../Books/books";
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'


class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      books : [],
      categories : [],
      selectedBook: {}
    }
  }

  render(){
  return(
      <Router>
        <Header/>
        <main>
          <div className="container">
            <Route path={"/books"} exact render={() =>
                <Authors author={this.state.author}/>}/>
            <Route path={"/categories"} exact render={() =>
                <Categories categories={this.state.categories}/>}/>
            <Route path={"/books/add"} exact render={() =>
                <BookAdd categories={this.state.categories}
                            author={this.state.author}
                            onAddBook={this.addBook}/>}/>
            <Route path={"/books/edit/:id"} exact render={() =>
                <BookEdit categories={this.state.categories}
                             author={this.state.author}
                             onEditBook={this.editBook}
                             book={this.state.selectedBook}/>}/>
            <Route path={"/books"} exact render={() =>
                <Books books={this.state.books}
                          onDelete={this.deleteBook}
                          onEdit={this.getBook}/>}/>
            <Redirect to={"/books"}/>
          </div>
        </main>
      </Router>
  )
  }

  componentDidMount(){
    this.loadBooks();
    this.loadCategories();
  }

  loadBooks =() =>{
    BookAppService.fetchBooks().then((data)=>{
      this.setState({
        books : data.data
      })
    });
  }

  loadCategories = () => {
    BookAppService.fetchCategories().then((data) =>{
      this.setState({
        categories: data.data
      })
    });
  }

  getBook = (id) =>{
    BookAppService.getBook(id).then((data)=>{
      this.setState({
        selectedBook : data.data
      })
    });
  }

  deleteBook = (id) =>{
    BookAppService.deleteBook(id).then(()=>{
      this.loadBooks();
    });
  }

  addBook = ( name, category,author,availableCopies) =>{
    BookAppService.addBook(name, category,author,availableCopies)
        .then(()=>{
          this.loadBooks()
        });
  }

  editBook = (id,name, category,author,availableCopies) =>{
    BookAppService.editBook(id,name, category,author,availableCopies)
        .then(()=>{
          this.loadBooks()
        });
  }
}

export default App;
