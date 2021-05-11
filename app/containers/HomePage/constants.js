/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const FETCH_CHARACTERS_INIT = 'app/HOME_PAGE/FETCH_CHARACTERS';
export const FETCH_CHARACTERS_SUCCESS =
  'app/HOME_PAGE/FETCH_CHARACTERS_SUCCESS';
export const FETCH_CHARACTERS_FAILURE =
  'app/HOME_PAGE/FETCH_CHARACTERS_FAILURE';
export const API_CALL_RETRY = 1;
