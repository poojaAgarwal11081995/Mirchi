/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { reqReportUserHistory } from "../../../actions";
import * as types from "../../../actions/types";
import BaseComponent from "../../../common/BaseComponent";
import * as Constants from "../../../utils/Constants";
import * as StringKeys from "../../../res/StringKeys";
import * as CustomStorage from "../../../utils/CustomStorage";
import CommonGridTextField from "../../../common/CommonGridTextField";
import Grid from "@material-ui/core/Grid";
import makeAnimated from "react-select/animated";
import CommoanAutocomplete from "../../../common/CommoanAutocomplete";
import CommonButton from "../../../common/CommonButton";
import ReportDatePicker from "../../../common/ReportDatePicker";
import * as Utility from "../../../utils/Utility";
import OnePageReportTable from "./OnePageReportTable";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { toast } from "react-toastify";
const animatedComponents = makeAnimated();

let TEXTFIELD_XS = 12;
let TEXTFIELD_XS_CHILD = 6;
let TEXTFIELD_XS_SUB_CHILD = 2;
let TEXTFIELD_MARGINTOP = 10;
let TEXTFIELD_MARGINTOP_PLUS = 12;

const userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);

class OnePageReportUsers extends BaseComponent {
	constructor(props) {
		super(props);
		console.log("ghghghhjhghgh", this.props);
		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
		this.state = {
			[Constants.KEY_SHOW_PROGRESS]: true,
			[Constants.KEY_DATA]: [],
			headerData: [],
			[Constants.REPORT_TYPE_LIST]: [],
			[Constants.KEY_HEADER]: [],
			[Constants.KEY_HEADERS_VALUES]: [],
			[Constants.KEY_REPORT_HISTORY_CAT]: this.props[
				Constants.KEY_REPORT_HISTORY_CAT
			],
			[Constants.KEY_NAME]: "",
			[Constants.KEY_COUNTRY_ID]: "",
			[Constants.KEY_STATE_ID]: "",
			[Constants.KEY_CITY_ID]: "",
			[Constants.KEY_REGION_ID]: "",
			[Constants.KEY_START_DATE]: null, //Utility.convertDate(new Date()),
			[Constants.KEY_END_DATE]: null,
			selectedType: "",
			Select_User: "",
			errorText: "",
		};
	}
	componentDidMount() {
		this.props.onRef(this);
	}

	componentWillUnmount() {
		this.props.onRef(undefined);
	}

	handleChange = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};

	navigate() {
		this.props.history.push({
			pathname: Constants.SCREEN_CITY_LIST,
		});
	}

	handleChangeResport = (selectedOption) => {
		this.setState({
			selectedReportType: selectedOption,
		});
	};

	handleType = (selectedOption, isDeleted) => {
		this.setState({
			selectedType: selectedOption,
		});
	};

	navigateAddPage() {
		this.props.history.push({
			pathname: Constants.SCREEN_ADD_REGION,
		});
	}

	handleSearchChange = (name) => (event) => {
		this.setState({ [name]: event.target[Constants.KEY_VALUE] });
	};

	onSelectedDate = (date, key) => {
		this.setState({ [key]: date });
	};

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<Card style={{ marginTop: 10 }}>
					<CardContent>
						<Grid
							container
							direction="row"
							justify="space-between"
							alignItems="center">
							<Grid
								item
								xs={TEXTFIELD_XS}
								style={{
									paddingRight: 5,
									marginTop: TEXTFIELD_MARGINTOP_PLUS,
								}}>
								<CommoanAutocomplete
									value={this.state.selectedType}
									options={this.props[Constants.KEY_REPORT_HISTORY_CAT]}
									components={animatedComponents}
									onChange={this.handleType}
									placeholder={this.strings(StringKeys.Type)}
								/>
							</Grid>
						</Grid>

						<Grid
							item
							xs={TEXTFIELD_XS}
							style={{
								paddingRight: 0,
								marginTop: TEXTFIELD_MARGINTOP,
							}}>
							<CommonGridTextField
								id="restaurantName"
								label={this.strings(StringKeys.Search_User)}
								fullWidth
								className={classes.textField}
								value={this.state[Constants.KEY_NAME]}
								onChange={this.handleSearchChange(Constants.KEY_NAME)}
								autoComplete="resname"
								variant="outlined"
								fieldStyle={classes.fieldHeight}
							/>
						</Grid>

						<Grid
							container
							direction="row"
							justify="space-between"
							alignItems="center">
							<Grid
								item
								xs={TEXTFIELD_XS_CHILD}
								style={{
									paddingRight: 10,
									marginTop: TEXTFIELD_MARGINTOP_PLUS,
								}}>
								<ReportDatePicker
									palceHolder={"Start Date"}
									value={this.state[Constants.KEY_START_DATE]}
									defaultDate={this.state[Constants.KEY_START_DATE]}
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
									palceHolder={"End Date"}
									value={this.state[Constants.KEY_END_DATE]}
									defaultDate={this.state[Constants.KEY_END_DATE]}
									id={"datetimepicker_end"}
									onSelectedDate={(date) =>
										this.onSelectedDate(date, [Constants.KEY_END_DATE])
									}
								/>
							</Grid>
						</Grid>

						<Grid
							container
							direction="row"
							justify="flex-start"
							alignItems="center">
							<Grid
								item
								xs={TEXTFIELD_XS_SUB_CHILD}
								style={{
									paddingRight: 10,
									marginTop: TEXTFIELD_MARGINTOP_PLUS,
								}}>
								<CommonButton
									type="submit"
									fullWidth
									variant="contained"
									color={"secondary"}
									className={classes.submit}
									onClick={this.getReports}
									label={this.strings(StringKeys.Search)}
								/>
							</Grid>

							<Grid
								item
								xs={TEXTFIELD_XS_SUB_CHILD}
								style={{
									marginTop: TEXTFIELD_MARGINTOP_PLUS,
								}}>
								<CommonButton
									type="submit"
									fullWidth
									variant="contained"
									color="secondary"
									className={classes.submit}
									onClick={() => {
										this.setState({
											[Constants.KEY_NAME]: "", //search user
											[Constants.KEY_START_DATE]: null,
											[Constants.KEY_END_DATE]: null,
											selectedType: "",
											Select_User: "",
											[Constants.KEY_HEADERS_VALUES]: [],
										}),
											() => {
												this.getReports();
											};
									}}
									label={this.strings(StringKeys.Reset)}
								/>
							</Grid>
						</Grid>
					</CardContent>
				</Card>

				{this.state[Constants.KEY_HEADERS_VALUES] !== undefined &&
				this.state[Constants.KEY_HEADER] !== undefined ? (
					<div className={classes.tableContainer} style={{ marginTop: 20 }}>
						<OnePageReportTable
							handleChange={this.handleChange}
							headerData={this.state[Constants.KEY_HEADER]}
							headerValue={this.state[Constants.KEY_HEADERS_VALUES]}
							context={this}
						/>
					</div>
				) : null}

				<Snackbar
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left",
					}}
					open={this.state.iserror}
					autoHideDuration={2000}
					onClose={this.handleClose}
					onExited={this.handleExited}
					ContentProps={{
						"aria-describedby": "message-id",
					}}
					message={<span id="message-id">{this.state.errorText}</span>}
					action={[
						<IconButton
							key="close"
							aria-label="Close"
							color="inherit"
							onClick={this.handleClose}>
							<CloseIcon />
						</IconButton>,
					]}
				/>
			</Fragment>
		);
	}
	handleClick = (msg) => {
		this.setState({
			iserror: true,
			errorText: msg,
		});
	};
	handleExited = () => {};

	handleClose = () => {
		this.setState({ iserror: false });
	};

	getReports = () => {
		let data = { [Constants.KEY_OFFSET]: 0 };

		if (
			this.state[Constants.KEY_NAME] != undefined &&
			this.state[Constants.KEY_NAME] != null
		) {
			data[Constants.KEY_SEARCH] = this.state[Constants.KEY_NAME];
		}
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
			this.state.selectedType != undefined &&
			this.state.selectedType[Constants.KEY_KEY] != undefined
		) {
			data[Constants.KEY_TYPE] = this.state.selectedType[Constants.KEY_KEY];
		}

		if (
			this.props.selectedUserTypeForReport != undefined &&
			this.props.selectedUserTypeForReport[Constants.KEY_KEY] != undefined
		) {
			data[Constants.KEY_ROLE] = this.props.selectedUserTypeForReport[
				Constants.KEY_KEY
			];
		}

		console.log(
			"this.state.selectedUserTypeForReport==",
			JSON.stringify(this.props.selectedUserTypeForReport) + "--",
		);
		console.log(
			"this.state.selectedType==",
			JSON.stringify(this.props.selectedType) + "--",
		);
		if (
			this.props.selectedUserTypeForReport == undefined ||
			this.props.selectedUserTypeForReport == null ||
			this.props.selectedUserTypeForReport == ""
		) {
			this.handleClick(this.strings(StringKeys.Please_Select_Type));
			return;
		} else if (
			this.state.selectedType == undefined ||
			this.state.selectedType == null ||
			this.state.selectedType == ""
		) {
			this.handleClick(this.strings(StringKeys.Please_Select_Type));
			return;
		} else {
			this.props.reqReportUserHistory(data, this);
		}
	};

	reportTypesList = () => {
		const data = {};
		this.props.reqReportUserHistory(data, this);
	};

	handleResponse = (nextProps) => {
		console.log("nextprops4444444444.", nextProps);

		var respObj = null;
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		} else if (nextProps[Constants.KEY_TYPE] === types.API_REPORT_TYPES) {
			respObj = {
				[Constants.KEY_SHOW_PROGRESS]: false,
				[Constants.KEY_USER_TYPE_LIST]:
					nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
			};
			this.setState(respObj);
		} else if (nextProps[Constants.KEY_TYPE] === types.API_GENERATE_REPORT) {
			// toast(nextProps["response"]["message"]);
			respObj = {
				[Constants.KEY_SHOW_PROGRESS]: false,
				[Constants.KEY_HEADER]:
					nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
						Constants.KEY_HEADER
					],
				[Constants.KEY_HEADERS_VALUES]:
					nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
						Constants.KEY_LIST
					],
			};
			console.log(
				"handleres=",
				JSON.stringify(
					nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
						Constants.KEY_HEADER
					],
				),
			);
			this.setState(respObj);
			console.log("responsemnmnmn", respObj);
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
	card: {
		minWidth: 275,
	},
});
OnePageReportUsers.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, {
	reqReportUserHistory,
})(withStyles(styles)(OnePageReportUsers));
