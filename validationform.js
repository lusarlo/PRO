const formManual = document.getElementById("bookForm");
const formISBN = document.getElementById("bookFormISBN");
const statusManual = document.getElementById("formStatus");
const statusISBN = document.getElementById("formStatusISBN");

formManual.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const startDate = document.getElementById("startdate").value;
  const endDate = document.getElementById("enddate").value;
  const pages = document.getElementById("pages").value;
  const genre = document.getElementById("genre").value;
  const rating = document.getElementById("rating").value;
  const cover = document.getElementById("cover").value;
  const comments = document.getElementById("comments").value;

//I decided to only include title, author, start date, pages, genre and cover as required for this validation and not all the input because the user can add a book that they are still reading, since they would be able to edit content on the Bookshelf page.
  if (!title || !author || !startDate || !pages || !genre || !cover) {
  statusManual.textContent = "Please fill all required fields: Title, Author, Started, Genre and Cover";
  statusManual.style.color = "red";
    return;
  }

  statusManual.textContent = "Book added successfully";
  statusManual.style.color = "green";
  
  formManual.reset();

  const newBook = {
    title,
    author,
    startDate,
    endDate,
    pages,
    genre,
    rating,
    cover,
    comments
  };

  console.log("New Book:", newBook);
});


formISBN.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("titleISBN").value;
  const author = document.getElementById("authorISBN").value;
  const startDate = document.getElementById("startdateISBN").value;
  const endDate = document.getElementById("enddateISBN").value;
  const pages = document.getElementById("pagesISBN").value;
  const genre = document.getElementById("genreISBN").value;
  const rating = document.getElementById("ratingISBN").value;
  const cover = document.getElementById("coverISBN").value;
  const comments = document.getElementById("commentsISBN").value;

  //I decided to only include title, author, start date, pages, genre and cover as required for this validation and not all the input because the user can add a book that they are still reading, since they would be able to edit content on the Bookshelf page.
  if (!title || !author || !startDate || !pages || !genre || !cover) {
  statusISBN.textContent = "Please fill all required fields: Title, Author, Started, Genre and Cover";
  statusISBN.style.color = "red";
    return;
  }

  statusISBN.textContent = "Book added successfully";
  statusISBN.style.color = "green";
  
  formISBN.reset();

  const newBookISBN = {
    title,
    author,
    startDate,
    endDate,
    pages,
    genre,
    rating,
    cover,
    comments
  };

  console.log("New Book:", newBookISBN);
});