/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { FETCH_CHARACTERS_SUCCESS } from './constants';

// The initial state of the App
export const initialState = {
  characters: null,
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_CHARACTERS_SUCCESS:
        draft.characters = action.characters ? action.characters.data : null;
        break;
    }
  });

export default homeReducer;
