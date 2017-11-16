import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import SearchBooks from './components/SearchBooks';
import ListBooks from './components/ListBooks';
import * as BooksAPI from './BooksAPI';


export default class BooksApp extends React.Component {

  state = {
    books: []
  }
  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({
        books
      })
    })
  }
  updateState = (books)=>{
    this.setState({
      books
    })
  }

  render() {
    return (
      <div className="app">
          <Route exact path='/'
          render={()=>(
            <ListBooks
            books={this.state.books}
            updateState={this.updateState}
            updateAPI={BooksAPI} />
          )}/>
          <Route exact path='/search'
          render={()=>(
            <SearchBooks
            books={this.state.books}
            updateAPI={BooksAPI}
            updateState={this.updateState}/>
          )}/>
          <div className="rights">
            <p>Made by Bob Sirojiddinov 2017</p>
          </div>
      </div>
    )
  }
}
