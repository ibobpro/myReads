import React from 'react';
import { Link } from 'react-router-dom';
import RenderShelf from './RenderShelf';


export default class ListBooks extends React.Component{

  updateState = (books)=>{
    this.props.updateState(books)
  }

  render(){
    return(
      <div className="list-books">
        <div className="list-books-title">
          <div className="list-books-title-text"></div>
        </div>
        <div className="list-books-content">
          <div>
            <RenderShelf books={this.props.books}
            updateState={this.updateState}
            updateAPI={this.props.updateAPI}
            shelfName='currentlyReading'
            shelfDisplay='Currently Reading'
             />
            <RenderShelf books={this.props.books}
            updateState={this.updateState}
            updateAPI={this.props.updateAPI}
            shelfName='wantToRead'
            shelfDisplay='Want To Read'
             />
            <RenderShelf books={this.props.books}
            updateState={this.updateState}
            updateAPI={this.props.updateAPI}
            shelfName='read'
            shelfDisplay='Read'
             />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>

    )
  }
}
