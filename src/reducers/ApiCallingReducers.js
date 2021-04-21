import * as types from '../actions/types';

const INITIAL_STATE = { message: '' };

export default (state = INITIAL_STATE, action) => {

  if (action != undefined && action.type != undefined)
    if (!(typeof action === "undefined") && !(typeof action.payload === "undefined")) {
      return action.payload;
    }
    else {
      return state;
    }
}
