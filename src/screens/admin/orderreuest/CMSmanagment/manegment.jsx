/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import BaseComponent from "../../../../common/BaseComponent.jsx";
import * as StringKeys from "../../../../res/StringKeys";
import { connect } from "react-redux";
import { reqManagmentPolicy } from "../../../../actions";
import * as types from "../../../../actions/types";
import * as Constants from "../../../../utils/Constants";
import * as CustomStorage from "../../../../utils/CustomStorage";
import Grid from "@material-ui/core/Grid";
import CommonGridTextField from "../../../../common/CommonGridTextField";
import ReportDatePicker from "../../../../common/ReportDatePicker";
import EditorConvertToHTML from "./CMStable";
import makeAnimated from "react-select/animated";
import CommonButton from "../../../../common/CommonButton";
import { Link } from "react-router-dom";
let TEXTFIELD_XS = 12;
let RETSRO_DETAILS = undefined;
let DRIVER_DETAILS = undefined;

let USER_DETAILS = undefined;

let TEXTFIELD_XS_CHILD = 6;
let TEXTFIELD_MARGINTOP_PLUS = 12;

class ManagmentPrivacyPolicy extends BaseComponent {
	constructor(props) {
		super(props);

		RETSRO_DETAILS = CustomStorage.getSessionDataAsObject(
			Constants.KEY_RETSRO_DETAILS,
			undefined,
		);
		DRIVER_DETAILS = CustomStorage.getSessionDataAsObject(
			Constants.KEY_DRIVER_DETAILS,
			undefined,
		);
		USER_DETAILS = CustomStorage.getSessionDataAsObject(
			Constants.KEY_USER_DETAILS,
			undefined,
		);
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
		};
	}

	handleChange = (event, newValue) => {
		this.setState({ selectedTab: newValue });
		this.getOrderList();
	};

	onSelectedDate = (date, key) => {
		this.setState({ [key]: date });
	};

	componentDidMount() {
		this.getOrderList();
	}

	handleChangeOnInput = (input) => (e) => {
		this.setState({
			[input]: e.target.value,
		});
	};

	render() {
		const { classes } = this.props;

		return (
			<Fragment>
				<div className={classes.appBarSpacer} />

				<div>
					<CommonGridTextField
						required
						xs={TEXTFIELD_XS}
						style={{ marginTop: 0 }}
						id="restaurantName"
						label={this.strings(StringKeys.Enter_Phone_Number)}
						fullWidth
						className={classes.textField}
						value={this.state[Constants.KEY_PHONE]}
						onChange={this.handleChangeOnInput(Constants.KEY_PHONE)}
						autoComplete="resname"
						variant="outlined"
						type={"number"}
						fieldStyle={classes.fieldHeight}
						onEnterKey={(e) => {
							this.getOrderList();
							if (document && document.activeElement) {
								document.activeElement.blur();
							}
						}}
					/>

					<Grid
						item
						xs={12}
						container
						direction={"row"}
						justify={"space-between"}
						alignItems={"center"}
						alignContent={"center"}
						style={{ marginTop: 20 }}>
						<Grid
							item
							xs={TEXTFIELD_XS_CHILD}
							style={{
								paddingRight: 10,
								marginTop: TEXTFIELD_MARGINTOP_PLUS,
							}}>
							<ReportDatePicker
								value={this.state[Constants.KEY_START_DATE]}
								defaultDate={this.state[Constants.KEY_START_DATE]}
								palceHolder={"Start Date"}
								id={"datetimepicker_start"}
								onSelectedDate={(date) =>
									this.onSelectedDate(date, [Constants.KEY_START_DATE])
								}
							/>
						</Grid>
						<Grid
							item
							xs={TEXTFIELD_XS_CHILD}
							style={{
								paddingRight: 10,
								marginTop: TEXTFIELD_MARGINTOP_PLUS,
							}}>
							<ReportDatePicker
								value={this.state[Constants.KEY_END_DATE]}
								defaultDate={this.state[Constants.KEY_END_DATE]}
								palceHolder={"End Date"}
								id={"datetimepicker_end"}
								onSelectedDate={(date) =>
									this.onSelectedDate(date, [Constants.KEY_END_DATE])
								}
							/>
						</Grid>

						<Grid
							item
							xs={1}
							container
							alignItems={"center"}
							justify={"center"}
							direction={"column"}>
							<CommonButton
								type="search"
								fullWidth={false}
								variant="contained"
								style={{ marginTop: 15 }}
								color="secondary"
								ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
								className={classes.submit}
								onClick={() => {
									this.getOrderList();
								}}
								label={this.strings(StringKeys.Search)}
								disabled={this.state.disabledClickedBtn}
							/>
						</Grid>
					</Grid>
				</div>

				{this.state.headerData !== undefined &&
					this.state.headerData.length > 0 && (
						<div className={classes.tableContainer} style={{ marginTop: 20 }}>
							<EditorConvertToHTML
								dataOb={this.state[Constants.KEY_DATA]}
								context={this}
								classes={classes}
							/>
						</div>
					)}
			</Fragment>
		);
	}

	handleResponse = (nextProps) => {
		var respObj = null;
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		} else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (nextProps[Constants.KEY_TYPE] === types.API_URL_MANAGMENT_POLICY) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							Constants.KEY_ORDER_LIST
						],
				};
				this.setState(respObj);
			}
			// else if (
			// 	nextProps[Constants.KEY_TYPE] === types.API_CHANGE_ORDER_STATUS
			// ) {
			// 	respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
			// 	this.setState(respObj);
			// 	this.getOrderList();
			// }
		}
	};

	getOrderList = () => {
		// var status = Constants.ORDER_STATUS_PENDING;
		// if (selectedTabObj != undefined) {
		//     status = selectedTabObj[Constants.KEY_STATUS];
		// }

		let data = {};
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
			this.state[Constants.KEY_PHONE] != undefined &&
			this.state[Constants.KEY_PHONE] != null
		) {
			data[Constants.KEY_PHONE] = this.state[Constants.KEY_PHONE];
		}

		this.props.reqManagmentPolicy(data, this);
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

ManagmentPrivacyPolicy.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, { reqManagmentPolicy })(
	withStyles(styles)(ManagmentPrivacyPolicy),
);
