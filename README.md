# Book Review

A back-end server project for users to give reviews for books.

CRUD operations with authenication.

## Main Objective

To figure out how the index.js gatekeeper authenication works, `auth_users.js` is responsable for username & password checking (login process).

Investigate the relationship between `index.js` and `auth_users.js`.

## Side Features 

Handle mostly **GET** requests and one **POST** request for registration.

## User Authentication & Authorization

User without authentication can send http GET request to:
- Get all books by `/` route

```js
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
});
```

- Get book by ISBN by `/isbn/:isbn` route

```js
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn= req.params.isbn;
  let filtered_book = books.filter((book) => book.isbn == isbn);
  const booksString = JSON.stringify(filtered_book, null, 4);
  res.send(booksString);
 });
```

- Get book by title by `/title/:title` route

```js
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let filtered_book = books.filter((book) => book.title == title);
  const booksString = JSON.stringify(filtered_book, null, 4) + "\n";
  res.send(booksString);
});
```

- Get book by author by `/author/:author` route

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

After authentication, user can:
1. Post new review for a book
2. Update or delete an existing review that posted by the _same_ user previously
