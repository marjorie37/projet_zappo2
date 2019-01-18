import React, { Component } from "react";
import { StripeProvider } from "react-stripe-elements";
import MyStoreCheckout from "./StripeComponents/MyStoreCheckout";
import imageBasket from "../assets/img/thumbShoppingCart.jpg";
import MainHeader from "./MainHeader";
import { RootContainer } from "../styled/Index";

class ContPayStripe extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {

    const {history} = this.props;
    return (
      <RootContainer>
        <MainHeader
          {...this.props}
          pageTitle="Paiement"
          subTitle="Sécurisé avec Stripe"
          titleAvatars="Paiement"
          image={imageBasket}
          redirect={() => history.goBack()}
        />
        <StripeProvider apiKey="pk_test_igQR4GZSlAo5F12BtaNTRKm3">
          <MyStoreCheckout {...this.props}/>
        </StripeProvider>
      </RootContainer>
    );
  }
}

export default ContPayStripe;
