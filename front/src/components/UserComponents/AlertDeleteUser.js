import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import config from "../../assets/lib/axiosConfig";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Icon } from "../../../node_modules/@material-ui/core";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  Button: {
    position: "relative",
    left: "20%",
    width: theme.spacing.unit * 18,
    marginBottom: theme.spacing.unit * 2
  },
  spanButton: {
    marginRight: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

class AlertDialogSlide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteUser(id) {
    axios(config({}, `/moncompte/supprimer/${id}`, "post"))
      .then(res => {
        this.props.user.history.push("/");
      })
      .then(localStorage.clear());
  }

  render() {
    const { classes, user } = this.props;
    console.log(user);
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Suppression de compte</Button>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle
            id="alert-dialog-slide-title"
            style={{ textAlign: "center" }}
          >
            {"  Êtes-vous sur de vouloir supprimer votre compte ?"}
          </DialogTitle>
          <DialogContent />
          <DialogActions>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.Button}
                  onClick={() => this.deleteUser(user.user.id)}
                >
                  <span className={classes.spanButton}>Supprimer</span>
                  <DeleteIcon className={classes.rightIcon} />
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.Button}
                  onClick={this.handleClose}
                >
                  <span className={classes.spanButton}>Annuler</span>

                  <Icon className={classes.rightIcon}>home</Icon>
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(AlertDialogSlide);
