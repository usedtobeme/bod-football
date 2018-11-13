import * as React from "react";
import styled from "styled-components";
import Button from "./Button";
import colors from "../colors";

const ListItem = styled.div`
  padding: 0.5em 1em;
  background: ${colors.background};
  border-radius: 5px;
  margin: 0.5em;
`;

const Player = props => (
  <ListItem>
    <div>{props.player || `Empty slot!`}</div>
  </ListItem>
);

export default Player;
