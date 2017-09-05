import React, {Component} from 'react'

class ListBooks extends Component {

  render(){
    const { books } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    /* TODO: Refactor this, so that the same HTML is NOT repeated for each bookshelf.
                    *  Duplicate HTML is evil!
                    */
                  }
                  { /* Loop all Books in the shelf currentlyReading */
                    books.filter((book) => book.shelf==="currentlyReading").map((book) => (
                      <li key={book.title}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select defaultValue={book.shelf}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading" >Currently Reading</option>
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
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    /* TODO: Refactor this, so that the same HTML is NOT repeated for each bookshelf.
                    *  Duplicate HTML is evil!
                    */
                  }
                  { /* Loop all Books in the shelf wantToRead */
                    books.filter((book) => book.shelf==="wantToRead").map((book) => (
                      <li key={book.title}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select defaultValue={book.shelf}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading" >Currently Reading</option>
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
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    /* TODO: Refactor this, so that the same HTML is NOT repeated for each bookshelf.
                    *  Duplicate HTML is evil!
                    */
                  }
                  { /* Loop all Books in the shelf wantToRead */
                    books.filter((book) => book.shelf==="read").map((book) => (
                      <li key={book.title}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select defaultValue={book.shelf}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading" >Currently Reading</option>
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
            <div className="bookshelf">
              <h2 className="bookshelf-title">None</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    /* TODO: Refactor this, so that the same HTML is NOT repeated for each bookshelf.
                    *  Duplicate HTML is evil!
                    */
                  }
                  { /* Loop all Books in the shelf wantToRead */
                    books.filter((book) => book.shelf==="none").map((book) => (
                      <li key={book.title}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select defaultValue={book.shelf}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading" >Currently Reading</option>
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
          </div>
        </div>
        <div className="open-search">
          <a onClick={ () => this.setState({ showSearchPage: true }) }  >Add a book</a>
        </div>
      </div>
    )
  }
}

export default ListBooks;
