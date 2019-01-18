import styled from "styled-components";
import { ListItem, Button } from "@material-ui/core";

const StyledItem = styled(ListItem)`
  padding: 0;
  display: flex;
  width: 100%;
  &&& {
    box-sizing: initial;
  }

  .animated {
    transition: all 1s ease;
    opacity: 0;
    font-weight: bold;
    ${props => (props.animated ? `opacity: 1` : `opacity: 0`)};
  }

  .animatedassociated {
    transition: all 1s ease;
    opacity: 0;
    font-weight: bold;
    ${props => (props.animatedassociated ? `opacity: 1` : `opacity: 0`)};
  }

  hr {
    width: 80%;
    margin: 0 auto;
    border: 1px solid #eee;
    margin-top: 10px;
  }
  .MuiGrid-grid-xs-2-121 {
  }

  .MuiListItem-gutters-449 {
    box-sizing: initial;
  }

  h5 {
    font-size: 1rem;
    width: 310px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h6 {
    font-size: 0.8rem;
    width: 220px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .MuiTypography-gutterBottom-79 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .MuiListItem-default-358 {
    padding-bottom: 0px;
  }

  .MuiGrid-grid-xs-2-1984 {
    float: right;
    position: relative;
    left: 13px;
  }
`;
const StyledItemCart = StyledItem.extend`
  background: #fff;
  h3 {
    margin-bottom: 10px;
  }

  hr {
    border-color: #f4f5f7;
  }
`;

export const StyledHelp = styled.span`
  position: relative;
  bottom: 45px;
  left: 80px;
`;

const StyledItemButton = styled(Button)``;

export { StyledItem, StyledItemButton, StyledItemCart };
