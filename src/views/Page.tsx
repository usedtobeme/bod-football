import * as React from "react";
import styled from "styled-components";

const PageFlex = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
`;

const Page = ({ children }) => <PageFlex>{children}</PageFlex>;

export default Page;
