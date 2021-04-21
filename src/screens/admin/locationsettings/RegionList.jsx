/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
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
import Grid from "@material-ui/core/Grid";

import makeAnimated from "react-select/animated";
import CommoanAutocomplete from "../../../common/CommoanAutocomplete";
import CommonButton from "../../../common/CommonButton";
import DeleteItemDialog from "../../../common/DeleteItemDialog";

const animatedComponents = makeAnimated();
let TEXTFIELD_XS = 12;
let TEXTFIELD_MARGINTOP = 0;

const userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);

class RegionList extends BaseComponent {
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
				{ [Constants.KEY_NAME]: this.strings("Created") },
				// { [Constants.KEY_NAME]: this.strings("Created Time") },
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

			isDeleteDialog: false,
			deleted_msg: this.strings(StringKeys.Delete_Region_Msg),
			delete_title: this.strings(StringKeys.Dialog_Title),
			selected_item: undefined,
		};
	}
	componentDidMount() {
		this.getCountryList();
		this.getRegionList();
	}
	handleChange = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};

	navigate() {
		this.props.history.push({
			pathname: Constants.SCREEN_CITY_LIST,
		});
	}
	deleteRegion = (id) => {
		// alert(id);
		var data = {
			[Constants.KEY_UNDERSCORE_ID]: id,
		};
		this.props.reqDeleteRegion(data, this);
	};

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

	callRegionWithTimer = () => {
		setTimeout(() => {
			this.getRegionList();
		}, 100);
	};

	handleChangeCountry = (selectedOption, isDeleted) => {
		if (isDeleted.action == "clear") {
			this.allLoFieldClear(4);
			this.callRegionWithTimer();
		} else {
			this.getStateList(selectedOption);
			this.callRegionWithTimer();
		}
	};

	handleChangeState = (selectedOption, isDeleted) => {
		if (isDeleted.action == "clear") {
			this.allLoFieldClear(3);
			this.callRegionWithTimer();
		} else {
			this.getCityList(selectedOption);
		}
	};

	handleChangeCity = (selectedOption, isDeleted) => {
		if (isDeleted.action == "clear") {
			this.allLoFieldClear(2);
			this.callRegionWithTimer();
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

				<Grid xs={TEXTFIELD_XS} style={{ marginTop: 20 }}>
					<CommoanAutocomplete
						value={this.state.selectedCountry}
						options={this.state[Constants.KEY_COUNTRY_LIST_DATA]}
						components={animatedComponents}
						onChange={this.handleChangeCountry}
						placeholder={this.strings(StringKeys.Select_Country)}
					/>
				</Grid>

				<Grid xs={TEXTFIELD_XS} style={{ marginTop: 20 }}>
					<CommoanAutocomplete
						value={this.state.selectedState}
						options={this.state[Constants.KEY_STATE_LIST_DATA]}
						components={animatedComponents}
						onChange={this.handleChangeState}
						placeholder={this.strings(StringKeys.Select_State)}
					/>
				</Grid>

				<Grid xs={TEXTFIELD_XS} style={{ marginTop: 20 }}>
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
						<RegionTable
							handleChange={this.handleChange}
							headerData={this.state.headerData}
							// data={this.state[Constants.KEY_DATA]}
							dataOb={this.state[Constants.KEY_DATA]}
							context={this}
						/>
					</div>
				) : null}

				{/* <DeleteItemDialog
					showYesNo={this.state.isDeleteDialog}
					secondBtnClick={this.cancelBtnClick}
					// title={this.state.delete_title}
					title={this.strings(StringKeys.APP_NAME_STRING)}
					content={this.state.deleted_msg}
					firstBtnName={this.strings(StringKeys.Okay)}
					secondBtnName={this.strings(StringKeys.Cancel)}
					firstBtnClick={this.okayBtnClick}
				/> */}
			</Fragment>
		);
	}

	// okayBtnClick = () => {
	// 	if (
	// 		this.state.selected_item != undefined &&
	// 		this.state.selected_item != ""
	// 	) {
	// 		var data = {
	// 			[Constants.KEY_UNDERSCORE_ID]: this.state.selected_item[
	// 				Constants.KEY_UNDERSCORE_ID
	// 			],
	// 		};
	// 		this.props.reqDeleteRegion(data, this);
	// 		this.setState({ isDeleteDialog: false });
	// 	}
	// };
	// cancelBtnClick = () => {
	// 	this.setState({ isDeleteDialog: false });
	// };

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
		this.callRegionWithTimer();
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
			if (
				this.state[Constants.KEY_CITY_ID] != undefined &&
				this.state[Constants.KEY_CITY_ID] != ""
			) {
				city_id = this.state[Constants.KEY_CITY_ID];
			}
		}

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
		if (city_id != undefined && city_id != "") {
			data[Constants.KEY_CITY_ID] = city_id;
		}

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
				toast(nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE]);
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

	// deleteRegion = (item) => {
	// 	this.setState({ selected_item: item, isDeleteDialog: true });
	// };
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
RegionList.propTypes = {
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
})(withStyles(styles)(RegionList));
