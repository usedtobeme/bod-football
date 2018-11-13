import * as React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { connect } from "react-redux";
import Page from "./views/Page";
import Login from "./views/Login";
import PlayerList from "./views/PlayerList";
import Button from "./views/Button";
import { syncUser, logout } from "./presenters/user/actions";
import {
  syncPlayers,
  addPlayer,
  removePlayer
} from "./presenters/players/actions";
import "./base.css";

const HeadBar = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  background-color: hsla(45, 12, 12, 0.8);
  width: 100%;
`;

function App(props) {
  useEffect(() => {
    props.syncUser();
    props.syncPlayers();
  }, []);

  if (props.user) {
    return (
      <Page>
        <HeadBar>
          <div>
            <h2>{props.user.email}</h2>
          </div>
          <div>
            <h2>
              {moment()
                .day(4)
                .format("dddd, MMM Do")}
            </h2>
          </div>
          <div>
            <Button onClick={() => props.addPlayer(props.user, "players")}>
              Join Game
            </Button>
            <Button onClick={() => props.addPlayer(props.user, "bench")}>
              Join Bench
            </Button>
            <Button onClick={() => props.removePlayer(props.user)}>
              Withdraw
            </Button>
            <Button onClick={props.logout}>Logout</Button>
          </div>
        </HeadBar>
        <PlayerList players={props.players} group="Players" />
        <PlayerList players={props.bench} group="Bench" />
      </Page>
    );
  } else {
    return <Login />;
  }
}

function getState(state) {
  return {
    user: state.user.user,
    players: state.players.players,
    bench: state.players.bench
  };
}

function getActions(dispatch) {
  return {
    syncPlayers: () => dispatch(syncPlayers()),
    syncUser: () => dispatch(syncUser()),
    logout: () => dispatch(logout()),
    addPlayer: (player, bucket) => dispatch(addPlayer(player, bucket)),
    removePlayer: user => dispatch(removePlayer(user))
  };
}

export default connect(
  getState,
  getActions
)(App);
