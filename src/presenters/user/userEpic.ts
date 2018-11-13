import { from, fromEvent, Observable, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
import { ofType } from "redux-observable";
import * as types from "./actionTypes";
import { setUser } from "./actions";
import firebase from "./../../firebase";

export const syncUser = action$ =>
  action$.pipe(
    ofType(types.SYNC_USER),
    mergeMap(() =>
      Observable.create(observer =>
        firebase.auth().onAuthStateChanged(user => {
          return observer.next(user);
        })
      ).pipe(
        map(user => {
          return setUser(user);
        })
      )
    )
  );

export const logout = action$ =>
  action$.pipe(
    ofType(types.LOGOUT),
    mergeMap(action =>
      from(firebase.auth().signOut()).pipe(
        map(() => ({ type: types.LOGOUT_SUCCESS }))
      )
    )
  );

export const login = action$ =>
  action$.pipe(
    ofType(types.LOGIN),
    mergeMap(action =>
      from(
        firebase
          .auth()
          .signInWithEmailAndPassword(action.user.email, action.user.password)
      ).pipe(
        map(() => ({ type: types.LOGIN_SUCCESS })),
        catchError(({ message }) => of({ type: types.ERROR, message }))
      )
    )
  );

export const register = action$ =>
  action$.pipe(
    ofType(types.REGISTER),
    mergeMap(action =>
      from(
        firebase
          .auth()
          .createUserWithEmailAndPassword(
            action.user.email,
            action.user.password
          )
      ).pipe(
        map(() => ({
          type: types.REGISTER_SUCCESS
        })),
        catchError(({ message }) =>
          of({
            type: types.ERROR,
            message
          })
        )
      )
    )
  );
