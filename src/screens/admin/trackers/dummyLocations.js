import { locationsList } from "./constants";
import { createLocationObject } from "./helper";
import { LATLNG } from "./Directions/DirectionsIndex";


// const directions = [
//   {
//     from: locationsList.Mumbai,
//     to: locationsList.Pune,
//     strokeColor: "#f68f54"
//   },
//   {
//     from: locationsList.Goa,
//     to: locationsList.Ratnagiri,
//     strokeColor: "#f68f54"
//   },
//   {
//     from: locationsList.Nagpur,
//     to: locationsList.Nashik,
//     strokeColor: "#f68f54"
//   },
//   {
//     from: locationsList.Indore,
//     to: locationsList.Gwalior,
//     strokeColor: "#f68f54"
//   },
//   {
//     from: locationsList.Madurai,
//     to: locationsList.Coimbatore,
//     strokeColor: "#f68f54"
//   },
//   {
//     from: locationsList.Chennai,
//     to: locationsList.Tirupati,
//     strokeColor: "#f68f54"
//   },
//   {
//     from: locationsList.Kochi,
//     to: locationsList.Thiruvalla,
//     strokeColor: "#f68f54"
//   },
//   {
//     from: locationsList.Udaipur,
//     to: locationsList.Jodhpur,
//     strokeColor: "#f68f54"
//   },
//   {
//     from: locationsList.Jaisalmer,
//     to: locationsList.Jaipur,
//     strokeColor: "#f68f54"
//   },
//   {
//     from: locationsList.Kota,
//     to: locationsList.Bikaner,
//     strokeColor: "#f68f54"
//   }
// ];

const directions = [

  {
    to: locationsList.Jaisalmer,
    from: locationsList.Jaipur,
    strokeColor: "#f68f54"
  }
];

// function getLatat(params) {
//   console.log('LATLNG =', JSON.stringify(LATLNG.from))
// }

const DummyLocations = directions.map(elem => {
  return createLocationObject(
    elem.from.latLng,
    elem.from.title,
    elem.to.latLng,
    elem.to.title,
    elem.strokeColor
  );
});

export default DummyLocations;
