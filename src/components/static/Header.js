import React from 'react';

const Header = () => {

    return (
        <header>
            <div className="container">
                <div id="company-logo">
                <a href="/"><h1>Stack <span className="highlight">OverFlow-Lite</span></h1></a>
                </div>
                <nav>
                    <ul>
                        <li><a href="/login" id="login">Login</a></li>
                        <li><a href="/signup" id="signup">Sign Up</a></li>
                        <li><a href="/dashboard" className="disabled" id="dashboard">Dashboard</a></li>
                        <li><a id="logout" className="disabled">Logout</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
