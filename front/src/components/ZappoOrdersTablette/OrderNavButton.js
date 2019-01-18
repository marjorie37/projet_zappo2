import React, { Component } from "react";
import { StyledNavigation } from "../../styled/StyledOrdersNav";
import Sound from "react-sound";
import {
  Grid,
  Typography,
  Button,
  IconButton,
  Modal,
  Paper,
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Slide
} from "@material-ui/core";
import { PhonelinkLock, PhonelinkRing } from "@material-ui/icons";
import Slider from "@material-ui/lab/Slider";
import sound from "../../assets/sounds/quite-impressed.mp3";
import { PowerButton } from "./svg/PowerButton";

import axios from "axios";
import config from "../../assets/lib/axiosStaff";

import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Transition = props => <Slide direction="up" {...props} />;

const style = {
  color: "white",
  fontSize: "30px",
  marginRight: "10px"
};

const styles = theme => ({
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    expandOpen: {
      transform: "rotate(180deg)"
    }
  }
});
class OrderNavButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 20,
      openDelay: false,
      controlled: false,
      position: 0,
      volume: 100,
      playbackRate: 1,
      loop: true,
      //playStatus: Sound.status.PLAYING,
      openPanic: false,
      panic: false
    };
    this.handleOpenDelay = this.handleOpenDelay.bind(this);
    this.handleCloseDelay = this.handleCloseDelay.bind(this);
    this.handleOpenPanic = this.handleOpenPanic.bind(this);
    this.handleClosePanic = this.handleClosePanic.bind(this);
    this.handleChangePanicMode = this.handleChangePanicMode.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios(config({}, "/orderdelay/1", "get")).then(res => {
      const { success, error } = res.data;
      if (success) {
        this.setState({ value: success });
      } else if (error) {
        console.log(error)
      }
    });
  }

  render() {
    const { value } = this.state;
    const { hiddenDelay, user } = this.props;
    let buttonDelay = "";
    if (!hiddenDelay) {
      buttonDelay = (
        <Button onClick={this.handleOpenDelay}>
          <Typography variant="subheading" style={{ color: "#fff" }}>
            <strong>Délai annoncé : {value} minutes</strong>
          </Typography>
        </Button>
      );
    }
    const panicIconColor = this.state.panic === false ? "inherit" : "secondary";
    return (
      <StyledNavigation>
        <Sound
          url={sound}
          playStatus={
            this.props.pending === true
              ? Sound.status.PLAYING
              : Sound.status.STOPPED
          }
          loop={this.state.loop}
          //playFromPosition={this.state.position}
          //volume={this.state.volume}
          //playbackRate={this.state.playbackRate}

          // onLoading={({ bytesLoaded, bytesTotal }) =>
          //   console.log(`${(bytesLoaded / bytesTotal) * 100}% loaded`)
          // }
          // onLoad={() => console.log("Loaded")}
          // onPlaying={({ position }) => console.log("Position", position)}
          // onStop={() => console.log("Stopped")}
        />
        <Dialog
          open={this.state.openPanic}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClosePanic}
          aria-labelledby="alert-panic-mode"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-panic-mode">
            {this.state.panic === false
              ? "Désactiver l'application"
              : "Ré-activer l'application"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {this.state.panic === false
                ? `Voulez vous réellement suspendre l'accès à l'application ? Les
              clients ne pourront pas faire de commandes tant que l'application
              sera suspendue.`
                : `Si vous réactivez l'accès à l'application, les
              clients pourront à nouveau passer des commandes.`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              fullwidth="true"
              variant="contained"
              color="secondary"
              onClick={this.handleChangePanicMode}
            >
              {this.state.panic === false
                ? `Suspendre l'application`
                : "Ré-activer l'application"}
            </Button>
          </DialogActions>
        </Dialog>
        <Modal
          aria-labelledby="modale delay"
          aria-describedby="modification du paramètre delay en base"
          open={this.state.openDelay}
          onClose={this.handleCloseDelay}
        >
          <Paper
            style={{
              position: "absolute",
              textAlign: "center",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%)`,
              width: "50%",
              boxShadow: "5px 5px 10px #000",
              padding: "30px"
            }}
          >
            <Typography variant="display1" color="primary">
              délai annoncé :
            </Typography>
            <Typography variant="display3" color="primary" gutterBottom>
              {value} minutes
            </Typography>
            <Typography variant="subheading" color="primary">
              Vous pouvez régler ici le temps annoncé aux clients pour la
              réalisation de leur commande.
            </Typography>
            <Slider
              style={{ marginTop: "50px" }}
              value={value}
              min={10}
              max={60}
              step={10}
              onChange={this.handleChange}
            />
          </Paper>
        </Modal>
        <Grid>
          <Typography
            variant="subheading"
            style={{ marginLeft: "10px", color: "#fff" }}
          >
            <IconButton onClick={this.handleOpenPanic} color={panicIconColor}>
              {this.state.panic === false ? (
                <PhonelinkRing />
              ) : (
                <PhonelinkLock />
              )}
            </IconButton>
            Zappo | Commandes à emporter
          </Typography>
        </Grid>
        <Grid>{buttonDelay}</Grid>
        <Grid>{user === null ? "" : <PowerButton style={style} />}</Grid>
      </StyledNavigation>
    );
  }

  /**
   *  ------------------ FONCTIONS --------------------
   */

  handleOpenDelay = () => {
    this.setState({ openDelay: true });
  };

  handleCloseDelay = () => {
    this.setState({ openDelay: false });
  };

  handleOpenPanic = () => {
    this.setState({ openPanic: true });
  };
  handleChangePanicMode = () => {
    const { panic } = this.state;
    panic ? socket.emit("warning", panic) : socket.emit("warning", panic);
    this.setState({ panic: !panic });
  };

  handleClosePanic = () => {
    this.setState({ openPanic: false });
  };

  handleChange = (event, value) => {
    axios(config({ time: value }, "/orderdelay/1", "post")).then(res => {
      const { success, error } = res.data;
      if (success) {
        this.setState({ value });
      }
      if (error) {
        console.log(error);
      }
    });
  };
}

export default withStyles(styles)(OrderNavButton);
