import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';  // Import PropTypes

function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error

    fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          // Save the token in localStorage
          localStorage.setItem('token', data.token);
          // Set the token in state (App component)
          setToken(data.token);
          // Navigate to account page after successful login
          navigate('/account');
        } else {
          setError('Invalid login credentials');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        setError('An error occurred during login. Please try again.');
      });
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

// Add prop-types validation
Login.propTypes = {
  setToken: PropTypes.func.isRequired,  // Expect `setToken` to be a required function
};

export default Login;
