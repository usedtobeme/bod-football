import { combineReducers } from "redux";
import players from "./presenters/players/reducers";
import user from "./presenters/user/reducers";

const rootReducer = combineReducers({
  players,
  user
});

export default rootReducer;
