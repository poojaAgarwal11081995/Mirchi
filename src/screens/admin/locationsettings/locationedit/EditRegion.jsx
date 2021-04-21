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
import { reqEditRegion, reqCountryList } from "../../../../actions";
import * as types from "../../../../actions/types";
import CommonGridTextField from "../../../../common/CommonGridTextField";
import * as CustomStorage from "../../../../utils/CustomStorage";
import * as Utility from "../../../../utils/Utility";
import CommonSnackbar from "../../../../common/CommonSnackbar";
import CommoanAutocomplete from "../../../../common/CommoanAutocomplete";
import makeAnimated from "react-select/animated";
import { toast } from "react-toastify";
const animatedComponents = makeAnimated();

const userData = {};

let TEXTFIELD_XS = 12;
let TEXTFIELD_MARGINTOP = 15;

let regionData = undefined;

class EditRegion extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			[Constants.KEY_NAME]: "",
			[Constants.KEY_COUNTRY_ID]: "",
			[Constants.KEY_CITY_ID]: "",
			[Constants.KEY_STATE_ID]: "",
			[Constants.KEY_REGION_ID]: "",
			[Constants.KEY_CITY_NAME]: "",
			[Constants.KEY_STATE_NAME]: "",
			[Constants.KEY_COUNTRY_NAME]: "",
			[Constants.KEY_COUNTRY_LIST_DATA]: [],
			[Constants.KEY_SHOW_PROGRESS]: true,
			disabledClickedBtn: false,
			errorText: "Empty field",
			iserror: false,
			selectedCountry: {},
			stateSelectedPre: [],
		};

		regionData = CustomStorage.getSessionDataAsObject(
			Constants.KEY_REGION_DETAILS,
		);
	}

	componentDidMount() {
		this.getCountryList();
		console.log("resionDAtaq  321212121212121.", regionData);
		this.setState({
			[Constants.KEY_NAME]: regionData[Constants.KEY_NAME],
			[Constants.KEY_COUNTRY_ID]: regionData[Constants.KEY_COUNTRY_ID],
			[Constants.KEY_STATE_ID]: regionData[Constants.KEY_STATE_ID],
			[Constants.KEY_CITY_ID]: regionData[Constants.KEY_CITY_ID],
			[Constants.KEY_REGION_ID]: regionData[Constants.KEY_UNDERSCORE_ID],

			[Constants.KEY_CITY_NAME]: regionData["city"]["name"],
			[Constants.KEY_STATE_NAME]: regionData["state"]["name"],
			[Constants.KEY_COUNTRY_NAME]: regionData["country"]["name"],
		});
	}

	handleChange = (input) => (e) => {
		console.log("input", input);
		console.log("value", e.target.value);
		this.setState({
			[input]: e.target.value,
		});
	};
	handleChangeSingle = (selectedOption, isDeleted) => {
		this.setState({
			selectedCountry: selectedOption,
			[Constants.KEY_COUNTRY_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
		});
	};

	render() {
		const { classes } = this.props;
		const { image, name, description } = this.state;
		return (
			<Fragment>
				<div className={classes.appBarSpacer} />
				<Grid>
					<CommonGridTextField
						required={false}
						disabled={true}
						xs={TEXTFIELD_XS}
						style={{ marginTop: TEXTFIELD_MARGINTOP }}
						id="countryName"
						fullWidth
						label={this.strings(StringKeys.Country_Name)}
						className={classes.textField}
						value={this.state[Constants.KEY_COUNTRY_NAME]}
						onChange={this.handleChange(Constants.KEY_COUNTRY_NAME)}
						variant="outlined"
					/>

					<CommonGridTextField
						required={false}
						disabled={true}
						xs={TEXTFIELD_XS}
						style={{ marginTop: TEXTFIELD_MARGINTOP }}
						id="stateName"
						fullWidth
						label={this.strings(StringKeys.State_Name)}
						className={classes.textField}
						value={this.state[Constants.KEY_STATE_NAME]}
						onChange={this.handleChange(Constants.KEY_STATE_NAME)}
						variant="outlined"
					/>

					<CommonGridTextField
						required={false}
						disabled={true}
						xs={TEXTFIELD_XS}
						style={{ marginTop: TEXTFIELD_MARGINTOP }}
						id="cityName"
						fullWidth
						label={this.strings(StringKeys.City_Name)}
						className={classes.textField}
						value={this.state[Constants.KEY_CITY_NAME]}
						onChange={this.handleChange(Constants.KEY_CITY_NAME)}
						variant="outlined"
					/>

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
			this.editRegion();
		}
	};

	editRegion = (event) => {
		const { name } = this.state;
		var data = {
			[Constants.KEY_NAME]: Utility.jsUcfirst(name),
			[Constants.KEY_COUNTRY_ID]: this.state[Constants.KEY_COUNTRY_ID],
			[Constants.KEY_STATE_ID]: this.state[Constants.KEY_STATE_ID],
			[Constants.KEY_CITY_ID]: this.state[Constants.KEY_CITY_ID],
			[Constants.KEY_UNDERSCORE_ID]: regionData[Constants.KEY_UNDERSCORE_ID],
		};
		this.props.reqEditRegion(data, this);
		console.log(JSON.stringify(data));
	};
	getCountryList = () => {
		let data = {
			[Constants.KEY_USERID]: userData[Constants.KEY_USERID],
		};
		this.props.reqCountryList(data, this);
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
			if (nextProps[Constants.KEY_TYPE] === types.API_EDIT_LOCALITY) {
				toast(nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE]);
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					disabledClickedBtn: false,
				};
				this.setState(respObj);
				this.goBack();
			} else if (nextProps[Constants.KEY_TYPE] === types.API_COUNTRY_LIST) {
				console.log(
					"handleResponse called in nextProps CategoryList Screen  Kishan : ",
					nextProps,
				);

				let obj = nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA];
				let selectedItem = [];
				for (let index = 0; index < obj.length; index++) {
					const element = obj[index];
					if (
						element[Constants.KEY_UNDERSCORE_ID] ==
						this.state[Constants.KEY_COUNTRY_ID]
					)
						selectedItem.push(element);
				}
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_COUNTRY_LIST_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
					selectedCountry: selectedItem,
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

EditRegion.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, { reqEditRegion, reqCountryList })(
	withStyles(styles)(EditRegion),
);

//export default connect(mapStateToProps, { reqEditRegion, reqCountryList })(withStyles(styles)(EditRegion));
