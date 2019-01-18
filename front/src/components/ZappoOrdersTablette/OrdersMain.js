import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import OrderNavSlider from "./OrderNavSlider";
import OrderDetails from "./OrderDetails";
import OrderNavButton from "./OrderNavButton";
import RootContainer from "../../styled/RootContainer";
import { StyledMainColumn } from "../../styled/StyledOrdersNav";
import axios from "axios";
import config from "../../assets/lib/axiosStaff";
import io from "socket.io-client";


const socket = io("http://localhost:5000");



class OrdersMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending:[],
      accepted:[],
      finished:[],
      canceled:[],
      status: ["attente", "valider", "terminer", "annuler"]
    };
    this.handleClickChangeCard = this.handleClickChangeCard.bind(this);
    this.filterByStatus = this.filterByStatus.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
  }

  filterByStatus(orders) {
    const status = ["pending", "accepted", "finished", "canceled"]
    return status.reduce((ac,el,i,tab)=>
     {ac[status[i]]=orders.filter(el => Number(el.state) === i);return ac},{})
  }

  componentDidMount() {
    if (this.props.user === null) this.props.history.push('/zappo/connexion');
    axios(config({},"/","get")).then(res => {
      this.setState(this.filterByStatus(res.data));
    });
    socket.on("created", orders => this.setState(this.filterByStatus(orders)));
    socket.on("updated", orders => this.setState(this.filterByStatus(orders)));
  }

  componentDidUpdate(prevProps, prevState) {
    const {activateListItem:prevActivateListItem} = prevState;
    const { activateListItem } = this.state;
    const activateList = this.state[activateListItem];
    const prevActivateList = prevActivateListItem ? prevState[prevActivateListItem] : null;

    if (prevActivateList !== null && activateList !== null) {
      if (activateList.length !== prevActivateList.length) {
        this.setState({ activateOrder: activateList[0] })
      }
    }
  }


  handleClickChangeCard(activateOrder) {
    this.setState({ activateOrder });
  }

  handleChangeCategory(status){
    this.setState({activateListItem:status})
  }

  render() {
    const {pending,status, activateListItem, activateOrder} = this.state;

    return (
      <RootContainer img overflowY>
        <OrderNavButton pending={pending.length > 0 ? true : false} />
        <Grid container>
          <OrderNavSlider
            handleChangeCategory={this.handleChangeCategory}
            handleClickChangeCard={this.handleClickChangeCard}
            {...this.state}
          />
          <StyledMainColumn>
            <OrderDetails
              listItem={activateListItem}
              orderTab={activateListItem ? this.state[activateListItem] : []}
              order={activateOrder ? activateOrder : null}
              status={status}
            />
          </StyledMainColumn>
        </Grid>
      </RootContainer>
    );
  }
}

export default OrdersMain;
