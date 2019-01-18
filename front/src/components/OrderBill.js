import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { OrderBillChip } from "../styled/Index";
// MATERIAL UI
import {
  Paper,
  Grid,
  Button,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Icon
} from "@material-ui/core";
import { Receipt } from "@material-ui/icons";
import axios from "axios";
import config from "../assets/lib/axiosConfig";

// ASSETS
import logoBill from "../assets/img/zappoLogoSmall.png";

class OrderBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {},
      reductions: "",
      zappoAddress: {
        street: "6 rue Challemel Lacour",
        cp: 69007,
        city: "Lyon",
        phone: "04 72 71 79 88"
      }
    };
    this.getNewPoints = this.getNewPoints.bind(this);
    this.fillTheList = this.fillTheList.bind(this);
    this.getSubTotal = this.getSubTotal.bind(this);
    this.getReductions = this.getReductions.bind(this);
    this.getTotalPrice = this.getTotalPrice.bind(this);
    this.getTotalVatTen = this.getTotalVatTen.bind(this);
    this.getTotalVatTwenty = this.getTotalVatTwenty.bind(this);
  }

  magicRound(number) {
    let numberToRound = number * 100; // 556.845
    numberToRound = Math.round(numberToRound); // 556
    return (numberToRound = numberToRound / 100);
  }

  getNewPoints() {
    let pizzas = 0;
    if (this.state.order.cart) {
      this.state.order.cart.map(element => {
        return element.category_id === 1 ? (pizzas += element.quantity) : null;
      });
      return pizzas;
    }
  }
  backToCart() {
    let cart = [];
    cart = JSON.parse(localStorage.getItem("cart"));
    const cartItem = this.state.order.cart.map(r => r.id);
    const carts = cart.map(r => r.id);
    let index = cartItem.filter(val => carts.indexOf(val) !== -1);
    console.log(index, cartItem);
    if (index.length === 0) {
      cart = [...cart, ...this.state.order.cart];
    } else {
      let i = index.map(i => i);
      cart = carts.map(c => c === 1);
    }
  }
  // const index = carts.findIndex(elt => elt === cartItem);
  // console.log(index);
  // cart = [...this.state.order.cart, ...cart];
  // localStorage.setItem("cart", JSON.stringify(cart));

  // const index = state.findIndex(el => el.item.title === action.item.title);
  // if (index === -1) {
  //   return [...state, { item: action.item, quantity: action.quantity + 1 }];
  // } else {
  //   return state.map((item, i) =>
  //     index === i
  //       ? {
  //           ...item,
  //           quantity: item.quantity + action.quantity + 1
  //         }
  //       : item
  //   );
  // }

  fillTheList() {
    const orderedProducts = this.state.order.cart;
    if (orderedProducts) {
      return orderedProducts.map((element, i) => {
        const allInclusivePrice = element.ttc_price;
        const divider =
          element === orderedProducts[orderedProducts.length - 1]
            ? false
            : true;
        return (
          <ListItem divider={divider} style={{ paddingLeft: "0.4rem" }} key={i}>
            <ListItemText
              primary={`${element.quantity} ${element.name}`}
              secondary={`(Pu: ${this.magicRound(allInclusivePrice)}0)`}
            />
            <ListItemSecondaryAction>
              <Typography gutterBottom>
                {`${this.magicRound(allInclusivePrice * element.quantity)}0 €`}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
        );
      });
    }
  }
  /** Sous total de prix TTC avant calcul de reductions */
  getSubTotal() {
    let subTotal = 0;
    this.state.order.cart.map(
      element => (subTotal += element.ttc_price * element.quantity)
    );
    return subTotal;
  }
  /** Total de réductions TTC */
  getReductions() {
    if (this.state.order.cart) {
      const tab = [];
      this.state.order.cart.forEach(elt => {
        if (elt.free) {
          tab.push(elt.ttc_price * elt.free);
        }
      });
      return tab.length > 1 ? tab.reduce((a, b) => a + b) : null;
    }
  }

  /** Total des articles dont la TVA est 10 */
  getTotalVatTen() {
    const tab = [];
    if (this.state.order.cart) {
      this.state.order.cart.forEach(element => {
        if (element.tva === 10) {
          tab.push(
            this.magicRound(element.ttc_price - element.ht_price) *
              element.quantity
          );
        }
      });
      return tab.lenght >= 1 ? tab.reduce((a, b) => a + b) : 0;
    }
  }
  /** Total des articles dont la TVA est 20 */
  getTotalVatTwenty() {
    const tab = [];
    if (this.state.order.cart) {
      this.state.order.cart.forEach(element => {
        if (element.tva === 20) {
          tab.push(
            this.magicRound(element.ttc_price - element.ht_price) *
              element.quantity
          );
        }
      });
      return tab.length >= 1 ? tab.reduce((a, b) => a + b) : 0;
    }
  }

  getTotalHt() {
    if (this.state.order.cart) {
      const tab = this.state.order.cart.map(elt => elt.ht_price * elt.quantity);
      return tab.length > 1 ? tab.reduce((a, b) => a + b) : 0;
    }
  }

  /** Total net TTC (total moins les réductions éventuelles) */
  getTotalPrice(cart = []) {
    let tabReduc = [];
    const tab = [];
    cart.forEach(elt => {
      if (!elt.free) {
        tabReduc.push(elt.free);
      }
      tab.push(elt.ttc_price * elt.quantity);
    });

    const reduc = tabReduc.length ? tabReduc.reduce((a, b) => a + b, 0) : 0;
    const total = tab.length ? tab.reduce((a, b) => a + b) : 0;

    return total - reduc;
  }

  componentDidMount() {
    axios(
      config({}, `/order/${this.props.orderId}/${this.props.user.id}/`, "get")
    ).then(res => {
      this.setState({
        order: res.data
      });
      this.props.order(res.data);
    });
  }
  render() {
    const { order, zappoAddress } = this.state;

    return (
      <Grid container justify="center">
        <Grid item xs={11}>
          {order && (
            <Paper
              style={{
                marginTop: "1rem",
                padding: "15px",
                marginBottom: "1rem"
              }}
            >
              <Button
                component={Link}
                onClick={() => this.backToCart()}
                to="#"
                fullWidth
                variant="contained"
                size="large"
                color="secondary"
                style={{ marginBottom: "15px" }}
              >
                Remettre au panier
              </Button>
              <Grid container>
                <Grid item xs={6}>
                  <Typography align="left" variant="body1" gutterBottom>
                    N°{order.uid}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right" variant="body1" gutterBottom>
                    {moment(order.pending_time).format("dddd DD MMMM à LT")}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid
                container
                spacing={8}
                style={{ marginTop: "0.5rem" }}
                alignItems="center"
              >
                <Grid item xs={4}>
                  <img src={logoBill} alt="Zappo" style={{ width: "100%" }} />
                </Grid>
                <Grid item xs={8}>
                  <Typography align="left" variant="caption">
                    {zappoAddress.street}
                    <br />
                    {zappoAddress.cp} {zappoAddress.city}
                    <br />
                    {zappoAddress.phone}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center" style={{ marginTop: "1rem" }}>
                <Divider />
                <Grid item xs={6}>
                  <Typography align="left" variant="body1" color="primary">
                    <Icon style={{ textAlign: "baseline", fontSize: "0.9rem" }}>
                      local_pizza
                    </Icon>
                    <strong>+ {this.getNewPoints()} pts</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <OrderBillChip label={` ${this.state.order.totalTTC}0 €`} />
                  {/* label={`${this.magicRound(
                    this.getTotalPrice(order.cart)
                  )} €`}
                 */}
                </Grid>
                <Grid item xs={12}>
                  <List dense={true}>{this.fillTheList()} </List>
                  <List dense={true}>
                    <ListItem divider style={{ paddingLeft: "0.4rem" }}>
                      <ListItemText primary="Sous-Total" />
                      <ListItemSecondaryAction>
                        <Typography gutterBottom>
                          {`${this.state.order.totalTTC}0`} €
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem divider style={{ paddingLeft: "0.4rem" }}>
                      <ListItemText primary="Réduction" />
                      <ListItemSecondaryAction>
                        <Typography gutterBottom>
                          {/* {`- ${this.magicRound(this.getReductions())} €`} */}
                          0 €
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem divider style={{ paddingLeft: "0.4rem" }}>
                      <ListItemText primary={<strong>Total TTC</strong>} />
                      <ListItemSecondaryAction>
                        <Typography gutterBottom>
                          <strong>{`${this.state.order.totalTTC}0`}€</strong>
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              {/* CARTOUCHE AVEC LE DETAIL DES TAUX DE TVA */}
              <Grid container justify="flex-end">
                <Grid item xs={8}>
                  <List dense={true}>
                    <ListItem divider style={{ paddingLeft: "0.4rem" }}>
                      <ListItemText primary="Dont TVA 10%" />
                      <ListItemSecondaryAction>
                        <Typography gutterBottom>
                          {this.getTotalVatTen()} €
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem divider style={{ paddingLeft: "0.4rem" }}>
                      <ListItemText primary="Dont TVA 20%" />
                      <ListItemSecondaryAction>
                        <Typography gutterBottom>
                          {this.getTotalVatTwenty()} €
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem divider style={{ paddingLeft: "0.4rem" }}>
                      <ListItemText primary="Total HT" />
                      <ListItemSecondaryAction>
                        <Typography gutterBottom>
                          {this.state.order.totalHT}€
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              <Grid container spacing={8} style={{ marginTop: "1rem" }}>
                <Grid item xs={3}>
                  {order.state == 2 ? (
                    <Button
                      component={Link}
                      to="#"
                      fullWidth
                      variant="contained"
                      color="secondary"
                      style={{ marginBottom: "15px" }}
                    >
                      <Receipt style={{ marginRight: "0.4rem" }} />
                      PDF
                    </Button>
                  ) : null}
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body1" align="right">
                    Paiement par carte bleue
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default OrderBill;
