import React, {Component} from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }
  /* This gets an Object with all the books in it and sets the inital state. */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        this.setState( { books })
      }
    )
  }
  /* This moves a book from one to another shelf. */
  moveBook = (id, shelf, book) => {
    book[0].shelf=shelf
    this.setState((state) => ({
      books: state.books.filter((b) => b.id !== id).concat(book)
    }))
    BooksAPI.update(book[0], shelf)
  }

  render() {
    return (
      <div className="app">

        <Route path="/" exact render={() => (
          <ListBooks
            books={this.state.books}
            onMoveBook={this.moveBook}
          />
        )}/>
        <Route path="/search" exact render={({ history }) => (
          <BookSearch
            books={this.state.books}
            onMoveBook={(id, shelf, book) => {
              this.moveBook(id, shelf, book)
              history.push('/')
            }}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
