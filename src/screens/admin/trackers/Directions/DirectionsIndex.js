import React, { Component, Fragment } from "react";
import { compose, withProps } from "recompose";
import DirectionRenderComponent from "./DirectionRenderComponent";
import { G_API_URL } from "../constants";
import DummyLocations from "../dummyLocations";
import BaseComponent from "../../../../common/BaseComponent";
import { withStyles } from '@material-ui/core/styles';
export const LATLNG = { to: { lat: "26.9048", lng: "75.7489" }, from: { lat: "26.906955", lng: "75.799071" } };

const { withScriptjs, withGoogleMap, GoogleMap } = require("react-google-maps");

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

let marker = undefined;
let map = undefined;

class Directions extends BaseComponent {
  state = {
    defaultZoom: 14,
    map: null,
    center: {
      lat: 26.8505,
      lng: 75.7628
    }
  };

  // initMap() {
  //   map = window.google.maps.Map(document.getElementById('map'), {
  //     zoom: 4,
  //     center: window.google.maps.LatLng(-37.8136, 144.9631)
  //   });
  //   marker = window.google.maps.Marker({
  //     map: map,
  //   });

  //   marker.setPosition(map.getCenter());

  //   map.addListener('click', function (e) {
  //     // animatedMove(marker, .5, marker.position, e.latLng);
  //   });
  // }




  // move marker from position current to moveto in t seconds
  // animatedMove(marker, t, current, moveto) {
  //   var lat = current.lat();
  //   var lng = current.lng();

  //   var deltalat = (moveto.lat() - current.lat()) / 100;
  //   var deltalng = (moveto.lng() - current.lng()) / 100;

  //   var delay = 10 * t;
  //   for (var i = 0; i < 100; i++) {
  //     (function (ind) {
  //       setTimeout(
  //         function () {
  //           var lat = marker.position.lat();
  //           var lng = marker.position.lng();
  //           lat += deltalat;
  //           lng += deltalng;
  //           latlng = window.google.maps.LatLng(lat, lng);
  //           marker.setPosition(latlng);
  //         }, delay * ind
  //       );
  //     })(i)
  //   }
  // }

  componentDidMount() {
   // window.google.maps.event.addDomListener(window, 'load', this.initMap);
  }


  render() {
    const { classes } = this.props;
    LATLNG.from = { lat: "26.8505", lng: "75.7628" }
    // DummyLocations.getValue();
    return (
      <Fragment >
        <div className={classes.appBarSpacer} />

        <div id="map"></div>

        {/* <GoogleMap
          scrollwheel={true}
          defaultZoom={this.state.defaultZoom}
          center={this.state.center}
          //  defaultCenter={new window.google.maps.LatLng(23.21632, 72.641219)}
          defaultCenter={this.state.center}
        >
          {

            <DirectionRenderComponent
              index={0 + 1}
              strokeColor={'#f68f54'}
              from={LATLNG.from}
              to={LATLNG.to}

            />

            // DummyLocations.map((elem, index) => {

            //   return (
            //     <DirectionRenderComponent
            //       key={index}
            //       index={index + 1}
            //       strokeColor={elem.strokeColor}
            //       from={elem.from}
            //       to={elem.to}

            //     />
            //   );
            // })
          }
        </GoogleMap>
      */}

      </Fragment >
    );
  }
}

export default compose(
  withProps({
    googleMapURL: G_API_URL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(Directions);
