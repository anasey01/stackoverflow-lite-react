import React from 'react';
import { Link } from 'react-router-dom';

const LeftSidebar = () => {
  return (
    <aside>
      <div id="left-sidebar">
        <nav>
          <ul>
            <li className="highlight-current"><Link to="/">Home</Link></li>
            <li><Link to="/recentquestions">Recent Questions</Link></li>
            <li id="hidden"><Link to="/createQuestion">Ask a Question</Link></li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default LeftSidebar;
