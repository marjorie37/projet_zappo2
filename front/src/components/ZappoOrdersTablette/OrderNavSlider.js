import React, { Component } from "react";
import { StyledNavColumn } from "../../styled/StyledOrdersNav";
import withNavChange from "./hoc/withNavChange";
import { withRouter } from "react-router";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Badge
} from "@material-ui/core";
import {
  Assignment,
  AssignmentTurnedIn,
  ExpandMore,
  ExpandLess,
  DeleteForever,
  AssignmentReturned
} from "@material-ui/icons";

class OrderNavSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusId: -1
    };
    this.handleDetail = this.handleDetail.bind(this);
  }

  render() {
    //const orders = this.props.orders;

    const { statusId } = this.state;
    const { pending, accepted, finished, canceled } = this.props;

    return (
      <StyledNavColumn>
        <List
          component="nav"
          style={{
            backgroundColor: "#fff",
            borderRight: "solid 1px rgba(0,0,0,0.2)"
          }}
        >
          <ListItem
            style={{ height: "8vh" }}
            button
            onClick={() => {
              this.handleCategory(0, "pending");
            }}
            divider
          >
            <ListItemIcon>
              {pending.length > 0 ? (
                <Badge badgeContent={pending.length} color="secondary">
                  <Assignment />
                </Badge>
              ) : (
                <Assignment />
              )}
            </ListItemIcon>
            <ListItemText inset primary="En attente" />
            {statusId === 0 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse
            in={statusId === 0 ? true : false}
            timeout="auto"
            unmountOnExit
          >
            <List
              component="div"
              disablePadding
              style={{ maxHeight: "66vh", overflow: "auto" }}
            >
              {pending.map((order, i) => (
                <ListItem
                  button
                  key={i}
                  divider
                  onClick={() => this.handleDetail(order)}
                >
                  <ListItemText
                    inset
                    primary={`N°${order.id}`}
                    secondary={order.user.name}
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>
          <ListItem
            style={{ height: "8vh" }}
            button
            onClick={() => {
              this.handleCategory(1, "accepted");
            }}
            divider
          >
            <ListItemIcon>
              {accepted.length > 0 ? (
                <Badge badgeContent={accepted.length} color="secondary">
                  <AssignmentReturned />
                </Badge>
              ) : (
                <AssignmentReturned />
              )}
            </ListItemIcon>
            <ListItemText inset primary="Validées" />
            {statusId === 1 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse
            in={statusId === 1 ? true : false}
            timeout="auto"
            unmountOnExit
          >
            <List
              component="div"
              disablePadding
              divider="true"
              style={{ maxHeight: "60vh", overflow: "auto" }}
            >
              {accepted.map((order, i) => (
                <ListItem button divider key={i}>
                  <ListItemText
                    inset
                    primary={`N°${order.id}`}
                    secondary={order.user.name}
                    onClick={() => this.handleDetail(order)}
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>
          <ListItem
            style={{ height: "8vh" }}
            button
            onClick={() => {
              this.handleCategory(2, "finished");
            }}
          >
            <ListItemIcon>
              {finished.length > 0 ? (
                <Badge badgeContent={finished.length} color="secondary">
                  <AssignmentTurnedIn />
                </Badge>
              ) : (
                <AssignmentTurnedIn />
              )}
            </ListItemIcon>
            <ListItemText inset primary="Terminé" />
            {statusId === 2 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse
            in={statusId === 2 ? true : false}
            timeout="auto"
            unmountOnExit
          >
            <List
              component="div"
              disablePadding
              divider="true"
              style={{ maxHeight: "66vh", overflow: "auto" }}
            >
              {finished.map((order, i) => (
                <ListItem button divider key={i}>
                  <ListItemText
                    inset
                    primary={`N°${order.id}`}
                    secondary={order.user.name}
                    onClick={() => this.handleDetail(order)}
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>
          <ListItem
            style={{ height: "8vh" }}
            button
            onClick={() => {
              this.handleCategory(3, "canceled");
            }}
          >
            <ListItemIcon>
              {canceled.length > 0 ? (
                <Badge badgeContent={canceled.length} color="secondary">
                  <DeleteForever />
                </Badge>
              ) : (
                <DeleteForever />
              )}
            </ListItemIcon>
            <ListItemText inset primary="Annulées" />
            {statusId === 3 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse
            in={statusId === 3 ? true : false}
            timeout="auto"
            unmountOnExit
          >
            <List
              component="div"
              disablePadding
              divider
              style={{ maxHeight: "66vh", overflow: "auto" }}
            >
              {canceled.map((order, i) => (
                <ListItem key={i} button divider>
                  <ListItemText
                    inset
                    key={i}
                    primary={`N°${order.id}`}
                    secondary={order.user.name}
                    onClick={() => this.handleDetail(order)}
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
      </StyledNavColumn>
    );
  }

  /**
   *  ---------------------- FONCTIONS ----------------------------
   */
  handleDetail(order) {
    this.props.handleClickChangeCard(order);
  }

  handleCategory(id, status) {
    this.props.handleChangeCategory(status);
    this.setState({ statusId: id });
  }
}

export default withRouter(withNavChange(OrderNavSlider));
