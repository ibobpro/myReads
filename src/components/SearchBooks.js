import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SearchBooks extends Component {
  state = {
    query : '',
    sBooks: []
  }

  shelfValueChange = (book)=>{

      let selectedValue
        for (let myBook of this.props.books){
        if (myBook.id === book.id){
            selectedValue = myBook.shelf
        }
      if (!selectedValue){
        selectedValue = "none"
      }
    }
  //  console.log(selectedValue)
    return selectedValue
  }

  onInputChange = (query)=>{

    this.setState(
      {query},() => {
        this.onSearchQuery(query)
      //  console.log(`state: ${this.state}, value: ${query}`);
    })
  }

  onSelectChange = (e, book)=>{

//    console.log(e.target.value)
    this.props.updateAPI.update(book,e.target.value)
    .then(()=>{
      this.props.updateAPI.getAll().then((books)=>{
        this.props.updateState(books)
      })
    })
  }

  onSearchQuery = (query) => {

    if(query){
  //    console.log(this.state.query)
      if(query.length>2)
      {this.props.updateAPI.search(query, 20).then((sBooks)=>{
        if(sBooks !== []){
          this.setState({
            sBooks
          })
      //    console.log(this.state.sBooks)
      }
      else{
        this.setState({
          sBooks: []
        })
      }

      })}
    }
  }

  render(){

    return(
      <div>
        <div className="search-books">
                  <div className="search-books-bar">
                    <Link className="close-search" to='/' >Close</Link>
                    <div className="search-books-input-wrapper">
                      <input type="text"
                      placeholder="Search by title or author"
                      value={this.state.query}
                      onChange={(e)=>{
                        this.onInputChange(e.target.value);
                      }}/>
                    </div>
                  </div>
                  <div className="search-books-results">
                    <ol className="books-grid">
                      {((this.state.sBooks.length>0 && this.state.query.length>2)  && (this.state.sBooks.map((book)=>(
                        <li key={book.id}>
                          <div className="book">
                          <div className="book-top">
                            {book.imageLinks && (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks.thumbnail})` }}></div>)}
                            <div className="book-shelf-changer">
                              <select value={this.shelfValueChange(book)}
                              onChange={(e)=>{ this.onSelectChange(e, book) }}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">
                            <a className="book-preview-link" href={book.previewLink}>{book.title}</a>
                          </div>
                          <div className="book-authors">{book.authors}</div>
                          </div>
                        </li>
                      )))) || (this.state.query  &&(
                        <div className="book-authors">
                          <p><span className="book-preview-link">{this.state.query}</span> is not found in base.<br/>
                          Please check your entry and try again</p>
                        </div>
                        ))}
                      {!this.state.query && (
                        <div className="book-authors">
                          <p>Please use the Search Box above to add books. <br/>Please enter at least 3 characters</p>
                        </div>
                        )
                      }
                    </ol>
                    <div className="search-results">
                    </div>
                  </div>
                </div>
      </div>
    )
  }
}
