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
import { reqAddState, reqEditState, reqCountryList } from "../../../../actions";
import * as types from "../../../../actions/types";
import CommonGridTextField from "../../../../common/CommonGridTextField";
import * as CustomStorage from "../../../../utils/CustomStorage";
import * as Utility from "../../../../utils/Utility";
import CommonSnackbar from "../../../../common/CommonSnackbar";
import CommoanAutocomplete from "../../../../common/CommoanAutocomplete";
import makeAnimated from "react-select/animated";
import LocationStateFinder from "../../../locationservice/LocationStateFinder";
import CustomPBar from "../../../../common/CustomPBar";
import { toast } from "react-toastify";
const animatedComponents = makeAnimated();

const userData = {};

let TEXTFIELD_XS = 12;
let TEXTFIELD_MARGINTOP = 15;
let stateData = undefined;
class EditState extends BaseComponent {
	constructor(props) {
		super(props);
		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
		this.state = {
			[Constants.KEY_NAME]: "",
			[Constants.KEY_COUNTRY_ID]: "",
			[Constants.KEY_COUNTRY_LIST_DATA]: [],
			[Constants.KEY_SHOW_PROGRESS]: true,
			disabledClickedBtn: false,
			errorText: "Empty field",
			iserror: false,
			state_code: "",
			selectedCountry: {},
			[Constants.KEY_COUNTRY_ID]: "",
			selectedCountry: "",
		};
		stateData = CustomStorage.getSessionDataAsObject(
			Constants.KEY_STATE_DETAILS,
		);
	}

	componentDidMount() {
		this.getCountryList();
		this.setState({
			[Constants.KEY_NAME]: stateData[Constants.KEY_NAME],
			[Constants.KEY_COUNTRY_ID]: stateData[Constants.KEY_COUNTRY_ID],
			[Constants.KEY_STATE_CODE]: stateData[Constants.KEY_STATE_CODE],
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

	handleSelectLocation = (location) => {
		this.setState({
			state_code: location.short_name,
			name: location.long_name,
		});
	};

	allLoFieldClear(number) {
		if (number == 4) {
			let obj = {
				selectedCountry: "",
				selectedState: "",
				[Constants.KEY_COUNTRY_ID]: undefined,
				[Constants.KEY_STATE_ID]: undefined,
				[Constants.KEY_STATE_LIST_DATA]: [],
			};
			this.setState(obj);
		} else if (number == 3) {
			this.setState({
				selectedState: "",
				[Constants.KEY_STATE_ID]: undefined,
			});
		}
	}

	handleChangeCountry = (selectedOption, isDeleted) => {
		if (isDeleted.action == "clear") {
			this.allLoFieldClear(4);
		} else {
			this.setState({
				selectedCountry: selectedOption,
				[Constants.KEY_COUNTRY_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
			});
		}
	};

	render() {
		const { classes } = this.props;
		const { image, name, state_code, description } = this.state;
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

					<Grid item xs={TEXTFIELD_XS} style={{ marginTop: 20 }}>
						<CommoanAutocomplete
							value={this.state.selectedCountry}
							options={this.state[Constants.KEY_COUNTRY_LIST_DATA]}
							components={animatedComponents}
							onChange={this.handleChangeCountry}
							placeholder={this.strings(StringKeys.Select_Country)}
						/>
					</Grid>

					<div style={{ marginTop: 20 }}>
						<LocationStateFinder
							selectCallBack={(location) => this.handleSelectLocation(location)}
						/>
					</div>

					<Grid>
						<CommonGridTextField
							required={false}
							disabled={true}
							xs={TEXTFIELD_XS}
							style={{ marginTop: TEXTFIELD_MARGINTOP }}
							id="stateName"
							fullWidth
							label={this.strings(StringKeys.State_Name)}
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
							id="stateCode"
							fullWidth
							label={this.strings(StringKeys.State_Code)}
							className={classes.textField}
							value={state_code}
							onChange={this.handleChange(Constants.KEY_STATE_CODE)}
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
		const { name, state_code } = this.state;
		var data = {
			[Constants.KEY_NAME]: Utility.jsUcfirst(name),
			[Constants.KEY_STATE_CODE]: state_code,
			[Constants.KEY_COUNTRY_ID]: this.state[Constants.KEY_COUNTRY_ID],
			[Constants.KEY_UNDERSCORE_ID]: stateData[Constants.KEY_UNDERSCORE_ID],
		};
		if (Utility.checkStateValidation(data, this)) {
			this.addStateName(data);
		}
	};

	addStateName = (data) => {
		this.props.reqEditState(data, this);
		console.log("request > " + JSON.stringify(data));
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
			if (nextProps[Constants.KEY_TYPE] === types.API_EDIT_STATE) {
				toast(nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE]);
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					disabledClickedBtn: false,
				};
				this.setState(respObj);
				this.goBack();
			}
			// else if (nextProps[Constants.KEY_TYPE] === types.API_COUNTRY_LIST) {
			//     console.log('handleResponse called in nextProps CategoryList Screen  Kishan : ', nextProps)
			//     respObj = {
			//         [Constants.KEY_SHOW_PROGRESS]: false,
			//         [Constants.KEY_COUNTRY_LIST_DATA]: nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA]
			//     };
			//     this.setState(respObj);
			// }
			else if (nextProps[Constants.KEY_TYPE] === types.API_COUNTRY_LIST) {
				let allList = nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA];
				let selectedCountryOld = "";
				for (const key in allList) {
					if (allList.hasOwnProperty(key)) {
						const element = allList[key];
						if (stateData[Constants.KEY_COUNTRY_ID] == element._id) {
							selectedCountryOld = element;
						}
					}
				}

				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_COUNTRY_LIST_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
					selectedCountry: selectedCountryOld,
					[Constants.KEY_COUNTRY_ID]:
						selectedCountryOld[Constants.KEY_UNDERSCORE_ID],
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

EditState.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, {
	reqAddState,
	reqCountryList,
	reqEditState,
})(withStyles(styles)(EditState));
