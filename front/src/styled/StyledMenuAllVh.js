import styled, { css } from "styled-components";
import { Close } from "@material-ui/icons";

const bounce = css`
  visibility: visible;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  opacity: 1;
`;

// ${ props => (props.open ? `animation: ${bounce} 0.35s ease` : `animation: ${bounceR} 0.35s ease`) };

export const StyledMenuContainer = styled.div`
  background: #2c3e50;
  z-index: 1500;
  position: fixed;
  width: 300px;
  height: 100vh;
  transition: all 0.5s cubic-bezier(0, 0.8, 0.1, 1);
  top: 0;
  left: 0px;
  opacity: 0;
  visibility: visible;
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
  ${props => (props.open ? `${bounce}` : null)};

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    background: rgba(0, 0, 0, 0.2);
    content: "";
    opacity: 0;
    -webkit-transition: opacity 0.5s, width 0.1s 0.5s, height 0.1s 0.5s;
    transition: opacity 0.5s, width 0.1s 0.5s, height 0.1s 0.5s;
  }

  box-shadow: 11px 0px 20px 0px rgba(50, 50, 50, 0.3) inset;
  border-right: 1px solid #202d3a;
  h3 {
    font-family: "Bernardo Moda", "Franklin Gothic Medium", "Arial Narrow",
      Arial, sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.8rem;
    text-align: center
    margin: 0 auto;
    margin-top: 20px;
    color: white;
    margin-bottom: 10px;
     opacity: 0;
    transition: all 1.4s linear;
    text-shadow: 1px 1px #1c2e3f, 1px 1px #1c2e3f;
    ${props => (props.open ? `opacity: 1` : `opacity: 0`)};
  }
`;

export const StyledMenuItem = styled.li`
  display: flex;
  color: white;
  list-style: none;

  a {
    text-decoration: none;
    color: white;
    font-size: 25px;
    padding: 30px;
    cursor: pointer;
    border-bottom: 1px solid #1c2e3f;
    width: 100%;
    display: block;
    opacity: 0;
    transition: all 1s linear;
    text-shadow: 1px 1px #1c2e3f, 1px 1px #1c2e3f;
    ${props => (props.open ? `opacity: 1` : `opacity: 0`)};
  }
  &:hover {
    a {
      border-bottom: 1px solid white;
    }
  }
`;
export const StyledBrandZappoMenu = styled.span`
  font-family: "Bernardo Moda", "Franklin Gothic Medium", "Arial Narrow", Arial,
    sans-serif;
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.2rem;
`;

export const StyledIconClose = styled(Close)`
  && {
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 35px;
    color: white;
  }
`;
