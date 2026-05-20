import { useState, useEffect } from 'react';
import RateIt from './components/RateIt';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem('rateit_token');
    if (token) {
      verifyToken(token);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();
      if (data.valid) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      localStorage.removeItem('rateit_token');
    }
  };

  return (
    <div className="App">
      <RateIt />
    </div>
  );
}

export default App;
