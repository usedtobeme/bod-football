import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { login, register } from "../presenters/user/actions";
import Button from "./Button";
import colors from "../colors";

const FullScreenFlex = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  border-radius: 12px;
  background-color: ${colors.background};
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  box-shadow: 0px 0px 4px ${colors.shadow};
`;

const CardTitle = styled.div`
  border-bottom: 2px solid ${colors.border};
  text-align: center;
  text-transform: uppercase;
  font-size: 1.5em;
  line-height: 1;
  padding: 1em;
`;

const ErrorBlock = styled.div`
  background-color: ${colors.error};
  padding: 1em;
`;

const CardBody = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1em;
`;

const CardActions = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  padding: 1em;
  border-top: 2px solid ${colors.border};
`;

const Field = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  margin: 0.5em 0;

  a {
    cursor: pointer;
    color: ${colors.cta};

    &:hover {
      color: ${colors.ctaHover};
    }
  }

  label {
    padding: 0 1em;
    width: 70px;
  }

  input {
    margin: 0 1em;
    border-radius: 5px;
    padding: 0.5em;
    border: 2px solid ${colors.border};

    &:invalid {
      border-color: ${colors.error};
    }
  }
`;

function handleRegister(e) {}

function Login(props) {
  let [register, setRegister] = useState(false);
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");

  return (
    <FullScreenFlex>
      <Card>
        <CardTitle>BOD Football</CardTitle>
        {props.error && <ErrorBlock>{props.error}</ErrorBlock>}
        <CardBody>
          <Field>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              required
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <p>@endava.com</p>
          </Field>
          <Field>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Field>
        </CardBody>
        <CardActions>
          {register ? (
            <Field>
              <a onClick={() => setRegister(false)}>Cancel</a>
              <Button
                onClick={() =>
                  props.register({ email: `${email}@endava.com`, password })
                }
              >
                Register
              </Button>
            </Field>
          ) : (
            <Field>
              <Button onClick={() => setRegister(true)}>Register</Button>
              <Button
                onClick={() =>
                  props.login({ email: `${email}@endava.com`, password })
                }
              >
                Login
              </Button>
            </Field>
          )}
        </CardActions>
      </Card>
    </FullScreenFlex>
  );
}

function getState(state) {
  return {
    user: state.user,
    error: state.user.errorMessage
  };
}

function getActions(dispatch) {
  return {
    login: user => dispatch(login(user)),
    register: user => dispatch(register(user))
  };
}

export default connect(
  getState,
  getActions
)(Login);
