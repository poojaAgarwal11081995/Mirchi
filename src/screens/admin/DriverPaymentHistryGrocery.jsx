/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
	reqDriverDocStatusChangeGrocery,
	reqChangeStatusDriverGrocery,
	reqFloatingCashForAllDriverGrocery,
	reqPaidDriverPaymentGrocery,
	reqRegionList,
	reqCountryList,
	reqStateList,
	reqCityList,
	reqNeedToPayForAllDriversGroery,
} from "../../actions";
import * as types from "../../actions/types";
import BaseComponent from "../../common/BaseComponent";
import * as Utility from "../../utils/Utility";
import * as Constants from "../../utils/Constants";
import * as StringKeys from "../../res/StringKeys";
import SimpleTable from "./SimpleTable";
import FLCashDriverTable from "../../tables/FLCashDriverTable";
import Grid from "@material-ui/core/Grid";
import CommonButton from "../../common/CommonButton";
import CustomPBar from "../../common/CustomPBar";
import CommonDocVerified from "../../common/CommonDocVerified";
import * as CustomStorage from "../../utils/CustomStorage";
import CommonDocViewer from "../../common/CommonDocViewer";
import CommonFullImageViewer from "../../common/CommonFullImageViewer";

import CommonGridTextField from "../../common/CommonGridTextField";
import CommoanAutocomplete from "../../common/CommoanAutocomplete";
import makeAnimated from "react-select/animated";
import YesNoDialog from "../../common/YesNoDialog";
import FLCashDriverTableGrocery from "../../tables/FLCashDriverTableGrocery";
const animatedComponents = makeAnimated();

let selctedFloatingCashItem = undefined;

let TEXTFIELD_XS = 12;

const userData = undefined;
let changeAbleDriverId = -1;

class DriverPaymentHistryGrocery extends BaseComponent {
	constructor(props) {
		super(props);

		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
		this.state = {
			open: false,
			showRPaymentD: false,

			[Constants.KEY_SHOW_PROGRESS]: true,
			[Constants.KEY_DATA]: [],
			headerData: [
				{
					[Constants.KEY_NAME]: this.strings(StringKeys.Name),
				},
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Description) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Stauts) },
				{ [Constants.KEY_NAME]: this.strings(StringKeys.Action) },
			],
			viewAbleImage: "",
			isVisible: false,
			isVisibleFullImage: false,
			viewFullImage: "",

			selectedCountry: "",
			selectedState: "",
			selectedCity: "",
			selectedRegion: "",
			[Constants.KEY_SEARCH]: undefined,
			[Constants.KEY_COUNTRY_ID]: undefined,
			[Constants.KEY_STATE_ID]: undefined,
			[Constants.KEY_CITY_ID]: undefined,
			[Constants.KEY_REGION_ID]: undefined,
		};
	}
	componentDidMount() {
		this.getDriverList();
		this.getCountryList();
	}
	handleChange = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};

	secondBtnClick = () => {
		this.setState({ showRPaymentD: false });
	};

	firstBtnClick = () => {
		console.log("firstBtnClick::::", selctedFloatingCashItem);

		this.setState({ showRPaymentD: false });

		this.setState({ [Constants.KEY_SHOW_PROGRESS]: true });

		this.props.reqPaidDriverPaymentGrocery(
			{
				[Constants.KEY_PAYMENT_DONE_BY_USER_ID]: userData[Constants.KEY_USERID],
				[Constants.KEY_DELIVERY_MAN_ID]:
					selctedFloatingCashItem[Constants.KEY_UNDERSCORE_ID],
			},
			this,
		);
	};

	// firstBtnClick = () => {
	//     this.setState({ showRPaymentD: false });

	//     let login_type = CustomStorage.getSessionDataAsObject(Constants.KEY_LOGIN_TYPE);
	//     let size = window.history.length;
	//     console.log('login_type = ' + login_type);
	//     CustomStorage.setSessionDataAsObject(Constants.KEY_IS_REMEMBER, false);
	//     for (let index = 0; index < size - 2; index++) {
	//         window.history.back();
	//     }
	// }

	navigateAddPage() {
		this.props.history.push({
			pathname: Constants.SCREEN_ADD_DRIVER_FARE_GROCERY,
		});
	}

	handleSearchChange = (name) => (event) => {
		this.setState({ [name]: event.target[Constants.KEY_VALUE] });
	};

	viewImage = (image, index, isThis) => {
		changeAbleDriverId = index;
		let data = [
			{
				[Constants.KEY_UNDERSCORE_ID]: image[Constants.KEY_UNDERSCORE_ID],
				[Constants.KEY_NAME]: this.strings(StringKeys.Aadhar_Image),
				[Constants.KEY_STATUS]: image[Constants.KEY_AADHAR_STATUS],
				[Constants.KEY_IMAGE]: image[Constants.KEY_AADHAR_IMAGE],
				[Constants.KEY_KEY]: Constants.KEY_AADHAR_STATUS,
			},
			{
				[Constants.KEY_UNDERSCORE_ID]: image[Constants.KEY_UNDERSCORE_ID],
				[Constants.KEY_NAME]: this.strings(StringKeys.License_Image),
				[Constants.KEY_STATUS]: image[Constants.KEY_LICENSE_STATUS],
				[Constants.KEY_IMAGE]: image[Constants.KEY_LICENSE_IMAGE],
				[Constants.KEY_KEY]: Constants.KEY_LICENSE_STATUS,
			},
			{
				[Constants.KEY_UNDERSCORE_ID]: image[Constants.KEY_UNDERSCORE_ID],
				[Constants.KEY_NAME]: this.strings(StringKeys.RC_Image),
				[Constants.KEY_STATUS]: image[Constants.KEY_RC_STATUS],
				[Constants.KEY_IMAGE]: image[Constants.RC_IMAGE],
				[Constants.KEY_KEY]: Constants.KEY_RC_STATUS,
			},
			{
				[Constants.KEY_UNDERSCORE_ID]: image[Constants.KEY_UNDERSCORE_ID],
				[Constants.KEY_NAME]: this.strings(StringKeys.Pan_Image),
				[Constants.KEY_STATUS]: image[Constants.KEY_PAN_STATUS],
				[Constants.KEY_IMAGE]: image[Constants.KEY_PAN_IMAGE],
				[Constants.KEY_KEY]: Constants.KEY_PAN_STATUS,
			},
		];

		if (isThis != undefined) {
			this.setState({
				viewAbleImage: data,
			});
		} else {
			this.setState({
				isVisible: !this.state.isVisible,
				viewAbleImage: data,
			});
		}
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

	handleChangeRegion = (selectedOption, isDeleted) => {
		if (isDeleted.action == "clear") {
			this.setState({
				selectedRegion: "",
				[Constants.KEY_REGION_ID]: undefined,
			});
		} else {
			this.setState({
				selectedRegion: selectedOption,
				[Constants.KEY_REGION_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
			});
		}
	};

	onReceivePaymentClick = (item) => {
		selctedFloatingCashItem = item;
		console.log("onReceivePaymentClick::::::", selctedFloatingCashItem);

		this.setState({
			showRPaymentD: true,
		});
	};

	viewFullImage = (image) => {
		this.setState({
			isVisibleFullImage: !this.state.isVisibleFullImage,
			viewFullImage: image,
		});
	};

	closeDilaog = () => {
		this.setState({ isVisible: !this.state.isVisible });
	};
	closeDilaogFullImage = () => {
		this.setState({ isVisibleFullImage: !this.state.isVisibleFullImage });
	};
	handleResetData = () => {
		this.setState({
			selectedCountry: "",
			selectedState: "",
			selectedCity: "",
			selectedRegion: "",
			[Constants.KEY_SEARCH]: undefined,
			[Constants.KEY_COUNTRY_ID]: undefined,
			[Constants.KEY_STATE_ID]: undefined,
			[Constants.KEY_CITY_ID]: undefined,
			[Constants.KEY_REGION_ID]: undefined,
		});
	};

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

					<div>
						<CommonGridTextField
							required
							xs={TEXTFIELD_XS}
							style={{ marginTop: 0 }}
							id="restaurantName"
							label={this.strings(StringKeys.Search_by_Name)}
							fullWidth
							className={classes.textField}
							value={this.state[Constants.KEY_SEARCH]}
							onChange={this.handleSearchChange(Constants.KEY_SEARCH)}
							autoComplete="resname"
							variant="outlined"
							fieldStyle={classes.fieldHeight}
							onEnterKey={() => this.getDriverList()}
						/>
						<Grid
							item
							xs={12}
							container
							direction={"row"}
							justify={"space-between"}
							alignItems={"center"}
							alignContent={"center"}
							style={{ marginTop: 20 }}>
							<Grid
								xs={2}
								style={{ marginTop: 0, paddingRight: 5, paddingLeft: 0 }}>
								<CommoanAutocomplete
									value={this.state.selectedCountry}
									options={this.state[Constants.KEY_COUNTRY_LIST_DATA]}
									components={animatedComponents}
									onChange={this.handleChangeCountry}
									placeholder={this.strings(StringKeys.Select_Country)}
								/>
							</Grid>

							<Grid xs={2} style={{ marginTop: 0, paddingRight: 5 }}>
								<CommoanAutocomplete
									value={this.state.selectedState}
									options={this.state[Constants.KEY_STATE_LIST_DATA]}
									components={animatedComponents}
									onChange={this.handleChangeState}
									placeholder={this.strings(StringKeys.Select_State)}
								/>
							</Grid>

							<Grid xs={2} style={{ marginTop: 0, paddingRight: 5 }}>
								<CommoanAutocomplete
									value={this.state.selectedCity}
									options={this.state[Constants.KEY_CITY_LIST_DATA]}
									components={animatedComponents}
									onChange={this.handleChangeCity}
									placeholder={this.strings(StringKeys.Select_City)}
								/>
							</Grid>

							<Grid xs={2} style={{ marginTop: 0, paddingRight: 5 }}>
								<CommoanAutocomplete
									value={this.state.selectedRegion}
									options={this.state[Constants.KEY_REGION_LIST_DATA]}
									components={animatedComponents}
									onChange={this.handleChangeRegion}
									placeholder={this.strings(StringKeys.Select_Region)}
								/>
							</Grid>

							<Grid
								item
								xs={2}
								container
								alignItems={"center"}
								justify={"center"}
								direction={"column"}>
								<CommonButton
									type="search"
									fullWidth={false}
									variant="contained"
									style={{ width: "150px" }}
									color="secondary"
									ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
									className={classes.submit}
									onClick={() => {
										this.getDriverList();
									}}
									label={this.strings(StringKeys.Search)}
									disabled={this.state.disabledClickedBtn}
								/>
							</Grid>
							<Grid
								item
								xs={2}
								container
								alignItems={"center"}
								justify={"center"}
								direction={"column"}>
								<CommonButton
									type="search"
									fullWidth={false}
									variant="contained"
									style={{ width: "150px" }}
									color="secondary"
									ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
									className={classes.submit}
									onClick={() => {
										this.setState(
											() => this.handleResetData(),
											() => this.getDriverList(),
										);
									}}
									label={this.strings(StringKeys.Reset)}
									disabled={this.state.disabledClickedBtn}
								/>
							</Grid>
						</Grid>
					</div>

					{this.state.headerData !== undefined &&
					this.state.headerData.length > 0 ? (
						<div className={classes.tableContainer} style={{ marginTop: 20 }}>
							<FLCashDriverTableGrocery
								data={this.state[Constants.KEY_DATA]}
								context={this}
							/>
						</div>
					) : null}
					<CommonDocViewer
						showYesNo={this.state.isVisible}
						secondBtnClick={this.closeDilaog}
						title="View Doc"
						firstBtnName="Dismiss"
						context={this}
						secondBtnName="Cancel"
						data={this.state.viewAbleImage}
						firstBtnClick={this.closeDilaog}
					/>
					<CommonFullImageViewer
						showYesNo={this.state.isVisibleFullImage}
						secondBtnClick={this.closeDilaogFullImage}
						title="Full Image"
						firstBtnName="Dismiss"
						context={this}
						secondBtnName="Cancel"
						image={this.state.viewFullImage}
						firstBtnClick={this.closeDilaogFullImage}
					/>

					{selctedFloatingCashItem !== undefined && (
						<YesNoDialog
							showYesNo={this.state.showRPaymentD}
							secondBtnClick={this.secondBtnClick}
							title={this.strings(StringKeys.APP_NAME)}
							content={` Have you paid to ${
								selctedFloatingCashItem[Constants.KEY_DRIVER_DETAILS][
									Constants.KEY_NAME
								]
							}?`}
							firstBtnName="Yes"
							secondBtnName="Cancel"
							firstBtnClick={this.firstBtnClick}

							// context.state
						/>
					)}
				</Fragment>
			);
	}

	getCountryList = () => {
		let data = {
			[Constants.KEY_USERID]:
				userData != undefined ? userData[Constants.KEY_USERID] : "0",
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
			selectedState: selectedOption,
			selectedRegion: "",
			[Constants.KEY_STATE_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
		});
		let data = {
			[Constants.KEY_COUNTRY_ID]: selectedOption[Constants.KEY_COUNTRY_ID],
			[Constants.KEY_STATE_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
		};
		this.props.reqCityList(data, this);
	};

	getRegionList = (selectedOption) => {
		this.setState({
			[Constants.KEY_REGION_LIST_DATA]: [],
			selectedRegion: "",
			selectedCity: selectedOption,
			[Constants.KEY_CITY_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
		});
		let data = {
			[Constants.KEY_COUNTRY_ID]: this.state.selectedState[
				Constants.KEY_COUNTRY_ID
			],
			[Constants.KEY_STATE_ID]: this.state.selectedState[
				Constants.KEY_UNDERSCORE_ID
			],
			[Constants.KEY_CITY_ID]: selectedOption[Constants.KEY_UNDERSCORE_ID],
		};
		this.props.reqRegionList(data, this);
	};

	handleResponse = (nextProps) => {
		console.log("handleResponse ::: ", nextProps);

		var respObj = null;
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		}
		if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (
				nextProps[Constants.KEY_TYPE] ===
				types.API_NEED_TO_PAY_FOR_ALL_DRIVERS_GROCERY
			) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							Constants.KEY_DRIVER_LIST
						],
				};

				this.setState(respObj, () => {
					if (changeAbleDriverId >= 0) {
						console.log("index ", changeAbleDriverId + "");
						let obj = this.state[Constants.KEY_DATA][changeAbleDriverId];
						console.log(
							"index ",
							"after filter ",
							JSON.stringify(obj),
							"form server ",
							JSON.stringify(this.state[Constants.KEY_DATA]),
						);
						this.viewImage(obj, changeAbleDriverId, "check");
					}
				});
			} else if (nextProps[Constants.KEY_TYPE] === types.API_DELETE_DRIVER) {
				respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
				this.setState(respObj);
				this.getDriverList();
			} else if (
				nextProps[Constants.KEY_TYPE] === types.API_CHANGE_STATUS_DRIVER_GROCERY
			) {
				respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
				this.setState(respObj);
				this.getDriverList();
			} else if (
				nextProps[Constants.KEY_TYPE] ===
				types.API_DRIVER_DOC_STATUS_CHANGE_GROCERY
			) {
				respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
				this.setState(respObj);
				//var index = this.state.categoriesId.indexOf(isDeleted.removedValue._id)
				this.getDriverList();
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
			} else if (
				nextProps[Constants.KEY_TYPE] === types.API_PAID_DRIVER_PAYMENT_GROCERY
			) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
				};
				this.setState(respObj);
				this.getDriverList();
			}
		}
	};

	getDriverList = () => {
		let data = {
			offset: 0,
		};

		if (this.state[Constants.KEY_SEARCH] !== undefined)
			data[Constants.KEY_SEARCH] = Utility.removeWhiteSpace(
				this.state[Constants.KEY_SEARCH],
			);
		if (this.state[Constants.KEY_COUNTRY_ID] !== undefined)
			data[Constants.KEY_COUNTRY_ID] = this.state[Constants.KEY_COUNTRY_ID];

		if (this.state[Constants.KEY_STATE_ID] !== undefined)
			data[Constants.KEY_STATE_ID] = this.state[Constants.KEY_STATE_ID];

		if (this.state[Constants.KEY_CITY_ID] !== undefined)
			data[Constants.KEY_CITY_ID] = this.state[Constants.KEY_CITY_ID];

		if (this.state[Constants.KEY_REGION_ID] !== undefined)
			data[Constants.KEY_REGION_ID] = this.state[Constants.KEY_REGION_ID];

		this.props.reqNeedToPayForAllDriversGroery(data, this);
	};

	navigateOnDetailsPage(id) {
		this.props.history.push({
			pathname: Constants.SCREEN_DRIVER_DETAIL_GROCERY,
			[Constants.KEY_DRIVER_ID]: id,
		});
	}

	updateStatus = (_id, status) => {
		let data = {
			[Constants.KEY_UNDERSCORE_ID]: _id,
			[Constants.KEY_STATUS]: !status,
		};
		this.props.reqChangeStatusDriverGrocery(data, this);
	};

	updateDocStatus = (dataObj, status) => {
		console.log("dataObj ", JSON.stringify(dataObj));
		let data = {
			[Constants.KEY_UNDERSCORE_ID]: dataObj[Constants.KEY_UNDERSCORE_ID],
			[dataObj[Constants.KEY_KEY]]: status,
		};

		this.props.reqDriverDocStatusChangeGrocery(data, this);
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
DriverPaymentHistryGrocery.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, {
	reqDriverDocStatusChangeGrocery,
	reqChangeStatusDriverGrocery,
	reqFloatingCashForAllDriverGrocery,
	reqPaidDriverPaymentGrocery,
	reqRegionList,
	reqCountryList,
	reqStateList,
	reqCityList,
	reqNeedToPayForAllDriversGroery,
})(withStyles(styles)(DriverPaymentHistryGrocery));
