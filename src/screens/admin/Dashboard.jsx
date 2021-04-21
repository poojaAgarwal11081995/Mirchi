import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SimpleTable from './SimpleTable';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import PhoneCallbackIcon from '@material-ui/icons/PhoneCallback';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import BaseComponent from '../../common/BaseComponent.jsx'
import * as StringKeys from '../../res/StringKeys';
import { connect } from 'react-redux';
import { reqChangeStatusDriverRequested, reqListRequestedResto, reqChangeStatusRestroRequested, reqGetRestoList, reqDeleteRestro, reqListReqDrivers, reqDeleteDriver } from '../../actions';
import * as types from '../../actions/types';
import * as Constants from '../../utils/Constants';
import AddDriverTable from '../../tables/AddDriverTable';
import DashboardRestoItem from '../../tables/DashboardRestoItem';
import * as CustomStorage from '../../utils/CustomStorage'
import * as Colors from '../../res/Colors'
import CustomPBar from '../../common/CustomPBar';
import RequestedDriverTable from '../../tables/RequestedDriverTable';

let selectedTab = 0;
let userData = undefined;
class Dashboard extends BaseComponent {
    constructor(props) {
        super(props)

        userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
        this.state = {
            selectedTab: 0,
            [Constants.KEY_SHOW_PROGRESS]: true,
            [Constants.KEY_DATA]: [],
            [Constants.KEY_DRIVER_LIST]: [],
            headerData: [{ [Constants.KEY_NAME]: this.strings(StringKeys.Name) },
            { [Constants.KEY_NAME]: this.strings(StringKeys.Description) },
            { [Constants.KEY_NAME]: this.strings(StringKeys.Stauts) },
            { [Constants.KEY_NAME]: this.strings(StringKeys.Action) }]
        };
        this.getRestoList();
        this.getDriverList();
        console.log('user_data mahesh', this.props)


    }
    handleChange = (event, newValue) => {
        selectedTab = newValue;
        this.setState({ selectedTab: newValue })


    }

    deleteRestro(id) {
        var data = {
            [Constants.KEY_UNDERSCORE_ID]: id
        }
        this.props.reqDeleteRestro(data, this)
    }

    navigate(id) {
        this.props.history.push({
            pathname: Constants.SCREEN_RESTAURANT_DETAIL,
            [Constants.KEY_RESTO_ID]: id
        });
    }


    navigateOrdersPage() {
        this.props.history.push({
            pathname: Constants.SCREEN_SCREEN_CHECK_REQUEST,
        });
    }


    updateStatus = (request) => {
        request[Constants.KEY_USERID] = userData[Constants.KEY_USERID];
        this.props.reqChangeStatusRestroRequested(request, this)
    }


    updateDriverStatus = (request) => {
        request[Constants.KEY_CREATED_BY] = userData[Constants.KEY_USERID];
        this.props.reqChangeStatusDriverRequested(request, this)
    }


    render() {

        const { classes } = this.props;
        // const { selectedTab } = this.state;
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
                    <Tabs
                        value={selectedTab}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons="ony"
                        indicatorColor="primary"
                        textColor="primary"

                    >
                        <Tab style={{ backgroundColor: selectedTab == 0 ? Colors.colorBalckTrans : Colors.white }}
                            label={this.strings(StringKeys.Requested_Restaurent)} icon={<PhoneCallbackIcon />} />
                        <Tab style={{ backgroundColor: selectedTab == 1 ? Colors.colorBalckTrans : Colors.white }}
                            label={this.strings(StringKeys.Requested_Driver)} icon={<PhoneCallbackIcon />} />
                    </Tabs>

                    {

                        ((this.state.headerData !== undefined && this.state.headerData.length > 0) ?

                            <div className={classes.tableContainer}>
                                {
                                    selectedTab == 0 ?
                                        (<DashboardRestoItem dataOb={this.state[Constants.KEY_DATA]
                                        }
                                            context={this} />) :
                                        (<RequestedDriverTable data={this.state[Constants.KEY_DRIVER_LIST]}
                                            context={this}
                                        />)
                                }
                            </div>
                            : null)

                    }


                </Fragment>
            )
    }



    getRestoList = () => {
        var data = {
            offset: 0
        }
        this.props.reqListRequestedResto(data, this)
    }

    getDriverList = () => {
        var data = {
            offset: 0
        }
        this.props.reqListReqDrivers(data, this)
    }

    deleteDriver(id) {
        var data = {
            [Constants.KEY_UNDERSCORE_ID]: id
        }
        this.props.reqDeleteDriver(data, this)
    }

    navigateDriverDetails(id) {
        this.props.history.push({
            pathname: Constants.SCREEN_REQUESTED_DRIVER_DETAILS,
            [Constants.KEY_DRIVER_ID]: id
        });
    }

    navigateRestroDetails(id) {

        this.props.history.push({
            pathname: Constants.SCREEN_REQUESTED_RESTRO_DETAILS,
            [Constants.KEY_RESTO_ID]: id
        });

    }



    handleResponse = (nextProps) => {
        var respObj = null;
        if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
            respObj = { disabledClickedBtn: false, [Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS] };
            this.setState(respObj)
        }
        else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
            if (nextProps[Constants.KEY_TYPE] === types.API_LIST_REQUESTED_RESTRO) {

                respObj = { [Constants.KEY_SHOW_PROGRESS]: false, [Constants.KEY_DATA]: nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][Constants.KEY_RESTRO_LIST] };
                this.setState(respObj);
            } else if (nextProps[Constants.KEY_TYPE] === types.API_DELETE_RESTRO) {
                respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
                this.setState(respObj);
                this.getRestoList();
            } else if (nextProps[Constants.KEY_TYPE] === types.API_LIST_REQ_DRIVER) {
                respObj = {
                    [Constants.KEY_SHOW_PROGRESS]: false,
                    [Constants.KEY_DRIVER_LIST]: nextProps[Constants.KEY_RESPONSE]
                    [Constants.KEY_DATA][Constants.KEY_DRIVER_LIST]
                };
                this.setState(respObj);
            } else if (nextProps[Constants.KEY_TYPE] === types.API_DELETE_DRIVER) {
                respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
                this.setState(respObj);
                this.getDriverList();
            }
            else if (nextProps[Constants.KEY_TYPE] === types.API_CHANGE_REQ_DRIVER_STATUS) {
                respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
                this.setState(respObj);
                this.getDriverList();
            }
            else if (nextProps[Constants.KEY_TYPE] === types.API_CHANGE_STATUS_REQUESTED_RESTRO) {
                respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
                this.setState(respObj);
                this.getRestoList();
            }
        }
    }



}

const styles = theme => (
    {
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
        textSize: {
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
        },
    });

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};


function mapStateToProps({ response }) {
    return response;
}
export default connect(mapStateToProps, { reqChangeStatusDriverRequested, reqListRequestedResto, reqChangeStatusRestroRequested, reqGetRestoList, reqDeleteRestro, reqListReqDrivers, reqDeleteDriver })(withStyles(styles)(Dashboard));

