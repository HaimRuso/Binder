import React, { Component } from 'react';
import { observer, inject } from "mobx-react"


@inject("user", "usersStore", "locationsStore", "myProfile", "socketStore")
@observer

class Settings extends Component{


    render(){
        return (
            <>
            
            </>
        )
    }
}

export default Settings