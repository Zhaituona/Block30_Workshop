import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes

function SingleBook({ token }) {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }), // Include token if available
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Book details:', data); // Inspect the response
        setBook(data.book); // Set the book data, extracting it from the "book" key
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
        setError('Error fetching book details.');
      });
  }, [id, token]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!book) {
    return <p>Loading book details...</p>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p>Description:{book.description}</p>
      <img src={book.coverimage} alt={book.title} />
      <p><strong>Available:</strong> {book.available ? 'Yes' : 'No'}</p>
      {token && book.available && <button>Checkout</button>}
    </div>
  );
}

// Add propTypes validation
SingleBook.propTypes = {
  token: PropTypes.string, // Expect token to be a string
};

export default SingleBook;
