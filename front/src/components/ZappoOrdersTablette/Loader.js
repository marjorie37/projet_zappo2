import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: "94vh" }}
        >
          <Grid item>
            <CircularProgress
              size={200}
              style={{
                color: "#FFF"
              }}
              thickness={1}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Loader;
