import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import LeftSidebar from '../Left-SideBar/LeftSideBar';
import AnswerComponent from '../Answer/Answer';
import Loader from '../loader/Loader';
import store from '../../redux/store/index';
import calculateTiming from '../../utilities/formatTime/calculateTime';
import isOwner from '../../utilities/ownership/isOwner';
import '../styles/singleQuestion.scss';
import {
  loadQuestion,
  deleteQuestion
} from '../../redux/actions/singleQuestion/singleQuestionActions';
import { notify } from '../../utilities/toast/notify';

const mapDispatchToProps = (dispatch) => {
  return {
    loadSingleQuestion: questionId => dispatch(loadQuestion(questionId)),
    deleteUserQuestion: questionId => dispatch(deleteQuestion(questionId)),
  };
};

const mapStateToProps = state => ({
  loading: state.singleQuestionReducer.loading,
});
export class ConnectedSingleQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionId: '',
      author: '',
      question: {},
      answers: [],
      date: '',
      deleteButton: 'disabled',
      isOwner: false,
      showModal: false,
      heading: '',
      modalHeading: '',
      modalText: '',
    };
  }

  componentDidMount() {
    this.getSingleQuestion();
  }

  updateAnswers = (answers) => {
    this.setState({ answers });
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
    const author = response.single.question.username;
    const loggedInUser = store.getState().loginReducer.username;
    const signedUpUser = store.getState().signupReducer.username;
    const loggedInUsername = loggedInUser || signedUpUser;
    const owner = isOwner(loggedInUsername, author);
    const deleteButton = owner === 'owner' ? 'enabled' : 'disabled';
    this.setState({
      question: response.single.question,
      answers: response.single.answer,
      date,
      author,
      isOwner: owner,
      deleteButton,
      questionId,
    });
  };

  displayModal = (event) => {
    event.preventDefault();
    const modalHeading = 'DELETE QUESTION';
    const modalText = 'Question Will Be Lost PERMANENTLY';
    this.setState({
      modalHeading,
      modalText,
      showModal: true,
    });
  };

  cancleDelete = (event) => {
    event.preventDefault();
    this.setState({
      showModal: false,
    });
  }

  handleDelete = async (event) => {
    event.preventDefault();
    const {
      deleteUserQuestion,
      history,
    } = this.props;

    const response = await deleteUserQuestion(this.props.match.params.id);
    const {
      success,
      message,
    } = response;
    switch (success) {
    case true:
      notify(message, 'success');
      return setTimeout(() => history.push('/recentquestions', { prev: 'recentquestion' }), 500);
    default:
      notify(message, 'failure');
    }
  }


  render() {
    if (this.props.loading) return <Loader />;
    const {
      question,
      answers,
      date,
      deleteButton,
      showModal,
      modalHeading,
      modalText,
    } = this.state;
    const toggleModal = showModal ? 'enabled' : 'disabled';
    return (
      <div className="main container">
        <LeftSidebar />
        <div className="main-content-title">
          <div id="deleteModal" className={`modal ${toggleModal}`}>
            <div id="modal-content" className="modal-content">
              <span id="close-modal" className="close-btn"
                onClick={this.cancleDelete}>&times;</span>
              <h1 id="modalHeader">{modalHeading}</h1>
              <p id="modalText">{modalText}</p>
              <a className="deleteQuestion" onClick={this.handleDelete}>OK</a>
              <a className="cancelDelete" onClick={this.cancleDelete}>CANCEL</a>
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
              <div id="deleteQuestion" className={deleteButton}>
                <a
                  onClick={this.displayModal}
                  className="btn deleteBtn"
                  id="deleteQuestion">Delete Question</a>
              </div>
              <AnswerComponent
                updateAnswers={this.updateAnswers}
                questionId={this.props.match.params.id}
                answers={answers} />
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
  history: propTypes.object,
  loading: propTypes.bool,
  deleteUserQuestion: propTypes.func,
};

const SingleQuestion = connect(mapStateToProps, mapDispatchToProps)(ConnectedSingleQuestion);
export default SingleQuestion;
