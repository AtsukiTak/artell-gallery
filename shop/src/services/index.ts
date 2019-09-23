import {combineReducers, Store as ReduxStore} from 'redux';

import * as art from './art';

export type Store = ReduxStore<RootState, RootAction>;

export type RootAction = art.Action;

export const rootReducer = combineReducers({
  art: art.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
