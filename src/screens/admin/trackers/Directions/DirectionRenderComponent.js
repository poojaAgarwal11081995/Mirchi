import React, { Component } from "react";
import { convertLatLngToObj } from "../helper";
import * as ResourcesConstants from '../../../../res/ResourcesConstants';
const { Marker, DirectionsRenderer, AnimatedRegion } = require("react-google-maps");

class DirectionRenderComponent extends Component {
  state = {
    directions: null,
    wayPoints: null,
    currentLocation: null
  };
  delayFactor = 0;

  componentDidMount() {
    const startLoc = this.props.from.lat + ", " + this.props.from.lng;
    const destinationLoc = this.props.to.lat + ", " + this.props.to.lng;
    console.log("status===", JSON.stringify(this.props));
    this.getDirections(startLoc, destinationLoc);
    this.setCurrentLocation();
  }

  async getDirections(startLoc, destinationLoc, wayPoints = []) {
    const waypts = [];
    if (wayPoints.length > 0) {
      waypts.push({
        location: new window.google.maps.LatLng(
          wayPoints[0].lat,
          wayPoints[0].lng
        ),
        stopover: true
      });
    }
    const directionService = new window.google.maps.DirectionsService();
    console.log('value==', JSON.stringify({
      origin: startLoc,
      destination: destinationLoc,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: window.google.maps.TravelMode.DRIVING
    }))
    directionService.route(
      {
        origin: startLoc,
        destination: destinationLoc,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {

        if (status === window.google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
            wayPoints: result.routes[0].overview_path.filter((elem, index) => {
              //return index % 30 === 0;
              console.log('Value=', JSON.stringify(result.routes[0]));
              return index % 1 === 0;
            })
          });
        } else if (
          status === window.google.maps.DirectionsStatus.OVER_QUERY_LIMIT
        ) {
          this.delayFactor += 0.2;
          // if (this.delayFactor <= 10) this.delayFactor = 0.2;
          setTimeout(() => {
            this.getDirections(startLoc, destinationLoc, wayPoints);
          }, this.delayFactor * 100);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  setCurrentLocation = () => {
    let count = 0;
    let refreshIntervalId = setInterval(() => {
      const locations = this.state.wayPoints;

      if (locations) {
        //if (count <= locations.length - 1) {
        if (count <= locations.length) {
          const currentLocation = convertLatLngToObj(
            locations[count].lat(),
            locations[count].lng()
          );
          this.setState({ currentLocation });

          const wayPts = [];
          wayPts.push(currentLocation);
          //  const startLoc = this.props.from.lat + ", " + this.props.from.lng;
          const startLoc = locations[count].lat() + ", " + locations[count].lng();
          const destinationLoc = this.props.to.lat + ", " + this.props.to.lng;
          this.delayFactor = 0;
          this.getDirections(startLoc, destinationLoc, wayPts);
          count++;
        } else {
          clearInterval(refreshIntervalId);
        }
      }
    }, 1000);
  };


  // move marker from position current to moveto in t seconds
  animatedMove(marker, t, current, moveto) {
    var lat = current.lat();
    var lng = current.lng();

    var deltalat = (moveto.lat() - current.lat()) / 100;
    var deltalng = (moveto.lng() - current.lng()) / 100;

    var delay = 10 * t;
    for (var i = 0; i < 100; i++) {
      (function (ind) {
        setTimeout(
          function () {
            var lat = marker.position.lat();
            var lng = marker.position.lng();
            lat += deltalat;
            lng += deltalng;
            let latlng = window.google.maps.LatLng(lat, lng);
            marker.setPosition(latlng);
          }, delay * ind
        );
      })(i)
    }
  }


  render() {
    let originMarker = null;
    let destinationMarker = null;
    if (this.state.directions && this.props.index) {
      originMarker = (

        <Marker
          defaultLabel={this.props.index.toString()}
          defaultIcon={null}
          position={{
            lat: parseFloat(this.props.from.lat),
            lng: parseFloat(this.props.from.lng)
          }}
        />
      );
      destinationMarker = (
        <Marker
          label={this.props.index.toString()}
          defaultIcon={null}
          position={{
            lat: parseFloat(this.props.to.lat),
            lng: parseFloat(this.props.to.lng)
          }}
        />
      );
    }
    return (
      <div>
        {originMarker}
        {destinationMarker}
        {this.state.currentLocation && (
          <Marker
            // label={this.props.index.toString()}

            icon={ResourcesConstants.bike_icon}
            position={{
              lat: this.state.currentLocation.lat,
              lng: this.state.currentLocation.lng
            }}

            animation={window.google.maps.Animation.BOUNCE}
          />
          // <MarkerFirst
          //   position={{
          //     lat: this.state.currentLocation.lat,
          //     lng: this.state.currentLocation.lng
          //   }}
          //   name={this.props.index.toString()}
          //   color="blue"
          // />
        )}
        {this.state.directions && (
          <DirectionsRenderer
            directions={this.state.directions}
            options={{
              polylineOptions: {
                storkeColor: this.props.storkeColor,
                strokeOpacity: 0.4,
                strokeWeight: 4
              },
              preserveViewport: true,
              suppressMarkers: true,
              icon: { scale: 3 }
            }}
          />
        )}
      </div>
    );
  }
}

export default DirectionRenderComponent;
