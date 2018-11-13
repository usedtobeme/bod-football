import * as React from "react";
import styled from "styled-components";
import colors from "../colors";

const actionType = {
  logout: {}
};

const Button = styled.button`
  background-color: ${colors.cta};
  color: ${colors.ctaText};
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  padding: 1em;
  margin: 0.5em 1em;
  text-transform: uppercase;

  &: hover {
    background-color: ${colors.ctaHover};
  }
`;

export default Button;
