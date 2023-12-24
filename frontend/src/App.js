import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Outlet, Navigate } from "react-router-dom";
import Products from "./components/Products";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Workers from "./components/Workers";
import WorkersFormAdd from "./components/WorkersFromAdd";
import WorkersFormUpdate from "./components/WorkersFormUpdate";

const Navbar = ({ handleLogout }) => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Products
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/workers" className="nav-link">
            Workers
          </Link>
        </li>
        <li className="nav-item">
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if a token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      {isAuthenticated && <Navbar handleLogout={handleLogout} />}

      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Products /> : <Navigate to="/login" />}
        />
        <Route
          path="/workers"
          element={isAuthenticated ? <Workers /> : <Navigate to="/login" />}
        />
        <Route
          path="/workers/new"
          element={isAuthenticated ? <WorkersFormAdd /> : <Navigate to="/login" />}
        />
        <Route
          path="/workers/update"
          element={isAuthenticated ? <WorkersFormUpdate /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/signup"
          element={<Signup setIsAuthenticated={setIsAuthenticated} />}
        />
        {/* Add more routes for other pages */}
      </Routes>
    </div>
  );
};

export default App;
