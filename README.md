# My Reading Journal - PRO1001 Frontend Essentials

## Project Description
My Reading Journal is a simple website that allows users to track their reading journey. I designed this page because I personally love to keep track of the books I read and my experiences while reading them. I didn’t like any solution available on the market that fulfilled my requirements, and that’s why I decided to create my own Reading Journal.
The goal of this webpage is to provide a simple and intuitive way to access a catalog of books that you have read or are currently reading (My Bookshelf), update your reading progress, add new books to your bookshelf by submitting a form (you can choose to fill it in manually or autofill it by entering the ISBN number), and, lastly, get book recommendations from your favorite AI librarian, Bookie.

**This project includes three individual pages:** 
- Homepage/Landing page (index.html):
Includes an "About" and a "How to Use" section that provides basic information for new users.
A dedicated section to ask book recommendations to Bookie an AI Librarian powered by Open AI.
- My Bookshelf (bookshelf.html):
Catalog of books added to your bookshelf.
Edit button to keep updating your reading progress and reflections.
- Add Book (addbook.html):
Add new books manually by completing a form.
ISBN lookup with autofill, powered by Google Books API.

## Setup & Installation
There is no installation required, but if you want to get book recommendations from Bookie (AI Librarian), you will need to provide your own OpenAI API key.

## How to Run Locally
Get a copy of this project and open index.html with your favorite browser. 
If you want to get book recommendations from Bookie (AI Librarian), you will need to provide your own OpenAI API key.
To do so, open the airec.js file and paste your API key where you find the placeholder "YOUR_API_KEY".

## Known Limitations
There is no backend or database that's also why the edit button on My Bookshelf is not funcional. 
You need to have access to internet to access OpenAI and Google Books API. 

## Future Improvements
Here are several ideas that I have for future improvements:
- Create database for the bookshelf (backend).
- Add filters on My Bookshelf so user can easily find: currently reading books, finished books, filter by categories (like author or ratings).
- Find book cover pictures by ISBN  (preview image).
- Add reading progression bar. 