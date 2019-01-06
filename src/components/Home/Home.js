import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import HeroComponent from '../Hero/Hero';
import { getAllQuestion } from '../../redux/actions/allQuestion/allQuestionAction';
import calculateTiming from '../../utilities/formatTime/calculateTime';

const mapDispatchToProps = dispatch => ({
  getAllUsersQuestion: () => (dispatch(getAllQuestion())),
});

export class ConnectedHomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    this.getRecentQuestions();
  }

  getRecentQuestions = async () => {
    const {
      getAllUsersQuestion
    } = this.props;
    const questions = await getAllUsersQuestion();
    this.setState({
      questions,
    });
  };

  render() {
    const { questions } = this.state;
    return (
      <div className="min-height">
        <HeroComponent />
        <main className="container"id="main-section">
          <aside id="left-sidebar">
            <nav>
              <ul>
                <li className="highlight-current"><Link to="/">Home</Link></li>
                <li><Link to="/recentquestions" className="auth">Recent Questions</Link></li>
                <li><Link id="hidden"
                  to="/createquestion"
                  className="auth">Ask a Question</Link></li>
              </ul>
            </nav>
          </aside>
          <div className="main-content-title">
            <h1>Recent Questions</h1>
            <div id="question-container" className="top-questions-list">

              { questions.map(question => (
                <div key={question.question_id} className="top-questions-list">
                  <div className="question-summary">
                    <div className="summary">
                      <h3><Link
                        to={`/questions/${question.question_id}`}>
                        {question.question_title}</Link></h3>
                    </div>
                    <div className="asked-by">
                      <span className="number-of-answers">
                        {question.noofanswer} <span>answer</span></span>
                      <a className="asked-by-time">{calculateTiming(question.created_at)}</a>
                      <a className="asked-by-author" href="#">{question.username}</a>
                    </div>
                  </div>
                </div>
              )) }

            </div>
          </div>
        </main>
      </div>
    );
  }
}

ConnectedHomeComponent.propTypes = {
  getAllUsersQuestion: propTypes.func.isRequired,
};

const HomeComponent = connect(null, mapDispatchToProps)(ConnectedHomeComponent);

export default HomeComponent;
