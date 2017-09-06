import React from 'react'

const BooksGrid = (props) => (
  <ol className="books-grid">
    { props.books.map((book) => (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            {/*since not all books do have imageLinks: it's good to check if there are imageLinks, before showing a thumbnail. */}
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select
                name={book.id}
                onChange={props.onChangeShelf}
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
          {/*since not all books do have authors: it's worth checking if there are authors, before showing a thumbnail. */}
          <div className="book-authors">{book.authors && book.authors.join(", ")}</div>
        </div>
      </li>
    )) }
  </ol>
)

export default BooksGrid
