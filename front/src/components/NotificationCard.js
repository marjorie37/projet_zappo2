import React, { Component } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button
} from "@material-ui/core";
import { Star } from "@material-ui/icons";
import { StyledNotifCard, StyledRewardButton } from "../styled/StyledNotifCard";

class NotificationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: 13
    };
  }
  render() {
    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Card>
              <StyledNotifCard image={this.props.notifImage} />
              <CardContent>
                {this.props.notifTitle === "Pizza offerte" ? (
                  <StyledRewardButton variant="extendedFab">
                    <Typography variant="title" style={{ color: "white" }}>
                      {this.state.points} <Star />{" "}
                    </Typography>
                  </StyledRewardButton>
                ) : (
                  ""
                )}

                <Typography component="p" variant="headline">
                  {this.props.notifTitle}
                </Typography>
                <Typography component="p" variant="body1">
                  {this.props.notifText}
                </Typography>
                <Typography component="p" variant="body1">
                  {this.props.suiteNotifText}
                </Typography>
              </CardContent>
              {this.props.handleBackPayment && (
                <CardActions>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={this.props.handleBack}
                  >
                    Retour au paiement
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default NotificationCard;
