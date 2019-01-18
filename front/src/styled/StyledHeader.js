import styled from "styled-components";
import { AppBar } from "@material-ui/core";
const StyledHeader = styled(AppBar)`
  height: 90px;
  padding-top: 15px;
  position: fixed;
`;
export const StyledHeaderMenu = styled(AppBar)`
  &&& {
    position: fixed;
    top: 89px;
    transition: all 0.5 ease;
    div{
      justify-content:space-between;
    }
  }
`;

export { StyledHeader };
