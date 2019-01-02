import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LeftSidebar from '../Left-SideBar/LeftSideBar';
import { loadQuestion } from '../../redux/actions/singleQuestion/singleQuestionActions';
import '../styles/singleQuestion.scss';
import AnswerComponent from '../Answers/Answers';

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
    };
  }

  componentDidMount() {
    this.getSingleQuestion();
  }

  getSingleQuestion = async () => {
    const questionId = this.props.match.params.id;
    const {
      loadSingleQuestion
    } = this.props;

    const response = await loadSingleQuestion(questionId);
    return this.setState({
      question: response.single.question,
    });
  };

  render() {
    const {
      question
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
                <span id="creation-date">{question.created_at}</span>
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

const SingleQuestion = connect(null, mapDispatchToProps)(ConnectedSingleQuestion);
export default SingleQuestion;
