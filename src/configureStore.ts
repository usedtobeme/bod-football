import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { BehaviorSubject } from "rxjs";
import { switchMap } from "rxjs/operators";
import rootReducer from "./reducers";
import rootEpic from "./epics";

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
  const store = createStore(
    rootReducer /* preloadedState, */,
    compose(
      applyMiddleware(epicMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

  const epic$ = new BehaviorSubject(rootEpic);
  // Every time a new epic is given to epic$ it
  // will unsubscribe from the previous one then
  // call and subscribe to the new one because of
  // how switchMap works
  const hotReloadingEpic = (...args) =>
    epic$.pipe(switchMap(epic => epic(...args)));

  epicMiddleware.run(hotReloadingEpic);

  if (module.hot) {
    module.hot.accept("./epics", () => {
      const nextRootEpic = require("./epics").rootEpic;
      epic$.next(nextRootEpic);
    });
    module.hot.accept("./reducers", () => {
      const nextRootReducer = require("./reducers");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
