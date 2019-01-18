import styled from "styled-components";
import background from "../assets/img/background.gif";

const RootContainer = styled.div`
  background-image: ${props => (props.img ? null : `url(${background})`)};
  background-attachment: fixed;
  background-repeat: repeat;
  min-height: 100vh;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: ${props => (props.overflowY ? "hidden" : null)};
  justify-content: ${props => (props.justify ? props.justify : null)};
`;

export default RootContainer;
