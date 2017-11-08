import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class Map extends Component {
    constructor() {
        super();
        this.state = {
            map: null
        };
        this.mapDragged = this.mapDragged.bind(this);
        this.mapLoaded = this.mapLoaded.bind(this);
    }

    mapDragged() {
        var latLng = this.state.map.getCenter().toJSON();
        console.log('mapDragged: ' + JSON.stringify(latLng));
        this.props.mapMoved(latLng);
    }

    mapLoaded(map) {
        console.log('mapLoaded: ' + JSON.stringify(map.getCenter()));
        if (this.state.map != null)
            return;

        this.setState({
            map: map
        });
    }

    render() { 
        var markers = this.props.markers || [];
        return (
            <GoogleMap
                ref={this.mapLoaded}
                defaultZoom={this.props.zoom}
                defaultCenter={this.props.center}
                onDragEnd={this.mapDragged}
                options={{streetViewControl: false, mapTypeControl: false}}>
                {markers.map((marker, index) => (
                    <Marker {...marker} />
                ))}
            </GoogleMap>
        );
    }
}

export default withGoogleMap(Map);