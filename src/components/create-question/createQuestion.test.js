import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import CreateQuestion, { ConnectedCreateQuestion } from './CreateQuestion';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<CreateQuestion />', () => {
  it('matches the snapshot', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const wrapper = shallow(<Provider store={store}>
      <CreateQuestion />
    </Provider>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should simulate state change', () => {
    const mockCreateQuestionFn = jest.fn();
    const wrapper = mount(<ConnectedCreateQuestion
      createUserQuestion={mockCreateQuestionFn} />);

    const title = wrapper.find('#title');
    title.instance().value = 'Some title';
    title.simulate('change');

    const content = wrapper.find('#content');
    content.instance().value = 'Some content';
    content.simulate('change');

    expect(wrapper.state()).toMatchObject({
      questionTitle: 'Some title',
      questionContent: 'Some content',
      questionId: null,
    });
    wrapper.unmount();
  });

  it('should simulate submiting form successfully', () => {
    const mockCreateQuestionFn = jest.fn();
    const wrapper = mount(<ConnectedCreateQuestion
      createUserQuestion={mockCreateQuestionFn} />);

    const title = wrapper.find('#title');
    title.instance().value = 'Some title';
    title.simulate('change');

    const content = wrapper.find('#content');
    content.instance().value = 'Some content';
    content.simulate('change');

    const form = wrapper.find('form');
    form.simulate('submit', { preventDefault() {} });
    expect(mockCreateQuestionFn.mock.calls[0][0]).toEqual({
      questionTitle: 'Some title',
      questionContent: 'Some content',
      questionId: null,
    });
    wrapper.unmount();
  });
});
