/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import BaseComponent from "../../../common/BaseComponent";
import CommonButton from "../../../common/CommonButton";
import * as StringKeys from "../../../res/StringKeys";
import * as Constants from "../../../utils/Constants";
import { connect } from "react-redux";
import {
	reqAddRegion,
	reqCountryList,
	reqStateList,
	reqCityList,
} from "../../../actions";
import * as types from "../../../actions/types";
import CommonGridTextField from "../../../common/CommonGridTextField";
import * as CustomStorage from "../../../utils/CustomStorage";
import * as Utility from "../../../utils/Utility";
import CommonSnackbar from "../../../common/CommonSnackbar";
import CommoanAutocomplete from "../../../common/CommoanAutocomplete";
import makeAnimated from "react-select/animated";
import CustomPBar from "../../../common/CustomPBar";
import { toast } from "react-toastify";
const animatedComponents = makeAnimated();

const userData = {};

let TEXTFIELD_XS = 12;
let TEXTFIELD_MARGINTOP = 15;

class AddRegion extends BaseComponent {
	constructor(props) {
		super(props);
		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
		this.state = {
			[Constants.KEY_NAME]: "",
			[Constants.KEY_COUNTRY_ID]: "",
			[Constants.KEY_STATE_ID]: "",
			[Constants.KEY_CITY_ID]: "",
			[Constants.KEY_COUNTRY_LIST_DATA]: [],
			[Constants.KEY_STATE_LIST_DATA]: [],
			[Constants.KEY_CITY_LIST_DATA]: [],
			[Constants.KEY_SHOW_PROGRESS]: true,
			disabledClickedBtn: false,
			errorText: "Empty field",
			iserror: false,
			selectedCountry: "",
			selectedState: "",
			selectedCity: "",
		};
	}

	componentDidMount() {
		this.getCountryList();
	}

	handleChange = (input) => (e) => {
		console.log("input", input);
		console.log("value", e.target.value);
		this.setState({
			[input]: e.target.value,
		});
	};
	allLoFieldClear(number) {
		if (number == 4) {
			let obj = {
				selectedCountry: "",
				selectedState: "",
				selectedCity: "",
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
				[Constants.KEY_REGION_ID]: undefined,
				[Constants.KEY_CITY_ID]: undefined,
				[Constants.KEY_STATE_ID]: undefined,
				[Constants.KEY_CITY_LIST_DATA]: [],
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
			this.setState({
				selectedCity: selectedOption,
				[Constants.KEY_CITY_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
			});
			this.getRegionList(selectedOption);
		}
	};

	render() {
		const { classes } = this.props;
		const { image, name, description } = this.state;

		if (this.state[Constants.KEY_SHOW_PROGRESS] == true) {
			return (
				<div className={classes.mainView}>
					<CustomPBar showProgress={this.state[Constants.KEY_SHOW_PROGRESS]} />
				</div>
			);
		} else
			return (
				<Fragment>
					<div className={classes.appBarSpacer} />
					<Grid>
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

						<CommonGridTextField
							required
							xs={TEXTFIELD_XS}
							style={{ marginTop: TEXTFIELD_MARGINTOP }}
							id="regionName"
							fullWidth
							label={this.strings(StringKeys.Locality_Name)}
							className={classes.textField}
							value={name}
							onChange={this.handleChange(Constants.KEY_NAME)}
							variant="outlined"
						/>
					</Grid>
					<CommonButton
						type="submit"
						fullWidth={false}
						variant="contained"
						color="secondary"
						ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
						className={classes.submit}
						onClick={this.checkVaidation}
						label={this.strings(StringKeys.Save)}
						disabled={this.state.disabledClickedBtn}
					/>

					<CommonSnackbar
						onClose={this.handleClose}
						open={this.state.iserror}
						message={this.state.errorText}></CommonSnackbar>
				</Fragment>
			);
	}

	handleClose = () => {
		this.setState({ iserror: false });
	};

	handleClick = (msg) => {
		this.setState({
			iserror: true,
			errorText: msg,
		});
	};

	checkVaidation = (event) => {
		event.preventDefault();
		if (Utility.checkRegionValidation(this.state, this)) {
			this.addRegion();
		}
	};

	addRegion = (event) => {
		const { name } = this.state;
		var data = {
			[Constants.KEY_NAME]: Utility.jsUcfirst(name),
			[Constants.KEY_COUNTRY_ID]: this.state[Constants.KEY_COUNTRY_ID],
			[Constants.KEY_STATE_ID]: this.state[Constants.KEY_STATE_ID],
			[Constants.KEY_CITY_ID]: this.state[Constants.KEY_CITY_ID],
		};
		this.props.reqAddRegion(data, this);
		console.log(JSON.stringify(data));
	};

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

	handleResponse = (nextProps) => {
		var respObj = null;
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		} else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (nextProps[Constants.KEY_TYPE] === types.API_ADD_LOCALITY) {
				toast(nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE]);
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					disabledClickedBtn: false,
				};
				this.setState(respObj);
				this.goBack();
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
			}
		}
	};
}

const styles = (theme) => ({
	appBarSpacer: theme.mixins.toolbar,
	h5: {
		marginBottom: theme.spacing.unit * 2,
	},
	bigAvatar: {
		margin: 10,
		width: 100,
		height: 100,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
	mainView: {
		display: "flex",
		height: "100vh",
		width: "100vw",
	},
});

AddRegion.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, {
	reqAddRegion,
	reqCountryList,
	reqStateList,
	reqCityList,
})(withStyles(styles)(AddRegion));
