import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { reqDriverDocStatusChangeGrocery, reqChangeStatusDriverGrocery, reqDriverListGrocery, reqDeleteDriverGrocery, reqRegionList, reqCountryList, reqStateList, reqCityList, reqListDriverEarningGrocery } from '../../actions';
import * as types from '../../actions/types';
import BaseComponent from '../../common/BaseComponent';
import * as Constants from '../../utils/Constants';
import * as StringKeys from '../../res/StringKeys';
import Grid from '@material-ui/core/Grid';
import CustomPBar from '../../common/CustomPBar';
import * as CustomStorage from '../../utils/CustomStorage'
import moment from 'moment';
import makeAnimated from 'react-select/animated';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as Colors from '../../res/Colors';
import * as Utility from '../../utils/Utility';
import Card from '@material-ui/core/Card';

let TEXTFIELD_XS = 12;
const userData = undefined;
let changeAbleDriverId = -1;
let objDriver = undefined;
let thisWeekData = undefined;

class EarringPageGrocery extends BaseComponent {
    constructor(props) {
        super(props)
        userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
        objDriver = CustomStorage.getSessionDataAsObject(Constants.KEY_DRIVER_DETAILS);
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
            earningDriverList: [],
            thisWeekData: thisWeekData
        };

    }
    componentDidMount() {
        this.listDriverEarning();
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    navigateAddPage() {
        this.props.history.push({
            pathname: Constants.SCREEN_ADD_DRIVER_GROCERY
        });

    }




    listDriverEarning = () => {
        this.props.reqListDriverEarningGrocery({
            [Constants.KEY_DELIVERY_MAN_ID]: objDriver[Constants.KEY_UNDERSCORE_ID]
        }, this)
    }
    render() {
        const { classes } = this.props;

        if (this.state[Constants.KEY_SHOW_PROGRESS] == true) {
            return (
                <div className={classes.mainView}>
                    <CustomPBar showProgress={this.state[Constants.KEY_SHOW_PROGRESS]} />
                </div>
            )
        } else

            if ((this.state.earningDriverList == undefined || this.state.earningDriverList == '' || this.state.earningDriverList == null) || this.state.earningDriverList.length <= 0)
                return (
                    <Fragment>
                        <div className={classes.appBarSpacer} />
                        <Card xs={4} justifyContent={'center'} >
                            <ListItemText primary={this.strings(StringKeys.No_Items_Available)}
                                style={{
                                    backgroundColor: Colors.white, marginRight: 5, height: 50,
                                    padding: 10,
                                    alignContent: 'center',
                                    alignItems: 'center', justifyContent: 'center'
                                }}
                            />
                        </Card>
                    </Fragment>
                )
            else {
                return (
                    <Fragment>
                        <div className={classes.appBarSpacer} />
                        <List style={{ display: "flex" }}>
                            {this.state.earningDriverList.map((item, index) => {
                                let strtDate = Utility.getEarnDateMMMInUtc(item.week_start_date);
                                let endDate = Utility.getEarnDateMMMInUtc(item.week_end_date);
                                return (
                                    <Card key={index} xs={4} style={{ marginRight: 5, backgroundColor: Colors.white }}>
                                        <ListItem onClick={() => {
                                            CustomStorage.setSessionDataAsObject(Constants.KEY_EARINING_DETAILS, item);
                                            this.navigateEarringPage(item)
                                        }
                                        }>
                                            <Grid container
                                                direction="row"
                                                justify="space-between"
                                                alignItems="center"
                                            >
                                                <Grid>
                                                    <ListItemText primary={item.week_name} secondary={`${strtDate} - ${endDate}`} />
                                                </Grid>
                                                <Grid>
                                                    <ListItemText inset primary={Constants.RUPEES_SIGN + item[Constants.KEY_DELIVERY_CHARGE]} />
                                                </Grid>
                                            </Grid>


                                        </ListItem>
                                    </Card>
                                )
                            })}


                        </List>


                    </Fragment>
                )
            }

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




    setEarningListData = (dutyList, currentWeekNumber, previousWeekNumber) => {

        console.log('dutyListmoioi', JSON.stringify(dutyList));
        let pos = -1;
        dutyList.map((item, index) => {
            item[Constants.KEY_WEEK_START_DATE_SHOW] = Utility.convertTimeFromMiliseconds(item[Constants.KEY_WEEK_START_DATE], Constants.DATE_FORMAT_DD_MMM_SHOW);
            item[Constants.KEY_WEEK_END_DATE_SHOW] = Utility.convertTimeFromMiliseconds(item[Constants.KEY_WEEK_END_DATE], Constants.DATE_FORMAT_DD_MMM_SHOW);
            item[Constants.KEY_WEEK_NAME] = (item[Constants.KEY_WEEK_NUMBER] === currentWeekNumber) ? 'This Week'
                : ((item[Constants.KEY_WEEK_NUMBER] === (previousWeekNumber)) ?
                    'Last Week' : 'Week'
                    + " " + item[Constants.KEY_WEEK_NUMBER])
            if (item[Constants.KEY_WEEK_NUMBER] === currentWeekNumber) {
                pos = index;
                thisWeekData = item;
            }
            return item;
        })
        if (pos > -1) {
            // dutyList.splice(pos, 1)
        }

        console.log('dutyListmoioi FILTRED', JSON.stringify(dutyList));
        return dutyList;
    }



    handleResponse = (nextProps) => {
        console.log('handleResponse :: ', nextProps);
        var respObj = null;
        if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
            respObj = { disabledClickedBtn: false, [Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS] };
            this.setState(respObj)
        }
        if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {

            if (nextProps[Constants.KEY_TYPE] === types.API_LIST_DRIVER_EARNING_GROCERY) {
                respObj = {
                    [Constants.KEY_SHOW_PROGRESS]: false,

                };

                respObj.dataLength = nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][Constants.KEY_DRIVER_EARNING_LIST].length;
                respObj.earningDriverList = this.setEarningListData(
                    nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA]
                    [Constants.KEY_DRIVER_EARNING_LIST],
                    nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA]
                    [Constants.KEY_CURRENT_WEEK_NUMBER], nextProps[Constants.KEY_RESPONSE]
                    [Constants.KEY_DATA][Constants.KEY_PREVIOUS_WEEK_NUMBER])


                this.setState(respObj, () => {
                    if (changeAbleDriverId >= 0) {
                        let obj = this.state[Constants.KEY_DATA][changeAbleDriverId]
                        //this.viewImage(obj, changeAbleDriverId, 'check');
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

        this.props.reqDriverListGrocery(data, this)
    }





    deleteDriver(id) {
        var data = {
            [Constants.KEY_UNDERSCORE_ID]: id
        }
        this.props.reqDeleteDriverGrocery(data, this)
    }

    navigateOnDetailsPage(id) {
        this.props.history.push({
            pathname: Constants.SCREEN_DRIVER_DETAIL_GROCERY,
            [Constants.KEY_DRIVER_ID]: id
        });
    }


    navigateEarringPage(item) {
        this.props.history.push({
            pathname: Constants.SCREEN_GROCERY_EARRING_TIMEWISE,
        });
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
        backgroundColor: theme.palette.background.paper,
    },
});
EarringPageGrocery.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapStateToProps({ response }) {
    return response;
}
export default connect(mapStateToProps, { reqDriverDocStatusChangeGrocery, reqChangeStatusDriverGrocery, reqDriverListGrocery, reqDeleteDriverGrocery, reqRegionList, reqCountryList, reqStateList, reqCityList, reqListDriverEarningGrocery })(withStyles(styles)(EarringPageGrocery));


