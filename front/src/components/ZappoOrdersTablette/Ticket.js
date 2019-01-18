import React, { Component } from "react";
import moment from "moment";
import { Typography, ListItem, List } from "@material-ui/core";

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const order = this.props.order;
    return (
      <div style={{ padding: "1rem" }}>
        <Typography variant="title">
          N°{order.user.id} à retirer à{" "}
          {moment(order.pending_time).format("LT")}
        </Typography>
        <Typography>
          {order.user.name} - {order.user.phone}
        </Typography>
        <List
          style={{
            padding: "0",
            margin: "1rem 0 1rem 0",
            fontFamily: "Roboto"
          }}
        >
          {order.cart.map((elt, i) => (
            <ListItem
              key={i}
              divider
              style={{ margin: "0", padding: "0.5rem 0 0.5rem 0" }}
            >
              {elt.quantity} x {elt.name}
            </ListItem>
          ))}
        </List>
        {order.comments && (
          <Typography variant="caption" color="primary">
            {order.comments}
          </Typography>
        )}
        <div> </div>
      </div>
    );
  }
}

export default Ticket;
