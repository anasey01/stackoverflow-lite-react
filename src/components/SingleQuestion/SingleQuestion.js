import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import LeftSidebar from '../Left-SideBar/LeftSideBar';
import { loadQuestion } from '../../redux/actions/singleQuestion/singleQuestionActions';
import AnswerComponent from '../Answers/Answers';
import store from '../../redux/store/index';
import calculateTiming from '../../utilities/formatTime/calculateTime';
import isOwner from '../../utilities/ownership/isOwner';
import '../styles/singleQuestion.scss';

const mapDispatchToProps = (dispatch) => {
  return {
    loadSingleQuestion: questionId => dispatch(loadQuestion(questionId)),
  };
};

export class ConnectedSingleQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionId: '',
      author: '',
      question: {},
      date: '',
      deleteButton: 'disabled',
    };
  }

  componentDidMount() {
    this.getSingleQuestion();
  }

  getSingleQuestion = async () => {
    const questionId = this.props.match.params.id;
    const {
      loadSingleQuestion,
      history,
    } = this.props;

    const response = await loadSingleQuestion(questionId);
    if (response.message === 'Invalid token.') {
      return setTimeout(() => history.push('/login'), 500);
    }
    const date = calculateTiming(response.single.question.created_at);
    return this.setState({
      question: response.single.question,
      date,
    });
  };

  render() {
    const {
      question,
      date,
    } = this.state;
    return (
      <div className="main container">
        <LeftSidebar />
        <div className="main-content-title">
          <div id="deleteModal" className="modal">
            <div id="modal-content" className="modal-content">
              <span id="close-modal" className="close-btn">&times;</span>
              <h1 id="modalHeader" />
              <p id="modalText" />
            </div>
          </div>
          <h1 id="question-title">{question.question_title}</h1>
          <div className="question-content">
            <p id="question-content">{question.question_content}</p>
            <div id="question-data-btns">
              <p className="asked-by-author" id="question-auth">
                <span id="question-author">{question.username}</span>
              </p>
              <p className="asked-by-time" id="question-time">
                <span id="creation-date">{date}</span>
              </p>
              <div id="deleteQuestion">
                <Link to="" className="btn deleteBtn" id="deleteQuestion">Delete Question</Link>
              </div>
              <AnswerComponent />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ConnectedSingleQuestion.propTypes = {
  loadSingleQuestion: propTypes.func,
  match: propTypes.object,
  history: propTypes.object
};

const SingleQuestion = connect(null, mapDispatchToProps)(ConnectedSingleQuestion);
export default SingleQuestion;
