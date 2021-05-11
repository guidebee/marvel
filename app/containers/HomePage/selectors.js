/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectCharacters = () =>
  createSelector(
    selectHome,
    homeState => homeState.characters,
  );

export { selectHome, makeSelectCharacters };
