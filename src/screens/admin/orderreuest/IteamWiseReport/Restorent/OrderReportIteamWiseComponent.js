/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { reqIteamWiseSaleRestorentReportList } from "../../../../../actions";
import * as types from "../../../../../actions/types";
import BaseComponent from "../../../../../common/BaseComponent";
import * as Constants from "../../../../../utils/Constants";
import * as StringKeys from "../../../../../res/StringKeys";
import * as CustomStorage from "../../../../../utils/CustomStorage";
import * as Utility from "../../../../../utils/Utility";
import Grid from "@material-ui/core/Grid";
import CommonButton from "../../../../../common/CommonButton";
import makeAnimated from "react-select/animated";
import ReportDatePicker from "../../../../../common/ReportDatePicker";
import IteamWiseTable from "./IteamWiseTable";
import CommonGridTextField from "../../../../../common/CommonGridTextField";
import CustomPBar from "../../../../../common/CustomPBar";
const animatedComponents = makeAnimated();
let TEXTFIELD_XS = 12;
let userData = undefined;
class OrderReportIteamWiseComponent extends BaseComponent {
	constructor(props) {
		super(props);
		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
		this.state = {
			[Constants.KEY_SHOW_PROGRESS]: true,

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
	componentWillMount() {
		this.getDiscountList();
	}

	handleResetData = () => {
		this.setState({
			[Constants.KEY_SEARCH]: "",
			[Constants.KEY_START_DATE]: null,
			[Constants.KEY_END_DATE]: null,
		});
	};

	handleChange = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};
	handleSearchChange = (name) => (event) => {
		this.setState({
			[name]: event.target[Constants.KEY_VALUE],
		});
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
						<div class="row"></div>
					</div>
					<div class="justify-content-start">
						<div class="row">
							<div class="col-sm ">
								<CommonGridTextField
									required
									xs={TEXTFIELD_XS}
									style={{ marginTop: 20 }}
									id="restaurantName"
									label={"Search By Item Name"}
									fullWidth
									className={classes.textField}
									value={this.state[Constants.KEY_SEARCH]}
									onChange={this.handleSearchChange(Constants.KEY_SEARCH)}
									autoComplete="resname"
									variant="outlined"
									fieldStyle={classes.fieldHeight}
								/>
							</div>

							<div class="col-sm ">
								<Grid style={{ marginTop: 20 }}>
									<ReportDatePicker
										palceHolder={"From Date"}
										id={"datetimepicker_start"}
										value={this.state[Constants.KEY_START_DATE]}
										defaultDate={this.state[Constants.KEY_START_DATE]}
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
										value={this.state[Constants.KEY_END_DATE]}
										defaultDate={this.state[Constants.KEY_END_DATE]}
										id={"datetimepicker_end"}
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
							<div class="col-sm" style={{ marginTop: 30 }}>
								<CommonButton
									type="search"
									fullWidth={true}
									variant="contained"
									color="secondary"
									ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
									className={classes.submit}
									onClick={() => {
										this.setState(
											() => this.handleResetData(),

											() => this.getDiscountList(),
										);
									}}
									label={this.strings(StringKeys.Reset)}
								/>
							</div>
						</div>
					</div>

					{this.state.headerData !== undefined &&
					this.state.headerData.length > 0 ? (
						<div className={classes.tableContainer} style={{ marginTop: 20 }}>
							<IteamWiseTable
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
		this.props.reqIteamWiseSaleRestorentReportList(data, this);
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
				nextProps[Constants.KEY_TYPE] === types.API_URL_ITEM_WISE_SAle_Report
			) {
				// alert(JSON.stringify (nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA]));
				// alert(nextProps[Constants.KEY_DATA][Constants.KEY_ORDER_LIST__DISCOUNT]);
				// alert(nextProps[Constants.KEY_DATA]['total_discount']);
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							Constants.KEY_DATA
						],
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
});
OrderReportIteamWiseComponent.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	//alert(JSON.stringify(response));
	//	console.log("response===", response);
	return response;
}

export default connect(mapStateToProps, {
	reqIteamWiseSaleRestorentReportList,
})(withStyles(styles)(OrderReportIteamWiseComponent));
