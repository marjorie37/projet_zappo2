import React, { Component } from "react";
import SwipeableViews from "react-swipeable-views";
import { UserInfos, UserOrders } from "./UserComponents/Index";
import MainHeader from "./MainHeader";

// MATERIAL UI
import {
  AppBar,
  Tabs,
  Tab,
  Grid,
  Typography,
  withStyles
} from "@material-ui/core";

// STYLED COMPONENTS
import RootContainer from "../styled/RootContainer";

// MEDIAS
import imageProfil from "../assets/img/thumbAccount.jpg";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
});

class ContUserAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }
  handleChange(event, value) {
    this.setState({ value });
  }
  handleChangeIndex(index) {
    this.setState({ value: index });
  }

  render() {
    const { user, theme, history, location } = this.props;
    const { value } = this.state;
    return (
      <RootContainer>
        <MainHeader
          pageTitle="Profil"
          subTitle="Infos et historique"
          image={imageProfil}
          redirect={() => history.goBack()}
        />
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab
              prevPath={location.state ? location.state.url : null}
              label="Infos"
            />
            <Tab label="Commandes" />
          </Tabs>
        </AppBar>
        <Grid container spacing={0}>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={this.handleChangeIndex}
          >
            <TabContainer dir={theme.direction}>
              {user && <UserInfos user={user} />}
            </TabContainer>
            <TabContainer dir={theme.direction}>
              {user && <UserOrders user={user} />}
            </TabContainer>
          </SwipeableViews>
        </Grid>
      </RootContainer>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ContUserAccount);
