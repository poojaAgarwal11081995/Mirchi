/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import BaseComponent from "../../../../common/BaseComponent";
import CommonButton from "../../../../common/CommonButton";
import * as StringKeys from "../../../../res/StringKeys";
import * as Constants from "../../../../utils/Constants";
import { connect } from "react-redux";
import { reqAddCountry, reqEditCountry } from "../../../../actions";
import * as types from "../../../../actions/types";
import CommonGridTextField from "../../../../common/CommonGridTextField";
import * as CustomStorage from "../../../../utils/CustomStorage";
import * as Utility from "../../../../utils/Utility";
import CommonSnackbar from "../../../../common/CommonSnackbar";
import LocationSearchInput from "../../../locationservice/LocationSearchInput";
import CustomPBar from "../../../../common/CustomPBar";
import { toast } from "react-toastify";
const userData = {};

let TEXTFIELD_XS = 12;
let TEXTFIELD_MARGINTOP = 15;

let countryDetails = undefined;
class EditCountry extends BaseComponent {
	constructor(props) {
		super(props);
		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
		this.state = {
			[Constants.KEY_NAME]: "",
			[Constants.KEY_SHOW_PROGRESS]: false,
			disabledClickedBtn: false,
			errorText: "Empty field",
			iserror: false,
			place: {},
			gmapsLoaded: false,
			country_code: "",
			dial_code: "",
		};
		countryDetails = CustomStorage.getSessionDataAsObject(
			Constants.KEY_COUNTRY_DETAILS,
		);
	}
	componentDidMount() {
		this.setState({
			[Constants.KEY_NAME]: countryDetails[Constants.KEY_NAME],
			[Constants.KEY_COUNTRY_CODE]: countryDetails[Constants.KEY_COUNTRY_CODE],
			[Constants.KEY_DIAL_CODE]: countryDetails[Constants.KEY_DIAL_CODE],
		});
	}

	showPlaceDetails(place) {
		this.setState({ place });
	}

	handleChange = (input) => (e) => {
		console.log("input", input);
		console.log("value", e.target.value);
		this.setState({
			[input]: e.target.value,
		});
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
			if (nextProps[Constants.KEY_TYPE] === types.API_EDIT_COUNTRY) {
				toast(nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE]);
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					disabledClickedBtn: false,
				};
				this.setState(respObj);
				this.goBack();
			}
		}
	};

	handleSelectLocation = (location) => {
		this.setState({
			county_code: location.short_name,
			name: location.long_name,
		});
	};

	render() {
		const { classes } = this.props;
		const { image, name, country_code, dial_code } = this.state;

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
					<div>
						<LocationSearchInput
							selectCallBack={(location) => this.handleSelectLocation(location)}
						/>
					</div>

					<Grid>
						<CommonGridTextField
							required={false}
							disabled={true}
							id={"standard-read-only-input"}
							xs={TEXTFIELD_XS}
							style={{ marginTop: TEXTFIELD_MARGINTOP }}
							fullWidth
							label={this.strings(StringKeys.Country_Name)}
							className={classes.textField}
							value={name}
							onChange={this.handleChange(Constants.KEY_NAME)}
							variant="outlined"
						/>
						<CommonGridTextField
							required={false}
							disabled={true}
							xs={TEXTFIELD_XS}
							style={{ marginTop: TEXTFIELD_MARGINTOP }}
							id="countryCode"
							fullWidth
							label={this.strings(StringKeys.Country_Code)}
							className={classes.textField}
							value={country_code}
							onChange={this.handleChange(Constants.KEY_COUNTRY_CODE)}
							variant="outlined"
						/>

						<CommonGridTextField
							required
							xs={TEXTFIELD_XS}
							style={{ marginTop: TEXTFIELD_MARGINTOP }}
							id="dialCode"
							fullWidth
							label={this.strings(StringKeys.Dial_Code)}
							className={classes.textField}
							value={dial_code}
							onChange={this.handleChange(Constants.KEY_DIAL_CODE)}
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
		const { name, country_code, dial_code } = this.state;

		var data = {
			[Constants.KEY_NAME]: Utility.jsUcfirst(name),
			[Constants.KEY_COUNTRY_CODE]: country_code,
			[Constants.KEY_DIAL_CODE]: dial_code,
			[Constants.KEY_UNDERSCORE_ID]:
				countryDetails[Constants.KEY_UNDERSCORE_ID],
		};
		if (Utility.checkCountryValidation(data, this)) {
			this.addCountryName(data);
		}
	};

	addCountryName = (data) => {
		this.props.reqEditCountry(data, this);
		console.log("request " + JSON.stringify(data));
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

EditCountry.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, { reqEditCountry, reqAddCountry })(
	withStyles(styles)(EditCountry),
);
