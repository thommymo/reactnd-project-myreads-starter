import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BookSearch extends Component {
  state = {
    searchedBooks: []
  }

  // This method is for debouncing the queries - as this search is "search as you type" it will lead to too much queries while I'm typing.
  // The method is copied from: http://davidwalsh.name/javascript-debounce-function
  debounce(func, wait, immediate) {
    console.log("debounce")
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

  searchBooks = this.debounce((value) => {
      if(value){
        BooksAPI.search(value, 20).then(( searchedBooks ) => {
          //if (searchedBooks.length){
            this.setState( { searchedBooks })
            }
          //}
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
    console.log(this.state.searchedBooks)
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
          { !this.state.searchedBooks.length &&
            <div>No search results for your term.</div> }
          <ol className="books-grid">

            { this.state.searchedBooks.length &&
              this.state.searchedBooks.map((book) => (

                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      {/*since not all books do have imageLinks: it's good to check if there are imageLinks, before showing a thumbnail... */}
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}></div>
                      <div className="book-shelf-changer">
                        <select
                          name={book.id}
                          onChange={this.onChangeShelf}
                          defaultValue={book.shelf || "none"}
                        >
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead" >Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}
                    </div>
                    <div className="book-authors">{book.authors /*.join(", ")*/}</div>
                  </div>
                </li>
              )) }
          </ol>
        </div>
      </div>
    )
  }
}


export default BookSearch
