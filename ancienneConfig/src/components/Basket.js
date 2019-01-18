import React, { Component } from "react";
import { Route } from "react-router-dom";
import MainHeader from "./MainHeader";
import { RootContainer } from "../styled/Index";
import BasketProductsList from "./BasketProductsList";
import FooterPrice from "./FooterPrice";
import GetTitle from "../assets/lib/getTitle";

class Basket extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <RootContainer>
        <MainHeader />
        <BasketProductsList />
        <FooterPrice />
      </RootContainer>
    );
  }
}

export default Basket;
