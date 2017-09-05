import React, {Component} from 'react'

class ListBooks extends Component {

  render(){

    const { books } = this.props;

    console.log(books);

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
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{bookshelf.title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      { /* Loop through books in the bookshelf */
                        books.filter((book) => book.shelf===bookshelf.value).map((book) => (
                          <li key={book.title}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select defaultValue={book.shelf}>
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
          <a onClick={ () => this.setState({ showSearchPage: true }) }  >Add a book</a>
        </div>
      </div>
    )
  }
}

export default ListBooks;
