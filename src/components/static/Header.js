import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="container">
        <div id="company-logo">
          <Link to="/"><h1>Stack <span className="highlight">OverFlow-Lite</span></h1></Link>
        </div>
        <nav>
          <ul>
            <li><Link to="/login" id="login">Login</Link></li>
            <li><Link to="/signup" id="signup">Sign Up</Link></li>
            <li><Link to="/dashboard" className="disabled" id="dashboard">Dashboard</Link></li>
            <li><Link to="/logout" id="logout" className="disabled">Logout</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
