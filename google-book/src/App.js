import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Nav/Header';

function App() {

  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  // const [apiKey, setApiKey] = useState("AIzaSyD2wPOmLrj6mxbVOXp9ZSOvIYOkO-xoERA");


  const handleChange = event => {
    const book = event.target.value;
    // const {name, value} = event.target;
    // console.log(value)
    setBook(book);
  }

  const handleSubmit = event => {
    event.preventDefault();
    // console.log(event.target)
    console.log(book)
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + book + "&key=AIzaSyD2wPOmLrj6mxbVOXp9ZSOvIYOkO-xoERA")
      .then(data => {
        const { items } = data.data;
        console.log("item",items);
        setResult(items)
        // console.log(data.data);
      })
      .catch(err => console.log(err));
  }

  /* Main Info is inside Volume Info */

  return (
    <div>
      <Header />
      <h3 className="intro">Enter a book title to start your search!</h3>
      <form>
        <div className="container">
        <div className="form-group">
          <input type="text"
            onChange={handleChange}
            className="form-control mt-10"
            placeholder="search for books"
            autoComplete="off" />
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-danger">Search</button>
        </div>
        </div>
      </form>
      {result.map(book => (
        <div className="book-listing" key={book._id}>
        <a target="_blank" href={book.volumeInfo.previewLink}>
          <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
        </a>
        <p>{book.volumeInfo.title}</p>
        <p>{book.volumeInfo.authors}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
  // <div>
          // <a target="_blank" href={book.volumeInfo.previewLink}>
          // <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title}/>
          // </a>
          // </div>