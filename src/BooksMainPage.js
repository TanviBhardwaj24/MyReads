import React, { Component } from 'react';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';

class BooksMainPage extends Component {
  render() {
    const { books, bookshelf, moveBookToDesiredShelf } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookshelf.map(bookshelf => (
              < BookShelf key={bookshelf.shelfVal} name={bookshelf.shelfName} bookshelf={bookshelf} books={books} moveBookToDesiredShelf={moveBookToDesiredShelf} />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/Search">
            <button
              onClick={() => this.setState({ showSearchPage: true })}>
              Add a book</button></Link>
        </div>
      </div>
    )
  }
}

export default BooksMainPage