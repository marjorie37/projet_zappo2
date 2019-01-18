import React, { Component } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions
} from "@material-ui/core";
import Linked from "../styled/StyledLink";

class EmptyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { title, image, comment, link, buttonText } = this.props;
    return (
      <Card>
        <CardMedia
          style={{ height: 0, paddingTop: "56.25%" }}
          image={image}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {title}
          </Typography>
          <Typography component="p">{comment}</Typography>
        </CardContent>
        <CardActions>
          <Linked to={link}>
            <Button variant="contained" size="small" color="secondary">
              {buttonText}
            </Button>
          </Linked>
        </CardActions>
      </Card>
    );
  }
}

export default EmptyCard;
