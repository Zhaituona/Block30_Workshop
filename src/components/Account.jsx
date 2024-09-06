import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import prop-types for prop validation

function Account({ token }) {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (token) {
      fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setBooks(data.books || []);
      })
      .catch(error => console.error('Error fetching user data:', error));
    }
  }, [token]);

  if (!token) {
    return <p>Please log in to view your account.</p>;
  }

  if (!user) {
    return <p>Loading account details...</p>;
  }

  return (
    <div>
      <h1>Account Details</h1>
      <p>Email: {user.email}</p>
      <h2>Your Checked Out Books</h2>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      ) : (
        <p>You have no books checked out.</p>
      )}
    </div>
  );
}

// Define propTypes for prop validation
Account.propTypes = {
  token: PropTypes.string, // Expect token to be a string or null
};

export default Account;
