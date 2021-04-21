import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Basecomponent from '../../common/BaseComponent'
import MarkerFirst from '../locationservice/markers/MarkerFirst';
import GoogleMapReact from 'google-map-react';
import * as  Constant from '../../utils/Constants'
import { fitBounds } from 'google-map-react/utils';
//import MapViewDirections from 'react-native-maps-directions';
//import MapView from 'react-native-maps';
const origin = { latitude: 26.922070, longitude: 75.778885 };
const destination = { latitude: 26.922070, longitude: 75.778885 };
const GOOGLE_MAPS_APIKEY = Constant.GOOGLE_MAP_KEY;
import { reqOrderDetailsGrocery,reqGetDriverCurrentLocGrocery } from '../../actions';
import { connect } from 'react-redux';
import * as Constants from '../../utils/Constants';
import * as types from '../../actions/types';
import * as CustomStorage from '../../utils/CustomStorage';
import { get } from 'lodash'


let orderDetials = undefined;

const styles = theme => ({
    root: {
        padding: 0,
    },
    dialogPaper: {
        minHeight: '80vh',
        minWidth: '80%',
    },
    appBarSpacer: theme.mixins.toolbar,

});

const bounds = {
    ne: {
        lat: 27.1657,
        lng: 75.7159
    },
    sw: {
        lat: 26.922070,
        lng: 75.778885
    }
};


const size = {
    width: 640, // Map width in pixels
    height: 380, // Map height in pixels
};
const greatPlaceStyle = {
    position: 'absolute',
    transform: 'translate(-50%, -50%)'
}


const AnyReactComponent = ({ text }) => (
    <div style={{
        color: 'white',
        padding: '15px 10px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        transform: 'translate(-50%, -50%)',
        height: 10,
        width: 10
    }}>
        <img src="../image/bike.png" />
    </div>
);


class TrackOrderOnMapGrocery extends Basecomponent {

    constructor(props) {

        super(props);
        orderDetials = CustomStorage.getSessionDataAsObject(Constants.PROPS_ORDER_ITEM);
        this.onChildMouseMove = this.onChildMouseMove.bind(this);
        this.onChildMouseUp = this.onChildMouseUp.bind(this);
        this.onChildMouseClick = this.onChildMouseClick.bind(this);
        this.getMyLocation = this.getMyLocation.bind(this);

        this.state = {
            draggable: true,
            status:'',
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
                        lng: this.props.lng
                    }
                }
            ] // By default map is draggable
        }
        // this.getMyLocation();


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


    componentDidMount() {
        this.getMyLocation()
        this.getDriverLocation();
       this.getOrderDetails();
       let formThis = this;
     console.log(this.state,'this.state');
       if (this.state.status !== "OD") {
        setInterval(function () {
            formThis.getDriverLocation() }, 3000);
       }
   }


    // onMarkerDragEnd = (coord, index) => {
    //     const { latLng } = coord;
    //     const lat = latLng.lat();
    //     const lng = latLng.lng();

    //     this.setState(prevState => {
    //         const markers = [...this.state.markers];
    //         markers[index] = { ...markers[index], position: { lat, lng } };
    //         return { markers };
    //     });
    // };

    renderMarkers = (map, maps) => {
        // map.fitBounds(map, [bounds, 100]);
        var flightPath = new window.google.maps.Polyline({
            path: [
                
                { "lat": this.state.center.lat,//get(this.state[Constants.KEY_ORDER_DETAILS], 'driver_detail.lat', ''), 
                "lng": this.state.center.lng//get(this.state[Constants.KEY_ORDER_DETAILS], 'driver_detail.lng', '') 
            },
                { 'lat': get(this.state[Constants.KEY_ORDER_DETAILS], 'grocery_detail.lat', ''), 'lng': get(this.state[Constants.KEY_ORDER_DETAILS], 'grocery_detail.lng', '') },
                { "lat": get(this.state[Constants.KEY_ORDER_DETAILS], 'order_delivery_address.lat', ''), "lng":get(this.state[Constants.KEY_ORDER_DETAILS], 'order_delivery_address.lng', '') }
         
            ],
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 2.0,
            strokeWeight: 2
        });
        // flightPath.setMap(document.getElementsByClassName("GOOGLEMAP"));
        flightPath.setMap(map);
        // var directionsService = new window.google.maps.DirectionsService;
        //  var directionsDisplay = new window.google.maps.DirectionsRenderer;
        //  this.calculateAndDisplayRoute(directionsService, directionsDisplay);

    }

    // calculateAndDisplayRoute = (directionsService, directionsDisplay) => {
    //     // var waypts = [];
    //     // var checkboxArray = document.getElementById('waypoints');
    //     // for (var i = 0; i < checkboxArray.length; i++) {
    //     //     if (checkboxArray.options[i].selected) {
    //     //         waypts.push({
    //     //             location: checkboxArray[i].value,
    //     //             stopover: true
    //     //         });
    //     //     }
    //     // }


    //     try {
    //         directionsService.route({
    //             origin: [{ "lat": this.state.center.lat,//get(this.state[Constants.KEY_ORDER_DETAILS], 'driver_detail.lat', ''), 
    //             "lng": this.state.center.lng//get(this.state[Constants.KEY_ORDER_DETAILS], 'driver_detail.lng', '') 
    //         }],
    //             destination: [{"lat":get(this.state[Constants.KEY_ORDER_DETAILS], 'order_delivery_address.lat', ''), "lng":get(this.state[Constants.KEY_ORDER_DETAILS], 'order_delivery_address.lng', '') }],
    //             optimizeWaypoints: true,
    //             travelMode: 'DRIVING'
    //         }, function (response, status) {
    //             console.log('res====', 'sdsd')
    //             if (status === 'OK') {
    //                 directionsDisplay.setDirections(response);

    //                 var route = response.routes[0];
    //                 var summaryPanel = document.getElementById('directions-panel');
    //                 summaryPanel.innerHTML = '';
    //                 // For each route, display summary information.
    //                 for (var i = 0; i < route.legs.length; i++) {
    //                     var routeSegment = i + 1;
    //                     summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
    //                         '</b><br>';
    //                     summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
    //                     summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
    //                     summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
    //                 }
    //             } else {
    //                 alert('res', 'Directions request failed due to')

    //             }
    //         });
    //     } catch (error) {
    //         console.log('res====', 'error')
    //     }
    // }


    getMyLocation = () => {
        console.log('marker>>>>>>>>');
        const location = window.navigator && window.navigator.geolocation

        if (location) {
            location.getCurrentPosition((position) => {
                this.setState({
                    center: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                })
                console.log(position.coords.latitude,position.coords.longitude)
            }, (error) => {
                this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
            })
        }

    }


    
    getDriverLocation = () => {
        var data = {
            [Constants.KEY_DELIVERY_MAN_ID]: orderDetials[Constants.KEY_DELIVERY_MAN_ID],
             [Constants.KEY_ORDER_ID]: orderDetials[Constants.KEY_UNDERSCORE_ID]
        }
      
        this.props.reqGetDriverCurrentLocGrocery(data, this)
    }

    // handleSelectLocation = (location) => {
    //     console.log('location', JSON.stringify(location))
    //     this.setState({
    //         center: { lat: location.lat, lng: location.lng, },
    //         zoom: 12
    //     })
    // }
    getOrderDetails = (_id) => {
        var data = {
            [Constants.KEY_UNDERSCORE_ID]: orderDetials[Constants.KEY_UNDERSCORE_ID]
        }
        this.props.reqOrderDetailsGrocery(data, this)
    }


    handleResponse = (nextProps) => {
        var respObj = null;
        if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
            respObj = { disabledClickedBtn: false, [Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS] };
            this.setState(respObj)
        }
        else if(nextProps[Constants.KEY_TYPE] === types.API_DRIVER_CURRENT_LOC_GROCERY){
            let data = nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA];
            let driverLocation = data.driver_current_loc
            respObj = {
                [Constants.KEY_SHOW_PROGRESS]: false,
                [Constants.KEY_STATUS]: data.order_detail[Constants.KEY_STATUS],
                center: { lat: driverLocation.lat, lng: driverLocation.lng }

            };
            this.setState({respObj,status:data.order_detail.status});
           
            console.log(data.order_detail.status,'location');
        }
        else if (nextProps[Constants.KEY_TYPE] === types.API_ORDER_DETAILS_GROCERY) {
            let data = nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA];
            let userDetails = data[Constants.KEY_USER_DETAILS];
            let groceryDetails = data[Constants.KEY_GROCERY_DETAILS];
            let productList = data[Constants.KEY_PRODUCT_LIST];
            let driverDetails = data[Constants.KEY_DRIVER_DETAILS];
            respObj = {
                [Constants.KEY_SHOW_PROGRESS]: false,
                [Constants.KEY_ORDER_DETAILS]: data,
                [Constants.KEY_USER_DETAILS]: userDetails,
                [Constants.KEY_DRIVER_DETAILS]: driverDetails,
                [Constants.KEY_GROCERY_DETAILS]: groceryDetails,
                [Constants.KEY_PRODUCT_LIST]: productList,
            };
            this.setState(respObj);
        }
    }


   


    render() {
        if (this.state.center.lat != undefined && this.state.center.lat > 0) {
            lat: this.state.center.lat; lng: this.state.center.lng 
        }


        console.log(this.state.center.lng,this.state.center.lat);
        const { classes } = this.props;
        console.log(this.state,'this.state');
        const { center, zoom } = fitBounds(bounds, size);
        return (
            <Fragment >

                <div className={classes.appBarSpacer} />


                <GoogleMapReact
                    scrollwheel={false}
                    bootstrapURLKeys={{ key: Constant.GOOGLE_MAP_KEY }}
                    center=  {{
                        lat: this.state.center.lat,//get(this.state[Constants.KEY_ORDER_DETAILS], 'driver_detail.lat', ''),
                        lng: this.state.center.lng,//get(this.state[Constants.KEY_ORDER_DETAILS], 'driver_detail.lng', '')
                    }}
                    defaultZoom={this.state.zoom}
                    // onChildMouseDown={this.onChildMouseDown}
                    // onClick={this.onChildMouseClick}
                    // onChildMouseUp={this.onChildMouseUp}
                    // onChildMouseMove={this.onChildMouseMove}
                    heatmapLibrary={true}
                    onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
                >
                    <AnyReactComponent
                        lat={this.state.center.lat}//{get(this.state[Constants.KEY_ORDER_DETAILS], 'driver_detail.lat', '')}
                        lng={this.state.center.lng}//{get(this.state[Constants.KEY_ORDER_DETAILS], 'driver_detail.lng', '')}
                        name="driver"
                    />
                    <MarkerFirst
                        lat={get(this.state[Constants.KEY_ORDER_DETAILS], 'order_delivery_address.lat', '')}
                        lng={get(this.state[Constants.KEY_ORDER_DETAILS], 'order_delivery_address.lng', '')}
                        name="User"
                        color="blue"
                    />

                    <MarkerFirst
                        lat={get(this.state[Constants.KEY_ORDER_DETAILS], 'grocery_detail.lat', '')}
                        lng={get(this.state[Constants.KEY_ORDER_DETAILS], 'grocery_detail.lng', '')}
                        name="Vendor"
                        color="Red"
                    />

                </GoogleMapReact>




            </Fragment>
        )
    }

}




TrackOrderOnMapGrocery.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
    return response;
}
export default connect(mapStateToProps, { reqOrderDetailsGrocery,reqGetDriverCurrentLocGrocery })(withStyles(styles)(TrackOrderOnMapGrocery));

