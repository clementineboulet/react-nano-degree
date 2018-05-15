# MyReads Project

This is Clementine Boulet's project for the final assessment project for Udacity's React Fundamentals course. I used the static example of the CSS and HTML markup template provided, and customized it to make it work using basic react and routers code. The app.js file is conserving the state of the app during the user's time on the page. It manage the state of the router and render the apropriate page depending of the route of chosen by the user.
I decided to reuse codes by creating 2 components, Book and Bookshelf, that takes care of managing and displaying each book/bookshelf, and be easily reusable inside the 2 pages, the main (DisplayPage) and the search (Searchpage) pages.



## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for the general app container.
    ├── App.js # This is the root of the app. manage the state of the app and which component to render depending of the route of the application.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── API
    │   ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── components
    │   ├── Book
    │   │   ├── Book.css # The Styling sheet of the Book.
    │   │   ├── Book.js # A JavaScript file that codes the behavior and the HTML of the Book component
    │   │   └── index.js # A Javascript file that facilite the exportation of the Book.js file
    │   └── Bookshelf
    │       ├── Bookshelf.css # The Styling sheet of the Bookshelf.
    │       ├── Bookshelf.js # A JavaScript file that codes the behavior and the HTML of the Bookshelf component
    │       └── index.js # A Javascript file that facilite the exportation of the Bookshelf.js file
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── locales
    │   └──  en-US.js # A JavaScript constant files that list of the common strings of the application, for easy language exportation.
    ├── pages
    │   ├── DisplayPage
    │   │   ├── DisplayPage.css # The Styling sheet of the Main Page.
    │   │   ├── DisplayPage.js # A JavaScript file that codes the behavior and the HTML of the Main page
    │   │   └── index.js # A Javascript file that facilite the exportation of the DisplayPage.js file
    │   └── SearchPage
    │       ├── SearchPage.css # The Styling sheet of the SearchPage.
    │       ├── SearchPage.js # A JavaScript file that codes the behavior and the HTML of the search page.
    │       └── index.js # A Javascript file that facilite the exportation of SearchPage.js 
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
