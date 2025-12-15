const isbnInput = document.getElementById("isbn");
const isbnSearchBtn = document.getElementById("isbnSearch");
const isbnStatus = document.getElementById("isbnStatus");

// ISBN validation. I used Chat GPT to create this validation, since I struggle creating this part of the code by myself.
function isValidISBN(isbn) {
  isbn = isbn.replace(/[-\s]/g, "");

  // ISBN-10
  if (isbn.length === 10) {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      if (isNaN(isbn[i])) return false;
      sum += (10 - i) * parseInt(isbn[i]);
    }
    let check = isbn[9].toUpperCase();
    sum += check === "X" ? 10 : parseInt(check);
    return sum % 11 === 0;
  }

  // ISBN-13
  if (isbn.length === 13) {
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      if (isNaN(isbn[i])) return false;
      sum += parseInt(isbn[i]) * (i % 2 === 0 ? 1 : 3);
    }
    let check = (10 - (sum % 10)) % 10;
    return check === parseInt(isbn[12]);
  }

  return false;
}

async function fetchBookByISBN(isbn) {
  isbnStatus.textContent = "Searching book...";
  isbnStatus.style.color = "black";

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    );
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      isbnStatus.textContent = "No book found for this ISBN.";
      isbnStatus.style.color = "red";
      return;
    }

    const book = data.items[0].volumeInfo;

    document.getElementById("titleISBN").value = book.title || "";
    document.getElementById("authorISBN").value = book.authors
      ? book.authors.join(", ")
      : "";
    document.getElementById("pagesISBN").value = book.pageCount || "";
    document.getElementById("genreISBN").value = book.categories
      ? book.categories.join(", ")
      : "";

    isbnInput.value = "";

    isbnStatus.textContent = "Book loaded! Ready to search another ISBN.";
    isbnStatus.style.color = "green";

  } catch (error) {
    isbnStatus.textContent = "Error fetching book data.";
    isbnStatus.style.color = "red";
    console.error(error);
  }
}

isbnSearchBtn.addEventListener("click", () => {
  const isbn = isbnInput.value.trim();

  if (!isbn) {
    isbnStatus.textContent = "Please enter an ISBN number.";
    isbnStatus.style.color = "red";
    return;
  }

  if (!isValidISBN(isbn)) {
    isbnStatus.textContent = "Invalid ISBN number.";
    isbnStatus.style.color = "red";
    return;
  }

  fetchBookByISBN(isbn);
});