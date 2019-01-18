// import React, { Component } from "react";
// import { withTheme } from "@material-ui/core/styles";
// import Add from "@material-ui/icons";
// import Remove from "@material-ui/icons";

// class BasketProducts extends Component {
//   constructor(props) {
//     super(props);
//   this.state = {
//     products: [
//       {
//         id: 1,
//         title: "Margharita",
//         price: 9,
//         quantity: 1
//       },
//       {
//         id: 2,
//         title: "Forza d'Agro",
//         price: 12,
//         quantity: 1
//       },
//       {
//         id: 3,
//         title: "Agrigento",
//         price: 14,
//         quantity: 1
//       }
//     ]
//   };
//   this.up = this.up.bind(this);
//   this.down = this.down.bind(this);
// }

// down() {
//   this.props.decrease();
// }
// up() {
//   this.props.increase();
// }

//   render() {
//     return (
{
  /* <div>
        <List>
          {products.map(product => (
            <ListItem>
              <ListItemText>{product.title}</ListItemText>
              <Button
                onClick={this.up}
                variant="outlined"
                
              >
                <Add color="secondary" />
              </Button>
              <Button variant="outlined" >
                {this.state.product.quantity}
              </Button>
              <Button
                onClick={this.down}
                variant="outlined"
                
              >
                <Remove color="secondary" />
              </Button>
              <ListItemText>{product.price}</ListItemText>
              <Divider />
            </ListItem>
          ))}
        </List>
      </div> */
}
//     );
//   }
// }

// export default BasketProducts;

import React, { Component } from "react";
import {
  Grid,
  Button,
  Typography,
  IconButton,
  withTheme
} from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";

class BasketProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      price: 9
    };
    this.up = this.up.bind(this);
    this.down = this.down.bind(this);
    this.priceItem = this.priceItem.bind(this);
  }

  down() {
    this.setState({
      quantity: this.state.quantity - 1
    });
  }
  up() {
    this.setState({
      quantity: this.state.quantity + 1
    });
  }

  priceItem() {
    this.setState({
      price: this.state.price * this.state.quantity
    });
  }

  render() {
    return (
      <Grid item xs={12}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={6}>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="title" component="h2" color="primary">
                  Margharita
                  <IconButton color="secondary" />
                </Typography>
              </Grid>
              <Grid item>
                <Button onClick={this.up} variant="outlined">
                  <Add color="secondary" />
                </Button>
                <Button variant="outlined">{this.state.quantity}</Button>
                <Button onClick={this.down} variant="outlined">
                  <Remove color="secondary" />
                </Button>
                <Typography variant="body2" component="p">
                  <strong>
                    {this.state.price}
                    <span style={{ color: "#919191" }}>€</span>
                  </strong>
                </Typography>
              </Grid>
              <Grid item xs={12} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withTheme()(BasketProducts);
