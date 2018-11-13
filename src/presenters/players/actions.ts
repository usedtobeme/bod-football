import * as types from "./actionTypes";

export function syncPlayers() {
  return {
    type: types.SYNC_PLAYERS
  };
}

export function getPlayers(players) {
  return {
    type: types.GET_PLAYERS,
    players
  };
}

export function addPlayer(player, bucket) {
  return {
    type: types.ADD_PLAYER,
    player,
    bucket
  };
}

export function removePlayer(player) {
  return {
    type: types.REMOVE_PLAYER,
    player
  };
}
