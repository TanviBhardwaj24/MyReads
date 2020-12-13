import React from 'react';
// import * as BooksAPI from './BooksAPI'

import './App.css';
import { Route } from 'react-router-dom';
import BooksMainPage from './BooksMainPage';
import SearchPage from './SearchPage';
import { getAll, update } from './BooksAPI';

class BooksApp extends React.Component {
  state = {
    booksArray: []
  }

  getAllBooks = () => {
    getAll().then((books) => {
      this.setState({ booksArray: books })
    })
  }

  bookshelfArray = [
    { shelfVal: 'currentlyReading', shelfName: 'Currently Reading' },
    { shelfVal: 'wantToRead', shelfName: 'Want to Read' },
    { shelfVal: 'read', shelfName: 'Read' },
  ];

  componentDidMount() {
    this.getAllBooks();
  }

  moveBookToDesiredShelf = (book, shelf) => {
    update(book, shelf).then(this.getAllBooks);
    // this.setState({ bookshelfArray: update(book, shelf) });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={(props) => (
          <BooksMainPage {...props} books={this.state.booksArray} bookshelf={this.bookshelfArray} moveBookToDesiredShelf={this.moveBookToDesiredShelf} />
        )} />
        <Route exact path="/Search" component={SearchPage} />
      </div>
    );
  }
}


export default BooksApp
