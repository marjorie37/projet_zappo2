import Styled, { keyframes } from "styled-components";
import { CardActions } from "../../node_modules/@material-ui/core";

export const StyledNavigation = Styled.nav`
    display:flex;
    align-items:center;
    justify-content:space-between;
    width:100%;
    height:8vh;
    background:#031828;
`;
export const StyledMenuIcon = Styled.span`
    position: absolute;
    top:50%;
    left:50%;

    display:block;
    width:22px;
    height:2px;

    background-color:${props => (props.open ? "transparent" : "#FFF")};
    transform: translateX(-50%) translateY(-50%);
    transition:${props =>
      props.open
        ? "transform 0.5s, background 0.5s steps(1, start)"
        : "transform 0.5s, background 0.5s steps(1, end)"};

    &:before,&:after{
        content:'';
       
        position:absolute;
        top:0;
        left:0;
        width:22px;
        height:2px;

        background-color:rgb(119, 173, 219);
        transform:translateY(-6px);
        transform-origin:100% 50%;
        transition: transform 0.5s;
    }
    &:after{
        transform:translateY(6px);
        transform:${props =>
          props.open ? "translateX(-3px) translateY(8px) rotate(45deg)" : null};
    }
    &:before{
        transform:${props =>
          props.open
            ? "translateX(-3px) translateY(-8px) rotate(-45deg)"
            : null};
    }
`;

export const StyledMenuBox = Styled.div`
    position: relative; 
    width: 54px;
    height: 54px;
`;

const pathAnimation = keyframes`
  0%{
    stroke-dashoffset: 0;
    stroke-dasharray: 18 230;
  }
  20%{
    stroke-dashoffset: -20;
  } 
  40%{
    stroke-dashoffset: -40;
  }
  60%{
    stroke-dashoffset: -60;
    stroke-dasharray: 170;
  }
`;

const pathAnimationOut = keyframes`
  100%{
    stroke-dashoffset: 0;
    stroke-dasharray: 0;
  }
  60%{
    stroke-dashoffset: 0;
  }
  40%{
    stroke-dashoffset: -20;
    stroke-dasharray: 18 230;
  } 
  20%{
    stroke-dashoffset: -40;
  }
  0%{
    stroke-dashoffset: -60;
    stroke-dasharray: 170;
  }
`;

export const StyledMenuSvg = Styled.svg`
    fill:transparent;
    stroke-width:"2px";
    padding:1px;
    stroke:rgb(44, 61, 78);
    transition: ${props =>
      props.open
        ? "opacity 0.5s steps(1, start)"
        : "stroke-dashoffset 0.5s, stroke-dasharray 0.5s, opacity 0.5s steps(1, end)"};
    opacity:${props => (props.open ? 1 : 0)};
    stroke-dashoffset:${props => (props.open ? "-60" : null)};
    stroke-dasharray:${props => (props.open ? "170" : "18 230")};
    animation:${props =>
      props.open
        ? `${pathAnimation} 1s linear`
        : `${pathAnimationOut} 1s linear`};
    animation-fill-mode: forwards;
`;

export const StyledNavColumn = Styled.div`
    display:flex;
    flex-direction: column;
    justify-content:flex-start;
    width:20%;
    height:100%;
    background:#031828;
    @media print {
        display: none;
    }
`;

export const StyledCardActions = Styled(CardActions)`
  height: "10vh"
  @media print {
    display: none;
  }
`;

export const StyledMainColumn = Styled.div`
    display:"flex";
    flex-direction: column;
    width:80%;
    height:92vh;
    background-color:  #2c3e50;
`;

const heigthAnimation = keyframes`
  0%{
    height:30px;
  }
  100%{
    height:100%;
  }
`;
const heigthAnimationOut = keyframes`
  100%{
    height:30px;
  }
  0%{
    height:100%;
  }
`;

export const StyledNavItem = Styled.div`
  font-family: Roboto, sans-serif;
  display:flex;
  width:100%;
  height:${props => (props.open ? "100%" : "auto")};
  border-top:${props => (props.child ? "" : "1px solid rgb(44, 61, 78)")};
  border-bottom:${props => (props.child ? "" : "1px solid rgb(44, 61, 78)")};
  background:${props => (props.title ? "rgb(44, 61, 78)" : "#031828")};
  justify-content:${props => (props.center ? "center" : null)};
  animation:${props =>
    props.open
      ? `${heigthAnimation} 0.6s linear`
      : `${heigthAnimationOut} 0.6s linear`};
  cursor:pointer;
`;

export const StyledNavItemH3 = Styled.h3`
  color:#FFF;
  margin:10px;
  height:30px;
  font-size: 17px;
  font-weight:400;
  text-transform:uppercase;
`;
