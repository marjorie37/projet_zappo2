import Styled from "styled-components";

export const StyledTimeContainer = Styled.div`
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    height:${props => (props.timeOpen ? "auto" : "0")};
    flex-direction:column;
    justify-content:space-around;
    background:#2c3e50;
    z-index:5000;
    transition: 0.8s;
    display:${props => (props.timeOpen ? "flex" : "none")};
`;

export const StyledDatePicker = Styled.div`
  &&& {
    color: white;
    display:flex;
    align-items:center;
    .MuiInput-input-198 {
      color: white;
      text-align:center;
    }
    .MuiInput-root-190{
      margin: 0 5px;
    }
    .MuiInput-underline-194:before,
    .MuiInput-underline-194:after {
      border-bottom: 0px;
    }
  }
`;
