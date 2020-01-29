import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import User from "./User";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import RaisedButton from 'material-ui/RaisedButton';
import BottomNavigationBar from '../BottomNavigationBar'
// import tileData from "./tileData";

@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer
class Users extends Component {
  useStyles = () => {
    return makeStyles(theme => ({
      root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper
      },
      gridList: {
        width: 500,
        height: 450
      },
      icon: {
        color: "rgba(255, 255, 255, 0.54)"
      }
    }));
  };
  render() {
    const nearbyUsers = this.props.socketStore.nearbyUsers;
    const currentLocation = this.props.match.params.location;
    const classes = this.useStyles();
    // send yoni the location and then load a loading bar and when the loading finishes - rendering the users
    return (
      <>

        <div className={classes.root} style={{position: "relative", width: "92vw", height: "90vh", marginLeft: "4vw"}}>
          <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
              <ListSubheader component="span"><Link to="/">Back</Link></ListSubheader>
            </GridListTile>
            {nearbyUsers.map((user, index) =>  (
              <GridListTile
                key={user.firstName}
                onClick={() =>
                  this.props.history.push(`/user/${user._id}`)
                }
              >
                {console.log('user url is ', user.picture)}
                {user.picture !== null ?
                <img src={user.picture} alt={user.firstName} /> : <img src={EmptyProfilePicture} alt={user.firstName}/>}
                <GridListTileBar
                style={{height: "auto"}}
                  title={`${user.firstName}, ${user.age}`}
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${user.firstName}`}
                      className={classes.icon}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        
          <BottomNavigationBar />
        </div>
      </>
    );
  }
}

export default withRouter(Users);