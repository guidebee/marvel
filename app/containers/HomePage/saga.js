/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest, delay } from 'redux-saga/effects';
import api from 'services/MarvelApi';
import { API_CALL_RETRY, FETCH_CHARACTERS_INIT } from './constants';
import { fetchCharactersFailure, fetchCharactersSuccess } from './actions';
/**
 * Github repos request/response handler
 */
export function* fetchCharacters(e, action) {
  try {
    const API = api.create();

    for (let i = 0; i < API_CALL_RETRY; i += 1) {
      try {
        const response = yield call(API.getCharacters, action.request);
        if (response.ok) {
          yield put(fetchCharactersSuccess(response.data));

          break;
        } else if (i >= API_CALL_RETRY) {
          yield put(fetchCharactersFailure(response.data.error));
        } else {
          yield call(delay, 2000);
        }
      } catch (error) {
        yield put(fetchCharactersFailure(error.message));
      }
    }
  } catch (err) {
    yield put(fetchCharactersFailure(err.message));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData(payload) {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(FETCH_CHARACTERS_INIT, fetchCharacters, payload);
}
