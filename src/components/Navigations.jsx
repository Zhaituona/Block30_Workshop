import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';  // Import prop-types

function Navigations({ token, handleLogout }) {
  return (
    <nav>
      <ul>
        <li><Link to="/books">Books</Link></li>
        {!token ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/account">Account</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

// Add PropTypes validation
Navigations.propTypes = {
  token: PropTypes.string,           // `token` is a string or can be null
  handleLogout: PropTypes.func.isRequired, // `handleLogout` must be a function and is required
};

export default Navigations;
