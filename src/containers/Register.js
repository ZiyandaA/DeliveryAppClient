import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { loginAction } from '../store/modules/auth'
import axios from 'axios';
import toast from 'toastr';
import AuthComponent from '../components/Auth';
import setAuthorizationToken from '../helper/setAuthorizationToken';

class Register extends Component {
    constructor(props) {
        super(props); //super function to inherit all the properties (methids and fields) from the Component
        this.state = {
            name: '',
            password: '',
            open: false,
            successMessage: "",
            isLoading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async handleSubmit(authMode) {
        // console.log(authMode);
        this.setState({ isLoading: true });
        let url = 'http://localhost:3000/users'
        if(authMode === "login") {
            url += "/signin"
        }else if(authMode === "register") {
            url += "/signup"
        }
        let {name, password} = this.state;

        try {
            let res = await axios.post(url, {
                name,
                password
            })
            this.setState({ isLoading: false });
            const { token, user } = res.data;
            localStorage.setItem('accessToken', token);
            setAuthorizationToken(token);
            this.props.changeLoginStatus(user);

            let message = authMode === "login" ? "Login Success" : "Registration Success";
            toast.success(message);
        } catch (e) {
            this.setState({ isLoading: false });
            let message = authMode === "login" ? "Login Failed" : "Registration Failed";
            toast.error(message);
        }
   

    }


    render() {
        let {name, password, isLoading} = this.state;
        const { pathname } = this.props.location;
        let authMode;

        if(pathname === "/login") {
            authMode = "login"
        } else if (pathname === "/register") {
            authMode = "register"
        }

        if(this.props.loggedIn) {
            console.log(this.props.location);
            const  referrer  = (this.props.location.state) ? this.props.location.state.referrer : false;
            const from = referrer ? referrer : '/';
            return <Redirect to={from} />
        }

        return(
            <AuthComponent
                name={name}
                mode={authMode}
                password={password}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                label={this.props.label}
                successMessage={this.state.successMessage}
                isLoading={isLoading}
            />
        )
    }
}

export default withRouter(connect(
    state => ({
        loggedIn: state.auth.loggedIn,
        state: state
    }),
    dispatch => ({
        changeLoginStatus: (user) => {
            dispatch(loginAction(user));
        }
    })
)(Register));
