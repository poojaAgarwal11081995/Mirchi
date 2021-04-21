import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { reqGetRestoList, reqRegionList, reqCountryList, reqStateList, reqCityList, } from '../../actions';
import * as types from '../../actions/types';
import BaseComponent from '../../common/BaseComponent';
import * as Constants from '../../utils/Constants';
import * as StringKeys from '../../res/StringKeys';
import ChooseRestoItemTable from '../../tables/ChooseRestoItemTable';
import { Link } from 'react-router-dom';
import * as CustomStorage from '../../utils/CustomStorage';
import CustomPBar from '../../common/CustomPBar';
import Grid from '@material-ui/core/Grid';
import CommonButton from '../../common/CommonButton';
//import CustomPBar from '../../common/CustomPBar';
import CommonDocViewer from '../../common/CommonDocViewer';
import CommonFullImageViewer from '../../common/CommonFullImageViewer';
import CommonGridTextField from '../../common/CommonGridTextField';
import CommoanAutocomplete from '../../common/CommoanAutocomplete';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();


const userData = undefined;
let TEXTFIELD_XS = 12;


class ChooseRestoItem extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
            [Constants.KEY_SHOW_PROGRESS]: false,
            [Constants.KEY_DATA]: [],
            headerData: [{ [Constants.KEY_NAME]: this.strings(StringKeys.Name) },
            { [Constants.KEY_NAME]: this.strings(StringKeys.Description) },
            { [Constants.KEY_NAME]: this.strings(StringKeys.City) },
            { [Constants.KEY_NAME]: this.strings(StringKeys.State) },
            { [Constants.KEY_NAME]: this.strings(StringKeys.County) },
            { [Constants.KEY_NAME]: this.strings(StringKeys.Action) }],


            selectedCountry: '',
            selectedState: '',
            selectedCity: '',
            selectedRegion: '',
        };
        this.getRestoList();
    }

    // componentWillReceiveProps(nextProps) {
    // }



    componentDidMount() {


        this.getCountryList();
    }

    handleSearchChange = name => event => {
        this.setState({ [name]: event.target[Constants.KEY_VALUE] });
    };


    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    onClickRestroDetail = (item) => {

    }



    allLoFieldClear(number) {
        if (number == 4) {
            let obj = {
                selectedCountry: '',
                selectedState: '',
                selectedCity: '',
                selectedRegion: '',
                [Constants.KEY_COUNTRY_ID]: undefined,
                [Constants.KEY_STATE_ID]: undefined,
                [Constants.KEY_CITY_ID]: undefined,
                [Constants.KEY_STATE_LIST_DATA]: [],
                [Constants.KEY_CITY_LIST_DATA]: [],

            }
            this.setState(obj);
        } else if (number == 3) {
            this.setState({
                selectedState: '',
                selectedCity: '',
                selectedRegion: '',
                [Constants.KEY_REGION_ID]: undefined,
                [Constants.KEY_CITY_ID]: undefined,
                [Constants.KEY_STATE_ID]: undefined,
                [Constants.KEY_CITY_LIST_DATA]: [],
                [Constants.KEY_REGION_LIST_DATA]: [],

            })
        }
        else if (number == 2) {
            this.setState({
                selectedCity: '',
                selectedRegion: '',
                [Constants.KEY_CITY_ID]: undefined,
                [Constants.KEY_REGION_ID]: undefined,
                [Constants.KEY_REGION_LIST_DATA]: [],

            })
        }
    }









    handleChangeCountry = (selectedOption, isDeleted) => {
        if (isDeleted.action == 'clear') {
            this.allLoFieldClear(4)
        } else {
            this.getStateList(selectedOption);
        }
    };

    handleChangeState = (selectedOption, isDeleted) => {
        if (isDeleted.action == 'clear') {
            this.allLoFieldClear(3)
        } else {
            this.getCityList(selectedOption);
        }
    };

    handleChangeCity = (selectedOption, isDeleted) => {
        if (isDeleted.action == 'clear') {
            this.allLoFieldClear(2)
        } else {
            this.setState({
                selectedCity: selectedOption,
                [Constants.KEY_CITY_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID]
            })
            this.getRegionList(selectedOption);
        }
    };

    handleChangeRegion = (selectedOption, isDeleted) => {
        if (isDeleted.action == 'clear') {
            this.setState({
                selectedRegion: '',
                [Constants.KEY_REGION_ID]: undefined
            })
        } else {
            this.setState({
                selectedRegion: selectedOption,
                [Constants.KEY_REGION_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID]
            })
        }
    };






    render() {
        const { classes } = this.props;

        if (this.state[Constants.KEY_SHOW_PROGRESS] == true) {
            return (
                <div className={classes.mainView}>
                    <CustomPBar showProgress={this.state[Constants.KEY_SHOW_PROGRESS]} />
                </div>
            )
        } else
            return (
                <Fragment>
                    <div className={classes.appBarSpacer} />

                    {/* <Grid item xs={TEXTFIELD_XS} style={{ marginTop: 0, }}>
                        <CommonButton
                            style={{ marginTop: 0, }}
                            type="submit"
                            fullWidth={false}
                            variant="contained"
                            color="secondary"
                            ref={btnAddCate => this.btnAddCate = btnAddCate}
                            className={classes.submit}
                            onClick={() => {
                                this.navigateAddPage()
                            }}
                            label={this.strings(StringKeys.Add_New)}
                            disabled={this.state.disabledClickedBtn}
                        />
                    </Grid> */}

                    <CommonGridTextField
                        required
                        xs={TEXTFIELD_XS}
                        style={{ marginTop: 20, }}
                        id="restaurantName"
                        label={this.strings(StringKeys.Search)}
                        fullWidth
                        className={classes.textField}
                        value={this.state[Constants.KEY_SEARCH]}
                        onChange={this.handleSearchChange(Constants.KEY_SEARCH)}
                        autoComplete="resname"
                        variant="outlined"
                        fieldStyle={classes.fieldHeight}
                        onEnterKey={() => this.getRestoList()}
                    />

                    <div class="container">
                        <div class="row justify-content-start">

                            <div class="col-sm justify-content-start">
                                <Grid xs={TEXTFIELD_XS} style={{ marginTop: 20, }}>
                                    <CommoanAutocomplete
                                        value={this.state.selectedCountry}
                                        options={this.state[Constants.KEY_COUNTRY_LIST_DATA]}
                                        components={animatedComponents}
                                        onChange={this.handleChangeCountry}
                                        placeholder={this.strings(StringKeys.Select_Country)}
                                    />
                                </Grid>
                            </div>


                            <div class="col-sm justify-content-start">
                                <Grid xs={TEXTFIELD_XS} style={{ marginTop: 20, }}>
                                    <CommoanAutocomplete
                                        value={this.state.selectedState}
                                        options={this.state[Constants.KEY_STATE_LIST_DATA]}
                                        components={animatedComponents}
                                        onChange={this.handleChangeState}
                                        placeholder={this.strings(StringKeys.Select_State)}
                                    />
                                </Grid>
                            </div>
                            <div class="col-sm justify-content-md-center">
                                <Grid xs={TEXTFIELD_XS} style={{ marginTop: 20, }}>
                                    <CommoanAutocomplete
                                        value={this.state.selectedCity}
                                        options={this.state[Constants.KEY_CITY_LIST_DATA]}
                                        components={animatedComponents}
                                        onChange={this.handleChangeCity}
                                        placeholder={this.strings(StringKeys.Select_City)}
                                    />
                                </Grid>
                            </div>
                            <div class="col-sm justify-content-md-center">
                                <Grid xs={TEXTFIELD_XS} style={{ marginTop: 20, }}>
                                    <CommoanAutocomplete
                                        value={this.state.selectedRegion}
                                        options={this.state[Constants.KEY_REGION_LIST_DATA]}
                                        components={animatedComponents}
                                        onChange={this.handleChangeRegion}
                                        placeholder={this.strings(StringKeys.Select_Region)}

                                    />
                                </Grid>
                            </div>

                            <div class="row justify-content-md-center">
                                <Grid xs={4} style={{ marginTop: 30, }}>
                                    <CommonButton
                                        type="search"
                                        fullWidth={false}
                                        variant="contained"
                                        color="secondary"
                                        ref={btnAddCate => this.btnAddCate = btnAddCate}
                                        className={classes.submit}
                                        onClick={() => {
                                            this.getRestoList()
                                        }}
                                        label={this.strings(StringKeys.Search)}
                                        disabled={this.state.disabledClickedBtn}
                                    />
                                </Grid>
                            </div>


                        </div>
                    </div>


                    {
                        (this.state.headerData !== undefined && this.state.headerData.length > 0) ?
                            <div className={classes.tableContainer} style={{ marginTop: 20, }}>
                                <ChooseRestoItemTable data={this.state[Constants.KEY_DATA]}
                                    context={this}
                                    headerData={this.state.headerData}
                                />
                            </div>
                            : null
                    }

                </Fragment>
            )
    }



    getCountryList = () => {
        let data = {
            [Constants.KEY_USERID]: userData != undefined ? userData[Constants.KEY_USERID] : '0'
        }
        this.props.reqCountryList(data, this)
    }
    getStateList = (selectedOption) => {
        this.setState({
            [Constants.KEY_STATE_LIST_DATA]: [],
            [Constants.KEY_CITY_LIST_DATA]: [],
            selectedState: '',
            selectedCity: '',
            selectedRegion: '',
            selectedCountry: selectedOption,
            [Constants.KEY_COUNTRY_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID]
        })
        let data = {
            [Constants.KEY_COUNTRY_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID]
        }
        this.props.reqStateList(data, this)
    }

    getCityList = (selectedOption) => {
        this.setState({
            [Constants.KEY_CITY_LIST_DATA]: [],
            selectedCity: '',
            selectedState: selectedOption,
            selectedRegion: '',
            [Constants.KEY_STATE_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID]
        })
        let data = {
            [Constants.KEY_COUNTRY_ID]: selectedOption[Constants.KEY_COUNTRY_ID],
            [Constants.KEY_STATE_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID]
        }
        this.props.reqCityList(data, this)
    }

    getRegionList = (selectedOption) => {
        this.setState({
            [Constants.KEY_REGION_LIST_DATA]: [],
            selectedRegion: '',
            selectedCity: selectedOption,
            [Constants.KEY_CITY_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID]
        })
        let data = {
            [Constants.KEY_COUNTRY_ID]: this.state.selectedState[Constants.KEY_COUNTRY_ID],
            [Constants.KEY_STATE_ID]: this.state.selectedState[Constants.KEY_UNDERSCORE_ID],
            [Constants.KEY_CITY_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID]
        }
        this.props.reqRegionList(data, this)
    }










    handleResponse = (nextProps) => {
        var respObj = null;
        if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
            respObj = { disabledClickedBtn: false, [Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS] };
            this.setState(respObj)
        }
        else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
            if (nextProps[Constants.KEY_TYPE] === types.API_RESTRO_LIST) {
                respObj = { [Constants.KEY_SHOW_PROGRESS]: false, [Constants.KEY_DATA]: nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][Constants.KEY_RESTRO_LIST] };
                this.setState(respObj);
            }


            else if (nextProps[Constants.KEY_TYPE] === types.API_COUNTRY_LIST) {

                respObj = {
                    [Constants.KEY_SHOW_PROGRESS]: false,
                    [Constants.KEY_COUNTRY_LIST_DATA]: nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA]
                };
                this.setState(respObj);
            }

            else if (nextProps[Constants.KEY_TYPE] === types.API_STATE_LIST) {

                respObj = {
                    [Constants.KEY_SHOW_PROGRESS]: false,
                    [Constants.KEY_STATE_LIST_DATA]: nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA]
                };
                this.setState(respObj);
            }
            else if (nextProps[Constants.KEY_TYPE] === types.API_CITY_LIST) {

                respObj = {
                    [Constants.KEY_SHOW_PROGRESS]: false,
                    [Constants.KEY_CITY_LIST_DATA]: nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA]
                };
                this.setState(respObj);
            }
            else if (nextProps[Constants.KEY_TYPE] === types.API_LOCALITY_LIST) {

                respObj = {
                    [Constants.KEY_SHOW_PROGRESS]: false,
                    [Constants.KEY_REGION_LIST_DATA]: nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA]
                };
                this.setState(respObj);
            }
        }

    }





    getRestoList = () => {
        var data = {
            offset: 0
        }

        if (this.state[Constants.KEY_SEARCH] !== undefined)
            data[Constants.KEY_SEARCH] = this.state[Constants.KEY_SEARCH];

        if (this.state[Constants.KEY_COUNTRY_ID] !== undefined)
            data[Constants.KEY_COUNTRY_ID] = this.state[Constants.KEY_COUNTRY_ID];

        if (this.state[Constants.KEY_STATE_ID] !== undefined)
            data[Constants.KEY_STATE_ID] = this.state[Constants.KEY_STATE_ID];
        if (this.state[Constants.KEY_CITY_ID] !== undefined)
            data[Constants.KEY_CITY_ID] = this.state[Constants.KEY_CITY_ID];

        if (this.state[Constants.KEY_REGION_ID] !== undefined)
            data[Constants.KEY_REGION_ID] = this.state[Constants.KEY_REGION_ID];
        this.props.reqGetRestoList(data, this)
    }

}


const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarSpacer: theme.mixins.toolbar,
    tableContainer: {
        height: 320,
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
});
ChooseRestoItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
    return response;
}
export default connect(mapStateToProps, { reqGetRestoList, reqRegionList, reqCountryList, reqStateList, reqCityList, })(withStyles(styles)(ChooseRestoItem));


