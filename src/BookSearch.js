import React, {Component} from 'react'
import BooksGrid from './BooksGrid'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'


class BookSearch extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
  }

  state = {
    searchedBooks: [],
    query: ""
  }

  componentDidMount(){
    if(this.state.query!==""){
      console.log("test");
      this.searchBooks(this.state.query)
    }
  }

  // This method is for debouncing the queries - as this search is "search as you type" it will lead to too much queries while I'm typing.
  // The method is copied from: http://davidwalsh.name/javascript-debounce-function
  debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments
      var later = function() {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }

  setBookShelf = (books) => {
    if (books.length>0){
      var booksInBookshelf = this.props.books.filter((bookInBookshelf) => books.some((book) => book.id === bookInBookshelf.id))
      return booksInBookshelf.concat(books.filter((book) => !this.props.books.some((bookInBookshelf) => bookInBookshelf.id === book.id)))
    } else {
      return books
    }
  }

  searchBooks = this.debounce((value) => {
      if(value){
        BooksAPI.search(value, 20).then(( searchedBooks ) => {
            this.setState( {
              searchedBooks: this.setBookShelf(searchedBooks),
              //Check all books in searchedBooks and filter
              query: value})
          }
        )
      }
    }
  , 350)

  onChangeShelf = (event) => {
    /* TODO: This might be way to complicated, but I didn't find another simpler solution for now */
    let book = this.state.searchedBooks.filter((b) => b.id === event.target.name)
    if(this.props.onMoveBook)
      this.props.onMoveBook(event.target.name, event.target.value, book)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input onChange={(event) => this.searchBooks(event.target.value)} type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          { this.state.searchedBooks.error==="empty query" &&
            <div className="books-grid">
              <p>No search results for "{this.state.query}".</p>
            </div>}
          <div>
            {this.state.searchedBooks.length > 0 &&
              <BooksGrid
                books={this.state.searchedBooks}
                onChangeShelf={(event) => {
                  this.onChangeShelf(event)
                }}
              />
            }
          </div>
        </div>
      </div>
    )
  }
}


export default BookSearch
