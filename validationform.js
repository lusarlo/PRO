const form = document.getElementById("bookForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", function (event) {
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

  if (!title || !author || !startDate || !pages || !genre || !cover) {
    status.textContent = "Please fill all required fields: Title, Author, Started, Genre and Cover";
    status.style.color = "red";
    return;
  }

  status.textContent = "Book added successfully";
  status.style.color = "green";
  
  form.reset();

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
