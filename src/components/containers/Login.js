import React, { Component } from 'react';
import { Account } from '../view';
import { connect } from 'react-redux';
import actions from '../../actions'

class Login extends Component {
    constructor() {
        super();
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        this.props.checkCurrentUser;
    }

    register(registration) {
        this.props.signup(registration);
    }

    login(credentials) {
        this.props.login(credentials);
    }

    render() {
        const currentUser = this.props.account.user;
        return(
            <div>
                Account container
                { (currentUser == null) ?
                    <Account onRegister={this.register} onLogin={this.login} /> :
                    <h2>{currentUser.username}</h2>
                }
            </div>
        );
    }
}

const stateToProps = (state) => {
    return {
        account: state.account
    }
}

const dispatchToProps = (dispatch) => {
    return {
        signup: (params) => dispatch(actions.register(params)),
        login: (params) => dispatch(actions.login(params)),
        checkCurrentUser: (params) => dispatch(actions.checkCurrentUser)
    }
}

export default connect(stateToProps, dispatchToProps)(Login);