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
- Get all books          `/`
- Get book by ISBN       `/isbn/:isbn`
- Get book by title      `/title/:title`
- Get book by author     `/author/:author`

User with authentication can access to:
- `customer/auth/review/`

User authentication process:
1. Send POST request with username & password `/register`
2. Server save the username & password into database (a list in this project), the server will send *user register successful message*
3. Send POST request with username & password `customer/login`
4. Once the username & password validated, the server will send JWT (JSON Web Token) to the request sender, the token will be valid in 60 minutes
5. Now the user can pass the `customer/auth/*` middleware then access to authorization required routers
