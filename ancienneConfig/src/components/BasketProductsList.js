import React, { Component } from "react";
import BasketProducts from "./BasketProducts";

class BasketProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0
    };
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }

  increase() {
    this.setState({
      quantity: this.state.quantity + 1
    });
  }

  decrease() {
    this.setState({
      quantity: this.state.quantity - 1
    });
  }

  render() {
    return (
      <div>
        <BasketProducts increase={this.increase} decrease={this.decrease} />
      </div>
    );
  }
}

export default BasketProductsList;
