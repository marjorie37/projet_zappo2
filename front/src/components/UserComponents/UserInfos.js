import React, { Component } from "react";

// COMPOSANTS ZAPPO
import { UserCardMedia } from "../../styled/Index";
import backgroundImageUser from "../../assets/img/userBanner.jpg";
// MATERIAL UI
import {
  Grid,
  Card,
  CardContent,
  Button,
  FormControlLabel,
  Switch,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import axios from "axios";
import config from "../../assets/lib/axiosConfig";

class UserInfos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    axios(config({}, `/customers/${this.props.user.id}`, "get")).then(res => {
      this.setState({
        user: res.data
      });
    });
  }

  handleSubscribe() {
    axios(
      config({}, `/customers/subscription/${this.props.user.id}`, "get")
    ).then(res => {
      this.setState({
        user: res.data
      });
    });
  }
  modifAccount(id) {
    this.props.history.push(`/compte/modifier/${id}`);
  }

  render() {
    const { user } = this.state;

    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <Card>
            <UserCardMedia
              image={backgroundImageUser}
              title="Compte utilisateur"
            />
            <CardContent>
              <List>
                <ListItem divider dense>
                  <ListItemText primary="Nom" secondary={user.name} />
                </ListItem>
                <ListItem divider dense>
                  <ListItemText primary="Téléphone" secondary={user.phone} />
                </ListItem>
                <ListItem divider dense>
                  <ListItemText primary="Email" secondary={user.email} />
                </ListItem>
                {user.subscription !== undefined && (
                  <ListItem>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={user.subscription}
                          onChange={() => this.handleSubscribe()}
                        />
                      }
                      label="Abonnement aux alertes"
                    />
                  </ListItem>
                )}
              </List>
              <Button
                fullWidth
                variant="contained"
                size="large"
                color="secondary"
                // onClick={id => this.modifAccount(id)}
                href={`/moncompte/modifier`}
              >
                Modifier
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default UserInfos;
