import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from '../loader/Loader';
import { notify, ToastContainer } from '../../utilities/toast/notify';
import { createQuestion } from '../../redux/actions/create-question/createQuestionActions';
import '../styles/createQuestion.scss';

const mapDispatchToProps = dispatch => ({
  createUserQuestion: question => dispatch(createQuestion(question))
});

const mapStateToProps = state => ({
  loading: state.createQuestionReducer.loading,
});
export class ConnectedCreateQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionTitle: '',
      questionContent: '',
      questionId: null,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      createUserQuestion,
      history,
    } = this.props;
    const questionInfo = await createUserQuestion(this.state);
    const {
      success,
      message,
    } = questionInfo;
    switch (success) {
    case true:
      notify(message, 'success');
      // eslint-disable-next-line no-case-declarations
      const questionId = questionInfo.question.question_id;
      this.setState({
        questionId,
      });
      break;
    default:
      return notify(message, 'failure');
    }
    return setTimeout(() => history.push(`/questions/${this.state.questionId}`), 5000);
  };

  render() {
    if (this.props.loading) return <Loader />;
    return (
      <div className="main min-height">
        <aside>
          <div id="left-sidebar">
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/recent-questions">Recent Questions</Link></li>
                <li id="no-border" className="highlight-current"><Link to="/createquestion">Ask a Question</Link></li>
              </ul>
            </nav>
          </div>
        </aside>
        <div className="main-content-title">
          <form id="create-question-form" onSubmit={this.handleSubmit}>
            <ToastContainer />
            <label id="label-title" htmlFor="title">Title:</label>
            <input type="text"
              onChange={this.handleChange}
              id="title" name="questionTitle"
              placeholder="Title" />
            <label id="label-question" htmlFor="content">Your Question:</label>
            <textarea name="questionContent"
              onChange={this.handleChange}
              id="content"
              placeholder="Your Question Here..." />
            <button type="submit"
              className="btn question-answer-btn"
              id="btn post-question"> Post Your Question </button>
          </form>
        </div>
      </div>
    );
  }
}

ConnectedCreateQuestion.propTypes = {
  createUserQuestion: propTypes.func.isRequired,
  history: propTypes.object,
  loading: propTypes.bool,
};

const CreateQuestion = connect(mapStateToProps, mapDispatchToProps)(ConnectedCreateQuestion);
export default CreateQuestion;
