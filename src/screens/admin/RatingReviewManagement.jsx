import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BorderColorIcon from '@material-ui/icons/BorderColor';

import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import BaseComponent from '../../common/BaseComponent.jsx'
import * as StringKeys from '../../res/StringKeys';
import { connect } from 'react-redux';
import { reqRatingReviewList, reqChageOrderStatus } from '../../actions';
import * as types from '../../actions/types';
import * as Constants from '../../utils/Constants';
import OrderNew from './orderreuest/OrderNew';
import OrderPreparing from './orderreuest/OrderPreparing';
import OrderRedy from './orderreuest/OrderRedy';
import OrderPast from './orderreuest/OrderPast';
import * as CustomStorage from '../../utils/CustomStorage';
import DriverFareList from './DriverFareList.jsx';
import RatingReviewList from './RatingReviewList.jsx';

let RESTO_ID = undefined;
let selectedTabObj = undefined;
class RatingReviewManagement extends BaseComponent {
    constructor(props) {
        super(props)
        selectedTabObj = undefined;
        RESTO_ID = CustomStorage.getSessionDataAsObject(Constants.KEY_RESTO_ID, 0);
        this.state = {
            selectedTab: 0,
            isGot: false,
            [Constants.KEY_SHOW_PROGRESS]: true,
            [Constants.KEY_DATA]: [],
            headerData: [{ [Constants.KEY_NAME]: this.strings(StringKeys.Name) },
            { [Constants.KEY_NAME]: this.strings(StringKeys.Description) },
            { [Constants.KEY_NAME]: this.strings(StringKeys.Stauts) },
            { [Constants.KEY_NAME]: this.strings(StringKeys.Action) }],
            tabOptions: this.getTabOptions()
        };

        selectedTabObj = this.state.tabOptions[0];

    }

    getTabOptions() {

        let tabOptions = [
            {
                [Constants.KEY_LABEL]: this.strings(StringKeys.DriverRatingReview),
                [Constants.KEY_VALUE]: StringKeys.DriverRatingReview,
                [Constants.KEY_STATUS]: Constants.DRIVER_RETING_REVIEW,
                [Constants.KEY_IMAGE]: <BorderColorIcon />
            },

            {
                [Constants.KEY_LABEL]: this.strings(StringKeys.CustomareRatingReview),
                [Constants.KEY_VALUE]: StringKeys.CustomareRatingReview,
                [Constants.KEY_STATUS]: Constants.CUSTOMARE_RETING_REVIEW,
                [Constants.KEY_IMAGE]: <BorderColorIcon />
            },

        ];
        return tabOptions;
    }

    handleChange = (event, newValue) => {
        this.setState({ selectedTab: newValue })
        selectedTabObj = this.state.tabOptions[newValue];
        this.getRatingReviewList();
    }

    componentDidMount() {
        this.getRatingReviewList();
    }

    render() {
        const { classes } = this.props;
        const { selectedTab, tabOptions } = this.state;


        return (
            <Fragment>
                <div className={classes.appBarSpacer} />
                <Tabs
                    value={selectedTab}
                    onChange={this.handleChange}
                    variant="fullWidth"
                    scrollButtons="ony"
                    indicatorColor="primary"
                    textColor="primary"
                >
                    {
                        tabOptions.map((item, index) => <Tab label={item[Constants.KEY_LABEL]}
                            icon={item[Constants.KEY_IMAGE]}
                        />)
                    }

                </Tabs>

                {
                    ((this.state.headerData !== undefined && this.state.headerData.length > 0) && this.state[Constants.KEY_DATA] != undefined
                        && this.state[Constants.KEY_DATA].length > 0 ?
                        <div className={classes.tableContainer}>
                            {
                                selectedTabObj[Constants.KEY_STATUS] == Constants.DRIVER_RETING_REVIEW ?
                                    (<RatingReviewList dataOb={this.state[Constants.KEY_DATA]}
                                        context={this} classes={classes}
                                        history={this.props.history}


                                    />) : (<RatingReviewList dataOb={[]}
                                        context={this} classes={classes}
                                        history={this.props.history}


                                    />)
                            }
                        </div>
                        : null)
                }


            </Fragment>
        )
    }

    handleResponse = (nextProps) => {
        var respObj = null;
        if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
            respObj = { disabledClickedBtn: false, [Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS] };
            this.setState(respObj)
        }
        else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
            if (nextProps[Constants.KEY_TYPE] === types.API_RATING_REVIEW_LIST) {
                respObj = {
                    [Constants.KEY_SHOW_PROGRESS]: false,
                    [Constants.KEY_DATA]: nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA]
                    [Constants.KEY_REVIEW_RATING_LIST]
                };

                this.setState(respObj);
            } else if (nextProps[Constants.KEY_TYPE] === types.API_CHANGE_ORDER_STATUS) {
                respObj = { [Constants.KEY_SHOW_PROGRESS]: false, };
                this.setState(respObj);
                this.getRatingReviewList();
            }
        }
    }

    getRatingReviewList = () => {
        var status = Constants.ORDER_STATUS_PENDING;
        if (selectedTabObj != undefined) {
            status = selectedTabObj[Constants.KEY_STATUS];
        }
        var data = {
            [Constants.KEY_RESTO_ID]: Constants.KEY_RESTO_ID,//'5d3bd82d0da6f7aff917bed0',//RESTO_ID,
            [Constants.KEY_RATING_FOR]: Constants.RATING_FOR_RESTRO,
            [Constants.KEY_RATING_FOR]: Constants.RATING_FOR_RESTRO,

        }
        this.props.reqRatingReviewList(data, this)
    }


    changeStatusOrder = (data) => {
        this.props.reqChageOrderStatus(data, this);
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
        typography: {
            padding: theme.spacing.unit * 2,
        },
        textSize: {
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
        },
    });

RatingReviewManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};


function mapStateToProps({ response }) {
    return response;
}
export default connect(mapStateToProps, { reqRatingReviewList, reqChageOrderStatus })(withStyles(styles)(RatingReviewManagement));

