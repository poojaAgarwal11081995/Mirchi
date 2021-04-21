/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import {
	reqRegionList,
	reqDeleteRegion,
	reqCountryList,
	reqStateList,
	reqCityList,
} from "../../../actions";
import * as types from "../../../actions/types";
import BaseComponent from "../../../common/BaseComponent";
import * as Constants from "../../../utils/Constants";
import * as StringKeys from "../../../res/StringKeys";
import * as CustomStorage from "../../../utils/CustomStorage";
import CountryTable from "../../../tables/CountryTable";
import StateTable from "../../../tables/StateTable";
import CityTable from "../../../tables/CityTable";
import RegionTable from "../../../tables/RegionTable";
import CommonGridTextField from "../../../common/CommonGridTextField";
import Grid from "@material-ui/core/Grid";

import makeAnimated from "react-select/animated";
import CommoanAutocomplete from "../../../common/CommoanAutocomplete";
import CommonButton from "../../../common/CommonButton";
import ReportDatePicker from "../../../common/ReportDatePicker";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const animatedComponents = makeAnimated();
let TEXTFIELD_XS = 12;
let TEXTFIELD_XS_CHILD = 6;
let TEXTFIELD_MARGINTOP = 10;
let TEXTFIELD_MARGINTOP_PLUS = 12;

const userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);

class OnePageReportDrivers extends BaseComponent {
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
			[Constants.REPORT_TYPE_LIST]: [
				{
					[Constants.KEY_LABEL]: this.strings(StringKeys.Report_Type_Users),
					[Constants.KEY_VALUE]: this.strings(StringKeys.Report_Type_Users),
					[Constants.KEY_KEY]: Constants.KEY_REPORT_USERS,
				},
				{
					[Constants.KEY_LABEL]: this.strings(StringKeys.Report_Type_Drivers),
					[Constants.KEY_VALUE]: this.strings(StringKeys.Report_Type_Drivers),
					[Constants.KEY_KEY]: Constants.KEY_REPORT_USERS,
				},
				{
					[Constants.KEY_LABEL]: this.strings(
						StringKeys.Report_Type_Restaurant,
					),
					[Constants.KEY_VALUE]: this.strings(
						StringKeys.Report_Type_Restaurant,
					),
					[Constants.KEY_KEY]: Constants.KEY_REPORT_USERS,
				},
			],
			[Constants.KEY_TYPE]: [
				{
					[Constants.KEY_LABEL]: this.strings(StringKeys.Type_Login_History),
					[Constants.KEY_VALUE]: this.strings(StringKeys.Type_Login_History),
					[Constants.KEY_KEY]: Constants.KEY_REPORT_USERS,
				},
				{
					[Constants.KEY_LABEL]: this.strings(StringKeys.Type_Balance_History),
					[Constants.KEY_VALUE]: this.strings(StringKeys.Type_Balance_History),
					[Constants.KEY_KEY]: Constants.KEY_REPORT_USERS,
				},
				{
					[Constants.KEY_LABEL]: this.strings(
						StringKeys.Type_Transactions_History,
					),
					[Constants.KEY_VALUE]: this.strings(
						StringKeys.Type_Transactions_History,
					),
					[Constants.KEY_KEY]: Constants.KEY_REPORT_USERS,
				},
				{
					[Constants.KEY_LABEL]: this.strings(StringKeys.Type_Order_History),
					[Constants.KEY_VALUE]: this.strings(StringKeys.Type_Order_History),
					[Constants.KEY_KEY]: Constants.KEY_REPORT_USERS,
				},
			],

			[Constants.KEY_COUNTRY_ID]: "",
			[Constants.KEY_STATE_ID]: "",
			[Constants.KEY_CITY_ID]: "",
			[Constants.KEY_REGION_ID]: "",
			[Constants.KEY_START_DATE]: "",
			[Constants.KEY_END_DATE]: "",
			selectedType: "",
		};
	}
	componentDidMount() {
		//  this.getCountryList();
	}
	handleChange = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};

	navigate() {
		this.props.history.push({
			pathname: Constants.SCREEN_CITY_LIST,
		});
	}

	allLoFieldClear(number) {
		if (number == 4) {
			let obj = {
				selectedCountry: "",
				selectedState: "",
				selectedCity: "",
				selectedRegion: "",
				[Constants.KEY_COUNTRY_ID]: undefined,
				[Constants.KEY_STATE_ID]: undefined,
				[Constants.KEY_CITY_ID]: undefined,
				[Constants.KEY_STATE_LIST_DATA]: [],
				[Constants.KEY_CITY_LIST_DATA]: [],
			};
			this.setState(obj);
		} else if (number == 3) {
			this.setState({
				selectedState: "",
				selectedCity: "",
				selectedRegion: "",
				[Constants.KEY_REGION_ID]: undefined,
				[Constants.KEY_CITY_ID]: undefined,
				[Constants.KEY_STATE_ID]: undefined,
				[Constants.KEY_CITY_LIST_DATA]: [],
				[Constants.KEY_REGION_LIST_DATA]: [],
			});
		} else if (number == 2) {
			this.setState({
				selectedCity: "",
				selectedRegion: "",
				[Constants.KEY_CITY_ID]: undefined,
				[Constants.KEY_REGION_ID]: undefined,
				[Constants.KEY_REGION_LIST_DATA]: [],
			});
		}
	}

	handleChangeResport = (selectedOption) => {
		this.setState({
			selectedReportType: selectedOption,
		});
	};

	handleType = (selectedOption, isDeleted) => {
		console.log("selected type", selectedOption);
		this.setState({
			selectedType: selectedOption,
		});
	};

	handleChangeCity = (selectedOption, isDeleted) => {
		if (isDeleted.action == "clear") {
			this.allLoFieldClear(2);
		} else {
			this.setState({
				selectedCity: selectedOption,
				[Constants.KEY_CITY_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
			});
			this.getRegionList(selectedOption);
		}
	};

	navigateAddPage() {
		this.props.history.push({
			pathname: Constants.SCREEN_ADD_REGION,
		});
	}

	handleSearchChange = (name) => (event) => {
		console.log("name", event.target[Constants.KEY_VALUE]);
		this.setState({ [name]: event.target[Constants.KEY_VALUE] });
	};

	onSelectedDate = (date, key) => {
		this.setState({ [key]: date }, () =>
			alert(this.state[Constants.KEY_START_DATE]),
		);
	};

	render() {
		const { classes } = this.props;

		return (
			<Fragment>
				{/* <Card style={{ marginTop: 10 }}>
                    <CardContent > */}
				<CommonGridTextField
					xs={TEXTFIELD_XS}
					style={{ marginTop: TEXTFIELD_MARGINTOP }}
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
					justify="space-between"
					alignItems="center">
					<Grid
						item
						xs={TEXTFIELD_XS_CHILD}
						style={{
							paddingRight: 5,
							marginTop: TEXTFIELD_MARGINTOP_PLUS,
						}}>
						<CommoanAutocomplete
							value={this.state.selectedType}
							options={this.state[Constants.KEY_TYPE]}
							components={animatedComponents}
							onChange={this.handleType}
							placeholder={this.strings(StringKeys.Type)}
						/>
					</Grid>

					<Grid
						item
						xs={TEXTFIELD_XS_CHILD}
						style={{
							paddingRight: 5,
							marginTop: TEXTFIELD_MARGINTOP_PLUS,
						}}>
						<CommoanAutocomplete
							value={this.state.selectedType}
							options={this.state[Constants.KEY_TYPE]}
							components={animatedComponents}
							onChange={this.handleType}
							placeholder={this.strings(StringKeys.Stauts)}
						/>
					</Grid>
				</Grid>

				{/* </CardContent>
                </Card> */}

				{this.state.headerData !== undefined &&
				this.state.headerData.length > 0 ? (
					<div className={classes.tableContainer} style={{ marginTop: 20 }}>
						<RegionTable
							handleChange={this.handleChange}
							headerData={this.state.headerData}
							data={this.state[Constants.KEY_DATA]}
							context={this}
						/>
					</div>
				) : null}
			</Fragment>
		);
	}

	getCountryList = () => {
		let data = {
			[Constants.KEY_USERID]: userData[Constants.KEY_USERID],
		};
		this.props.reqCountryList(data, this);
	};
	getStateList = (selectedOption) => {
		this.setState({
			[Constants.KEY_STATE_LIST_DATA]: [],
			[Constants.KEY_CITY_LIST_DATA]: [],
			selectedState: "",
			selectedCity: "",
			selectedRegion: "",
			selectedCountry: selectedOption,
			[Constants.KEY_COUNTRY_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
		});
		let data = {
			[Constants.KEY_COUNTRY_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
		};
		this.props.reqStateList(data, this);
	};

	getCityList = (selectedOption) => {
		this.setState({
			[Constants.KEY_CITY_LIST_DATA]: [],
			selectedCity: "",
			selectedRegion: "",
			selectedState: selectedOption,
			[Constants.KEY_STATE_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
		});
		let data = {
			[Constants.KEY_COUNTRY_ID]: selectedOption[Constants.KEY_COUNTRY_ID],
			[Constants.KEY_STATE_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
		};
		this.props.reqCityList(data, this);
	};
	getRegionList = (selectedOption) => {
		let city_id = "";
		if (selectedOption != undefined) {
			city_id = selectedOption[Constants.KEY_UNDERSCORE_ID];
			this.setState({
				[Constants.KEY_REGION_LIST_DATA]: [],
				selectedRegion: "",
				selectedCity: selectedOption,
				[Constants.KEY_CITY_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
			});
		} else {
			city_id = this.state[Constants.KEY_CITY_ID];
		}

		let data = {
			[Constants.KEY_COUNTRY_ID]: this.state.selectedCountry[
				Constants.KEY_COUNTRY_ID
			],
			[Constants.KEY_STATE_ID]: this.state.selectedState[
				Constants.KEY_UNDERSCORE_ID
			],
			[Constants.KEY_CITY_ID]: city_id,
		};
		this.props.reqRegionList(data, this);
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
			if (nextProps[Constants.KEY_TYPE] === types.API_LOCALITY_LIST) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				this.setState(respObj);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_DELETE_LOCALITY) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
				};
				this.setState(respObj);
				this.getRegionList();
			} else if (nextProps[Constants.KEY_TYPE] === types.API_COUNTRY_LIST) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_COUNTRY_LIST_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				this.setState(respObj);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_STATE_LIST) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_STATE_LIST_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				this.setState(respObj);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_CITY_LIST) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_CITY_LIST_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				this.setState(respObj);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_LOCALITY_LIST) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_REGION_LIST_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				this.setState(respObj);
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
	card: {
		minWidth: 275,
	},
});
OnePageReportDrivers.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, {
	reqRegionList,
	reqDeleteRegion,
	reqCountryList,
	reqStateList,
	reqCityList,
})(withStyles(styles)(OnePageReportDrivers));
