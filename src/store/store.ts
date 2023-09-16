import { legacy_createStore as createStore, combineReducers } from 'redux';
import { userReducer } from './user/user-reducer';
import { pageReducer } from './page/page-reducer';
import { composeWithDevTools } from '@redux-devtools/extension';

const rootReducer = combineReducers({
  user: userReducer,
  page: pageReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof rootReducer>;
export type RootDispatch = typeof store.dispatch;

export default store;