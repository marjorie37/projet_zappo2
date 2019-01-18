import React, { Component } from "react";
//import PropTypes from "prop-types";
// MATERIAL UI
import { Grid, withStyles, Paper } from "@material-ui/core";

import { AccountForm } from "./UserComponents/Index";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    display: "flex"
  }
});

class UserQuickOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Commande Rapide",
      displayPassInput: false,
      submitText: "Valider la commande"
    };
  }

  handleChange = event => {
    //
  };

  render() {
    //const { classes } = this.props;
    const { title, displayPassInput, submitText } = this.state;

    return (
      <div style={{ width: "100%" }}>
        <Grid container justify="center">
          <Grid item xs={10}>
            <Paper
              style={{
                padding: "1.6rem 1rem 2rem 1rem",
                marginTop: "3rem"
              }}
            >
              <AccountForm
                title={title}
                displayPassInput={displayPassInput}
                submitText={submitText}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// UserQuickOrder.propTypes = {
//   classes: PropTypes.object.isRequired
//};

export default withStyles(styles)(UserQuickOrder);
