import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes

function Books({ token }) {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch books from the API
    fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books', {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }), // Include token if available
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching books: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Books fetched from API:', data); // Log the entire response object

        // Check if the response contains an array of books
        if (Array.isArray(data)) {
          // If data is directly an array, use it
          setBooks(data);
        } else if (data.books && Array.isArray(data.books)) {
          // If books are inside an object, use data.books
          setBooks(data.books);
        } else {
          setError('Unexpected data format received from API.');
        }
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setError('Failed to fetch books from the server.');
      });
  }, [token]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Library Catalog</h1>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <Link to={`/books/${book.id}`}>
                <strong>{book.title}</strong>
              </Link> by {book.author}
            </li>
          ))}
        </ul>
      ) : (
        <p>No books available or failed to fetch.</p>
      )}
    </div>
  );
}

// Add propTypes validation
Books.propTypes = {
  token: PropTypes.string, // Expect token to be a string (or it could be null or undefined)
};

export default Books;
