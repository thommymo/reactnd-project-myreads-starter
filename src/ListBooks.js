import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class ListBooks extends Component {
  onChangeShelf = (event) => {
    /* TODO: This might be way to complicated, but I didn't find another simpler solution for now */
    //let book = this.props.books.filter((b) => b.id === event.target.name)
    if(this.props.onMoveBook)
      this.props.onMoveBook(event.target.name, event.target.value)
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
                    <ol className="books-grid">
                      { /* Loop through books in the bookshelf */
                        books.filter((book) => book.shelf===bookshelf.value).map((book) => (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select
                                    name={book.id}
                                    onChange={this.onChangeShelf}
                                    defaultValue={book.shelf}
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
