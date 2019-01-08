import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import HeroComponent from '../Hero/Hero';
import Loader from '../loader/Loader';
import { getAllQuestion } from '../../redux/actions/allQuestion/allQuestionAction';
import calculateTiming from '../../utilities/formatTime/calculateTime';

const mapDispatchToProps = dispatch => ({
  getAllUsersQuestion: () => (dispatch(getAllQuestion())),
});

const mapStateToProps = state => ({
  loading: state.allQuestionReducer.loading,
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

  renderHero = () => {
    if (window.location.pathname === '/recent-questions') {
      return null;
    }

    return <HeroComponent displayComponent={'enabled'}/>;
  }

  render() {
    const { questions } = this.state;
    if (this.props.loading) return <Loader />;
    return (
      <div className="min-height">
        {this.renderHero()}
        <main className="container"id="main-section">
          <aside id="left-sidebar">
            <nav>
              <ul>
                <li className="highlight-current"><Link to="/">Home</Link></li>
                <li><Link to="/recent-questions" className="auth">Recent Questions</Link></li>
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
  loading: propTypes.bool,
};

const HomeComponent = connect(mapStateToProps, mapDispatchToProps)(ConnectedHomeComponent);

export default HomeComponent;
