import { combineReducers } from "redux";

import {
  WEB3_LOADED,
  WEB3_ACCOUNT_LOADED,
  TOKEN_LOADED,
  PLAY_LOADED,
  GET_NAME,
  CHANGE_TEST,
  SET_NAME,
} from "./actions";

const INITIAL_STATE = {
  connection: null,
  account: "",
  token: null,
  play: null,
  name: "",
  test: {
    name: "Testing",
    nicknames: ["a", "b", "c"],
    venue: {
      country: "SG",
      postCode: 12355,
    },
  },
};

export const web3 = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WEB3_LOADED:
      return {
        ...state,
        connection: action.connection,
      };
    case WEB3_ACCOUNT_LOADED:
      return {
        ...state,
        account: action.account,
      };
    case TOKEN_LOADED:
      return {
        ...state,
        token: action.token,
      };
    case PLAY_LOADED:
      return {
        ...state,
        play: action.play,
      };
    case GET_NAME:
      return {
        ...state,
        name: action.name
      }
    case SET_NAME:
      return {
        ...state,
        name: action.name
      }
    case CHANGE_TEST:
      return {
        ...state,
        test: {
          ...state.test,
          name: action.name,
          nicknames: [...state.test.nicknames, action.name],
          venue: {
            ...state.test.venue,
            country: action.name,
          },
        },
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  web3,
});

export default rootReducer;
