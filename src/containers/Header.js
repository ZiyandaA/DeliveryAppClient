import React, { Component } from 'react';
import toast from 'toastr';
import {connect} from 'react-redux';
import { logoutAction } from '../store/modules/auth'
import { withRouter } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
     
        this.props.logoutUser();
        this.props.history.push("/")
        toast.success('Logout successful');
    }
    renderAuthButtons() {
        return (
   
                <div>
                <button   onClick={() => this.props.history.push('/')} className="logout-btn my-button"  style={{float: 'left', fontSize:'15px'}}>New Order</button>

         
                <button  onClick={this.logOut} className="logout-btn my-button" style={{float: 'right', fontSize:'15px'}}>logout</button>

                </div>
      
        );
      
    }
    render() {
        const { loggedIn } = this.props;
    if (!loggedIn) return (<div></div>);
        return(
            <div role="heading" aria-level="1" className="logout">
            <h1>h1 erhhe</h1>
                { loggedIn ?
                    this.renderAuthButtons() : null}
            </div>
        )
    }

}

export default withRouter(connect(
    state => ({
        loggedIn: state.auth.loggedIn,
        state: state
    }),
    dispatch => ({
        logoutUser: () => {
            dispatch(logoutAction());
        }
    })
)(Header));

