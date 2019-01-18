import React, { Component } from "react";
import { withRouter, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
//ROUTES FIRST LEVEL
import { AuthUserRoads } from "../routes";
import { mainRoad } from "../roads";
import "./style.css";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      online: true
    };
  }

  componentDidMount() {
    socket.on("online", bool => this.setState({ online: bool }));
  }

  render() {
    const { online } = this.state;
    const { location } = this.props;
    return (
      <div>
        {/* <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames='message-enter'
          >
          <Switch location={location}> */}
        <AuthUserRoads {...this.props} roadTab={mainRoad(online)} />
        {/* </Switch>
            </CSSTransition>
        </TransitionGroup> */}
      </div>
    );
  }
}

export default withRouter(App);
