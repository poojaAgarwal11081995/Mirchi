/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
	getRestoDetails,
	reqAddRestrorent,
	reqRegionList,
	reqGetCategoryList,
	reqCountryList,
	reqStateList,
	reqCityList,
} from "../../../actions";
import BaseComponent from "../../../common/BaseComponent";
import * as StringKeys from "../../../res/StringKeys";
import * as Constants from "../../../utils/Constants";
import * as ResourcesConstants from "../../../res/ResourcesConstants";
import { connect } from "react-redux";
import * as types from "../../../actions/types";
import Avatar from "@material-ui/core/Avatar";
import CommonGridTextField from "../../../common/CommonGridTextField";
import * as Utility from "../../../utils/Utility";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CustomPBar from "../../../common/CustomPBar";
import * as CustomStorage from "../../../utils/CustomStorage";
userData;
import makeAnimated from "react-select/animated";
import CommoanAutocomplete from "../../../common/CommoanAutocomplete";
import CommoanMultiSelector from "../../../common/CommoanMultiSelector";
const animatedComponents = makeAnimated();
import * as Dimens from "../../../res/Dimens";
import TimetPicker from "../../../tables/TimetPicker";
import MapDialog from "../../../common/MapDialog";
import LocationIcon from "@material-ui/icons/LocationOn";
import CommonLabelBtn from "../../../common/CommonLabelBtn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let toastStyle = { background: "#F62C3A", text: "#FFFFFF" };

let TEXTFIELD_XS = 12;
let TEXTFIELD_HALF_XS = 6;
let TEXTFIELD_MARGINTOP = 15;
let LABEL_MARGINTOP = 15;
let RESTO_ID = 0;
const userData = undefined;
let IS_FOR_ADD = -1; // 1 for add and 2 for edit and -1 mean default
import clsx from "clsx";

class RequestedRestroDetails extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			[Constants.KEY_IMAGE]: null,
			[Constants.KEY_NAME]: "",
			[Constants.KEY_EMAIL]: "",
			[Constants.KEY_ADDRESS_1]: "",
			[Constants.KEY_ADDRESS_2]: "",
			[Constants.KEY_CITY]: "",
			[Constants.KEY_STATE]: "",
			[Constants.KEY_ZIP]: "",
			[Constants.KEY_PHONE]: "",
			[Constants.KEY_ADDRESS]: "",
			[Constants.KEY_LAT]: 26.5621,
			[Constants.KEY_LNG]: 75.8851,
			[Constants.KEY_COUNTRY]: "",
			[Constants.KEY_PASSWORD]: "",
			[Constants.KEY_CONFIRM_PASSWORD]: "",
			errorText: "Empty field",
			iserror: false,
			[Constants.KEY_SHOW_PROGRESS]: false,
			detailObj: {},
			[Constants.KEY_CATEGORIES]: [],
			categoriesId: [],
			categoriesIdPre: [],
			categoriesSelectedPre: [],
			regionSelectedPre: [],
			[Constants.KEY_COUNTRY_ID]: "",
			[Constants.KEY_STATE_ID]: "",
			[Constants.KEY_CITY_ID]: "",
			[Constants.KEY_REGION_ID]: "",
			[Constants.KEY_STATE_LIST_DATA]: [],
			selectedCountry: "",
			selectedState: "",
			selectedCity: "",
			selectedRegion: "",
			selectedRestroType: "",
			[Constants.KEY_RESTAURENT_TYPE]: "",
			restroTypeArray: [
				{
					label: Constants.KEY_VEG,
					[Constants.KEY_VALUE]: Constants.RESTRO_TYPE_VEG,
				},
				{
					label: Constants.KEY_NON_VEG,
					[Constants.KEY_VALUE]: Constants.RESTRO_TYPE_NON_VEG,
				},
				{
					label: Constants.KEY_VEG_AND_NON_VEG,
					[Constants.KEY_VALUE]: Constants.RESTRO_TYPE_VEG_AND_NON_VEG,
				},
			],
			[Constants.KEY_WEBISTE_LINK]: "",
			[Constants.KEY_ADDRESS_2]: "",
			[Constants.KEY_ADDRESS_3]: "",
			[Constants.KEY_ADDRESS_4]: "",
			[Constants.KEY_HOUSE_NAME_AND_NO]: "",
			[Constants.KEY_SUPPORT_DELIVERY]: "",
			[Constants.KEY_LANDLINE_NUMBER]: "",
			[Constants.KEY_SHOP_LICENCE_IMG]: "",
			[Constants.KEY_SHOP_LICENCE_IMG_NAME]: "",
			[Constants.KEY_SHOP_LICENCE_IMG_UPLOAD]: "",
			[Constants.KEY_FSSAI_LICENCE_IMG]: "",
			[Constants.KEY_FSSAI_LICENCE_IMG_NAME]: "",
			[Constants.KEY_FSSAI_LICENCE_IMG_UPLOAD]: "",
			[Constants.KEY_GSTN_OR_PAN_IMG]: "",
			[Constants.KEY_GSTN_OR_PAN_IMG_NAME]: "",
			[Constants.KEY_GSTN_OR_PAN_IMG_UPLOAD]: "",
			[Constants.KEY_BUILDING_FRONT_IMG]: "",
			[Constants.KEY_BUILDING_FRONT_IMG_NAME]: "",
			[Constants.KEY_BUILDING_FRONT_IMG_UPLOAD]: "",
			[Constants.KEY_KITCHEN_IMG]: [],
			[Constants.KEY_KITCHEN_IMG_NAME]: "",
			[Constants.KEY_KITCHEN_IMG_UPLOAD]: "",
			[Constants.KEY_DINING_PACKAGING_IMG]: "",
			[Constants.KEY_DINING_PACKAGING_IMG_NAME]: "",
			[Constants.KEY_DINING_PACKAGING_IMG_UPLOAD]: "",
			[Constants.KEY_LOCALITY_IMAGE]: "",
			[Constants.KEY_LOCALITY_IMAGE_NAME]: "",
			[Constants.KEY_LOCALITY_IMAGE_UPLOAD]: "",
			viewAbleImage: "",
			viewAbleMultiImage: "",
			isVisible: false,
			isVisibleGoogleMap: false,
			isMultiVisible: false,
			[Constants.KEY_OPENING_TIME]: "",
			[Constants.KEY_CLOSING_TIME]: "",
			selectedSupportDelivery: "",
			[Constants.KEY_RESTAURENT_TYPE]: "",
			[Constants.KEY_COST_FOR_TWO]: "",
			supportDeliveryArray: [
				{ label: Constants.KEY_TRUE },
				{ label: Constants.KEY_FALSE },
			],
		};
		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
		try {
			RESTO_ID = this.props.location[Constants.KEY_RESTO_ID];
		} catch (error) {
			RESTO_ID = undefined;
		}

		alert(1);
	}

	notifySuccess = (msg) => {
		toast(msg, toastStyle);
	};

	componentDidMount() {
		if (RESTO_ID != undefined && RESTO_ID != null && RESTO_ID != "") {
			this.getRestoDetailsReq();
			// this.getCountryList();
		} else {
			this.goBack();
		}
	}

	componentWillReceiveProps(nextProps) {
		console.log("nextProps==", nextProps);
	}

	onChangeTime = (key, value) => {
		console.log("time value=", key, value);
		this.setState({ [key]: value }, () => {
			console.log(this.state[Constants.KEY_CLOSING_TIME]);
		});
	};

	isForAdd(nextProps) {
		if (
			nextProps != undefined &&
			nextProps.match.path == Constants.SCREEN_ADD_RESTAURENT
		) {
			let respObj = {
				detailObj: {},
				name: "",
				email: "",
				phone: "",
				city: "",
				pincode: "",
				state: "",
				address: "",
				country: "",
				image: "",
				zip: "",
				categoriesIdPre: [],
				categoriesId: [],
				categoriesSelectedPre: [],
			};

			this.setState(respObj);
			return true;
		} else if (
			nextProps != undefined &&
			nextProps.match.path == Constants.SCREEN_RESTAURANT_DETAIL
		) {
			this.getRestoDetailsReq();
			return false;
		} else if (RESTO_ID != undefined && RESTO_ID != null) {
			return false;
		}
		return true;
	}

	ImagePress = (e) => {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];
		this.setState({ [Constants.KEY_IMAGE_UPLOAD]: file });
		reader.onloadend = () => {
			this.setState({ [[Constants.KEY_IMAGE]]: reader.result });
		};
		reader.readAsDataURL(file);
	};

	handleChange = (input) => (e) => {
		console.log("input", input);
		console.log("value", e.target.value);
		this.setState({
			[input]: e.target.value,
		});
	};

	onChange(event) {
		if (event.target.value.length > 0) {
			this.setState({ errorText: "" });
		} else {
			this.setState({ errorText: "Invalid format: ###-###-####" });
		}
	}

	TransitionDown(props) {
		return <Slide {...props} direction="down" />;
	}
	handleClick = (msg) => {
		//  alert(Transition)
		this.setState({
			iserror: true,
			errorText: msg,
		});
	};

	handleClose = () => {
		this.setState({ iserror: false });
	};
	handleExited = () => {};

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
	handleChangeRestroType = (selectedOption, isDeleted) => {
		console.log("handleChangeRestroType :-", selectedOption);
		this.setState({
			selectedRestroType: selectedOption,
		});
	};

	handleChangeSupport = (selectedOption, isDeleted) => {
		this.setState({
			selectedSupportDelivery: selectedOption,
		});
	};

	render() {
		const { classes } = this.props;
		const {
			image,
			name,
			address,
			zip,
			phone,
			email,
			errorText,
			iserror,
			categories,
			categoriesIdPre,
			categoriesSelectedPre,
		} = this.state;

		if (this.state[Constants.KEY_SHOW_PROGRESS] == true) {
			return (
				<div className={classes.mainView}>
					<CustomPBar showProgress={this.state[Constants.KEY_SHOW_PROGRESS]} />
					{/* <ToastContainer autoClose={Constants.TIME_OUT_TOAST} /> */}
				</div>
			);
		} else
			return (
				<Fragment>
					<div
						style={{
							padding: userData != undefined && userData != null ? 0 : 20,
						}}>
						<div className={classes.appBarSpacer} />

						<Grid item xs={TEXTFIELD_XS}>
							<div>
								<div
									className={classes.bigAvatar}
									onClick={(e) => this.fileInput.click()}>
									<Avatar
										required={true}
										style={{ borderRadius: 0 }}
										alt=""
										src={
											image !== null ? image : ResourcesConstants.restro_default
										}
										className={classes.bigAvatar}
									/>
								</div>
								<input
									ref={(fileInput) => (this.fileInput = fileInput)}
									type="file"
									style={{ display: "none" }}
									accept=".png, .jpg, .jpeg"
									onChange={this.ImagePress}
								/>
							</div>
						</Grid>

						<Grid
							item
							xs={TEXTFIELD_XS}
							alignItems="center"
							style={{ marginTop: TEXTFIELD_MARGINTOP }}>
							<Typography
								component="h6"
								variant="h6"
								style={{ marginTop: TEXTFIELD_MARGINTOP }}>
								{this.strings(StringKeys.Restaurant_Information)}
							</Typography>
						</Grid>

						{/* Restaurant Information start */}

						<div class="justify-content-start">
							<div class="row">
								<div class="col-sm ">
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="restaurantName"
										label={this.strings(StringKeys.Restaurant_Name)}
										fullWidth
										className={classes.textField}
										value={name}
										onChange={this.handleChange(Constants.KEY_NAME)}
										autoComplete="resname"
										variant="outlined"
										fieldStyle={classes.fieldHeight}
									/>
								</div>
								<div class="col-sm ">
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="email"
										fullWidth
										label={this.strings(StringKeys.Email)}
										className={classes.textField}
										value={email}
										variant="outlined"
										onChange={this.handleChange(Constants.KEY_EMAIL)}
									/>
								</div>

								<div class="col-sm ">
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="phone"
										fullWidth
										label={this.strings(StringKeys.Phone)}
										className={classes.textField}
										value={phone}
										onChange={this.handleChange(Constants.KEY_PHONE)}
										variant="outlined"
									/>{" "}
								</div>
							</div>
						</div>

						<div class="justify-content-start">
							<div class="row">
								<div class="col-sm ">
									<CommonGridTextField
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="landline"
										fullWidth
										label={this.strings(StringKeys.Landline_Number)}
										className={classes.textField}
										value={this.state[Constants.KEY_LANDLINE_NUMBER]}
										onChange={this.handleChange(Constants.KEY_LANDLINE_NUMBER)}
										variant="outlined"
									/>
								</div>
								<div class="col-sm ">
									<CommonGridTextField
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="websitelink"
										fullWidth
										autoComplete="websitelink"
										label={this.strings(StringKeys.Webiste_Link)}
										className={classes.textField}
										value={this.state[Constants.KEY_WEBISTE_LINK]}
										onChange={this.handleChange(Constants.KEY_WEBISTE_LINK)}
										variant="outlined"
									/>
								</div>
								<div class="col-sm ">
									<CommonLabelBtn
										onClick={() => {
											this.setState({ isVisibleGoogleMap: true });
										}}
										type="button"
										classType="btn btn-secondary"
										xs={TEXTFIELD_XS}
										id="address"
										fullWidth
										label={
											"Map Pin Point: " +
											this.state[Constants.KEY_LAT] +
											" , " +
											this.state[Constants.KEY_LNG]
										}
										header={this.strings(StringKeys.Address)}
										className={classes.textField}
										value={address}
										variant="outlined"
										color="'#888"
										size="large"
										style={{
											height: 50,
											backgroundColor: "#00000000",
											width: "100%",
											justifyItems: "flex-start",
											textAlign: "left",
											color: "#888",
											marginTop: 8,
											marginBottom: TEXTFIELD_MARGINTOP,
										}}
										iconLeft={
											<LocationIcon
												className={clsx(classes.leftIcon, classes.iconSmall)}
											/>
										}></CommonLabelBtn>
								</div>
							</div>
						</div>

						<div class="justify-content-start">
							<div class="row">
								<div class="col-sm ">
									<Grid
										item
										xs={TEXTFIELD_XS}
										alignItems="center"
										style={{ marginTop: TEXTFIELD_MARGINTOP }}>
										<CommoanAutocomplete
											value={this.state.selectedCountry}
											options={this.state[Constants.KEY_COUNTRY_LIST_DATA]}
											components={animatedComponents}
											onChange={this.handleChangeCountry}
											placeholder={this.strings(StringKeys.Select_Country)}
										/>
									</Grid>
								</div>

								<div class="col-sm ">
									<Grid
										item
										xs={TEXTFIELD_XS}
										alignItems="center"
										style={{ marginTop: TEXTFIELD_MARGINTOP }}>
										<CommoanAutocomplete
											value={this.state.selectedState}
											options={this.state[Constants.KEY_STATE_LIST_DATA]}
											components={animatedComponents}
											onChange={this.handleChangeState}
											placeholder={this.strings(StringKeys.Select_State)}
										/>
									</Grid>
								</div>
								<div class="col-sm ">
									<Grid
										item
										xs={TEXTFIELD_XS}
										alignItems="center"
										style={{ marginTop: TEXTFIELD_MARGINTOP }}>
										<CommoanAutocomplete
											value={this.state.selectedCity}
											options={this.state[Constants.KEY_CITY_LIST_DATA]}
											components={animatedComponents}
											onChange={this.handleChangeCity}
											placeholder={this.strings(StringKeys.Select_City)}
										/>
									</Grid>
								</div>
							</div>
						</div>

						<div class="justify-content-start">
							<div class="row">
								<div class="col-sm ">
									<Grid
										item
										xs={TEXTFIELD_XS}
										alignItems="center"
										style={{ marginTop: TEXTFIELD_MARGINTOP }}>
										<CommoanAutocomplete
											value={this.state.selectedRegion}
											options={this.state[Constants.KEY_REGION_LIST_DATA]}
											components={animatedComponents}
											onChange={this.handleChangeRegion}
											placeholder={this.strings(StringKeys.Select_Region)}
										/>
									</Grid>
								</div>

								<div class="col-sm ">
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="address1"
										fullWidth
										autoComplete="address-line1"
										label={this.strings(StringKeys.Address_Line_1)}
										className={classes.textField}
										value={this.state[Constants.KEY_HOUSE_NAME_AND_NO]}
										onChange={this.handleChange(
											Constants.KEY_HOUSE_NAME_AND_NO,
										)}
										variant="outlined"
									/>
								</div>
								<div class="col-sm ">
									<CommonGridTextField
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="address2"
										fullWidth
										autoComplete="address-line2"
										label={this.strings(StringKeys.Address_Line_2)}
										className={classes.textField}
										value={this.state[Constants.KEY_ADDRESS_2]}
										onChange={this.handleChange(Constants.KEY_ADDRESS_2)}
										variant="outlined"
									/>
								</div>
							</div>
						</div>

						<div class="justify-content-start">
							<div class="row">
								<div class="col-sm ">
									<CommonGridTextField
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="address3"
										fullWidth
										autoComplete="address-line3"
										label={this.strings(StringKeys.Address_Line_3)}
										className={classes.textField}
										value={this.state[Constants.KEY_ADDRESS_3]}
										onChange={this.handleChange(Constants.KEY_ADDRESS_3)}
										variant="outlined"
									/>
								</div>
								<div class="col-sm ">
									<CommonGridTextField
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="address4"
										fullWidth
										autoComplete="address-line4"
										label={this.strings(StringKeys.Address_Line_4)}
										className={classes.textField}
										value={this.state[Constants.KEY_ADDRESS_4]}
										onChange={this.handleChange(Constants.KEY_ADDRESS_4)}
										variant="outlined"
									/>
								</div>
								<div class="col-sm ">
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="address"
										fullWidth
										autoComplete="address"
										label={this.strings(StringKeys.Address)}
										className={classes.textField}
										value={address}
										onChange={this.handleChange(Constants.KEY_ADDRESS)}
										variant="outlined"
									/>{" "}
								</div>
							</div>
						</div>

						<div class="justify-content-start">
							<div class="row">
								<div class="col-sm ">
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="zip"
										autoComplete="zip"
										fullWidth
										label={this.strings(StringKeys.Zip)}
										className={classes.textField}
										value={zip}
										type="number"
										onChange={this.handleChange(Constants.KEY_ZIP)}
										variant="outlined"
									/>
								</div>

								<div class="col-sm ">
									<Grid
										item
										xs={TEXTFIELD_XS}
										alignItems="center"
										style={{ marginTop: TEXTFIELD_MARGINTOP }}>
										<div class="justify-content-start">
											<div class="row">
												<label
													style={{
														marginLeft: 10,
														marginTop: 15,
														marginRight: 5,
													}}>
													Opening Time:{" "}
												</label>
												<TimetPicker
													context={this}
													style={{ marginTop: 10 }}
													placeholder={"Opning Time"}
													keyValue={Constants.KEY_OPENING_TIME}
													timeValue={
														this.state[Constants.KEY_OPENING_TIME]
													}></TimetPicker>
											</div>
										</div>
									</Grid>
								</div>
								<div class="col-sm ">
									<Grid
										item
										xs={TEXTFIELD_XS}
										alignItems="center"
										style={{ marginTop: TEXTFIELD_MARGINTOP }}>
										<div class="justify-content-start">
											<div class="row">
												<label
													style={{
														marginLeft: 10,
														marginTop: 15,
														marginRight: 5,
													}}>
													Closing Time:{" "}
												</label>
												<TimetPicker
													context={this}
													style={{ marginTop: 10 }}
													placeholder={"Closing Time"}
													keyValue={Constants.KEY_CLOSING_TIME}
													timeValue={
														this.state[Constants.KEY_CLOSING_TIME]
													}></TimetPicker>
											</div>
										</div>
									</Grid>
								</div>
							</div>
						</div>

						{/* Restaurant Information end */}

						{/* Food Information start */}
						<Grid
							item
							xs={TEXTFIELD_XS}
							alignItems="center"
							style={{ marginTop: TEXTFIELD_MARGINTOP }}>
							<Typography
								component="h6"
								variant="h6"
								style={{ marginTop: TEXTFIELD_MARGINTOP }}>
								{this.strings(StringKeys.FoodInfo)}
							</Typography>
						</Grid>

						<div class="justify-content-start">
							<div class="row">
								<div class="col-sm ">
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="cast_for_two"
										autoComplete="cast_for_two"
										fullWidth
										type={"number"}
										label={this.strings(StringKeys.Cost_For_Two)}
										className={classes.textField}
										value={this.state[Constants.KEY_COST_FOR_TWO]}
										onChange={this.handleChange(Constants.KEY_COST_FOR_TWO)}
										variant="outlined"
									/>
								</div>
								<div class="col-sm ">
									<Grid
										item
										xs={TEXTFIELD_XS}
										alignItems="center"
										style={{ marginTop: TEXTFIELD_MARGINTOP }}>
										<CommoanAutocomplete
											value={this.state.selectedRestroType}
											options={this.state.restroTypeArray}
											components={animatedComponents}
											onChange={this.handleChangeRestroType}
											placeholder={this.strings(
												StringKeys.Select_Restaurant_Type,
											)}
										/>
									</Grid>
								</div>
								<div class="col-sm ">
									<Grid
										item
										xs={TEXTFIELD_XS}
										alignItems="center"
										style={{ marginTop: TEXTFIELD_MARGINTOP }}>
										<CommoanAutocomplete
											value={this.state.selectedSupportDelivery}
											options={this.state.supportDeliveryArray}
											components={animatedComponents}
											onChange={this.handleChangeSupport}
											placeholder={this.strings(StringKeys.Support_Delivery)}
										/>
									</Grid>
								</div>

								<div class="col-sm ">
									<Grid
										item
										xs={TEXTFIELD_XS}
										alignItems="center"
										style={{ marginTop: TEXTFIELD_MARGINTOP }}>
										<CommoanMultiSelector
											value={this.state.categoriesSelectedPre}
											options={this.state[Constants.KEY_CATEGORIES]}
											components={animatedComponents}
											onChange={this.handleSelectedCat}
											placeholder={this.strings(StringKeys.Select_Categories)}
										/>
									</Grid>
								</div>
							</div>
						</div>
						{/* Food Information end */}

						<Snackbar
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							open={this.state.iserror}
							autoHideDuration={6000}
							onClose={this.handleClose}
							onExited={this.handleExited}
							ContentProps={{
								"aria-describedby": "message-id",
							}}
							message={<span id="message-id">{errorText}</span>}
							action={[
								<IconButton
									key="close"
									aria-label="Close"
									color="inherit"
									onClick={this.handleClose}>
									<CloseIcon />
								</IconButton>,
							]}
						/>
					</div>

					<MapDialog
						showYesNo={this.state.isVisibleGoogleMap}
						secondBtnClick={this.closeAndSaveGoogleDilaog}
						title="Google Map"
						firstBtnName="Okay"
						secondBtnName="Cancel"
						lat={this.state[Constants.KEY_LAT]}
						lng={this.state[Constants.KEY_LNG]}
						firstBtnClick={this.closeGoogleMapDilaog}
					/>

					{/* <ToastContainer autoClose={Constants.TIME_OUT_TOAST} /> */}
				</Fragment>
			);
	}

	closeDilaog = () => {
		this.setState({ isVisible: !this.state.isVisible });
	};
	closeGoogleMapDilaog = () => {
		this.setState({ isVisibleGoogleMap: !this.state.isVisibleGoogleMap });
	};
	closeAndSaveGoogleDilaog = (location) => {
		this.setState({
			isVisibleGoogleMap: !this.state.isVisibleGoogleMap,
			[Constants.KEY_LAT]: location.lat,
			[Constants.KEY_LNG]: location.lng,
		});
	};

	viewImage = (image) => {
		this.setState({
			isVisible: !this.state.isVisible,
			viewAbleImage: image,
		});
	};

	closeMultiDilaog = () => {
		this.setState({ isMultiVisible: !this.state.isMultiVisible });
	};

	viewImageMultiple = (image) => {
		this.setState({
			isMultiVisible: !this.state.isMultiVisible,
			viewAbleMultiImage: image,
		});
	};

	handleSelectedCat = (selectedOption, isDeleted) => {
		if (isDeleted.action == "remove-value") {
			var index = this.state.categoriesId.indexOf(
				isDeleted.removedValue[Constants.KEY_UNDERSCORE_ID],
			);
			this.state.categoriesId.splice(index, 1);
			this.setState({
				categoriesSelectedPre: selectedOption,
			});
		} else {
			this.state.categoriesId.push(
				isDeleted.option[Constants.KEY_UNDERSCORE_ID],
			);
			this.setState({
				categoriesSelectedPre: selectedOption,
			});
		}
	};

	getRestoDetailsReq = () => {
		var data = {
			[Constants.KEY_UNDERSCORE_ID]: RESTO_ID,
		};
		this.props.getRestoDetails(data, this);
	};

	getCatoryList = () => {
		let data = {
			[Constants.KEY_USERID]: userData[Constants.KEY_USERID],
		};
		this.props.reqGetCategoryList(data, this);
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
		var respObj = null;
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		} else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (
				nextProps[Constants.KEY_TYPE] === types.API_RESTAURENT_DETAILS &&
				nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA] != undefined
			) {
				let data = nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA];
				let obj =
					nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
						Constants.KEY_RETSRO_DETAILS
					];
				let oldcat = obj.categories;
				console.log("Filtered  =", JSON.stringify(obj));
				let ids = [];
				for (let index = 0; index < oldcat.length; index++) {
					const element = oldcat[index];
					ids.push(element);
				}

				let allState = data.state;
				let selcetedPreState;
				for (const key in allState) {
					if (allState.hasOwnProperty(key)) {
						const element = allState[key];
						if (
							obj.state != undefined &&
							element[Constants.KEY_UNDERSCORE_ID] ==
								obj.state[Constants.KEY_UNDERSCORE_ID]
						) {
							selcetedPreState = element;
						}
					}
				}

				let allCity = data.city;
				let selcetedPreCity;
				for (const key in allCity) {
					if (allCity.hasOwnProperty(key)) {
						const element = allCity[key];
						if (
							obj.city != undefined &&
							element[Constants.KEY_UNDERSCORE_ID] ==
								obj.city[Constants.KEY_UNDERSCORE_ID]
						) {
							selcetedPreCity = element;
						}
					}
				}

				let allRegion = data.region;
				let selcetedPreRegion;
				for (const key in allRegion) {
					if (allRegion.hasOwnProperty(key)) {
						const element = allRegion[key];
						if (
							obj.region != undefined &&
							element[Constants.KEY_UNDERSCORE_ID] ==
								obj.region[Constants.KEY_UNDERSCORE_ID]
						) {
							selcetedPreRegion = element;
						}
					}
				}

				let selectedSpDel =
					obj[Constants.KEY_SUPPORT_DELIVERY] == true
						? this.state.supportDeliveryArray[0]
						: this.state.supportDeliveryArray[1];

				let restroType =
					obj[Constants.KEY_RESTAURENT_TYPE] == Constants.RESTRO_TYPE_VEG
						? this.state.restroTypeArray[0]
						: obj[Constants.KEY_RESTAURENT_TYPE] ==
						  Constants.RESTRO_TYPE_NON_VEG
						? this.state.restroTypeArray[1]
						: this.state.restroTypeArray[2];

				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					disabledClickedBtn: false,
					detailObj: obj,
					name: obj.name,
					email: obj.email,
					phone: obj.phone,
					city: obj.city,
					pincode: obj.pincode,
					state: obj.state,
					address: obj.address,
					country: obj.country,
					image: obj.image,
					zip: obj.zip,
					categoriesIdPre: ids,
					categoriesId: ids,
					selectedState: selcetedPreState,
					[Constants.KEY_STATE_LIST_DATA]: data.state,
					selectedCity: selcetedPreCity,
					[Constants.KEY_CITY_LIST_DATA]: data.city,
					selectedRegion: selcetedPreRegion,
					[Constants.KEY_REGION_LIST_DATA]: data.region,
					[Constants.KEY_WEBISTE_LINK]: obj[Constants.KEY_WEBISTE_LINK],
					selectedSupportDelivery: selectedSpDel,
					selectedRestroType: restroType,
					[Constants.KEY_LANDLINE_NUMBER]: obj[Constants.KEY_LANDLINE_NUMBER],
					[Constants.KEY_GSTN_OR_PAN_IMG_NAME]:
						obj[Constants.KEY_GSTN_OR_PAN_IMG],
					[Constants.KEY_SHOP_LICENCE_IMG_NAME]:
						obj[Constants.KEY_SHOP_LICENCE_IMG],
					[Constants.KEY_FSSAI_LICENCE_IMG_NAME]:
						obj[Constants.KEY_FSSAI_LICENCE_IMG],
					[Constants.KEY_BUILDING_FRONT_IMG_NAME]:
						obj[Constants.KEY_BUILDING_FRONT_IMG],
					[Constants.KEY_KITCHEN_IMG_NAME]: obj[Constants.KEY_KITCHEN_IMG],
					[Constants.KEY_DINING_PACKAGING_IMG_NAME]:
						obj[Constants.KEY_DINING_PACKAGING_IMG],
					[Constants.KEY_LOCALITY_IMAGE_NAME]:
						obj[Constants.KEY_LOCALITY_IMAGE],
					[Constants.KEY_HOUSE_NAME_AND_NO]:
						obj[Constants.KEY_HOUSE_NAME_AND_NO],
					[Constants.KEY_ADDRESS_2]: obj[Constants.KEY_STREET_NAME],
					[Constants.KEY_ADDRESS_3]: obj[Constants.KEY_AREA_NAME],
					[Constants.KEY_ADDRESS_4]: obj[Constants.KEY_LANDMARK],
					[Constants.KEY_GSTN_OR_PAN_IMG]: obj[Constants.KEY_GSTN_OR_PAN_IMG],
					[Constants.KEY_SHOP_LICENCE_IMG]: obj[Constants.KEY_SHOP_LICENCE_IMG],
					[Constants.KEY_FSSAI_LICENCE_IMG]:
						obj[Constants.KEY_FSSAI_LICENCE_IMG],
					[Constants.KEY_BUILDING_FRONT_IMG]:
						obj[Constants.KEY_BUILDING_FRONT_IMG],
					[Constants.KEY_KITCHEN_IMG]: obj[Constants.KEY_KITCHEN_IMG],
					[Constants.KEY_DINING_PACKAGING_IMG]:
						obj[Constants.KEY_DINING_PACKAGING_IMG],
					[Constants.KEY_LOCALITY_IMAGE]: obj[Constants.KEY_LOCALITY_IMAGE],
					[Constants.KEY_OPENING_TIME]: obj[Constants.KEY_OPENING_TIME],
					[Constants.KEY_CLOSING_TIME]: obj[Constants.KEY_CLOSING_TIME],
					[Constants.KEY_LAT]: obj[Constants.KEY_LAT],
					[Constants.KEY_LNG]: obj[Constants.KEY_LNG],
					[Constants.KEY_COST_FOR_TWO]: obj[Constants.KEY_COST_FOR_TWO],
				};

				this.setState(respObj);
				this.getCountryList();
				this.getCatoryList();
			} else if (nextProps[Constants.KEY_TYPE] === types.API_LIST_CATEGORY) {
				let updatedArray = [];
				let array = nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA];

				for (let index = 0; index < array.length; index++) {
					const element = array[index];
					let oldArray = this.state.categoriesIdPre;
					for (let index1 = 0; index1 < oldArray.length; index1++) {
						if (element._id == oldArray[index1]) {
							updatedArray.push(element);
						}
					}
				}
				var respObjTmp = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					categoriesSelectedPre: updatedArray,
					[Constants.KEY_CATEGORIES]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				console.log("res ", respObjTmp);
				this.setState(respObjTmp);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_ADDRESTRO) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					disabledClickedBtn: false,
				};

				toast(
					nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE],
					toastStyle,
				);
				setTimeout(() => {
					this.setState(respObj);
					this.goBack();
				}, Constants.TIME_OUT_TOAST);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_COUNTRY_LIST) {
				let allList = nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA];
				let selectedCountryOld = "";
				for (const key in allList) {
					if (allList.hasOwnProperty(key)) {
						const element = allList[key];
						if (this.state.detailObj.country._id == element._id) {
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
}

const styles = (theme) => ({
	appBarSpacer: theme.mixins.toolbar,
	tableContainer: {
		height: 320,
	},
	h5: {
		marginBottom: theme.spacing.unit * 2,
	},
	bigAvatar: {
		marginTop: 10,
		marginRight: 10,
		marginBottom: 10,
		width: Dimens.add_retsro_image_w,
		height: Dimens.add_retsro_image_w,
	},
	fieldHeight: {
		height: 50,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
	editFildSpace: {
		margin: 1000,
	},
	fuwidthTimerPicker: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
	},
	alignItems: {
		display: "flex",
		flexGrow: "auto",
		justifyContent: "center",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
});
RequestedRestroDetails.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}

export default connect(mapStateToProps, {
	getRestoDetails,
	reqAddRestrorent,
	reqRegionList,
	reqGetCategoryList,
	reqCountryList,
	reqStateList,
	reqCityList,
})(withStyles(styles)(RequestedRestroDetails));
