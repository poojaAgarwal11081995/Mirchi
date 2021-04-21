import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Basecomponent from './BaseComponent'
import MarkerFirst from '../screens/locationservice/markers/MarkerFirst';
import AddressMatcher from '../screens/locationservice/AddressMatcher';
import GoogleMapReact from 'google-map-react';
import * as  Constant from '../utils/Constants'


const styles = theme => ({
    root: {
        padding: 0,
    },
    dialogPaper: {
        minHeight: '80vh',
        minWidth: '80%',
    }

});

class MapDialog extends Basecomponent {

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
                lat: this.props.lat,
                lng: this.props.lng
            },
            zoom: 12,
            markers: [
                {
                    name: "Current position",
                    position: {
                        lat: this.props.lat,
                        lng: this.props.lat
                    }
                }
            ] // By default map is draggable
        }
        if (this.props.lat != undefined && this.props.lat != null && this.props.lat != '') {
            console.log('lat=', this.props.lat, 'lng=', this.props.lng);
        } else {
            this.getMyLocation();
        }


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
        const {
            title,
            content,
            firstBtnName,
            secondBtnName,
            firstBtnClick,
            secondBtnClick,
            classes,
            lat,
            lng

        } = this.props;

        return (
            <div>
                <Dialog
                    open={this.props.showYesNo}
                    onClose={firstBtnClick}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    classes={{ paper: classes.dialogPaper }}
                >
                    {/* <DialogTitle id="alert-dialog-title">{title}</DialogTitle> */}
                    <DialogContent>

                        <div style={{ height: '100vh', width: '100%' }}>

                            <GoogleMapReact
                                rotateControl={true}
                                rotateControl={true}
                                rotateControlOptions={this.state.center}
                                draggable={true}
                                scrollwheel={false}
                                bootstrapURLKeys={{ key: Constant.GOOGLE_MAP_KEY }}

                                center={{
                                    lat: this.state.center.lat,
                                    lng: this.state.center.lng
                                }}
                                defaultZoom={this.state.zoom}
                                onChildMouseDown={this.onChildMouseDown}
                                onClick={this.onChildMouseClick}
                                onChildMouseUp={this.onChildMouseUp}
                                onChildMouseMove={this.onChildMouseMove}
                                onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
                            >

                                <MarkerFirst
                                    lat={this.state.center.lat}
                                    lng={this.state.center.lng}
                                    name="Address Marker"
                                    color="blue"
                                />


                            </GoogleMapReact>
                            <div style={{
                                position: 'absolute', justifyContent: 'center'
                                , justifyItems: 'center', top: '2vh', borderColor: 'black',
                                borderWidth: 10, width: '100%'
                            }}>
                                <AddressMatcher
                                    selectCallBack={(location) => this.handleSelectLocation(location)}
                                />
                            </div>
                        </div>


                    </DialogContent>


                    <DialogActions>
                        <Button onClick={() => { secondBtnClick(this.state.center) }} color="primary">

                            {firstBtnName}
                        </Button>
                        <Button onClick={() => {
                            firstBtnClick()
                        }} color="primary" autoFocus>
                            {secondBtnName}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}



MapDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(MapDialog));

