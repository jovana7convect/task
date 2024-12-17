import { createReducer, on } from '@ngrx/store';
import { initialState } from './app.state';
import { setAppVersion } from './app.actions';

const _appReducer = createReducer(initialState);

export const appReducer = createReducer(
  initialState,
  on(setAppVersion, (state, { version }) => ({
    ...state,
    apiVersion: version, // Update the apiVersion
  })),
);
