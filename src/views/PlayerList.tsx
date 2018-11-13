import * as React from "react";
import styled from "styled-components";
import Player from "./Player";

const List = styled.ul`
  list-style: none;
`;

const PlayerList = props => (
  <div>
    <h2>{props.group}</h2>
    <List>
      {props.players.map(player => (
        <Player key={player} player={player} />
      ))}
      {Array(10 - props.players.length)
        .fill("empty")
        .map((el, i) => (
          <Player key={`empty${i}`} />
        ))}
    </List>
  </div>
);

export default PlayerList;
