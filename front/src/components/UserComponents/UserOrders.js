import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";

// MATERIAL UI
import {
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { NavigateNext } from "@material-ui/icons";
import axios from "axios";
import config from "../../assets/lib/axiosConfig";
import imageTable from "../../assets/img/emptyPicture.jpg";
import EmptyCard from "../EmptyCard";

class UserOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commandes: []
    };
    this.goOrder = this.goOrder.bind(this);
  }

  componentDidMount() {
    axios(config({}, `/customers/orders/${this.props.user.id}`, "get")).then(
      res => {
        this.setState({
          commandes: res.data
        });
      }
    );
  }

  goOrder(id) {
    this.props.history.push(`/commande/${id}`);
  }

  render() {
    const { commandes } = this.state;
    const dense = commandes.length > 5 ? true : false;
    let orderList = commandes.map((element, i) => {
      const divider =
        element === commandes[commandes.length - 1] ? false : true;

      return (
        <ListItem
          component="a"
          key={element.id}
          dense={dense}
          button
          onClick={() => this.goOrder(element.id)}
          divider={divider}
        >
          {element.state == 1 ? (
            <ListItemText
              primary={`Commande n°${element.uid}`}
              secondary="Commande en cours"
            />
          ) : (
            <ListItemText
              primary={`Commande n°${element.uid}`}
              secondary={moment(element.pending_time).format(
                "dddd DD MMMM à LT"
              )}
            />
          )}

          <ListItemSecondaryAction onClick={() => this.goOrder(element.id)}>
            <IconButton>
              <NavigateNext />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });

    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <Paper>
            {orderList.length >= 1 ? (
              <List>{orderList}</List>
            ) : (
              <Grid>
                <EmptyCard
                  title="Pas encore de commandes"
                  image={imageTable}
                  comment="Vous n'avez pas encore commandé chez Zappo, que diriez vous de jeter un oeil aux suggestions du chef ?"
                  link="/"
                  buttonText="Voir les suggestions"
                />
              </Grid>
            )}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(UserOrders);
