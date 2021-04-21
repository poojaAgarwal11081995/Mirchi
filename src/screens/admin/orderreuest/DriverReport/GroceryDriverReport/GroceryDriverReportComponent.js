/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { reqGroceryDriverAdmin } from "../../../../../actions";
import * as types from "../../../../../actions/types";
import BaseComponent from "../../../../../common/BaseComponent";
import * as Constants from "../../../../../utils/Constants";
import * as Utility from "../../../../../utils/Utility";
import * as StringKeys from "../../../../../res/StringKeys";
import * as CustomStorage from "../../../../../utils/CustomStorage";
import Grid from "@material-ui/core/Grid";
import CommonButton from "../../../../../common/CommonButton";
import CustomPBar from "../../../../../common/CustomPBar";
import makeAnimated from "react-select/animated";
import ReportDatePicker from "../../../../../common/ReportDatePicker";
import GroceryDriverReportTable from "./GroceryDriverReportTable";
import CommonGridTextField from "../../../../../common/CommonGridTextField";
const animatedComponents = makeAnimated();

let userData = undefined;
class GroceryDriverAdmin extends BaseComponent {
	constructor(props) {
		super(props);
		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
		this.state = {
			[Constants.KEY_SHOW_PROGRESS]: true,
			total_amount: "0.0",
			[Constants.KEY_DATA]: [],
			headerData: [
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Order_id) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Discount_Coupen) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Discount_per) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Discount_Amount) },
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
		};
	}
	componentDidMount() {
		this.getDiscountList();
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
	navigateOnDetailsPage(data) {
		this.props.history.push({
			pathname: Constants.SCREEN_GROSERY_DRIVER_LIST_ID,
			[Constants.KEY_DATA]: data,
		});
	}

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
										defaultDate={this.state[Constants.KEY_END_DATE]}
										value={this.state[Constants.KEY_END_DATE]}
										onSelectedDate={(date) =>
											this.onSelectedDate(date, [Constants.KEY_END_DATE])
										}
									/>
								</Grid>
							</div>

							<div class="col-sm-2" style={{ marginTop: 30 }}>
								<CommonButton
									type="search"
									fullWidth={true}
									variant="contained"
									color="secondary"
									ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
									className={classes.submit}
									onClick={() => {
										this.getDiscountList();
									}}
									label={this.strings(StringKeys.Search)}
									disabled={this.state.disabledClickedBtn}
								/>
							</div>
						</div>
					</div>

					{this.state.headerData !== undefined &&
					this.state.headerData.length > 0 ? (
						<div className={classes.tableContainer} style={{ marginTop: 20 }}>
							<GroceryDriverReportTable
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

	getDiscountList = () => {
		var data = {};

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
			this.state[Constants.KEY_SEARCH] != undefined &&
			this.state[Constants.KEY_SEARCH] != null &&
			this.state[Constants.KEY_SEARCH] != ""
		) {
			data[Constants.KEY_SEARCH] = Utility.removeWhiteSpace(
				this.state[Constants.KEY_SEARCH],
			);
		}
		this.props.reqGroceryDriverAdmin(data, this);
	};

	handleResponse = (nextProps) => {
		var respObj = null;
		console.log("nextProps", nextProps);
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		} else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (
				nextProps[Constants.KEY_TYPE] === types.API_URL_ORDER_BY_DRIVER_REPORT
			) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							Constants.KEY_DATA
						],
				};

				console.log("respObject", respObj);
				this.setState(respObj);
			}
			// } else if (
			// 	nextProps[Constants.KEY_TYPE] === types.API_URL_DISCOUNT_LIST
			// ) {
			// 	respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
			// 	this.setState(respObj);
			// 	this.getDiscountList();
			// }
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
});
GroceryDriverAdmin.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}

export default connect(mapStateToProps, { reqGroceryDriverAdmin })(
	withStyles(styles)(GroceryDriverAdmin),
);
