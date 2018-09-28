import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';


class Login extends Component {
    constructor(props) {
        super(props); //super function to inherit all the properties (methids and fields) from the Component
        this.state = {
            username: '',
            password: '',
            open: false,
            successMessage: ""
        }
    }
        
    handleSubmit() {

    }
    
    render() {
        return(
            <div>
                Login
            </div>
        )
    }
}

export default Login;