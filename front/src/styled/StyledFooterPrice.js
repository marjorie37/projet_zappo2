import styled from "styled-components";
import { TableCell, ListItem, Button } from "@material-ui/core";

const StyledFooterPrice = styled.div`
  padding: 0px 0 20px 0;
`;

const StyledFooterCell = styled(TableCell)`
  && {
    color: white;
    font-size: "2em";
    padding: "0 5%";
    width: 100%;
  }
`;

const StyledFooterCell2 = styled(TableCell)`
  color: white;
  font-size: "1.2em";
  text-align: "center";
`;

const StyledListItem = styled(ListItem)`
  background: white;
  h4 {
    font-size: 1.1rem;
  }
`;

const StyledBtnOutPrice = styled(Button)`
  && {
    min-width: 34px;
    min-height: 34px;
    height: 28px;
    padding: 5px;
    margin: 0 10px;
    border: 1px solid #eee;
    background-image: linear-gradient(#fff, #efefef);
  }
`;

export {
  StyledFooterPrice,
  StyledFooterCell,
  StyledFooterCell2,
  StyledListItem,
  StyledBtnOutPrice
};
