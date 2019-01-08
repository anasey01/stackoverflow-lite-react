import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  postAnswer, getAllAnswers,
} from '../../redux/actions/answer/answerActions';
import { notify, ToastContainer } from '../../utilities/toast/notify';
import calculateTime from '../../utilities/formatTime/calculateTime';

const mapDispatchToProps = dispatch => ({
  postUserAnswer: (questionId, answer) => dispatch(postAnswer(questionId, answer)),
  getAnswersForSpecificQuestion: questionId => dispatch(getAllAnswers(questionId)),
});

const mapStateToProps = state => ({
  loading: state.postAnswerReducer.loading,
  answer: state.postAnswerReducer.answer,
  answersFromReducer: state.postAnswerReducer.answers,
});

export class ConnectAnswerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      answers: [],
    };

    this.inputValue = React.createRef();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  getAllAnswer = async () => {
    const {
      getAnswersForSpecificQuestion,
      questionId
    } = this.props;


    const update = await getAnswersForSpecificQuestion(questionId);
    return update;
  };

  renderAnswers = () => {
    const { answers } = this.props;

    if (answers) {
      return answers.map(a => (
        <div className="answers-by-others" key={a.answer_number}>
          <p id="username" className="name">{ a.username } <span id="timing">{calculateTime(a.created_at)}</span></p>
          <p className="answer-by-others-content">{a.answer}</p>
        </div>
      ));
    }
    return null;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      answer,
    } = this.state;
    const {
      postUserAnswer,
      questionId
    } = this.props;
    const response = await postUserAnswer(questionId, answer);
    const {
      message,
      success,
    } = response;

    switch (success) {
    case true:
      await this.getAllAnswer();
      await this.props.updateAnswers(this.props.answersFromReducer.single.answer);
      notify(message, 'success');
      this.inputValue.current.value = '';
      break;
    default:
      notify(message, 'failure');
    }
  };

  render() {
    const {
      answers
    } = this.props;
    return (
      <div>
        <div className="answers-section">
          <h2>Answers</h2>
          <p className="number-of-answers"
            id="answer-count">{answers.length}<a href="#">
              <span id="number-of-answer" /> answer</a></p>
          <div id="answer-container">
            {this.renderAnswers() }
          </div>
        </div>
        <div className="question-answer">
          <ToastContainer />
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="question-answer">Your Answer Here</label>
            <textarea name="answer"
              id="question-answer"
              placeholder="Enter your answer here..."
              ref = {this.inputValue}
              onChange={this.handleChange} />
            <button
              id="answer-btn"
              className="btn question-answer-btn"
              type="submit">Post Your Answer</button>
          </form>
        </div>
      </div>
    );
  }
}

ConnectAnswerComponent.propTypes = {
  getAnswersForSpecificQuestion: propTypes.func,
  questionId: propTypes.string,
  answers: propTypes.array,
  postUserAnswer: propTypes.func,
  updateAnswers: propTypes.func,
};

const AnswerComponent = connect(mapStateToProps, mapDispatchToProps)(ConnectAnswerComponent);
export default AnswerComponent;
