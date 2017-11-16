import React, {Component} from 'react';


export default class RenderShelf extends Component {
  state = {
    selectedValue : ''
  }
  onSelectChange = (e, book)=>{

      this.setState({
        selectedValue : e.target.value
      },()=>{
        console.log(this.state.selectedValue)
        this.props.updateAPI.update(book,this.state.selectedValue)
        .then(()=>{
          this.props.updateAPI.getAll().then((books)=>{
            this.props.updateState(books)
          })
        })
        })
  }
  render(){
    return(
      <div className="bookshelf">
        <div className="bookshelf-books">
          <ol className="books-grid">
          {this.props.books.map((book)=>
            (book.shelf === this.props.shelfName) && (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="bookCover">
                      <div className="book-cover"
                      style={{ width: 128, height: 193,
                        backgroundImage:`url(${book.imageLinks.thumbnail})`  }}>
                      </div>
                    </div>
                    <div className="book-shelf-changer">

                    <select value={this.props.shelfName}
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
            )
          )}
          </ol>
        </div>
        <div className={this.props.shelfName}></div>
      </div>
    )
  }
}
//<h2 className="bookshelf-title" >{this.props.shelfDisplay}</h2>
