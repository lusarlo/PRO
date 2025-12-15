const isbnInput = document.getElementById("isbn");
const isbnSearchBtn = document.getElementById("isbnSearch");
const isbnStatus = document.getElementById("isbnStatus");

// ISBN validation. Since there are two types of ISBN (ISBN-10 and ISBN-13) we need to create validations for both of them.
// With this cleanISBN hyphens (-) and whitespaces (\s) are removed from the ISBN Number and the g flag is used to replace all occurrences.
function isValidISBN(isbn) {
 const cleanISBN = isbn.replace(/[-\s]/g, "");

  // ISBN-10. Has 9 digits and 1 check character.
  if (cleanISBN.length === 10) {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      if (isNaN(cleanISBN[i])) return false;
      sum += (10 - i) * parseInt(cleanISBN[i]);
    }
    let check = cleanISBN[9].toUpperCase();
    sum += check === "X" ? 10 : parseInt(check);
    return sum % 11 === 0 ? cleanISBN : false;
  }

  // ISBN-13. Has 12 digits and 1 check digit (numeric).
  if (cleanISBN.length === 13) {
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      if (isNaN(cleanISBN[i])) return false;
      sum += parseInt(cleanISBN[i]) * (i % 2 === 0 ? 1 : 3);
    }
    let check = (10 - (sum % 10)) % 10;
    return check === parseInt(cleanISBN[12]) ? cleanISBN: false;
  }
// If length is not 10 not 13 the ISBN is invalid.
  return false;
}
// With this function we will get the information of a book by its ISBN using Google Books API.
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
// volumeInfo contains the data for title, authors, total pages and genre. Google Book API use title, authors, pageCount and categories for these details. We use these and the different inputs id to autofill the inputs with the information from the Google Books API.
    const book = data.items[0].volumeInfo;

    document.getElementById("titleISBN").value = book.title || "";
    document.getElementById("authorISBN").value = book.authors
      ? book.authors.join(", ")
      : "";
    document.getElementById("pagesISBN").value = book.pageCount || "";
    document.getElementById("genreISBN").value = book.categories
      ? book.categories.join(", ")
      : "";
// This clears the ISBN input so the user is ready to search a new book.
    isbnInput.value = "";

// Updated the status to indicate that the information of the book was loaded successfully. 
    isbnStatus.textContent = "Book loaded! Ready to search another ISBN.";
    isbnStatus.style.color = "green";

  } catch (error) {
    isbnStatus.textContent = "Error fetching book data.";
    isbnStatus.style.color = "red";
    console.error(error);
  }
}
// Validate the ISBN input, if it is empty or invalid show a error message to the user.  
isbnSearchBtn.addEventListener("click", () => {
  const rawISBN = isbnInput.value.trim();

  if (!rawISBN) {
    isbnStatus.textContent = "Please enter an ISBN number.";
    isbnStatus.style.color = "red";
    return;
  }
  const cleanISBN = isValidISBN(rawISBN);

  if (!cleanISBN) {
    isbnStatus.textContent = "Invalid ISBN number.";
    isbnStatus.style.color = "red";
    return;
  }

  fetchBookByISBN(cleanISBN);
});