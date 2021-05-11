// @flow
// https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
// https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e
export type Store = {
  dispatch: Function,
  subscribe: Function,
  getState: Function,
  replaceReducer: Function,
  runSaga: Function,
  injectedReducers: Object,
  injectedSagas: Object,
};
export type Action = { type: string, payload: Object };
export type Dispatch = (action: Action) => void;
export type AppState = {
  router: Object,
  home: Object,
};

export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    // $FlowIgnore
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: AppState) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('state', serializedState);
  } catch (err) {
    // die
  }
};
