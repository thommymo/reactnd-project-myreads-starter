import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BookSearch extends Component {
  state = {
    searchedBooks: []
  }
  searchBooks = (term) => {
    BooksAPI.search(term, 20).then(( searchedBooks ) => {
        this.setState( { searchedBooks })
      }
    )
  }
  onChangeShelf = (event) => {
    /* TODO: This might be way to complicated, but I didn't find another simpler solution for now */
    let book = this.state.searchedBooks.filter((b) => b.id === event.target.name)
    console.log(event.target.value)
    if(this.props.onMoveBook)
      this.props.onMoveBook(event.target.name, event.target.value, book)
  }
  componentWillMount() {
    this.searchBooks("Art")
  }
  render() {
    console.log(this.state.searchedBooks);
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
            <input type="text" placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { this.state.searchedBooks &&
              this.state.searchedBooks.map((book) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
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
                    <div className="book-authors">{book.authors.join(", ")}</div>
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
