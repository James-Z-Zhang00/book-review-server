# Book Review

A back-end server project for users to give reviews for books.

CRUD operations with authenication.

## Main Objective

Develop a book review server that provides user authentication and authorization features `auth_users.js` is responsable for username & password checking (login process).

Built a client side for sending dynamic HTTP requests by JavaScript Promise and async await Axios

## Side Features 

Handle mostly **GET** requests and one **POST** request for registration.

## User Authentication & Authorization

User without authentication can send http GET request to:
- Get all books by `/` route
- Get book by ISBN by `/isbn/:isbn` route
- Get book by title by `/title/:title` route
- Get book by author by `/author/:author` route

```js
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
});
```

```js
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn= req.params.isbn;
  let filtered_book = books.filter((book) => book.isbn == isbn);
  const booksString = JSON.stringify(filtered_book, null, 4);
  res.send(booksString);
 });
```

```js
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let filtered_book = books.filter((book) => book.title == title);
  const booksString = JSON.stringify(filtered_book, null, 4) + "\n";
  res.send(booksString);
});
```

```js
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let filtered_book = books.filter((book) => book.author == author);
  const booksString = JSON.stringify(filtered_book, null, 4) + "\n";
  res.send(booksString);
});
```

User with authentication can access to:
- `customer/auth/review/`

User authentication process:
1. Send POST request with username & password `/register`
2. Server save the username & password into database (a list in this project), the server will send *user register successful* message
3. Send POST request with username & password `customer/login`
4. Once the username & password validated, the server will send JWT (JSON Web Token) to the request sender, the token will be valid in 60 minutes
5. Now the user can pass the `customer/auth/*` middleware then access to authorization required routers

Router to handle user registeration

```js
public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    // username validation
    if (doesExist(username)) { 
      return res.status(404).json({message: "Username already exists!"});   
    } else {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "Customer successfully registred. Now you can login"});
    }
  } 
  return res.status(404).json({message: "Unable to register user, both username and password must be filled!"});
});
```

Postman (testing tool) screenshot, where username and password were sent by JSON

<img width="521" alt="register" src="https://github.com/James-Z-Zhang00/book-review-server/assets/144994336/d36e71cd-e439-4dbd-84cf-e2a2a0576da5">

User authentication process

```js
//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
    if (authenticatedUser(username, password)) {
    // If the username and password passed checking
    currentUsername = username;
    // Sign the JWT (JSON Web Token) to generate accessToken with the given username
    // With 60 * 60 available time (1 hour)
    let accessToken = jwt.sign({
            data: username,
        }, 'access', { expiresIn: 60 * 60 });

        // Set the access token and username in the session
        req.session.authorization = {
            accessToken: accessToken,
        };
    // Return registeration successful message back to the user
    return res.status(200).send("Customer successfully logged in\n");
    }
    // Return the failed login message back to the user
    res.status(401).send("No such username and password combination!");
});

// Check if the user send correct username and password
const authenticatedUser = (username,password)=>{ 
  let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}
```

Postman testing for user login

<img width="549" alt="login" src="https://github.com/James-Z-Zhang00/book-review-server/assets/144994336/9d3437bd-a6a8-4810-aa47-d65aff7f2217">

After authentication, user can:
1. Post new review for a book
2. Update or delete an existing review that posted by the _same_ user previously

In the screenshot, I added review: good after successfully login to my account, there's a message shows that the review added.

<img width="1792" alt="8-reviewadded" src="https://github.com/James-Z-Zhang00/book-review-server/assets/144994336/b9cd81cd-78ba-4e6b-8109-887b9ad91fcb">

Then I'm able to delete the review by sending a delete request to the same URL

<img width="1792" alt="9-deletereview" src="https://github.com/James-Z-Zhang00/book-review-server/assets/144994336/34f06a0c-54eb-42d5-b30b-61b7165a1684">

## Client Side Feature Building

Send get request to get all book records for the server using async await axios

```JavaScript
async function getAllBooks() {
  try {
    const response = await axios.get("http://localhost:5000/");
    console.log(response.data);
  } catch (error) {
    console.error('Request failed: ', error.message);
  }
}
```

Send get request to get book by isbn number with an attribute by using JavaScript Promise and error handling

```JavaScript
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
```

Send get request to get book by author name with an attribute by using JavaScript Promise and error handling

```JavaScript
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
```

Send get request to get book by book title with an attribute by using JavaScript Promise and error handling

```JavaScript
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
```

