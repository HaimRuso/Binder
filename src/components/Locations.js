import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import image from "../dummyImage/dummyMap.PNG";
import { Link } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
@inject("user", "usersStore", "locationsStore")
@observer
class Locations extends Component {
  useStyles = () => {
    return makeStyles(theme => ({
      root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
      }
    }));
  };

  render() {
    // const realLocationArray = this.props.locationsStore.locations
    // function that gets locations from yoni
    const locationsArray = ["Speakeasy", "Camel-Comedy-Club", "Max-Brenner"];
    // sending location to yoni - post to yoni with axios
    // getting from yoni users list //keeps updating

    console.log("in Locations!");

    const divStyle = {
      position: "absolute",
      top: "40%",
      width: "100%"
    };

    const classes = this.useStyles();
    return (
      <List
        component="nav"
        className={classes.root}
        aria-label="mailbox folders"
        style={divStyle}
      >
        {locationsArray.map((location, i) => (
          <ListItem key={i} button>
            <Link  to={`/map/${location}`} >
              <ListItemText primary={location} />
            </Link>
          </ListItem>
        ))}
      </List>
    );
  }
}

export default Locations;