/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import {
	reqUserTypeListForReport,
	reqDeleteRegion,
	reqCountryList,
	reqStateList,
	reqCityList,
} from "../../../actions";
import * as types from "../../../actions/types";
import BaseComponent from "../../../common/BaseComponent";
import CustomPBar from "../../../common/CustomPBar";
import * as Constants from "../../../utils/Constants";
import * as StringKeys from "../../../res/StringKeys";
import * as CustomStorage from "../../../utils/CustomStorage";
import Grid from "@material-ui/core/Grid";

import makeAnimated from "react-select/animated";
import CommoanAutocomplete from "../../../common/CommoanAutocomplete";
import OnePageReportUsers from "./OnePageReportUsers";
import * as Utility from "../../../utils/Utility";

const animatedComponents = makeAnimated();
let TEXTFIELD_XS = 12;
let TEXTFIELD_MARGINTOP = 0;

const userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);

class OnePageReport extends BaseComponent {
	constructor(props) {
		super(props);

		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
		this.state = {
			[Constants.KEY_SHOW_PROGRESS]: true,
			[Constants.KEY_DATA]: [],
			headerData: [
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Name) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.City) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.State) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Country) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Created) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Action) },
			],
			[Constants.KEY_COUNTRY_ID]: "",
			[Constants.KEY_STATE_ID]: "",
			[Constants.KEY_CITY_ID]: "",
			[Constants.KEY_REGION_ID]: "",
			selectedCountry: "",
			selectedState: "",
			selectedCity: "",
			selectedRegion: "",
			[Constants.KEY_USER_TYPE_FOR_REPORT]: [],
			[Constants.KEY_REPORT_HISTORY_CAT]: [],
			selectedUserTypeForReport: "",
		};
	}
	componentDidMount() {
		this.getUserTypeForReport();
	}
	handleChange = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};

	navigate() {
		this.props.history.push({
			pathname: Constants.SCREEN_CITY_LIST,
		});
	}

	handleUserForReport = (selectedOption, isDeleted) => {
		//   console.log('ref=', this.onPageReportUser);
		this.onPageReportUser.setState(
			{
				selectedType: "",
			},
			() => {
				this.setState({
					selectedUserTypeForReport: selectedOption,
					[Constants.KEY_REPORT_HISTORY_CAT]:
						selectedOption != undefined
							? selectedOption[Constants.KEY_TYPE]
							: [],
				});
			},
		);
	};

	navigateAddPage() {
		this.props.history.push({
			pathname: Constants.SCREEN_ADD_REGION,
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

					<Typography
						className={classes.typography}
						component="h6"
						variant="h6">
						For One Page Report
					</Typography>

					<Grid xs={TEXTFIELD_XS} style={{ marginTop: 5 }}>
						<CommoanAutocomplete
							value={this.state.selectedUserTypeForReport}
							options={this.state[Constants.KEY_USER_TYPE_FOR_REPORT]}
							components={animatedComponents}
							onChange={this.handleUserForReport}
							placeholder={this.strings(StringKeys.Select_User)}
						/>
					</Grid>

					<OnePageReportUsers
						onRef={(ref) => (this.onPageReportUser = ref)}
						selectedUserTypeForReport={this.state.selectedUserTypeForReport}
						report_history_cate={
							this.state.selectedUserTypeForReport != undefined
								? this.state.selectedUserTypeForReport[Constants.KEY_TYPE]
								: []
						}></OnePageReportUsers>
				</Fragment>
			);
		}
	}

	getUserTypeForReport = () => {
		let userData = CustomStorage.getSessionDataAsObject(
			Constants.KEY_USER_DATA,
		);
		let data = { [Constants.KEY_ROLE]: userData[Constants.KEY_ROLE] };
		this.props.reqUserTypeListForReport(data, this);
	};

	handleResponse = (nextProps) => {
		console.log("nextProps++++++++++++", nextProps);
		var respObj = null;
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		} else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (nextProps[Constants.KEY_TYPE] === types.API_USER_TYPE_FOR_REPORT) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_USER_TYPE_FOR_REPORT]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							Constants.KEY_USER_TYPE_FOR_REPORT
						],
				};
				this.setState(respObj);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_DELETE_LOCALITY) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
				};
				this.setState(respObj);
				this.getRegionList();
			}
		}
	};

	deleteRegion = (_id) => {
		let data = {
			[Constants.KEY_UNDERSCORE_ID]: _id,
		};
		this.props.reqDeleteRegion(data, this);
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
OnePageReport.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, {
	reqUserTypeListForReport,
	reqDeleteRegion,
	reqCountryList,
	reqStateList,
	reqCityList,
})(withStyles(styles)(OnePageReport));
