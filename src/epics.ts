import { combineEpics } from "redux-observable";
import { add, remove, sync } from "./presenters/players/playersEpic";
import { syncUser, register, logout, login } from "./presenters/user/userEpic";

const rootEpic = combineEpics(
  sync,
  add,
  remove,
  syncUser,
  register,
  logout,
  login
);

export default rootEpic;
