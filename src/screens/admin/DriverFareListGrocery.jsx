/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import {
	reqDeleteDriverDistanceChargeItemGrocery,
	reqDriverDistanceChargeListGrocery,
	reqRegionList,
	reqDeleteRegion,
	reqCountryList,
	reqStateList,
	reqCityList,
} from "../../actions";
import * as types from "../../actions/types";
import BaseComponent from "../../common/BaseComponent";
import * as Constants from "../../utils/Constants";
import * as StringKeys from "../../res/StringKeys";
import * as CustomStorage from "../../utils/CustomStorage";
import CountryTable from "../../tables/CountryTable";
import StateTable from "../../tables/StateTable";
import CityTable from "../../tables/CityTable";
import RegionTable from "../../tables/RegionTable";
import Grid from "@material-ui/core/Grid";
import { toast } from "react-toastify";
import makeAnimated from "react-select/animated";
import CommoanAutocomplete from "../../common/CommoanAutocomplete";
import CommonButton from "../../common/CommonButton";
import DriverFareItemTable from "../../tables/DriverFareItemTable";

const animatedComponents = makeAnimated();
let TEXTFIELD_XS = 12;
let TEXTFIELD_MARGINTOP = 0;
let _context = undefined;
const userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);

class DriverFareListGrocery extends BaseComponent {
	constructor(props) {
		super(props);
		_context = props;
		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
		this.state = {
			[Constants.KEY_SHOW_PROGRESS]: true,
			[Constants.KEY_DATA]: [],
			headerData: [
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Country) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.State) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.City) },
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
		};
	}
	componentDidMount() {
		this.getCountryList();
		this.getDriverChargeCList();
	}
	handleChange = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};

	navigate() {
		this.props.history.push({
			pathname: Constants.SCREEN_CITY_LIST,
		});
	}

	navigateAddPage() {
		_context.history.push({
			pathname: Constants.SCREEN_ADD_DRIVER_FARE_GROCERY,
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

	handleChangeCountry = (selectedOption, isDeleted) => {
		if (isDeleted.action == "clear") {
			this.allLoFieldClear(4);
			this.getDriverChargeCList();
		} else {
			this.getStateList(selectedOption);
		}
	};

	handleChangeState = (selectedOption, isDeleted) => {
		if (isDeleted.action == "clear") {
			this.allLoFieldClear(3);
		} else {
			this.getCityList(selectedOption);
		}
	};

	handleChangeCity = (selectedOption, isDeleted) => {
		if (isDeleted.action == "clear") {
			this.allLoFieldClear(2);
		} else {
			this.setState(
				{
					selectedCity: selectedOption,
					[Constants.KEY_CITY_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
				},
				() => this.getDriverChargeCList(),
			);
		}
	};

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<div className={classes.appBarSpacer} />
				<CommonButton
					type="submit"
					fullWidth={false}
					variant="contained"
					color="secondary"
					ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
					className={classes.submit}
					onClick={() => {
						this.navigateAddPage();
					}}
					label={this.strings(StringKeys.Add_New)}
					disabled={this.state.disabledClickedBtn}
				/>

				<Grid
					item
					xs={TEXTFIELD_XS}
					alignItems="center"
					style={{ marginTop: 15 }}>
					<CommoanAutocomplete
						value={this.state.selectedCountry}
						options={this.state[Constants.KEY_COUNTRY_LIST_DATA]}
						components={animatedComponents}
						onChange={this.handleChangeCountry}
						placeholder={this.strings(StringKeys.Select_Country)}
					/>
				</Grid>

				<Grid
					item
					xs={TEXTFIELD_XS}
					alignItems="center"
					style={{ marginTop: 15 }}>
					<CommoanAutocomplete
						value={this.state.selectedState}
						options={this.state[Constants.KEY_STATE_LIST_DATA]}
						components={animatedComponents}
						onChange={this.handleChangeState}
						placeholder={this.strings(StringKeys.Select_State)}
					/>
				</Grid>

				<Grid
					item
					xs={TEXTFIELD_XS}
					alignItems="center"
					style={{ marginTop: 15 }}>
					<CommoanAutocomplete
						value={this.state.selectedCity}
						options={this.state[Constants.KEY_CITY_LIST_DATA]}
						components={animatedComponents}
						onChange={this.handleChangeCity}
						placeholder={this.strings(StringKeys.Select_City)}
					/>
				</Grid>

				{this.state.headerData !== undefined &&
				this.state.headerData.length > 0 ? (
					<div className={classes.tableContainer} style={{ marginTop: 20 }}>
						<DriverFareItemTable
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

	getDriverChargeCList = (selectedOption) => {
		let data = {};

		if (
			this.state[Constants.KEY_COUNTRY_ID] != undefined &&
			this.state[Constants.KEY_COUNTRY_ID] != ""
		) {
			data[Constants.KEY_COUNTRY_ID] = this.state[Constants.KEY_COUNTRY_ID];
		}
		if (
			this.state[Constants.KEY_STATE_ID] != undefined &&
			this.state[Constants.KEY_STATE_ID] != ""
		) {
			data[Constants.KEY_STATE_ID] = this.state[Constants.KEY_STATE_ID];
		}
		if (
			this.state[Constants.KEY_CITY_ID] != undefined &&
			this.state[Constants.KEY_CITY_ID] != ""
		) {
			data[Constants.KEY_CITY_ID] = this.state[Constants.KEY_CITY_ID];
		}

		this.props.reqDriverDistanceChargeListGrocery(data, this);
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
				//  this.getRegionList();
				this.getDriverChargeCList();
			} else if (nextProps[Constants.KEY_TYPE] === types.API_COUNTRY_LIST) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_COUNTRY_LIST_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				this.getDriverChargeCList();
				this.setState(respObj);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_STATE_LIST) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_STATE_LIST_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				this.getDriverChargeCList();
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
			} else if (
				nextProps[Constants.KEY_TYPE] ===
				types.API_DRIVER_DISTANCE_CHARGE_LIST_GROCERY
			) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				this.setState(respObj);
			} else if (
				nextProps[Constants.KEY_TYPE] ===
				types.API_DRIVER_DISTANCE_CHARGE_ITEM_DELETE_GROCERY
			) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
				};
				toast("delete driver successfully");
				this.setState(respObj);
				this.getDriverChargeCList();
			}
		}
	};

	deleteDriverFareItem = (_id) => {
		let data = {
			[Constants.KEY_UNDERSCORE_ID]: _id,
		};
		this.props.reqDeleteDriverDistanceChargeItemGrocery(data, this);
	};

	navigateOnDetailsPage(data) {
		console.log("data=", JSON.stringify(data));
		this.props.history.push({
			pathname: Constants.SCREEN_ADD_DRIVER_FARE_GROCERY,
			[Constants.KEY_DRIVER_DISTANCE_FARE_DETAILS]: data,
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
DriverFareListGrocery.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, {
	reqDeleteDriverDistanceChargeItemGrocery,
	reqDriverDistanceChargeListGrocery,
	reqRegionList,
	reqDeleteRegion,
	reqCountryList,
	reqStateList,
	reqCityList,
})(withStyles(styles)(DriverFareListGrocery));
