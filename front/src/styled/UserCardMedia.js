import styled from "styled-components";
import { CardMedia } from "@material-ui/core";

const UserCardMedia = styled(CardMedia)`
  && {
    height: 0;
    padding-top: 40%;
    background-size: cover;
    background-position: center;
  }
`;

export default UserCardMedia;
