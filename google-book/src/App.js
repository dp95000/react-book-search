import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  // const [apiKey, setApiKey] = useState("AIzaSyBdZJEhwuXan7FNjMb6iFqiol49jC-ZRTU");


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
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + book + "&key=AIzaSyBdZJEhwuXan7FNjMb6iFqiol49jC-ZRTU")
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
    <div className="container">
      <h1></h1>
      <form>
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
      </form>
      {result.map(book => (
        <div key={book._id}>
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