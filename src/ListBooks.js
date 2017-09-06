import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'
import PropTypes from 'prop-types'


class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
  }
  onChangeShelf = (event) => {
    let book = this.props.books.filter((b) => b.id === event.target.name)
    if(this.props.onMoveBook)
      this.props.onMoveBook(event.target.name, event.target.value, book)
  }
  render(){
    const { books } = this.props;
    const bookshelfs = [
      {value: "currentlyReading", title: "Currently Reading"},
      {value: "wantToRead", title: "Want to Read"},
      {value: "read", title: "Read"},
      {value: "none", title: "None"}
    ]
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            { /* Loop through bookshelfes */
              bookshelfs.map((bookshelf)=>(
                <div key={bookshelf.value} className="bookshelf">
                  <h2 className="bookshelf-title">{bookshelf.title} </h2>
                  <div className="bookshelf-books">
                    <div className="bookshelf-books">
                      {books.filter((book) => book.shelf===bookshelf.value).length > 0 &&
                        <BooksGrid
                          books={books.filter((book) => book.shelf===bookshelf.value)}
                          onChangeShelf={(event) => {
                            this.onChangeShelf(event)
                          }}
                        />
                      }
                    </div>

                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="open-search">
          <Link
            to="/search"
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks;
