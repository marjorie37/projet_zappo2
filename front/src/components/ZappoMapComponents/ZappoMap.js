import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { withTheme, Typography } from "@material-ui/core";
import { Marker } from "react-mapbox-gl";
import { Place } from "@material-ui/icons";
import { Popup } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibW00NSIsImEiOiJjaml2cHIxenkybjd5M3dwYXpuc2NhbnZ6In0.gC9bCZAUkRf5ScYWB_UqPA",
  logoPosition: "top-right"
});

class ZappoMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ width: "100%", overflowX: "hidden" }}>
        <Map
          center={[4.830815, 45.727727]}
          zoom={[13]}
          style={`mapbox://styles/mapbox/streets-v9`}
          containerStyle={{
            height: "80vh",
            width: "100vw"
          }}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}
          >
            <Feature coordinates={[4.830927599999995, 45.729514]} />
          </Layer>
          <Popup
            coordinates={[4.830927599999995, 45.729514]}
            offset={{
              "bottom-left": [12, -38],
              bottom: [0, -58],
              "bottom-right": [-12, -38]
            }}
          >
            <Typography variant="headline">Zappo</Typography>
            <Typography variant="subheading">Bistrot Italien</Typography>
            <Typography variant="body1">
              6 Rue Challemel Lacour, 69007 Lyon
            </Typography>
          </Popup>
          <Marker coordinates={[4.830927599999995, 45.729514]} anchor="bottom">
            <Place
              style={{
                fontSize: "5em",
                color: this.props.theme.palette.primary.light
              }}
            />
          </Marker>
        </Map>
      </div>
    );
  }
}

export default withTheme()(ZappoMap);
