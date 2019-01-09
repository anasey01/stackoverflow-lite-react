import React, { Component } from 'react';

class HeroComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: '',
      heroText: {
        heading: '',
        subParagrapgh: '',
        paragraph: '',
      }
    };
  }

  componentDidUpdate() {

  }

  render() {
    const {
      displayComponent,
    } = this.props;
    return (
      <section id="hero-section">
        <div className="container" id="signup-display">
          <div id="welcome-text">
            <h1>Learn, Share and Build with other Developers</h1>
            <p>Thinking of a place to learn, share your knowledge, and build your careers?</p>
            <p>Join the developer's online community</p>
          </div>
          <div id="search-question">
            <form action="#">
              <input type="text" name="q" id="search" placeholder="Find any Question..." />
              <button className="btn" type="submit"id="searchBtn">Search</button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default HeroComponent;
