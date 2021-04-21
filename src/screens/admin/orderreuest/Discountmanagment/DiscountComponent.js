/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { reqDiscountList } from "../../../../actions";
import * as types from "../../../../actions/types";
import BaseComponent from "../../../../common/BaseComponent";
import * as Constants from "../../../../utils/Constants";
import * as Utility from "../../../../utils/Utility";
import * as StringKeys from "../../../../res/StringKeys";
import * as CustomStorage from "../../../../utils/CustomStorage";
import Grid from "@material-ui/core/Grid";
import CommonButton from "../../../../common/CommonButton";
import makeAnimated from "react-select/animated";
import ReportDatePicker from "../../../../common/ReportDatePicker";
import DiscountListItem from "./discountListItem";
import CommonGridTextField from "../../../../common/CommonGridTextField";
const animatedComponents = makeAnimated();
let TEXTFIELD_XS = 12;
let userData = undefined;
class DiscountComponent extends BaseComponent {
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
			[Constants.KEY_ORDER_NUMBER]: "",
			[Constants.KEY_ORDER_ID]: "",
			[Constants.KEY_DISCOUNTED_PRICE]: "",
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
	handleReset() {
		this.setState({
			[Constants.KEY_SEARCH]: "",
			[Constants.KEY_END_DATE]: null,
			[Constants.KEY_START_DATE]: null,
			[Constants.KEY_DATA]: [],
			total_amount: "0.0",
			[Constants.KEY_ORDER_ID]: "",
			[Constants.KEY_ORDER_NUMBER]: "",
		});
	}
	render() {
		const { classes } = this.props;
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
								// required={false}
								style={{ marginTop: 20 }}
								id="restaurantName"
								label={this.strings(StringKeys.Search_Customer_Name)}
								fullWidth
								className={classes.textField}
								value={this.state[Constants.KEY_SEARCH]}
								onChange={this.handleSearchChange(Constants.KEY_SEARCH)}
								autoComplete="resname"
								variant="outlined"
								fieldStyle={classes.fieldHeight}
								onEnterKey={() => this.getDiscountList()}
							/>
						</div>
						<div class="col-sm ">
							<Grid style={{ marginTop: 20 }}>
								<CommonGridTextField
									xs={TEXTFIELD_XS}
									style={{ marginTop: 20 }}
									id="searchByOrderId"
									label={this.strings(StringKeys.Search_By_Order_Amount_Dis)}
									fullWidth
									className={classes.textField}
									value={this.state[Constants.KEY_ORDER_NUMBER]}
									onChange={this.handleSearchChange(Constants.KEY_ORDER_NUMBER)}
									autoComplete="resname"
									variant="outlined"
									fieldStyle={classes.fieldHeight}
									onEnterKey={() => this.getDiscountList()}
								/>
							</Grid>
						</div>
						{/* <div class="col-sm ">
							<Grid style={{ marginTop: 20 }}>
								<CommonGridTextField
									xs={TEXTFIELD_XS}
									style={{ marginTop: 20 }}
									id="searchByOrderId"
									label={this.strings(StringKeys.Search_By_Order_Amount_Dis)}
									fullWidth
									className={classes.textField}
									value={this.state[Constants.KEY_ORDER_AMOUNT]}
									onChange={this.handleSearchChange(Constants.KEY_ORDER_AMOUNT)}
									autoComplete="resname"
									variant="outlined"
									fieldStyle={classes.fieldHeight}
									onEnterKey={() => this.getDiscountList()}
								/>
							</Grid>
						</div> */}
						{/* <div class="col-sm ">
							<Grid style={{ marginTop: 20 }}>
								<CommonGridTextField
									xs={TEXTFIELD_XS}
									style={{ marginTop: 20 }}
									id="searchByOrderId"
									label={this.strings(StringKeys.Search_By_Order_Amount_Dis)}
									fullWidth
									className={classes.textField}
									value={this.state[Constants.KEY_DISCOUNTED_PRICE]}
									onChange={this.handleSearchChange(
										Constants.KEY_DISCOUNTED_PRICE,
									)}
									autoComplete="resname"
									variant="outlined"
									fieldStyle={classes.fieldHeight}
									onEnterKey={() => this.getDiscountList()}
								/>
							</Grid>
						</div> */}
					</div>
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
						<div class="col-sm-2" style={{ marginTop: 30 }}>
							<CommonButton
								type="search"
								fullWidth={true}
								variant="contained"
								color="secondary"
								ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
								className={classes.submit}
								onClick={() => {
									this.setState(
										() => this.handleReset(),
										() => this.getDiscountList(),
									);
								}}
								label={this.strings(StringKeys.Reset)}
								disabled={this.state.disabledClickedBtn}
							/>
						</div>
					</div>
				</div>

				<div style={{ margin: 10, alignSelf: "end" }}>
					<Typography>
						{" "}
						Total Discount Amount : {this.state.total_amount}
					</Typography>
				</div>

				{this.state.headerData !== undefined &&
				this.state.headerData.length > 0 ? (
					<div className={classes.tableContainer} style={{ marginTop: 20 }}>
						<DiscountListItem
							dataOb={this.state[Constants.KEY_DATA]}
							context={this}
						/>
					</div>
				) : null}
			</Fragment>
		);
	}
	onSelectedDate = (date, key) => {
		this.setState({ [key]: date });
	};

	componentDidMount() {
		this.getDiscountList();
	}
	

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
			data[Constants.KEY_SEARCH] = this.state[Constants.KEY_SEARCH].trim();
		}
		// if (
		// 	this.state[Constants.KEY_ORDER_AMOUNT] != undefined &&
		// 	this.state[Constants.KEY_ORDER_AMOUNT] != null &&
		// 	this.state[Constants.KEY_ORDER_AMOUNT] != ""
		// ) {
		// 	data[Constants.KEY_ORDER_AMOUNT] = this.state[Constants.KEY_ORDER_AMOUNT];
		// }
		if (
			this.state[Constants.KEY_ORDER_NUMBER] != undefined &&
			this.state[Constants.KEY_ORDER_NUMBER] != null &&
			this.state[Constants.KEY_ORDER_NUMBER] != ""
		) {
			data[Constants.KEY_ORDER_NUMBER] = this.state[
				Constants.KEY_ORDER_NUMBER
			].trim();
		}
		// if (
		// 	this.state[Constants.KEY_DISCOUNTED_PRICE] != undefined &&
		// 	this.state[Constants.KEY_DISCOUNTED_PRICE] != null &&
		// 	this.state[Constants.KEY_DISCOUNTED_PRICE] != ""
		// ) {
		// 	data[Constants.KEY_DISCOUNTED_PRICE] = this.state[
		// 		Constants.KEY_DISCOUNTED_PRICE
		// 	];
		// }

		this.props.reqDiscountList(data, this);
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
			if (nextProps[Constants.KEY_TYPE] === types.API_URL_DISCOUNT_LIST) {
				// alert(JSON.stringify (nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA]));
				// alert(nextProps[Constants.KEY_DATA][Constants.KEY_ORDER_LIST__DISCOUNT]);
				// alert(nextProps[Constants.KEY_DATA]['total_discount']);
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							Constants.KEY_ORDER_LIST__DISCOUNT
						],

					total_amount: nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
						"total_discount"
					].toFixed(2),
				};
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
DiscountComponent.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	//alert(JSON.stringify(response));
	//	console.log("response===", response);
	return response;
}

export default connect(mapStateToProps, { reqDiscountList })(
	withStyles(styles)(DiscountComponent),
);
