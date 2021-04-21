import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { reqDriverDocStatusChange, reqChangeStatusDriver, reqDriverList, reqDeleteDriver, reqRegionList, reqCountryList, reqStateList, reqCityList, reqListRestroEarning } from '../../actions';
import * as types from '../../actions/types';
import BaseComponent from '../../common/BaseComponent';
import * as Constants from '../../utils/Constants';
import * as StringKeys from '../../res/StringKeys';
import Grid from '@material-ui/core/Grid';
import CommonButton from '../../common/CommonButton';
import CustomPBar from '../../common/CustomPBar';
import * as CustomStorage from '../../utils/CustomStorage'
import moment from 'moment';

import CommonGridTextField from '../../common/CommonGridTextField';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';






let TEXTFIELD_XS = 12;
const userData = undefined;
let changeAbleDriverId = -1;
class RestaurentEarning extends BaseComponent {
    constructor(props) {
        super(props)
        userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
        this.state = {
            [Constants.KEY_SHOW_PROGRESS]: false,
            [Constants.KEY_DATA]: [],
            headerData: [{
                [Constants.KEY_NAME]:
                    this.strings(StringKeys.Name)
            },
            { [Constants.KEY_NAME]: this.strings(StringKeys.Description) },
            { [Constants.KEY_NAME]: this.strings(StringKeys.Stauts) },
            { [Constants.KEY_NAME]: this.strings(StringKeys.Action) }],
            viewAbleImage: '',
            isVisible: false,
            isVisibleFullImage: false,
            viewFullImage: '',
            earningDriverList: []
        };

    }
    componentDidMount() {
        this.listDriverEarning();
        console.log("usdbfjbsdbfbndksjn");

    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    navigateAddPage() {
        this.props.history.push({
            pathname: Constants.SCREEN_ADD_DRIVER
        });

    }

    handleSearchChange = name => event => {
        this.setState({ [name]: event.target[Constants.KEY_VALUE] });
    };





    viewFullImage = (image) => {

        this.setState({
            isVisibleFullImage: !this.state.isVisibleFullImage,
            viewFullImage: image
        })
    };


    closeDilaog = () => {
        this.setState({ isVisible: !this.state.isVisible });
    }
    closeDilaogFullImage = () => {
        this.setState({ isVisibleFullImage: !this.state.isVisibleFullImage });
    }

    listDriverEarning = () => {
        this.props.reqListRestroEarning({
            [Constants.KEY_RESTO_ID]: userData[Constants.KEY_RETSRO_DETAILS][Constants.KEY_UNDERSCORE_ID]
        }, this)
    }
    render() {
        // console.log("ghgd ::: ", CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA).restro_detail);

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


                    <List style={{ display: "flex" }}>
                        {this.state.earningDriverList.map((item, index) => {
                            let strtDate = Utility.getEarnDateMMMInUtc(item.week_start_date);
                            let endDate = Utility.getEarnDateMMMInUtc(item.week_end_date);
                            //console.log('ddwwd ::::: ',strtDate,endDate);

                            return (
                                <div key={index} style={{ marginRight: 5, backgroundColor: '#f0f2f5' }}>
                                    <ListItem onClick={() => console.log('clicked on photos')}>
                                        {/* <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon />
                                </Avatar>
                            </ListItemAvatar> */}
                                        <ListItemText primary={item.week_number} secondary={`${strtDate} - ${endDate}`} />
                                    </ListItem>
                                </div>
                            )
                        })}

                        {/* <div style={{ marginRight:5,backgroundColor:'#f0f2f5'}}>
                        <ListItem onClick={()=>console.log('clicked on work')}>
                            <ListItemAvatar>
                                <Avatar>
                                    <WorkIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Work" secondary="Jan 7, 2014" />
                        </ListItem>
                        </div>
                        <div style={{ marginRight:5,backgroundColor:'#f0f2f5'}}>
                        <ListItem onClick={()=>console.log('clicked on vacation')}>
                            <ListItemAvatar>
                                <Avatar>
                                    <BeachAccessIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Vacation" secondary="July 20, 2014" />
                        </ListItem>
                        </div> */}
                    </List>


                </Fragment>
            )
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
        console.log('handleResponse :: ', nextProps);

        var respObj = null;
        if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
            respObj = { disabledClickedBtn: false, [Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS] };
            this.setState(respObj)
        }
        if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {

            if (nextProps[Constants.KEY_TYPE] === types.API_LIST_RESTRO_EARNING) {
                respObj = {
                    [Constants.KEY_SHOW_PROGRESS]: false,
                    earningDriverList: nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][Constants.KEY_RESTRO_EARNING_LIST],
                };

                this.setState(respObj, () => {
                    if (changeAbleDriverId >= 0) {
                        console.log('index ', changeAbleDriverId + '')
                        let obj = this.state[Constants.KEY_DATA][changeAbleDriverId]
                        console.log('index ', 'after filter ', JSON.stringify(obj), 'form server ', JSON.stringify(this.state[Constants.KEY_DATA]))
                        this.viewImage(obj, changeAbleDriverId, 'check');
                    }
                });
            }

        }
    }






    getDriverList = () => {


        let data = {
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

        this.props.reqDriverList(data, this)
    }





    deleteDriver(id) {
        var data = {
            [Constants.KEY_UNDERSCORE_ID]: id
        }
        this.props.reqDeleteDriver(data, this)
    }

    navigateOnDetailsPage(id) {
        this.props.history.push({
            pathname: Constants.SCREEN_DRIVER_DETAIL,
            [Constants.KEY_DRIVER_ID]: id
        });
    }

    navigateOrderList() {
        this.props.history.push({
            pathname: Constants.SCREEN_ORDER_LIST,
        });
    }
    navigateEarringPage() {
        this.props.history.push({
            pathname: Constants.SCREEN_ORDER_LIST,
        });
    }







    updateStatus = (_id, status) => {
        let data = {
            [Constants.KEY_UNDERSCORE_ID]: _id,
            [Constants.KEY_STATUS]: !status
        }
        this.props.reqChangeStatusDriver(data, this)
    }


    updateDocStatus = (dataObj, status) => {
        console.log('dataObj ', JSON.stringify(dataObj))
        let data = {
            [Constants.KEY_UNDERSCORE_ID]: dataObj[Constants.KEY_UNDERSCORE_ID],
            [dataObj[Constants.KEY_KEY]]: status
        }


        this.props.reqDriverDocStatusChange(data, this)
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
    }, root: {
        // width: '100%',
        //maxWidth: 360,
        //margin:5,
        //display:'flex',
        backgroundColor: theme.palette.background.paper,
    },
});
RestaurentEarning.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
    return response;
}
export default connect(mapStateToProps, {
    reqDriverDocStatusChange,
    reqChangeStatusDriver, reqDriverList, reqDeleteDriver,
    reqRegionList, reqCountryList, reqStateList, reqCityList, reqListRestroEarning
})(withStyles(styles)(RestaurentEarning));


