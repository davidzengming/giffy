import React, { Component } from 'react';
import { Map } from '../view';
import { connect } from 'react-redux';
import actions from '../../actions';

class MapNavigation extends Component {
    constructor() {
        super();
        this.setNewLocation = this.setNewLocation.bind(this);
    }

    setNewLocation(location) {
        this.props.updateCurrentLocation(location);
    }

    render() {
        return(
            <div>
                <Map
                    containerElement={<div style={{height:'100%'}} />}
                    mapElement={<div style={{minHeight: 1080, height:'100%', width:'100%'}} />}
                    center={this.props.post.currentLocation}
                    zoom={14}
                    mapMoved={this.setNewLocation} />
            </div>
        );
    }
}

const stateToProps = (state) => {
    return {
        post: state.post
    }
}

const dispatchToProps = (dispatch) => {
    return {
        updateCurrentLocation: (location) => dispatch(actions.updateCurrentLocation(location))
    }
}

export default connect(stateToProps, dispatchToProps)(MapNavigation);