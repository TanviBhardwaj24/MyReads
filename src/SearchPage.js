import React, { Component } from 'react';
import { search } from './BooksAPI';
import Book from './Book';

class SearchPage extends Component {

  state = {
    userQuery: '',
    booksFromUserQuery: [],
    errorMessage: 'You ran into an error',
  };
  getBooksFromUserQuery = (userQuery) => {
    if (userQuery.length > 0) {
      console.log('the user query is ', userQuery)
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
    // this.setState({ userQuery: event.target.value });
    // this.getBooksFromUserQuery(event.target.value);

    this.setState({ userQuery: event.target.value }, () =>
      this.getBooksFromUserQuery(this.state.userQuery)
    );
  }

  render() {
    const { booksFromMainPage, moveBookToDesiredShelf } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
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

              booksFromMainPage.map(book => {
                let booksArrayShelfVal = book.shelf;
                if (book.id === resultingBook.id) {
                  // console.log('the book has been selected')
                  console.log('value is', booksArrayShelfVal)
                  shelfVal = booksArrayShelfVal;
                } else {
                  shelfVal = 'none';
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