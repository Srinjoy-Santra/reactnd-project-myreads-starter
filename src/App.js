import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {BrowserRouter, Route} from 'react-router-dom'
import ListBooks from './components/ListBooks'
import SearchBook from './components/SearchBook'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     Books: [],
    //showSearchPage: false
  }

  componentDidMount(){
    this.fetchBooks()
  }

  fetchBooks = () => {
    BooksAPI.getAll().then((books) => {
        this.setState({Books : books})
    })
  }

  updateBooks = (book, shelf) => {

    BooksAPI.update(book, shelf).then(response => {
      // set shelf for new or updated book
      book.shelf = shelf;
      // update state with changed book
      this.setState((state) => ({

         Books:
          // remove updated book from array
          state.Books.filter(tbook => tbook.id !== book.id)
          // add updated book to array
          .concat(book)
          
    }))
  })
}

  render() {
    return (
      <BrowserRouter>
      <div className="app">
      <Route exact path="/" render={() => (<ListBooks books={this.state.Books} onChange={this.updateBooks}/>)}/>
      <Route exact path="/search" render={({history}) => (<SearchBook  myBooks={this.state.Books} onChange={this.updateBooks}/>)}/>
      </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
