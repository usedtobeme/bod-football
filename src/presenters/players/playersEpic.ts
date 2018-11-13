import { from, fromEvent, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import { getPlayers } from "./actions";
import * as types from "./actionTypes";
import firebase from "./../../firebase";

export const sync = action$ => {
  return action$.pipe(
    ofType(types.SYNC_PLAYERS),
    mergeMap(() =>
      fromEvent(firebase.database().ref(), "value").pipe(
        map(snap => {
          let data = snap.val();
          return getPlayers({
            players: data && data.players ? Object.values(data.players) : [],
            bench: data && data.bench ? Object.values(data.bench) : []
          });
        })
      )
    )
  );
};

export const add = action$ =>
  action$.pipe(
    ofType(types.ADD_PLAYER),
    mergeMap(action =>
      from(
        firebase
          .database()
          .ref(`${action.bucket}/${action.player.uid}`)
          .set(action.player.email)
      ).pipe(
        map(() => ({
          type: "BOGUS_UPDATE"
        })),
        catchError(({ message }) => console.log(message))
      )
    )
  );

export const remove = action$ =>
  action$.pipe(
    ofType(types.REMOVE_PLAYER),
    mergeMap(action =>
      from(
        firebase
          .database()
          .ref(`players/${action.player.uid}`)
          .remove()
      ).pipe(
        map(() => ({
          type: "BOGUS_UPDATE"
        })),
        catchError(({ message }) => console.log(message))
      )
    )
  );
