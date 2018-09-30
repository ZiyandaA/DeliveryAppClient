import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import queryString from 'query-string';
import { loginAction } from '../store/modules/auth'
import FormComponent from '../components/FormComponent'
import logo from './assets/logo2.jpg';

class Home extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

    }
    logOut() {
        console.log(this.props.history.replace)
        return axios.post("/users/logout")
            .then(data => {
                this.props.changeLoginStatus();
                this.props.history.push("/login");
                console.log(data)
            })
    }


    render() {
        const { mode, orderId } = queryString.parse(this.props.location.search)
        const formProps = mode === 'edit' ? { mode, orderId }: { mode: 'create'};
        // if there is a user logged in, then he/she should automatically show the form
        // rather than the landing components you might find below
        if(this.props.loggedIn) {
        return(
           
            <main>
            
                <FormComponent {...formProps}/>
                <p>
                </p>
            </main>
        )
    }
        return(
            <main className="home-page">
                <HeaderComponent />
                <BannerComponent />
                <SecondBannerComponent   history={this.props.history} />
                <FooterComponent />
            </main>
        )
    }
}


/**
 * @name BannerComponent
 * @description This is the main banner that is displaed on the landing page
 * @returns {function} React Component
 */
const BannerComponent = () => (
    <div style={{
        display: 'flex',
        height: '400px',
        width: '100%',
        position: 'relative'
    }}>
    <img alt="banner" src="https://images.unsplash.com/photo-1527577891194-fd38429946bb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=52610a594dfea47fd2955e97b99a51b1&auto=format&fit=crop&w=800&q=60"  style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, objectFit: 'cover'}}/>
    <div style={{ backgroundColor: '#2C2B2B90', height: '100%', width: '100%', zIndex: 3, positon: 'absolute', top: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p className="home-image">
            <img
                className="banner-logo" 
                src="/static/media/logo2.8e237bde.jpg"
                alt="logo"
            />
             <span className="msg-text my-text-center my-text-white"> Messenger Pricing System</span>
        </p>
    </div>
    </div>
)

/**
* @name SecondBannerComponent
 * @description This contains the grid, the once with the login and sign up buttons
 * @returns {function} React Component
 */
const SecondBannerComponent = ({ history }) => (
    <nav className="secondBanner">
        <div className="welcome">
            <p> We provide a delivery Price quote that is fast and secure. Because ARC provides film equipment in a forever changing and fast film industry. ARC Messenger system is enabling a future where delivery is almost as quick as you thinking about it, and it all starts with a quote. </p>
            </div>
            <div className="auth-part">
            <img  alt="banner" src="https://images.unsplash.com/photo-1522074534099-45b66be3f193?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1120af654449ab8c8e2247989f0bff2f&auto=format&fit=crop&w=800&q=60" style={{ objectFit: 'cover', width: '100%',  position: 'absolute', top: 0, height: '100%' }}/>
            { /* overlay */}
            <div className="login-part">
                <div  role="button" className="hoverable-button"  onClick={() => history.push('/login')} style={{ color: 'white',  backgroundColor: '#003459', width: '120px', marginRight: '10px', borderRadius: '5px', textAlign: 'center', paddingTop: '20px',paddingBottom:'20px', fontSize: '14px'}}> Login </div>
                <div   role="button" className="hoverable-button" onClick={() => history.push('/register')} style={{ color: 'white',  backgroundColor: 'green', width: '120px', borderRadius: '5px', textAlign: 'center',  paddingTop: '20px',paddingBottom:'20px',  fontSize: '14px'  }}> Sign Up </div>
            </div>
            { /* end of overlay */}
         </div>
    </nav>
)

/**
 * @name FooterComponent
 * @description The footer. You can export this and use it anwhere you like in the application
 * @returns {function} React Component
 */
const FooterComponent = () => (
    <div style={{ width: '100%', backgroundColor: '#4D5656', paddingTop: '10px', position: "fixed", bottom:0}}>
        <p style={{ textAlign: 'center', color: 'white', fontFamily: 'sans-serif' }}> Designed by Ziyanda Ayd  </p>
        <p style={{ textAlign: 'center', color: 'white', fontFamily: 'sans-serif' }}> copyright &copy; 2018 All Rights Reserved</p><p style={{ textAlign: 'center', color: 'white', fontFamily: 'sans-serif' }}>Contact information: 8456451447 <a href="mailto:ziyandaayd@gmail.com" className="footerLink">
 ziyandaayd@gmail.com</a>.</p>
    </div>
)
/**
 * @name HeaderComponent
 * @description The Header. This is also very reusable, so feel free to use anywhere in the application
 * @returns {function} React Component
 */
const HeaderComponent = () => (
    <div className="header">
        <img className="logo" alt="logo" src={logo}/><h1>aa</h1>
        <p style={{ color: 'white', textAlign: 'center',  }}></p>
    </div>
)



export default connect(
    state => ({
        loggedIn: state.auth.loggedIn,
        state: state
    }),
    dispatch => ({
        changeLoginStatus: () => {
            dispatch(loginAction());
        }
    })
)(Home);