=import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Searchbar extends Component {
    constructor() {
        super();
        this.state = {
            keyword: ''
        }

        this.updateKeyword = this.updateKeyword.bind(this);
    }

    updateKeyword(event) {
        this.setState({
            keyword: event.target.value
        });
    }
    
    render() {
        return(
            <input onChange={this.updateKeyword} size="35" type="text" placeholder="Search" />
        );
    }
}

export default Searchbar;