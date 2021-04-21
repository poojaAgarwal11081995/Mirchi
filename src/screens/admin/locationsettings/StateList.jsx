/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import {
	reqChangeStatusState,
	reqStateList,
	reqCountryList,
	reqDeleteState,
} from "../../../actions";
import * as types from "../../../actions/types";
import BaseComponent from "../../../common/BaseComponent";
import * as Constants from "../../../utils/Constants";
import * as StringKeys from "../../../res/StringKeys";
import * as CustomStorage from "../../../utils/CustomStorage";
import CountryTable from "../../../tables/CountryTable";
import StateTable from "../../../tables/StateTable";
import CommonButton from "../../../common/CommonButton";
import CommoanAutocomplete from "../../../common/CommoanAutocomplete";
import makeAnimated from "react-select/animated";
import Grid from "@material-ui/core/Grid";
import CustomPBar from "../../../common/CustomPBar";
import DeleteItemDialog from "../../../common/DeleteItemDialog";

const animatedComponents = makeAnimated();
const userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);

let countryDetails = undefined;
let TEXTFIELD_XS = 12;
let TEXTFIELD_MARGINTOP = 0;
class StateList extends BaseComponent {
	constructor(props) {
		super(props);

		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
		this.state = {
			[Constants.KEY_SHOW_PROGRESS]: false,
			[Constants.KEY_STATE_LIST_DATA]: [],
			[Constants.KEY_COUNTRY_ID]: "",
			selectedCountry: "",
			headerData: [
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Name) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.State_Code) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Country_Name) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Stauts) },
				{ [Constants.KEY_NAME]: this.strings("Created") },
				// { [Constants.KEY_NAME]: this.strings("Created Time") },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Action) },
			],

			isDeleteDialog: false,
			deleted_msg: this.strings(StringKeys.Delete_State_Msg),
			delete_title: this.strings(StringKeys.Dialog_Title),
			selected_item: undefined,
		};
		countryDetails = CustomStorage.getSessionDataAsObject(
			Constants.KEY_COUNTRY_DETAILS,
		);
	}
	componentDidMount() {
		this.getCountryList();
		this.getStateList();
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

	callStateWithTimer = () => {
		setTimeout(() => {
			this.getStateList();
		}, 100);
	};

	handleChangeCountry = (selectedOption, isDeleted) => {
		if (isDeleted.action == "clear") {
			this.allLoFieldClear(4);
			this.callStateWithTimer();
		} else {
			this.getStateList(selectedOption);
		}
	};

	navigateAddPage() {
		this.props.history.push({
			pathname: Constants.SCREEN_ADD_STATE,
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
		} else
			return (
				<Fragment>
					<div className={classes.appBarSpacer} />
					<Grid item xs={TEXTFIELD_XS} style={{ marginTop: 0 }}>
						<CommonButton
							style={{ marginTop: 20 }}
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
					</Grid>
					<Grid item xs={TEXTFIELD_XS} style={{ marginTop: 20 }}>
						<CommoanAutocomplete
							value={this.state.selectedCountry}
							options={this.state[Constants.KEY_COUNTRY_LIST_DATA]}
							components={animatedComponents}
							onChange={this.handleChangeCountry}
							placeholder={this.strings(StringKeys.Select_Country)}
						/>
					</Grid>
					{this.state.headerData !== undefined &&
					this.state.headerData.length > 0 ? (
						<div className={classes.tableContainer} style={{ marginTop: 20 }}>
							<StateTable
								handleChange={this.handleChange}
								headerData={this.state.headerData}
								dataOb={this.state[Constants.KEY_STATE_LIST_DATA]}
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

	okayBtnClick = () => {
		if (
			this.state.selected_item != undefined &&
			this.state.selected_item != ""
		) {
			var data = {
				[Constants.KEY_UNDERSCORE_ID]: this.state.selected_item[
					Constants.KEY_UNDERSCORE_ID
				],
			};
			this.props.reqDeleteState(data, this);
			this.setState({ isDeleteDialog: false });
		}
	};
	cancelBtnClick = () => {
		this.setState({ isDeleteDialog: false });
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
			if (nextProps[Constants.KEY_TYPE] === types.API_COUNTRY_LIST) {
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
			} else if (nextProps[Constants.KEY_TYPE] === types.API_DELETE_STATE) {
				toast(nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE]);
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
				};
				this.setState(respObj);
				this.getStateList();
			} else if (
				nextProps[Constants.KEY_TYPE] === types.API_CHANGE_STATUS_STATE
			) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
				};
				this.setState(respObj);
				this.getStateList();
			}
		}
	};

	getCountryList = () => {
		let data = {
			[Constants.KEY_USERID]: userData[Constants.KEY_USERID],
		};
		this.props.reqCountryList(data, this);
	};
	getStateList = (selectedOption) => {
		let countryid = "";
		if (selectedOption != undefined) {
			countryid = selectedOption[Constants.KEY_UNDERSCORE_ID];
			this.setState({
				[Constants.KEY_STATE_LIST_DATA]: [],
				[Constants.KEY_CITY_LIST_DATA]: [],
				selectedState: "",
				selectedCity: "",
				selectedRegion: "",
				selectedCountry: selectedOption,
				[Constants.KEY_COUNTRY_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
			});
		} else {
			if (this.state[Constants.KEY_COUNTRY_ID] != undefined) {
				countryid = this.state[Constants.KEY_COUNTRY_ID];
			}
		}

		let data = {};
		if (countryid != "") {
			data[Constants.KEY_COUNTRY_ID] = countryid;
		}
		this.props.reqStateList(data, this);
	};

	deleteState = (_id) => {
		let data = {
			[Constants.KEY_UNDERSCORE_ID]: _id,
		};
		this.props.reqDeleteState(data, this);
	};

	// deleteState = (item) => {
	// 	this.setState({ selected_item: item, isDeleteDialog: true });
	// };

	updateStatus = (_id, status) => {
		let data = {
			[Constants.KEY_UNDERSCORE_ID]: _id,
			[Constants.KEY_STATUS]: !status,
		};
		this.props.reqChangeStatusState(data, this);
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
StateList.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, {
	reqChangeStatusState,
	reqStateList,
	reqCountryList,
	reqDeleteState,
})(withStyles(styles)(StateList));
