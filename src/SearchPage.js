import React, { Component } from 'react';
import Book from './Book';
import { Link } from 'react-router-dom';
import { search } from './BooksAPI';

class SearchPage extends Component {
  state = {
    userQuery: '',
    booksFromUserQuery: [],
  };

  getBooksFromUserQuery = (userQuery) => {
    if (userQuery.length > 0) {
      search(userQuery).then((resultingBooks) => {
        if (resultingBooks.error) {
          if (this.state.userQuery === userQuery) {
            this.setState({ booksFromUserQuery: [] });
          }
        } else {
          if (this.state.userQuery === userQuery) {
            this.setState({ booksFromUserQuery: resultingBooks });
          }
        }
      })
    } else {
      this.setState({ booksFromUserQuery: [] });
    }
  }

  updateUserQuery = (event) => {
    this.setState({ userQuery: event.target.value }, () =>
      this.getBooksFromUserQuery(this.state.userQuery)
    );
  }

  render() {
    const { booksFromMainPage, moveBookToDesiredShelf } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.updateUserQuery} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.booksFromUserQuery.map(resultingBook => {
              let shelfVal = 'none';
              booksFromMainPage.forEach(book => {
                let booksArrayShelfVal = book.shelf;
                if (book.id === resultingBook.id) {
                  shelfVal = booksArrayShelfVal;
                }
              });
              return (
                <Book key={resultingBook.id} book={resultingBook} shelf={shelfVal}
                  moveBookToDesiredShelf={moveBookToDesiredShelf} />
              );
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage