/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  FETCH_CHARACTERS_FAILURE,
  FETCH_CHARACTERS_INIT,
  FETCH_CHARACTERS_SUCCESS,
} from './constants';

export function fetchCharacters(request) {
  return {
    type: FETCH_CHARACTERS_INIT,
    request,
  };
}

export function fetchCharactersSuccess(characters) {
  return {
    type: FETCH_CHARACTERS_SUCCESS,
    characters,
  };
}

export function fetchCharactersFailure(message) {
  return {
    type: FETCH_CHARACTERS_FAILURE,
    message,
  };
}
