import styled from "styled-components";
import { Grid } from "@material-ui/core";
import { CardNumberElement } from "react-stripe-elements";

export const StyledNumberCard = styled(CardNumberElement)`
  &&& {
    font-size: 28px;
    color: red;
  }
`;

export const StyledGrid = styled(Grid)`
  &&& {

    .MuiFormControl-root-196 {
      display: block;
      margin-top: 20px;

      .ElementsApp,
      .ElementsApp .InputElement {
        font-size: 19px;
      }
    }
  }
`;
