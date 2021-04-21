import React from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { classnames } from './helpers';




class AddressMatcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            errorMessage: '',
            latitude: null,
            longitude: null,
            isGeocoding: false,
            fulladdress: false,
            selectCallBack: this.props,
        };
    }

    handleChange = address => {
        this.setState({
            address,
            latitude: null,
            longitude: null,
            errorMessage: '',
        });
    };

    getAddressModelParse(data, callback) {
        let objAddress = {};
        console.log('parseable data =' + JSON.stringify(data))
        try {
            if (data != null && data != undefined & data.length > 0) {
                let childobj = data[0];
                if (childobj.address_components != null &&
                    childobj.address_components != undefined
                    && childobj.address_components.length > 0) {
                    objAddress.long_name = childobj.address_components[0].long_name;
                    objAddress.short_name = childobj.address_components[0].short_name;
                    let array = childobj.address_components;
                    objAddress.long_name = childobj.address_components[0].long_name;
                    objAddress.short_name = childobj.address_components[0].short_name;
                    for (const key in array) {
                        if (array.hasOwnProperty(key)) {
                            const element = array[key];

                            if (element.types[0] == "country") {
                                objAddress.short_name = element.types[0];
                                objAddress.long_name = element.long_name;
                                objAddress.short_name = element.short_name;

                                break;
                            }
                        }
                    }


                }
                let geometryObj = childobj.geometry;
                if (geometryObj != undefined && geometryObj != null) {
                    let objLocation = geometryObj.location;
                    if (objLocation != undefined && objLocation != null) {
                        objAddress.lat = objLocation.lat();
                        objAddress.lng = objLocation.lng();
                    }
                }
                objAddress.location_type = childobj.location_type;
                objAddress.place_id = childobj.place_id;

                if (childobj.types != null && childobj.types != undefined) {
                    objAddress.types = childobj.types.toString();
                }

                let formatedObj = childobj.formatted_address;
                if (formatedObj != undefined && formatedObj != null && formatedObj != '') {
                    objAddress.formatted_address = childobj.formatted_address;
                    console.log('formatted_address ', JSON.stringify(childobj.formatted_address))
                }


            }
            callback(objAddress)
        } catch (error) {
            callback(error)
        }

    }

    handleSelect = selected => {
        this.setState({ isGeocoding: true, address: selected });
        geocodeByAddress(selected)
            .then(res => {
                this.getAddressModelParse(res, (response) => {
                    this.props.selectCallBack(response)
                    //  alert(JSON.stringify(response))
                    this.setState({
                        latitude: response.lat,
                        longitude: response.lng,
                        fulladdress: response,
                        isGeocoding: false,

                    });

                })

            })
            // .then(({ lat, lng, res }) => {
            //     alert(res)
            //     this.setState({
            //         latitude: lat,
            //         longitude: lng,
            //         isGeocoding: false,

            //     });
            // })
            .catch(error => {
                this.setState({ isGeocoding: false });
                console.log('error', error); // eslint-disable-line no-console
            });
    };

    handleCloseClick = () => {
        this.setState({
            address: '',
            latitude: null,
            longitude: null,
        });
    };

    handleError = (status, clearSuggestions) => {
        console.log('Error from Google Maps API', status); // eslint-disable-line no-console
        this.setState({ errorMessage: status }, () => {
            clearSuggestions();
        });
    };

    render() {
        const {
            address,
            errorMessage,
            latitude,
            longitude,
            isGeocoding,
        } = this.state;

        return (
            <div>
                <PlacesAutocomplete

                    onChange={this.handleChange}
                    value={address}
                    onSelect={this.handleSelect}
                    onError={this.handleError}
                    shouldFetchSuggestions={address.length > 2}


                >
                    {({ getInputProps, suggestions, getSuggestionItemProps }) => {
                        return (
                            <div className="Demo__search-bar-container">
                                <div className="Demo__search-input-container">

                                    <input
                                        style={{ width: '80%', height: '35px', fontSize: 18, }}
                                        required
                                        xs={12}
                                        id="countryName"
                                        {...getInputProps({
                                            placeholder: 'Search Places...',
                                            className: 'Demo__search-input',
                                        })}
                                        fullWidth
                                        label={'Search Places ...'}
                                        value={address}
                                        styles={selectStyles}
                                        variant="outlined"
                                        clearPress={this.handleCloseClick}
                                    >

                                    </input>

                                </div>
                                {suggestions.length > 0 && (
                                    <div className="Demo__autocomplete-container">
                                        {suggestions.map(suggestion => {
                                            const className = classnames('Demo__suggestion-item', {
                                                'Demo__suggestion-item--active': suggestion.active,
                                            });

                                            return (
                                                /* eslint-disable react/jsx-key */
                                                <div
                                                    {...getSuggestionItemProps(suggestion, { className })}
                                                >

                                                    <label style={style}
                                                        component="h5" variant="h5">
                                                        {suggestion.formattedSuggestion.secondaryText == undefined ?
                                                            suggestion.formattedSuggestion.mainText
                                                            : (suggestion.formattedSuggestion.mainText + ',  ' +
                                                                suggestion.formattedSuggestion.secondaryText)}
                                                    </label>

                                                </div>
                                            );
                                            /* eslint-enable react/jsx-key */
                                        })}
                                        {/* <div className="Demo__dropdown-footer">
                                            <div>
                                                <img
                                                    src={require('../../../assets/images/powered_by.png')}
                                                    className="Demo__dropdown-footer-image"
                                                />
                                            </div>
                                        </div> */}
                                    </div>
                                )}
                            </div>
                        );
                    }}
                </PlacesAutocomplete>
                {errorMessage.length > 0 && (
                    <div className="Demo__error-message">{this.state.errorMessage}</div>
                )}

                {/* {((latitude && longitude) || isGeocoding) && (
                    <div>
                        <h3 className="Demo__geocode-result-header">Geocode result</h3>
                        {isGeocoding ? (
                            <div>
                                <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
                            </div>
                        ) : (
                                <div>
                                    <div className="Demo__geocode-result-item--lat">
                                        <label>Latitude:</label>
                                        <span>{latitude}</span>
                                    </div>
                                    <div className="Demo__geocode-result-item--lng">
                                        <label>Longitude:</label>
                                        <span>{longitude}</span>
                                    </div>
                                </div>
                            )}
                    </div>
                )} */}
            </div>
        );
    }
}



const selectStyles = {
    menu: base => ({
        ...base,
        zIndex: 100,

    }),
    control: (base, state) => ({
        ...base,
        height: '55px',
        'min-height': '55px',
    }),

};

const style = {

    margin: '10px',
    color: "#676767",
    border: "0px solid red",
    position: "relative",
    width: "50%",
    position: 'relative',
    letterSpacing: 0,
    fontSize: 16,
    backgroundColor: '#FFF',
}

export default AddressMatcher;
