import Styled from "styled-components";
import { Paper } from "@material-ui/core";

export const StyledOrdersImage = Styled.img`
  
  
    padding : 1.5rem;


`;
export const StyledOrdersBackground = Styled.div`
background:#2c3e50;
min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y:${props => (props.overflowY ? "hidden" : null)};
`;

export const StyledOrdersPaper = Styled(Paper)`
    padding: 3rem;
    padding-bottom : 1rem;
    margin: 3rem;
    margin-bottom : 1rem;
    height: 70vh;
`;
