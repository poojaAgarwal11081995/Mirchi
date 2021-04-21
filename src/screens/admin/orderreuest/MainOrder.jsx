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
import RateReviewIcon from '@material-ui/icons/RateReview';
import ReceiptIcon from '@material-ui/icons/Receipt';
import RedeemIcon from '@material-ui/icons/Redeem';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import BaseComponent from '../../../common/BaseComponent.jsx'
import * as StringKeys from '../../../res/StringKeys';
import { connect } from 'react-redux';
import { reqOrderList, reqChageOrderStatus } from '../../../actions';
import * as types from '../../../actions/types';
import * as Constants from '../../../utils/Constants';
import OrderNew from '../../../screens/admin/orderreuest/OrderNew';
import OrderPreparing from '../../../screens/admin/orderreuest/OrderPreparing';
import OrderRedy from '../../../screens/admin/orderreuest/OrderRedy';
import OrderPast from '../../../screens/admin/orderreuest/OrderPast';
import * as CustomStorage from '../../../utils/CustomStorage';

let RESTO_ID = undefined;
let selectedTabObj = undefined;
class MainOrder extends BaseComponent {
    constructor(props) {
        super(props)
        selectedTabObj = undefined;
        RESTO_ID = CustomStorage.getSessionDataAsObject(Constants.KEY_RESTO_ID, 0);
        this.state = {
            selectedTab: 0,
            [Constants.KEY_SHOW_PROGRESS]: true,
            [Constants.KEY_DATA]: [],
            headerData: [{ [Constants.KEY_NAME]: this.strings(StringKeys.Name) },
            { [Constants.KEY_NAME]: this.strings(StringKeys.Description) },
            { [Constants.KEY_NAME]: this.strings(StringKeys.Stauts) },
            { [Constants.KEY_NAME]: this.strings(StringKeys.Action) }],
            tabOptions: this.getTabOptions()
        };

    }

    getTabOptions() {

        let tabOptions = [
            {
                [Constants.KEY_LABEL]: this.strings(StringKeys.Order_Status_New),
                [Constants.KEY_VALUE]: StringKeys.Order_Status_New,
                [Constants.KEY_STATUS]: Constants.ORDER_STATUS_PENDING,
                [Constants.KEY_IMAGE]: <RateReviewIcon />
            },

            {
                [Constants.KEY_LABEL]: this.strings(StringKeys.Order_Status_Preparing),
                [Constants.KEY_VALUE]: StringKeys.Order_Status_Preparing,
                [Constants.KEY_STATUS]: Constants.ORDER_STATUS_PREPARING,
                [Constants.KEY_IMAGE]: <RedeemIcon />
            },


            {
                [Constants.KEY_LABEL]: this.strings(StringKeys.Order_Status_Redy),
                [Constants.KEY_VALUE]: StringKeys.Order_Status_Redy,
                [Constants.KEY_STATUS]: Constants.ORDER_STATUS_PREPARED,
                [Constants.KEY_IMAGE]: <AssignmentTurnedInIcon />
            },
            {
                [Constants.KEY_LABEL]: this.strings(StringKeys.Order_Status_Past_Order),
                [Constants.KEY_VALUE]: StringKeys.Order_Status_Past_Order,
                [Constants.KEY_STATUS]: Constants.ORDER_STATUS_PAST,
                [Constants.KEY_IMAGE]: <ReceiptIcon />
            }
        ];
        return tabOptions;
    }

    handleChange = (event, newValue) => {
        this.setState({ selectedTab: newValue })
        selectedTabObj = this.state.tabOptions[newValue];
        this.getOrderList();
    }

    componentDidMount() {
        this.getOrderList();
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
                        tabOptions.map((item, index) => <Tab key={index} label={item[Constants.KEY_LABEL]}
                            icon={item[Constants.KEY_IMAGE]}
                        />)
                    }

                </Tabs>

                {
                    ((this.state.headerData !== undefined && this.state.headerData.length > 0) ?
                        <div className={classes.tableContainer}>

                            {
                                selectedTab == 0 ?
                                    (<OrderNew dataOb={this.state[Constants.KEY_DATA]}
                                        context={this} classes={classes}
                                    />) : selectedTab == 1 ? (<OrderPreparing dataOb={this.state[Constants.KEY_DATA]}
                                        context={this}
                                    />) : selectedTab == 2 ? (<OrderRedy dataOb={this.state[Constants.KEY_DATA]}
                                        context={this}
                                    />) : selectedTab == 3 ? (<OrderPast dataOb={this.state[Constants.KEY_DATA]}
                                        context={this}
                                    />) : null
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
            if (nextProps[Constants.KEY_TYPE] === types.API_ORDER_LIST) {
                respObj = { [Constants.KEY_SHOW_PROGRESS]: false, [Constants.KEY_DATA]: nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][Constants.KEY_ORDER_LIST] };
                this.setState(respObj);
            } else if (nextProps[Constants.KEY_TYPE] === types.API_CHANGE_ORDER_STATUS) {
                respObj = { [Constants.KEY_SHOW_PROGRESS]: false, };
                this.setState(respObj);
                this.getOrderList();
            }
        }
    }

    getOrderList = () => {
        var status = Constants.ORDER_STATUS_PENDING;
        if (selectedTabObj != undefined) {
            status = selectedTabObj[Constants.KEY_STATUS];
        }
        var data = {
            [Constants.KEY_STATUS]: status,
            [Constants.KEY_RESTO_ID]: RESTO_ID,

        }
        this.props.reqOrderList(data, this)
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

MainOrder.propTypes = {
    classes: PropTypes.object.isRequired,
};


function mapStateToProps({ response }) {
    return response;
}
export default connect(mapStateToProps, { reqOrderList, reqChageOrderStatus })(withStyles(styles)(MainOrder));

