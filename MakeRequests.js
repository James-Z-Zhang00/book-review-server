const axios = require('axios');

async function getAllBooks() {
  try {
    const response = await axios.get("http://localhost:5000/");
    console.log(response.data);
  } catch (error) {
    console.error('Request failed: ', error.message);
  }
}

function getBookByIsbn(isbn) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:5000/isbn/"+isbn)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

function getBookByAuthor(author) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:5000/author/"+author)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

function getBookByTitle(title) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:5000/title/"+title)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

getAllBooks();
getBookByIsbn("1")
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

getBookByAuthor("Chinua Achebe")
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

getBookByTitle("Things Fall Apart")
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));