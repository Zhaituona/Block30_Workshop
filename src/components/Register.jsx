import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstname, lastname, email, password }),
    })
      .then(async (response) => {
        console.log('Full Response Object:', response); // Log the full response object

        const contentType = response.headers.get('content-type');
        console.log('Response Content-Type:', contentType); // Log the content-type

        // Check if the response has JSON content-type
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json(); // Parse JSON data
          console.log('Parsed API Response:', data); // Log the parsed data

          // Check for a valid token
          if (data.token) {
            localStorage.setItem('token', data.token);
            navigate('/account');
          } else if (data.message) {
            setError(data.message); // If there's a message, show it
          } else {
            setError('Unexpected data format received from API.');
          }
        } else {
          // If the response is not JSON, treat it as an error
          setError('The server returned a non-JSON response.');
          const textData = await response.text();
          console.log('Response Text:', textData); // Log the raw text response for debugging
        }
      })
      .catch((error) => {
        console.error('Fetch Error:', error);
        setError('Failed to communicate with the server. Please try again.');
      });
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
