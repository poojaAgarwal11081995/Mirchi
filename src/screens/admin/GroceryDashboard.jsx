/** @format */

import React, { Fragment, Image } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BaseComponent from "../../common/BaseComponent.jsx";
import * as CustomStorage from "../../utils/CustomStorage";

import * as StringKeys from "../../res/StringKeys";
import { connect } from "react-redux";
import {
	reqGroceryOnlineChangeStatus,
	reqOrderListNewGrocery,
	reqOrderListPreparingGrocery,
	reqOrderListRedyGrocery,
	reqOrderListPastGrocery,
	reqOrderListGrocery,
	reqChageOrderStatusGrocery,
} from "../../actions";
import * as types from "../../actions/types";
import * as Constants from "../../utils/Constants";
import OrderNew from "./orderreuest/OrderNew";
import OrderPreparing from "./orderreuest/OrderPreparing";
import OrderRedy from "./orderreuest/OrderRedy";
import OrderPast from "./orderreuest/OrderPast";

import CustomPBar from "../../common/CustomPBar";

import RateReviewIcon from "@material-ui/icons/RateReview";
import ReceiptIcon from "@material-ui/icons/Receipt";
import RedeemIcon from "@material-ui/icons/Redeem";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import OrderPreparingGrocery from "./orderreuest/OrderPreparingGrocery.jsx";
import OrderRedyGrocery from "./orderreuest/OrderRedyGrocery.jsx";
import OrderPastGrocery from "./orderreuest/OrderPastGrocery.jsx";
import OrderNewGrocery from "./orderreuest/OrderNewGrocery.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let toastStyle = { background: "#F62C3A", text: "#FFFFFF" };

let selectedTabObj = undefined;
const userData = undefined;

class GroceryDashboard extends BaseComponent {
	constructor(props) {
		super(props);
		selectedTabObj = undefined;
		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
		this.state = {
			selectedTab: 0,
			[Constants.KEY_SHOW_PROGRESS]: true,
			[Constants.KEY_DATA]: [],
			headerData: [
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Name) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Description) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Stauts) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Action) },
			],
			tabOptions: this.getTabOptions(),
		};

		this.getOrderList(Constants.ORDER_STATUS_PENDING);
		// console.log('restro daskboard', this.props);
		// this.props.onRef(this);
	}

	getTabOptions() {
		let tabOptions = [
			{
				// [Constants.KEY_LABEL]: this.strings(StringKeys.Order_Status_New),
				[Constants.KEY_LABEL]: "Packing in Progress",
				[Constants.KEY_VALUE]: StringKeys.Order_Status_New,
				[Constants.KEY_STATUS]: Constants.ORDER_STATUS_PENDING,
				[Constants.KEY_IMAGE]: <RateReviewIcon />,
			},
			{
				// [Constants.KEY_LABEL]: this.strings(StringKeys.Order_Status_Preparing),
				[Constants.KEY_LABEL]: "PACKED",
				[Constants.KEY_VALUE]: StringKeys.Order_Status_Preparing,
				[Constants.KEY_STATUS]: Constants.ORDER_STATUS_PREPARING,
				[Constants.KEY_IMAGE]: <RedeemIcon />,
			},
			{
				// [Constants.KEY_LABEL]: this.strings(StringKeys.Order_Status_Redy),
				[Constants.KEY_LABEL]: "Dispatched",
				[Constants.KEY_VALUE]: StringKeys.Order_Status_Redy,
				[Constants.KEY_STATUS]: Constants.ORDER_STATUS_PREPARED,
				[Constants.KEY_IMAGE]: <ReceiptIcon />,
			},
			{
				// [Constants.KEY_LABEL]: this.strings(StringKeys.Order_Status_Past_Order),
				[Constants.KEY_LABEL]: "DELIVERED",
				[Constants.KEY_VALUE]: StringKeys.Order_Status_Past_Order,
				[Constants.KEY_STATUS]: Constants.ORDER_STATUS_PAST,
				[Constants.KEY_IMAGE]: <AssignmentTurnedInIcon />,
			},
		];
		return tabOptions;
	}

	handleChange = (event, newValue) => {
		this.setState({ selectedTab: newValue });
		selectedTabObj = this.state.tabOptions[newValue];
		this.getOrderList();
	};

	componentDidMount() {
		//const { foo } = this.props.location.params
		//  alert('sssssssss')
	}

	render() {
		const { classes } = this.props;
		const { selectedTab, tabOptions } = this.state;
		if (this.state[Constants.KEY_SHOW_PROGRESS] == true) {
			return (
				<div className={classes.mainView}>
					<CustomPBar showProgress={this.state[Constants.KEY_SHOW_PROGRESS]} />
					{/* <ToastContainer autoClose={Constants.TIME_OUT_TOAST} /> */}
				</div>
			);
		} else
			return (
				<Fragment>
					<div className={classes.appBarSpacer} />
					<Tabs
						value={selectedTab}
						onChange={this.handleChange}
						variant="fullWidth"
						scrollButtons="ony"
						indicatorColor="primary"
						textColor="primary">
						{tabOptions.map((item, index) => (
							<Tab
								label={item[Constants.KEY_LABEL]}
								icon={item[Constants.KEY_IMAGE]}
							/>
						))}
					</Tabs>
					{/* <ToastContainer autoClose={Constants.TIME_OUT_TOAST} />   */}

					{this.state.headerData !== undefined &&
					this.state.headerData.length > 0 ? (
						<div className={classes.tableContainer}>
							{selectedTab == 0 ? (
								<OrderNewGrocery
									dataOb={this.state[Constants.KEY_DATA]}
									context={this}
									classes={classes}
								/>
							) : selectedTab == 1 ? (
								<OrderPreparingGrocery
									dataOb={this.state[Constants.KEY_DATA]}
									context={this}
								/>
							) : selectedTab == 2 ? (
								<OrderRedyGrocery
									dataOb={this.state[Constants.KEY_DATA]}
									context={this}
								/>
							) : selectedTab == 3 ? (
								<OrderPastGrocery
									dataOb={this.state[Constants.KEY_DATA]}
									context={this}
								/>
							) : null}
						</div>
					) : null}
				</Fragment>
			);
	}

	getOrderList = () => {
		var status = Constants.ORDER_STATUS_PENDING;
		if (selectedTabObj != undefined) {
			status = selectedTabObj[Constants.KEY_STATUS];
		}
		var data = {
			[Constants.KEY_STATUS]: status,
			[Constants.KEY_GROCERY_ID]: userData[Constants.KEY_USERID],
		};
		this.props.reqOrderListGrocery(data, this);
	};

	changeStatusOrder = (data) => {
		this.props.reqChageOrderStatusGrocery(data, this);
	};
	changeOnlineStatus = (data) => {
		this.props.reqGroceryOnlineChangeStatus(data, this);
	};

	handleResponse = (nextProps) => {
		var respObj = null;
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		} else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (nextProps[Constants.KEY_TYPE] === types.API_ORDER_LIST_GROCERY) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							Constants.KEY_ORDER_LIST
						],
				};
				this.setState(respObj);
			} else if (
				nextProps[Constants.KEY_TYPE] === types.API_CHANGE_ORDER_STATUS_GROCERY
			) {
				respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
				// this.setState(respObj);
				// this.getOrderList();

				if (userData != undefined && userData != null) {
					toast(
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE],
						toastStyle,
					);
				} else {
					toast(
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE],
						toastStyle,
					);
				}

				setTimeout(() => {
					this.setState(respObj);
					//this.goBack();

					this.getOrderList();
				}, Constants.TIME_OUT_TOAST);
			} else if (
				nextProps[Constants.KEY_TYPE] === types.API_ORDER_NEW_GROCERY
			) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							Constants.KEY_ORDER_LIST
						],
				};

				this.setState(respObj);
			} else if (
				nextProps[Constants.KEY_TYPE] === types.API_ORDER_PREPARING_GROCERY
			) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							Constants.KEY_ORDER_LIST
						],
				};
				this.setState(respObj);
			} else if (
				nextProps[Constants.KEY_TYPE] === types.API_ORDER_REDY_GROCERY
			) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							Constants.KEY_ORDER_LIST
						],
				};
				this.setState(respObj);
			} else if (
				nextProps[Constants.KEY_TYPE] === types.API_ORDER_PAST_ORDER_GROCERY
			) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							Constants.KEY_ORDER_LIST
						],
				};
				this.setState(respObj);
			} else if (
				nextProps[Constants.KEY_TYPE] === types.API_GROCERY_ONLINE_STATUS_CHANGE
			) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
				};
				this.setState(respObj);
			}
		}
	};
}

const styles = (theme) => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
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
		fontWeight: "bold",
		textAlign: "center",
	},
});

GroceryDashboard.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, {
	reqGroceryOnlineChangeStatus,
	reqOrderListNewGrocery,
	reqOrderListPreparingGrocery,
	reqOrderListRedyGrocery,
	reqOrderListPastGrocery,
	reqOrderListGrocery,
	reqChageOrderStatusGrocery,
})(withStyles(styles)(GroceryDashboard));
