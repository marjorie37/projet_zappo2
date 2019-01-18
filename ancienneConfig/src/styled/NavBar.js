import Styled from "styled-components";

export const Navigation = Styled.div`
    height:100px;
    width:100%;
    background:blue;
`;
export const NavHeader = Styled.h1`
    color:${props => (props.color ? props.color : "white")};
    background:${props => (props.connect ? "white" : "black")};
`;
