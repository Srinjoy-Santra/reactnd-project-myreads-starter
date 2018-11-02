import React, {Component} from 'react'
import './../App.css'
import {Link} from 'react-router-dom'
import Book from './Book'
import {PropTypes} from 'prop-types'
import * as BooksAPI from '../BooksAPI'

class SearchBook extends Component{
  state = {
    Books: [],
    query: ''
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    myBooks: PropTypes.array.isRequired
  }

  carryChange = (event) => {
    var value = event.target.value
    this.setState(() => {
     return {query: value}
     })
    this.searchBooks(value)
  }

  changeShelf = (books) => {
   let allBooks = this.props.myBooks
   for (let book of books) {
     book.shelf = "none"
   }


   for (let book of books) {
     for (let aBook of allBooks) {
       if (aBook.id === book.id) {
         book.shelf = aBook.shelf
       }
     }
   }
   return books
 }


 searchBooks = (value) => {
   if( value.length!== 0) {
     BooksAPI.search(value).then((books) => {
       if(books.length > 0){
         books = books.filter((book) => (book.imageLinks))
         books = this.changeShelf(books)
         this.setState(() => {
           return {Books: books}
         })
       }
     })
   }
   else
      this.setState({Books: [], query: ''})
 }

addBook = (book,shelf) => {
  this.props.onChange(book,shelf)
}

  render(){
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">

            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.carryChange}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.state.query.length>0 && this.state.Books.map((book,index) => (<Book book={book} key={index}
            updateShelf={(shelf) => {this.addBook(book, shelf)}}/> ))}
          </ol>
        </div>
      </div>
    )
  }
}

 export default SearchBook
