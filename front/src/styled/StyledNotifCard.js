import styled, { keyframes } from "styled-components";
import { CardMedia, Paper } from "@material-ui/core";
import { fadeInUpBig, fadeInUp } from "react-animations";

const bounceAnimation = keyframes`${fadeInUpBig}`;
const bounceFadeIn = keyframes`${fadeInUp}`;

export const StyledPaper = styled(Paper)`
  animation: 1s ${bounceAnimation};
`;

export const StyledFooterPrice = styled.div`
  animation: 1s ${bounceFadeIn};
  position: sticky;
  bottom: 0;
  width: 100%;
  background: #2c3e50;

  &&& {
    button {
      float: right;
      position: relative;
      bottom: 27px;
      right: 15px;
    }
  }
`;

export const StyledNotifCard = styled(CardMedia)`
  && {
    height: 0;
    padding-top: 50%;
    padding-bottom: 30%;
    background-size: cover;
    background-position: center;
    margin: 2%;
  }
`;
export const StyledRewardButton = styled.button`
  background-color: #009ee0;
  border-radius: 20px;
  border: none;
  padding: 1% 3%;
  margin-bottom: 4%;
`;
