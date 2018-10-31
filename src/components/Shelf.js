import React, {Component} from 'react'
import Book from './Book'
import {PropTypes} from 'prop-types'

class Shelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    updateShelf: PropTypes.func.isRequired

  }

  updateBook = (book, shelf) => {
    this.props.updateShelf(book, shelf)
  }

  render(){
    const books = this.props.books
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book, index) => (<Book book={book} key={index} updateShelf={(shelf) => {
              this.updateBook(book, shelf)
            }}/>))}
          </ol>
        </div>
      </div>
    )
  }
}export default Shelf
