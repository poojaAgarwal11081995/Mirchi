/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { reqGroceryOrderCancelListForAdmin } from "../../actions";
import * as types from "../../actions/types";
import BaseComponent from "../../common/BaseComponent";
import * as Constants from "../../utils/Constants";
import * as Utility from "../../utils/Utility";
import * as StringKeys from "../../res/StringKeys";

import AdminAllOrdersItem from "./orderreuest/AdminAllOrdersItem";
import * as CustomStorage from "../../utils/CustomStorage";
import Grid from "@material-ui/core/Grid";
import CommonButton from "../../common/CommonButton";
import CustomPBar from "../../common/CustomPBar";
import CommonGridTextField from "../../common/CommonGridTextField";
import CommoanAutocomplete from "../../common/CommoanAutocomplete";
import makeAnimated from "react-select/animated";
import ReportDatePicker from "../../common/ReportDatePicker";
import AdminAllOrdersItemGroceryCancel from "./orderreuest/AdminAllOrdersItemGroceryCancel";
const animatedComponents = makeAnimated();

let TEXTFIELD_XS = 12;

let userData = undefined;
class OrdersManagementGroceryCancel extends BaseComponent {
	constructor(props) {
		super(props);
		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
		this.state = {
			[Constants.KEY_SHOW_PROGRESS]: true,
			[Constants.KEY_DATA]: [],
			headerData: [
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Name) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Description) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Stauts) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Action) },
			],
			viewAbleImage: "",
			[Constants.KEY_END_DATE]: null,
			[Constants.KEY_START_DATE]: null,
			isVisible: false,
			isVisibleFullImage: false,
			viewFullImage: "",
			[Constants.KEY_SEARCH]: undefined,
			[Constants.KEY_SEARCH_ORDER]: undefined,
			selectedOption: undefined,
			status_array: [
				{
					[Constants.KEY_LABEL]: Constants.ORDER_STATUS_STR_PREPARING,
					[Constants.KEY_VALUE]: Constants.ORDER_STATUS_STR_PREPARING,
				},
				{
					[Constants.KEY_LABEL]: Constants.ORDER_STATUS_STR_PREPARED,
					[Constants.KEY_VALUE]: Constants.ORDER_STATUS_STR_PREPARED,
				},
				{
					[Constants.KEY_LABEL]: Constants.ORDER_STATUS_STR_DECLINED,
					[Constants.KEY_VALUE]: Constants.ORDER_STATUS_STR_DECLINED,
				},
				{
					[Constants.KEY_LABEL]: Constants.ORDER_STATUS_STR_DELIVERED,
					[Constants.KEY_VALUE]: Constants.ORDER_STATUS_STR_DELIVERED,
				},
			],
		};
		this.getOrdersList();
	}
	componentDidMount() {
		// this.getCountryList();
	}
	handleChange = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};
	handleSearchChange = (name) => (event) => {
		this.setState({ [name]: event.target[Constants.KEY_VALUE] });
	};
	handleChangeStatus = (selectedOptionm, isDeleted) => {
		this.setState({ selectedOption: selectedOptionm });
	};

	render() {
		const { classes } = this.props;

		if (this.state[Constants.KEY_SHOW_PROGRESS] == true) {
			return (
				<div className={classes.mainView}>
					<CustomPBar showProgress={this.state[Constants.KEY_SHOW_PROGRESS]} />
				</div>
			);
		} else {
			return (
				<Fragment>
					<div className={classes.appBarSpacer} />

					<div class="justify-content-start">
						<div class="row">
							<div class="col-sm ">
								<CommonGridTextField
									xs={TEXTFIELD_XS}
									style={{ marginTop: 20 }}
									id="searchByName"
									label={this.strings(StringKeys.Search_Customer_Name)}
									fullWidth
									className={classes.textField}
									value={this.state[Constants.KEY_SEARCH]}
									onChange={this.handleSearchChange(Constants.KEY_SEARCH)}
									autoComplete="resname"
									variant="outlined"
									fieldStyle={classes.fieldHeight}
									onEnterKey={() => this.getOrdersList()}
								/>
							</div>
							<div class="col-sm ">
								<Grid style={{ marginTop: 20 }}>
									<CommonGridTextField
										xs={TEXTFIELD_XS}
										style={{ marginTop: 20 }}
										id="searchByOrderId"
										label={this.strings(StringKeys.Search_By_Order)}
										fullWidth
										className={classes.textField}
										value={this.state[Constants.KEY_SEARCH_ORDER]}
										onChange={this.handleSearchChange(
											Constants.KEY_SEARCH_ORDER,
										)}
										autoComplete="resname"
										variant="outlined"
										fieldStyle={classes.fieldHeight}
										onEnterKey={() => this.getOrdersList()}
									/>
								</Grid>
							</div>
						</div>
					</div>
					<div class="justify-content-start">
						<div class="row">
							<div class="col-sm ">
								<Grid style={{ marginTop: 20 }}>
									<ReportDatePicker
										palceHolder={"From Date"}
										id={"datetimepicker_start"}
										defaultDate={this.state[Constants.KEY_START_DATE]}
										value={this.state[Constants.KEY_START_DATE]}
										onSelectedDate={(date) =>
											this.onSelectedDate(date, [Constants.KEY_START_DATE])
										}
									/>
								</Grid>
							</div>
							<div class="col-sm ">
								<Grid style={{ marginTop: 20 }}>
									<ReportDatePicker
										palceHolder={"To Date"}
										id={"datetimepicker_end"}
										value={this.state[Constants.KEY_END_DATE]}
										defaultDate={this.state[Constants.KEY_END_DATE]}
										onSelectedDate={(date) =>
											this.onSelectedDate(date, [Constants.KEY_END_DATE])
										}
									/>
								</Grid>
							</div>

							<div class="col-sm" style={{ marginTop: 30 }}>
								<CommonButton
									type="search"
									fullWidth={true}
									variant="contained"
									color="secondary"
									ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
									className={classes.submit}
									onClick={() => {
										this.getOrdersList();
									}}
									label={this.strings(StringKeys.Search)}
									disabled={this.state.disabledClickedBtn}
								/>
							</div>
							<div class="col-sm" style={{ marginTop: 30 }}>
								<CommonButton
									type="search1"
									fullWidth={true}
									variant="contained"
									color="secondary"
									ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
									className={classes.submit}
									onClick={() => {
										this.setState(
											{
												[Constants.KEY_SEARCH_ORDER]: "",
												[Constants.KEY_SEARCH]: "",
												[Constants.KEY_START_DATE]: null,
												[Constants.KEY_END_DATE]: null,
												selectedOption: "",
											},
											() => this.getOrdersList(),
										);
									}}
									label={this.strings(StringKeys.Reset)}
									disabled={this.state.disabledClickedBtn}
								/>
							</div>
						</div>
					</div>

					{this.state.headerData !== undefined &&
					this.state.headerData.length > 0 ? (
						<div className={classes.tableContainer} style={{ marginTop: 20 }}>
							<AdminAllOrdersItemGroceryCancel
								dataOb={this.state[Constants.KEY_DATA]}
								context={this}
							/>
						</div>
					) : null}
				</Fragment>
			);
		}
	}
	onSelectedDate = (date, key) => {
		this.setState({ [key]: date });
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
			if (nextProps[Constants.KEY_TYPE] === types.API_GROCERY_CANCEL) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							Constants.KEY_ORDER_LIST
						],
				};
				this.setState(respObj);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_DELETE_GROCERY) {
				respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
				this.setState(respObj);
				this.getOrdersList();
			}
		}
	};
	getOrdersList = () => {
		var data = {
			offset: 0,
		};
		if (
			this.state[Constants.KEY_START_DATE] != undefined &&
			this.state[Constants.KEY_START_DATE] != null
		) {
			data[Constants.KEY_START_DATE] = this.state[Constants.KEY_START_DATE];
		}
		if (
			this.state[Constants.KEY_END_DATE] != undefined &&
			this.state[Constants.KEY_END_DATE] != null
		) {
			data[Constants.KEY_END_DATE] = this.state[Constants.KEY_END_DATE];
		}
		if (
			this.state.selectedOption != undefined &&
			this.state.selectedOption != null &&
			this.state.selectedOption != ""
		) {
			let status = Utility.getStatusKeyGrocery(
				this.state.selectedOption[Constants.KEY_LABEL],
			);
			data[Constants.KEY_STATUS] = status;
		}

		if (
			this.state[Constants.KEY_SEARCH_ORDER] != undefined &&
			this.state[Constants.KEY_SEARCH_ORDER] != null &&
			this.state[Constants.KEY_SEARCH_ORDER] != ""
		) {
			data[Constants.KEY_SEARCH_ORDER] = this.state[
				Constants.KEY_SEARCH_ORDER
			].trim();
		}
		if (
			this.state[Constants.KEY_SEARCH] != undefined &&
			this.state[Constants.KEY_SEARCH] != null &&
			this.state[Constants.KEY_SEARCH] != ""
		) {
			data[Constants.KEY_SEARCH] = Utility.removeWhiteSpace(
				this.state[Constants.KEY_SEARCH],
			);
		}
		this.props.reqGroceryOrderCancelListForAdmin(data, this);
	};

	navigate(id) {
		this.props.history.push({
			pathname: Constants.SCREEN_GROCERY_DETAIL,
			[Constants.KEY_GROCERY_ID]: id,
		});
	}

	navigateOrdersPage() {
		this.props.history.push({
			pathname: Constants.SCREEN_SCREEN_CHECK_REQUEST_GROCERY,
		});
	}
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
});
OrdersManagementGroceryCancel.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, { reqGroceryOrderCancelListForAdmin })(
	withStyles(styles)(OrdersManagementGroceryCancel),
);
