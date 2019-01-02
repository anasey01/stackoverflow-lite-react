import React, { Component } from 'react';

class AnswerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: {},
    };
  }

  render() {
    return (
      <div>
        <div className="question-answer">
          <p id="message-output" />
          <form action="#" method="POST">
            <label htmlFor="question-answer">Your Answer Here</label>
            <textarea name="question-answer" id="question-answer" placeholder="Enter your answer here..." />
            <button id="answer-btn" className="btn question-answer-btn">Post Your Answer</button>
          </form>
        </div>
        <div className="answers-section">
          <p className="number-of-answers" id="answer-count"><a href="#"><span id="number-of-answer" /> answer</a></p>
          <h2>Answers</h2>
          <div id="answer-container" />
        </div>
      </div>
    );
  }
}

export default AnswerComponent;
