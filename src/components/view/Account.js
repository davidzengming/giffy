import React, { Component } from 'react';

class Account extends Component {
    constructor() {
        super();
        this.state = {
            registration: {
                username: '',
                password: ''
            }
        };

        this.updateUserInput = this.updateUserInput.bind(this);
        this.submitRegistration = this.submitRegistration.bind(this);
        this.submitLoginCredentials = this.submitLoginCredentials.bind(this);
    }

    updateUserInput(event) {
        let updated = Object.assign({}, this.state.registration);
        updated[event.target.id] = event.target.value;
        this.setState({
            registration: updated
        });
    }  

    submitRegistration(event) {
        event.preventDefault();
        if(this.state.registration.username.length == 0) {
            alert('Please enter username');
        }
        if(this.state.registration.password.length == 0) {
            alert('Please enter password');
        }
        this.props.onRegister(this.state.registration);
    }

    submitLoginCredentials(event) {
        event.preventDefault();
        if(this.state.registration.username.length == 0) {
            alert('Please enter username');
        }
        if(this.state.registration.password.length == 0) {
            alert('Please enter password');
        }
        this.props.onLogin(this.state.registration);
    }

    render() {
        return(
            <div>
                <h2> Account </h2>
                <input onChange={this.updateUserInput} id="username" type="text" placeholder="username" /><br />
                <input onChange={this.updateUserInput} id="password" type="text" placeholder="password" /><br />
                <button className="button small" style={{width:30+'%', marginTop:12}} onClick={this.submitLoginCredentials}>Sign in</button>
                <button className="button small" style={{width:30+'%', marginTop:12}} onClick={this.submitRegistration}>Join now</button>
                
            </div>
        );
    }
}

export default Account;