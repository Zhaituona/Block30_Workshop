import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Books from './components/Books';
import SingleBook from './components/SingleBook';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';
import Navigations from './components/Navigations';  
import bookLogo from './assets/books.png';

function App() {
  const [token, setToken] = useState(null);

  // Retrieve token from localStorage when the app loads
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Handle logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <div className="App">
        <h1>
          <img id="logo-image" src={bookLogo} alt="Library Logo" />
          Library App
        </h1>

        <p>Complete the React components needed to allow users to browse a library catalog, check out books, review their account, and return books that they've finished reading.</p>

<p>You may need to use the `token` in this top-level component in other components that need to know if a user has logged in or not.</p>

<p>Don't forget to set up React Router to navigate between the different views of your single page application!</p>

<Navigations token={token} handleLogout={handleLogout} />
        
        <Routes>
          <Route path="/books" element={<Books token={token} />} />
          <Route path="/books/:id" element={<SingleBook token={token} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/account" element={<Account token={token} />} />
          <Route path="/" element={<Books token={token} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;