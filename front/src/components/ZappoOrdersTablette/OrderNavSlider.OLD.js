import React, { Component } from "react";
import { StyledNavColumn } from "../../styled/StyledOrdersNav";
import withNavChange from "./hoc/withNavChange";
import OrderNavItem from "./OrderNavItem";

class OrderNavSlider extends Component {
  render() {
    const { link, handleChangeLink } = this.props;

    return (
      <StyledNavColumn>
        <OrderNavItem
          handleClick={() => handleChangeLink(0)}
          open={link[0]}
          orders={[{ numero: "7979877" }, { numero: "7979877" }]}
          title="En Attente"
        />
        <OrderNavItem
          handleClick={() => handleChangeLink(1)}
          open={link[1]}
          title="Validé"
        />
        <OrderNavItem
          handleClick={() => handleChangeLink(2)}
          open={link[2]}
          title="Annulé"
        />
        <OrderNavItem title="Options" />
      </StyledNavColumn>
    );
  }
}

export default withNavChange(OrderNavSlider);
