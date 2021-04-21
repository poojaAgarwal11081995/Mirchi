import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import MarkerFirst from '../../src/screens/locationservice/markers/MarkerFirst';
import AddressMatcher from '../screens/locationservice/AddressMatcher';


class AnyReactComponent extends Component {

    render() {

        let {
            text,
        } = this.props;

        return <div
            style={{
                background: '#fff',
                display: 'inline-block',
            }}
        >{text}</div>
    }
}

class GoogleMap extends Component {

    constructor(props) {

        super(props);
        this.onChildMouseMove = this.onChildMouseMove.bind(this);
        this.onChildMouseUp = this.onChildMouseUp.bind(this);
        this.onChildMouseClick = this.onChildMouseClick.bind(this);
        this.getMyLocation = this.getMyLocation.bind(this);

        this.state = {
            draggable: true,
            marker_name: 'my marker',
            center: {
                lat: 26.7625,
                lng: 75.337844
            },
            zoom: 12,
            markers: [
                {
                    name: "Current position",
                    position: {
                        lat: 26.7625,
                        lng: 75.337844
                    }
                }
            ] // By default map is draggable
        }
        this.getMyLocation();

    }

    onChildMouseDown() {
        // set map no draggable 
        console.log('onChildMouseDown ' + 'draggable: false');

    }

    onChildMouseUp() {
        console.log('onChildMouseUp ' + 'draggable: true');

    }

    onChildMouseClick(key) {
        console.log('onChildMouseClick ' + 'key', key);
        //  if (this.state.draggable == true) {
        this.setState({
            center: { lat: key.lat, lng: key.lng }
        })
        //  }
    }

    onChildMouseMove(key, marker, newCoords) {
        console.log('onChildMouseMove ' + 'key', key);
        console.log('marker', marker);
        console.log('newCoords', JSON.stringify(newCoords));
        this.setState({
            center: { lat: newCoords.lat, lng: newCoords.lng }
        })

    }




    onMarkerDragEnd = (coord, index) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        this.setState(prevState => {
            const markers = [...this.state.markers];
            markers[index] = { ...markers[index], position: { lat, lng } };
            return { markers };
        });
    };

    renderMarkers = (map, maps) => {

    }
    getMyLocation = () => {
        const location = window.navigator && window.navigator.geolocation

        if (location) {
            location.getCurrentPosition((position) => {
                this.setState({
                    center: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                })
            }, (error) => {
                this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
            })
        }

    }


    handleSelectLocation = (location) => {
        console.log('location', JSON.stringify(location))
        this.setState({
            center: { lat: location.lat, lng: location.lng, },
            zoom: 12
        })


    }



    render() {

        console.log('render=', JSON.stringify(this.state.center))

        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '80vh', width: '80%' }}>

                <GoogleMapReact
                    rotateControl={true}
                    rotateControl={true}
                    rotateControlOptions={this.state.center}
                    draggable={true}
                    scrollwheel={false}
                    bootstrapURLKeys={{ key: 'AIzaSyASFwiTkWBtPIMqo21IAyxXV4566c_87mw' }}

                    center={{
                        lat: this.state.center.lat,
                        lng: this.state.center.lng
                    }}
                    defaultZoom={this.state.zoom}
                    // position={{
                    //     lat: this.state.center.lat,
                    //     lng: this.state.center.lng
                    // }}
                    onChildMouseDown={this.onChildMouseDown}
                    onClick={this.onChildMouseClick}
                    onChildMouseUp={this.onChildMouseUp}
                    onChildMouseMove={this.onChildMouseMove}
                    onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
                >

                    <MarkerFirst
                        lat={this.state.center.lat}
                        lng={this.state.center.lng}
                        name="My Marker"
                        color="blue"
                    />


                </GoogleMapReact>
                <div style={{
                    position: 'absolute', justifyContent: 'center'
                    , justifyItems: 'center', top: '12vh', borderColor: 'black',
                    borderWidth: 10, width: '80%'
                }}>
                    <AddressMatcher
                        selectCallBack={(location) => this.handleSelectLocation(location)}
                    />
                </div>
            </div>
        );
    }
}

export default GoogleMap;