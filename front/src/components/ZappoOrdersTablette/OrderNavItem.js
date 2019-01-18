import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { StyledNavItem, StyledNavItemH3 } from "../../styled/StyledOrdersNav";

class OrderNavItem extends Component {
  render() {
    const { orders = [], title, open, handleClick } = this.props;

    return (
      <StyledNavItem open={open}>
        <Grid item xs={12} align="center">
          <StyledNavItem child onClick={handleClick}>
            <StyledNavItemH3>{title}</StyledNavItemH3>
          </StyledNavItem>
          {open &&
            orders.map((el, i) => (
              <Grid key={el + i} container>
                <StyledNavItem center child>
                  <h3 style={{ color: "white" }}>{el.numero}</h3>
                </StyledNavItem>
              </Grid>
            ))}
        </Grid>
      </StyledNavItem>
    );
  }
}

export default OrderNavItem;
