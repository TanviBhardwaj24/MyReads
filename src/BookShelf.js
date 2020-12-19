import React from 'react';
import Book from './Book';

class BookShelf extends React.Component {
  render() {
    const { books, name, bookshelf, moveBookToDesiredShelf } = this.props;
    const booksOnGivenShelf = books.filter(book => book.shelf === bookshelf.shelfVal)

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksOnGivenShelf.map(book => (
              <Book key={book.id} book={book} shelf={bookshelf.shelfVal} moveBookToDesiredShelf={moveBookToDesiredShelf} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf