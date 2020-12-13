import React from 'react';

class Book extends React.Component {
  render() {
    const { book, shelf, moveBookToDesiredShelf } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          {this.props.book.imageLinks ?
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            : ''}

          <div className="book-shelf-changer">
            <select onChange={(e) => moveBookToDesiredShelf(this.props.book, e.target.value)}
              value={shelf}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    );
  }

}

export default Book