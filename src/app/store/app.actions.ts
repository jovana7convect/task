import { createAction } from '@ngrx/store';

export const setAppVersion = createAction(
  'AppVersion/SetAppVersion',
  (version: string) => ({ version }),
);
