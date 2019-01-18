import React, { Component } from "react";

import { Grid, Button, Typography } from "@material-ui/core";

import { Navigation } from "@material-ui/icons";

class FooterZappoMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            position: "relative",
            left: "80%",
            top: "30px"
          }}
        >
          <Button
            style={{ position: "relative", zIndex: "1200" }}
            variant="fab"
            color="secondary"
            href="geo:45.7296181,4.8309111"
          >
            <Navigation />
          </Button>
        </div>
        <Grid container style={{ backgroundColor: "#2c3e50" }}>
          <Grid item xs={12} style={{ padding: "1rem 1.2rem 1rem 1.2rem" }}>
            <Typography
              variant="subheading"
              style={{
                color: "#fff",
                fontWeight: "bold"
              }}
            >
              Zappo
            </Typography>
            <Typography
              variant="caption"
              style={{
                color: "#fff",
                paddingBottom: "0.4rem",
                marginBottom: "0.4rem",
                borderBottom: "dotted 1px #fff"
              }}
            >
              Du lundi au dimanche 12h - 14h | 19h - 23h
            </Typography>
            <Typography variant="caption" style={{ color: "#fff" }}>
              6 rue Challemel Lacour, 69007 Lyon
              <br />
              Métro Debourg, proche Matmut Stadium et Halle Tony Garnier
              <br />Tel : 04.72.71.79.88
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default FooterZappoMap;
