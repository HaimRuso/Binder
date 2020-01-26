import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import { observer, inject } from 'mobx-react'
import './App.css';

import Users from "./components/RenderedByMap/Users"
import User from "./components/RenderedByMap/User"
import MapContainer from "./components/MapContainer"
import Locations from './components/Locations'
// import CurrentLocation from "./components/CurrentLocation"
import Profile from './components/RenderedByMap/Profile'
import Notification from './components/Notification'
import Header from './components/Header'
import Settings from './components/Settings'
require('dotenv').config()

@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer
class App extends Component {

    componentDidMount() {
        this.props.usersStore.getUsers()
        this.props.myProfile.getProfile()
        this.props.socketStore.openSocket()
        this.props.socketStore.recieveMessage();
    }

    render() {
        //isloggiedIn? map component (axios post to yoni with id in the store) : wizard
        return ( 
            <Router>
                <Header />
                {this.props.socketStore.checked ? 
                <Notification />
                :
                <div id="main-container">
                    {/* <div id="main-links">
                        <Link to="/map" className="link">Map</Link>
                    </div> */}
                    {/* need to change path to /map when finished testing */}
                    <Route path="/" exact render={({ match }) => <><MapContainer /> <Locations/> </>} />
                    <Route path="/map/:location" exact render={({ match }) => <Users match={match} />} />
                    <Route path="/user/:id" exact render={({ match }) => <Profile match={match} />} />
                    <Route path="/settings" exact render={({ match }) => <Settings match={match} />} />
                </div>
                }
            </Router>
        );
    }
}



export default App