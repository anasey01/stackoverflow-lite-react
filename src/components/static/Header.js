import React from 'react';
import { Link } from 'react-router-dom';
import isAuthenticated from '../../utilities/is-Authenticated/isAuthenticated';

const Header = () => {
  const successLoginClass = isAuthenticated() ? 'enabled' : 'disabled';
  const removeAuthClass = isAuthenticated() ? 'disabled' : 'enabled';
  return (
    <header>
      <div className="container">
        <div id="company-logo">
          <Link to="/"><h1>Stack <span className="highlight">OverFlow-Lite</span></h1></Link>
        </div>
        <nav>
          <ul>
            <li><Link to="/login" className={removeAuthClass} id="login">Login</Link></li>
            <li><Link to="/signup" id="signup" className= {removeAuthClass}>Sign Up</Link></li>
            <li><Link to="/dashboard" className= {successLoginClass} id="dashboard">Dashboard</Link></li>
            <li><Link to="/logout" id="logout" className= {successLoginClass}>Logout</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
