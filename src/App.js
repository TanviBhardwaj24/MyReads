import React from 'react';
import './App.css';
import BooksMainPage from './BooksMainPage';
import { getAll, update } from './BooksAPI';
import { Route } from 'react-router-dom';
import SearchPage from './SearchPage';

class BooksApp extends React.Component {
  state = {
    booksArray: [],
    showSearchPage: false
  }

  bookshelfArray = [
    { shelfVal: 'currentlyReading', shelfName: 'Currently Reading' },
    { shelfVal: 'wantToRead', shelfName: 'Want to Read' },
    { shelfVal: 'read', shelfName: 'Read' },
  ];

  getAllBooks = () => {
    getAll().then((books) => {
      this.setState({ booksArray: books })
    })
  }

  moveBookToDesiredShelf = (book, shelf) => {
    update(book, shelf).then(this.getAllBooks);
  }

  componentDidMount() {
    this.getAllBooks();
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={(props) => (
          <BooksMainPage {...props} books={this.state.booksArray} bookshelf={this.bookshelfArray} moveBookToDesiredShelf={this.moveBookToDesiredShelf} />
        )} />

        <Route exact path="/Search" render={(props) => (
          <SearchPage {...props} booksFromMainPage={this.state.booksArray} bookshelf={this.bookshelfArray} moveBookToDesiredShelf={this.moveBookToDesiredShelf} showSearchPage={this.state.showSearchPage} />
        )} />
      </div>
    );
  }
}

export default BooksApp
