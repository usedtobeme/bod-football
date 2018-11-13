import * as types from "./actionTypes";

const initialState = {
  players: [],
  bench: []
};

export default function playersReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_PLAYERS:
      return {
        ...state,
        players: [...action.players.players],
        bench: [...action.players.bench]
      };
    default:
      return state;
  }
}
