import React, { Component } from "react";
import imageCommande from "../assets/img/thumbShoppingCart.jpg";
import OrderBill from "./OrderBill";
import { withRouter } from "react-router-dom";
// STYLED COMPONENTS
import RootContainer from "../styled/RootContainer";

// ZAPPO COMPONENTS
import MainHeader from "./MainHeader";

class ContOrderResume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: ""
    };
    this.getOrder = this.getOrder.bind(this);
  }

  getOrder(order) {
    this.setState({ order });
  }

  render() {
    const { order } = this.state;
    const { id } = this.props.match.params;
    const { history } = this.props;

    return (
      <RootContainer>
        <MainHeader
          pageTitle="Commande"
          subTitle={`Commande n°${order.uid}`}
          image={imageCommande}
          redirect={() => history.goBack()}
        />
        {this.props.user && (
          <OrderBill
            order={this.getOrder}
            orderId={id}
            user={this.props.user}
          />
        )}
      </RootContainer>
    );
  }
}

export default withRouter(ContOrderResume);
