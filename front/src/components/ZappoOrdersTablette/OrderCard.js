import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import Ticket from "./Ticket";

import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Avatar,
} from "@material-ui/core";
import {
  LocalPizza,
  Print,
  LocalCafe,
  LocalDining,
  LocalBar,
  AccessTime
} from "@material-ui/icons";
import axios from "axios";
import config from "../../assets/lib/axiosStaff";
import moment from "moment";
import { StyledCardActions } from "../../styled/StyledOrdersNav";

class OrderCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: ""
    };
    this.handleStatus = this.handleStatus.bind(this);
    this.getDelay = this.getDelay.bind(this);
  }

  componentDidMount() {
    setInterval(() => this.getDelay(), 1000);
  }

  getDelay() {
    const { order } = this.props;
    const duration = moment.duration(
      moment(order.pending_time).diff(moment())
    );
    if (duration.isValid) {
      const { _data } = duration;
      this.setState({
        delay: moment
          .duration(_data)
          .locale("fr")
          .humanize(true)
      });
    }
  }

  handleStatus(id, status, chargeId) {
    const {updateStatus} = this.props;
    const newStatus = this.props.status[status];
    if(chargeId){
      axios(config({chargeId}, `/${newStatus}/${id}`, "post"))
      .then(res => {
        const { success, error } = res.data;
        if (success) {
          updateStatus({message:success});
        }
      })
      .catch(err => console.log(err));
    }else{
      axios(config({}, `/${newStatus}/${id}`, "post"))
      .then(res => {
        const { success, error } = res.data;
        if (success) {
          updateStatus({ message: success })
        }
      })
      .catch(err => console.log(err));
    }
  }

  render() {
    const { order } = this.props;
    const { delay } = this.state;
    const products = order !== null ? renderProducts(order) : [];
    const dense = products.length > 6 ? true : false;
    return (
      <Card style={{ width: "100%", height: "92vh" }} id="liste">
        <div>
          <CardHeader
            style={{ height: "10vh" }}
            action={
              order.state !== "0" ? (
                <div style={{ marginTop: "20px" }}>
                  <ReactToPrint
                    trigger={() => (
                      <IconButton component="a">
                        <Print />
                      </IconButton>
                    )}
                    content={() => this.componentRef}
                  />
                </div>
              ) : null
            }
            title={`N°${order.id} - ${
              order.user.name
            } - ${order.user.phone.replace(/\B(?=(\d{2})+(?!\d))/g, " ")}`}
            subheader={`Commande n° ${order.id} lancée le ${moment(order.pending_time).format('LL')}`}
          />
          <CardContent style={{ height: "62vh" }}>
            <List
              style={{ height: "52vh", overflow: "auto" }}
              dense={dense}
              id="listToPrint"
            >
              {products}
            </List>
            <div className="hiddenPrint">
              {order.comments.length > 1 && (
                <div>
                  <Typography variant="headline" style={{ marginTop: "10px" }}>
                    Commentaire :
                  </Typography>
                  <Typography variant="body1">{order.comments}</Typography>
                </div>
              )}
            </div>
          </CardContent>
          <DisplayActionsButton
            className="hiddenPrint"
            id={order.id}
            delay={delay}
            status={order.state}
            chargeId={order.chargeId}
            handleStatus={this.handleStatus}
          />
          <div style={{ height: "0", overflow: "hidden" }}>
            <Ticket
              order={this.props.order}
              ref={el => (this.componentRef = el)}
            />
          </div>
        </div>
      </Card>
    );
  }
}

const DisplayActionsButton = ({ id, status, handleStatus, delay, chargeId }) => {
  const pending = status === "0";
  const validate = status === "1";
  const finished = status === "2";
  const canceled = status === "3";

  return (
    <div className="hiddenPrint">
      <StyledCardActions>
        {!canceled && (
          <Grid container justify="space-between">
            {!finished && (
              <Grid item>
                <Button
                  onClick={() => {
                    pending ? handleStatus(id, 1,chargeId) : handleStatus(id, 2);
                  }}
                  variant="contained"
                  size="large"
                  color="primary"
                >
                  {pending ? "Valider" : "Terminer"}
                </Button>
              </Grid>
            )}
            {validate && (
              <Grid item>
                <div
                  style={{
                    backgroundColor: "#e3e9f2",
                    padding: "8px 1rem",
                    borderRadius: "3px",
                    border: "1px solid rgb(0,158,224)"
                  }}
                >
                  <Typography variant="button" color="primary">
                    <span>
                      <AccessTime
                        style={{
                          verticalAlign: "sub",
                          margin: "0",
                          padding: "0"
                        }}
                      />{" "}
                      Livraison : {delay}
                    </span>
                  </Typography>
                </div>
              </Grid>
            )}
            {pending && (
              <Grid item>
                <Button
                  onClick={() => {
                    handleStatus(id, 3, chargeId);
                  }}
                  variant="contained"
                  size="large"
                  color="secondary"
                  style={{ marginLeft: "auto" }}
                >
                  Refuser
                </Button>
              </Grid>
            )}
          </Grid>
        )}
      </StyledCardActions>
    </div>
  );
};

const renderProducts = ({ cart }) => {
  const GetIcon = ({ id }) => {
    if (id === 1) {
      return <LocalPizza />;
    } else if (id === 2) {
      return <LocalDining />;
    } else if (id === 3) {
      return <LocalCafe />;
    } else if (id === 4) {
      return <LocalBar />;
    } else {
      return null;
    }
  };
  return cart.map((elt, i) => {
    return (
      <ListItem divider key={i} style={{ paddingLeft: 0 }}>
        <Avatar>
          <GetIcon id={elt.category_id} />
        </Avatar>
        <ListItemText primary={`${elt.quantity} x ${elt.name}`} />
      </ListItem>
    );
  });
};

export default OrderCard;
