import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from '../reducers/rootReducer';

const middleware = process.env.NODE_ENV !== 'production'
  ? [require('redux-immutable-state-invariant').default(), thunk]
  : [thunk];
/**
 * @param {*} initialState
 * @return {*} createStore
 */
function configureStore() {
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware)),
  );
}

const store = configureStore();
window.store = store;

store.subscribe(() => localStorage.setItem('login', JSON.stringify(store.getState().loginReducer)));
store.subscribe(() => localStorage.setItem('signup', JSON.stringify(store.getState().signupReducer)));
export default store;
