// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require("express");
const app = require("../app");
const router = express.Router();

const Book = require("../models/Book.model");

// ****************************************************************************************
// GET route to display all the books
// ****************************************************************************************

// //this corresponds to the app.get()
// router.get("/books", (req, res) => {
//   //1.We prepare database, we connect afterwards, then we route.
//   //2.to tell express that you are using different archives is to use router.get(), we have to declare it in the app.js (HERE**)
//   Book.find()
//     .then((books) => {
//       console.log(`Found ${books.length} books from the DB`);
//       res.render("books-list", { books }); //coordinate/bind here route and view
//     })
//     .catch((err) => {
//       console.log("DBerror reading '/books'");
//     });
// });

// // ****************************************************************************************
// // GET route for querying a specific book from the database
// // ****************************************************************************************

// //take out the _id because _ means that it comes from a DB, since its now in our website we remove the _ so now it's my ID
// router.get("/books/:id", (req, res) => {
//   const id = req.params.id;
//   Book.findById(id)
//     .then((book) => {
//       console.log(`Read this book from the DB: ${book}`);
//       res.render("book-details", book);
//     })
//     .catch((err) => console.log("DB error reading '/books'"));
// });

// // ****************************************************************************************
// // GET route for updating a specific book from the database
// // ****************************************************************************************
// //force form to bring data
// router
//   .route("/books/:id/edit")
//   .get((req, res) => {
//     const id = req.params.id;
//     Book.findById(id).then((book) => {
//       res.render("book-edit", book);
//     });
//   })
//   .post((req, res) => {
//     console.log("Form body: ", req.body);
//     const id = req.params.id;

//     const title = req.body.title;
//     const description = req.body.description;
//     const author = req.body.author;
//     const rating = req.body.rating;

//     Book.findByIdAndUpdate(
//       id,
//       { title, description, author, rating },
//       { new: true }
//     ).then((editedBook) => console.log("Edited database: ", editedBook))
//     res.redirect(`/books/${id}`)
//   });

//Ordered invert pyramidal
// ****************************************************************************************
// GET route for updating a specific book from the database
// ****************************************************************************************
router
  .route("/books/:id/edit")
  .get((req, res) => {
    const id = req.params.id;
    Book.findById(id).then((book) => {
      console.log(book);
      res.render("book-edit", book);
    });
  })
  .post((req, res) => {
    console.log("Form body: ", req.body);
    const id = req.params.id;

    const title = req.body.title;
    const description = req.body.description;
    const author = req.body.author;
    const rating = req.body.rating;

    Book.findByIdAndUpdate(
      id,
      { title, description, author, rating },
      { new: true }
    ).then((editedBook) => {
      console.log("Edited database: ", editedBook);
      res.redirect(`/books/${id}`);
    });
  });

/*CREATE in between before :id*/

router
  .route("/books/create")
  .get((req, res) => {
    res.render("book-create");
  })
  .post((req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const description = req.body.description;
    const rating = req.body.rating;

    Book.create({ title, author, description, rating })
      // .then(bookFromDB => console.log(`New book created: ${bookFromDB.title}.`))
      .then(() => res.redirect("/books"))
      .catch((error) => `Error while creating a new book: ${error}`);
  });

// ****************************************************************************************
// GET route for querying a specific book from the database
// ****************************************************************************************
router.get("/books/:id", (req, res) => {
  const id = req.params.id;
  Book.findById(id)
    .then((book) => {
      console.log(`Read this book from the DB: ${book}`);
      res.render("book-details", book);
    })
    .catch((err) => console.log("DB error reading '/books'"));
});

// ****************************************************************************************
// GET route to display all the books
// ****************************************************************************************

// this corresponds to the app.get()
router.get("/books", (req, res) => {
  Book.find()
    .then((books) => {
      console.log(`Found ${books.length} books form the DB`);
      res.render("books-list", { books });
    })
    .catch((err) => console.log("DB error reading '/books'"));
});

//This must be at the end
module.exports = router;
