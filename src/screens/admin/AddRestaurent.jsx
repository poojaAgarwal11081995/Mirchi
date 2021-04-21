/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
	reqRegionList,
	reqAddRestrorent,
	reqGetCategoryList,
	reqCountryList,
	reqStateList,
	reqCityList,
} from "../../actions";
import BaseComponent from "../../common/BaseComponent";
import CommonButton from "../../common/CommonButton";
import * as StringKeys from "../../res/StringKeys";
import * as Constants from "../../utils/Constants";
import * as ResourcesConstants from "../../res/ResourcesConstants";
import { connect } from "react-redux";
import * as types from "../../actions/types";
import Avatar from "@material-ui/core/Avatar";
import CommonGridTextField from "../../common/CommonGridTextField";
import * as Utility from "../../utils/Utility";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import LocationIcon from "@material-ui/icons/LocationOn";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import CustomPBar from "../../common/CustomPBar";
import * as CustomStorage from "../../utils/CustomStorage";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { sizing, textAlign } from "@material-ui/system";
import CommoanAutocomplete from "../../common/CommoanAutocomplete";
import CommoanMultiSelector from "../../common/CommoanMultiSelector";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import * as Dimens from "../../res/Dimens";
import CommonImageSelector from "../../common/CommonImageSelector";
import CommonDocImageViewer from "../../common/CommonDocImageViewer";
import CommonMultipleSelectorImg from "../../common/CommonMultipleSelectorImg";
import CommonMultipleImgViewer from "../../common/CommonMultipleImgViewer";
import CategoryDialog from "../../common/CategoryDialog";

import "antd/dist/antd.css";
import TimetPicker from "../../tables/TimetPicker";
import MapDialog from "../../common/MapDialog";
import CommonLabelBtn from "../../common/CommonLabelBtn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let toastStyle = { background: "#F62C3A", text: "#FFFFFF" };

const animatedComponents = makeAnimated();

const userData = undefined;

let TEXTFIELD_XS = 12;
let TEXTFIELD_HALF_XS = 6;
let TEXTFIELD_MARGINTOP = 15;
let LABEL_MARGINTOP = 15;

import clsx from "clsx";
const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
	leftIcon: {
		marginRight: theme.spacing(1),
	},
	rightIcon: {
		marginLeft: theme.spacing(1),
	},
	iconSmall: {
		fontSize: 20,
	},
}));

class AddRestaurent extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			[Constants.KEY_IMG]: "",
			[Constants.KEY_IMG_NAME]: "",
			[Constants.KEY_IMG_UPLOAD]: "",

			[Constants.KEY_NAME]: "",
			[Constants.KEY_EMAIL]: "",
			[Constants.KEY_ADDRESS_1]: "",
			[Constants.KEY_ADDRESS_2]: "",
			[Constants.KEY_ADDRESS_3]: "",
			[Constants.KEY_ADDRESS_4]: "",
			[Constants.KEY_CITY]: "",
			[Constants.KEY_STATE]: "",
			[Constants.KEY_ZIP]: "",
			[Constants.KEY_COST_FOR_TWO]: "",
			[Constants.KEY_PHONE]: "",
			[Constants.KEY_ADDRESS]: "",
			[Constants.KEY_PASSWORD]: "",
			[Constants.KEY_CONFIRM_PASSWORD]: "",
			[Constants.KEY_LAT]: 26.9142,
			[Constants.KEY_LNG]: 75.7902,
			errorText: "Empty field",
			iserror: false,
			[Constants.KEY_SHOW_PROGRESS]: false,
			// [Constants.KEY_IMG_UPLOAD]: null,
			[Constants.KEY_CATEGORIES]: [],
			categoriesId: [],
			[Constants.KEY_COUNTRY_ID]: "",
			[Constants.KEY_STATE_ID]: "",
			[Constants.KEY_CITY_ID]: "",
			[Constants.KEY_REGION_ID]: "",
			selectedCountry: "",
			selectedState: "",
			selectedCity: "",
			selectedRegion: "",
			selectedRestroType: "",
			selectedSupportDelivery: "",
			[Constants.KEY_RESTAURENT_TYPE]: "",
			supportDeliveryArray: [
				{ label: Constants.KEY_TRUE },
				{ label: Constants.KEY_FALSE },
			],
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
			[Constants.KEY_OPENING_TIME]: "",
			[Constants.KEY_CLOSING_TIME]: "",
			viewAbleImage: "",
			viewAbleMultiImage: [],
			isVisible: false,
			isVisibleGoogleMap: false,
			isMultiVisible: false,
			isCatShow: false,
		};
		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
	}

	ImagePress = (e) => {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];
		this.setState({ [Constants.KEY_IMG_UPLOAD]: file });
		reader.onloadend = () => {
			this.setState({
				[Constants.KEY_IMG]: reader.result,
				// [Constants.KEY_IMG_NAME]: file.name
			});
		};
		reader.readAsDataURL(file);
	};

	onChangeTime = (key, value) => {
		this.setState({ [key]: value }, () => {
			console.log("key", key, "value=", this.state[Constants.KEY_OPENING_TIME]);
		});
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

	componentDidMount() {
		this.getCatoryList();
		this.getCountryList();
	}

	TransitionDown(props) {
		return <Slide {...props} direction="down" />;
	}

	handleClick = (Transition) => {
		this.setState({
			iserror: true,
			errorText: Transition,
		});
	};

	handleClose = () => {
		this.setState({ iserror: false });
	};

	handleExited = () => {};

	handleSelectedCat = (selectedOption, isDeleted) => {
		if (isDeleted.action == "remove-value") {
			var index = this.state.categoriesId.indexOf(isDeleted.removedValue._id);
			this.state.categoriesId.splice(index, 1);
		} else {
			this.state.categoriesId.push(isDeleted.option._id);
		}
		console.log(`Option selected:`, this.state.categoriesId);
	};

	handleChangeSingle = (selectedOption, isDeleted) => {
		this.setState({
			selectedCountry: selectedOption,
		});
	};

	logValue = (value) => {
		console.log(value);
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

	handleChangeSupport = (selectedOption, isDeleted) => {
		this.setState({
			selectedSupportDelivery: selectedOption,
		});
	};

	handleChangeRestroType = (selectedOption, isDeleted) => {
		this.setState({
			selectedRestroType: selectedOption,
		});
	};

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

	navigate() {
		console.log("this.props.history==" + JSON.stringify(this.props));
		// this.props.history.push({
		//     pathname: Constants.SCREEN_SCREEN_CHECK_REQUEST,
		// });
	}

	localityImagePress = (e) => {
		e.preventDefault();
		let files = e.target.files;
		let imagesNameArray = [];
		let imagesPathArray = [];
		let imagesUploadArray = [];
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			var reader = new FileReader();
			reader.onload = (function (theFile, pos) {
				return function (e) {
					imagesNameArray.push(theFile.name);
					imagesPathArray.push(e.target.result);
					imagesUploadArray.push(theFile);
					if (files.length === imagesUploadArray.length) {
						console.log("File name in =" + theFile.name + " pos" + pos + "");
						this.setState({
							[Constants.KEY_LOCALITY_IMAGE]: imagesPathArray,
							[Constants.KEY_LOCALITY_IMAGE_NAME]: imagesNameArray,
							[Constants.KEY_LOCALITY_IMAGE_UPLOAD]: imagesUploadArray,
						});
					}
				};
			})(file, i).bind(this);
			reader.readAsDataURL(file);
		}
	};

	diningImagePress = (e) => {
		e.preventDefault();
		let files = e.target.files;
		let imagesNameArray = [];
		let imagesPathArray = [];
		let imagesUploadArray = [];
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			var reader = new FileReader();
			reader.onload = (function (theFile, pos) {
				return function (e) {
					imagesNameArray.push(theFile.name);
					imagesPathArray.push(e.target.result);
					imagesUploadArray.push(theFile);
					if (files.length === imagesUploadArray.length) {
						console.log("File name in =" + theFile.name + " pos" + pos + "");
						this.setState({
							[Constants.KEY_DINING_PACKAGING_IMG]: imagesPathArray,
							[Constants.KEY_DINING_PACKAGING_IMG_NAME]: imagesNameArray,
							[Constants.KEY_DINING_PACKAGING_IMG_UPLOAD]: imagesUploadArray,
						});
					}
				};
			})(file, i).bind(this);
			reader.readAsDataURL(file);
		}
	};

	buildingImagePress = (e) => {
		e.preventDefault();
		let files = e.target.files;
		let imagesNameArray = [];
		let imagesPathArray = [];
		let imagesUploadArray = [];
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			var reader = new FileReader();
			reader.onload = (function (theFile, pos) {
				return function (e) {
					imagesNameArray.push(theFile.name);
					imagesPathArray.push(e.target.result);
					imagesUploadArray.push(theFile);
					if (files.length === imagesUploadArray.length) {
						console.log("File name in =" + theFile.name + " pos" + pos + "");
						this.setState({
							[Constants.KEY_BUILDING_FRONT_IMG]: imagesPathArray,
							[Constants.KEY_BUILDING_FRONT_IMG_NAME]: imagesNameArray,
							[Constants.KEY_BUILDING_FRONT_IMG_UPLOAD]: imagesUploadArray,
						});
					}
				};
			})(file, i).bind(this);
			reader.readAsDataURL(file);
		}
	};

	GSTOrPANImagePress = (e) => {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];
		this.setState({ [Constants.KEY_GSTN_OR_PAN_IMG_UPLOAD]: file });
		reader.onloadend = () => {
			this.setState({
				[Constants.KEY_GSTN_OR_PAN_IMG]: reader.result,
				[Constants.KEY_GSTN_OR_PAN_IMG_NAME]: file.name,
			});
		};
		reader.readAsDataURL(file);
	};

	FssaiImagePress = (e) => {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];
		this.setState({ [Constants.KEY_FSSAI_LICENCE_IMG_UPLOAD]: file });
		reader.onloadend = () => {
			this.setState({
				[Constants.KEY_FSSAI_LICENCE_IMG]: reader.result,
				[Constants.KEY_FSSAI_LICENCE_IMG_NAME]: file.name,
			});
		};
		reader.readAsDataURL(file);
	};

	ShopLICImagePress = (e) => {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];
		this.setState({ [Constants.KEY_SHOP_LICENCE_IMG_UPLOAD]: file });
		reader.onloadend = () => {
			this.setState({
				[Constants.KEY_SHOP_LICENCE_IMG]: reader.result,
				[Constants.KEY_SHOP_LICENCE_IMG_NAME]: file.name,
			});
		};
		reader.readAsDataURL(file);
	};

	kitchanImagePress = (e) => {
		e.preventDefault();
		let files = e.target.files;
		let imagesNameArray = [];
		let imagesPathArray = [];
		let imagesUploadArray = [];
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			var reader = new FileReader();
			reader.onload = (function (theFile, pos) {
				return function (e) {
					imagesNameArray.push(theFile.name);
					imagesPathArray.push(e.target.result);
					//imagesPathArray.push(reader.result);
					imagesUploadArray.push(theFile);
					if (files.length === imagesUploadArray.length) {
						console.log("File name in =" + theFile.name + " pos" + pos + "");
						this.setState({
							[Constants.KEY_KITCHEN_IMG]: imagesPathArray,
							[Constants.KEY_KITCHEN_IMG_NAME]: imagesNameArray,
							[Constants.KEY_KITCHEN_IMG_UPLOAD]: imagesUploadArray,
						});
					}
				};
			})(file, i).bind(this);
			reader.readAsDataURL(file);
		}
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
			password,
			confirm_password,
			errorText,
			iserror,
			categories,
		} = this.state;
		//console.log('KEY_GSTN_OR_PAN_IMG_UPLOAD', this.state[Constants.KEY_GSTN_OR_PAN_IMG_UPLOAD]);

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
									//value={this.state[Constants.KEY_IMG_NAME]}
									onChange={this.ImagePress}
									// clearPress={() => {
									//     this.viewImage(this.state[Constants.KEY_IMG] != undefined ?
									//         this.state[Constants.KEY_IMG] : '')
									// }}
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
											"Map Location: " +
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
											marginTop: 9,
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
											required
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

								{/* <div class="col-sm ">
                                    <CommonGridTextField
                                        required
                                        xs={TEXTFIELD_XS}
                                        style={{ marginTop: TEXTFIELD_MARGINTOP, }}
                                        id="address"
                                        fullWidth
                                        autoComplete="address"
                                        label={this.strings(StringKeys.Address)}
                                        className={classes.textField}
                                        value={address}
                                        onChange={this.handleChange(Constants.KEY_ADDRESS)}
                                        variant="outlined"
                                    />  </div> */}
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
													placeholder={"Opening Time"}
													keyValue={Constants.KEY_OPENING_TIME}
													timeValue={this.state[Constants.KEY_OPENING_TIME]}
													// label={this.strings(StringKeys.Opening_Time)}
													// onChange={this.handleChange(Constants.KEY_OPENING_TIME)}
												></TimetPicker>
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
								<div class="col-sm "></div>
							</div>
						</div>

						<div class="justify-content-start">
							<div class="row">
								<div class="col-sm ">
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="password"
										type="password"
										fullWidth
										label={this.strings(StringKeys.Password)}
										className={classes.textField}
										value={this.state[Constants.KEY_PASSWORD]}
										onChange={this.handleChange(Constants.KEY_PASSWORD)}
										variant="outlined"
									/>
								</div>
								<div class="col-sm ">
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="confirm_password"
										type="password"
										fullWidth
										label={this.strings(StringKeys.Confirm_Password)}
										className={classes.textField}
										value={this.state[Constants.KEY_CONFIRM_PASSWORD]}
										onChange={this.handleChange(Constants.KEY_CONFIRM_PASSWORD)}
										variant="outlined"
									/>
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
										<CommonImageSelector
											required={true}
											disabled={false}
											xs={TEXTFIELD_XS}
											style={{ marginTop: TEXTFIELD_MARGINTOP }}
											id="cate_selector"
											fullWidth
											// className={classes.textField}
											label={this.strings(StringKeys.Select_Categories)}
											value={""}
											variant="outlined"
											forCheckBoxItem={true}
											onChange={this.catDialogOpen}
											clearPress={() => {
												this.setState({ isCatShow: true });
											}}
										/>

										{/* <CommoanMultiSelector
                                            options={this.state[Constants.KEY_CATEGORIES]}
                                            components={animatedComponents}
                                           // onChange={this.handleSelectedCat}
                                            onChange={(event)=>{
                                              event.preventDefault();
                                                this.setState({ isCatShow: true})
                                            }}
                                            placeholder={this.strings(StringKeys.Select_Categories)}
                                        /> */}
									</Grid>
								</div>
							</div>
						</div>
						{/* Food Information end */}

						{/* Upload Doc Information start */}

						<Grid
							item
							xs={TEXTFIELD_XS}
							alignItems="center"
							style={{ marginTop: TEXTFIELD_MARGINTOP }}>
							<Typography
								component="h6"
								variant="h6"
								style={{ marginTop: TEXTFIELD_MARGINTOP }}>
								{this.strings(StringKeys.Upload_Document)}
							</Typography>
						</Grid>

						<div class="justify-content-start">
							<div class="row">
								<div class="col-sm ">
									<CommonMultipleSelectorImg
										required={true}
										disabled={false}
										xs={TEXTFIELD_XS}
										maxLengthVal={10}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="Kitchen_Image"
										fullWidth
										className={classes.textField}
										label={this.strings(StringKeys.Kitchen_Image)}
										value={this.state[
											Constants.KEY_KITCHEN_IMG_NAME
										].toString()}
										variant="outlined"
										onChange={this.kitchanImagePress}
										clearPress={() => {
											this.viewImageMultiple(
												this.state[Constants.KEY_KITCHEN_IMG] != undefined
													? this.state[Constants.KEY_KITCHEN_IMG]
													: "",
											);
										}}
									/>
								</div>

								<div class="col-sm ">
									<CommonImageSelector
										required={true}
										disabled={false}
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="shop_lic_image"
										fullWidth
										maxLengthVal={10}
										className={classes.textField}
										label={this.strings(StringKeys.Shop_Licence_Image)}
										value={this.state[Constants.KEY_SHOP_LICENCE_IMG_NAME]}
										variant="outlined"
										onChange={this.ShopLICImagePress}
										clearPress={() => {
											this.viewImage(
												this.state[Constants.KEY_SHOP_LICENCE_IMG] != undefined
													? this.state[Constants.KEY_SHOP_LICENCE_IMG]
													: "",
											);
										}}
									/>
								</div>
								<div class="col-sm ">
									<CommonImageSelector
										required={true}
										disabled={false}
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="fssai_image"
										fullWidth
										className={classes.textField}
										label={this.strings(StringKeys.FSSAI_Licence_Image)}
										value={this.state[Constants.KEY_FSSAI_LICENCE_IMG_NAME]}
										variant="outlined"
										onChange={this.FssaiImagePress}
										clearPress={() => {
											this.viewImage(
												this.state[Constants.KEY_FSSAI_LICENCE_IMG] != undefined
													? this.state[Constants.KEY_FSSAI_LICENCE_IMG]
													: "",
											);
										}}
									/>
								</div>
							</div>
						</div>

						<div class="justify-content-start">
							<div class="row">
								<div class="col-sm ">
									<CommonImageSelector
										required={true}
										disabled={false}
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="fssai_image"
										fullWidth
										className={classes.textField}
										label={this.strings(StringKeys.GSTN_OR_PAN_IMAGE)}
										value={this.state[Constants.KEY_GSTN_OR_PAN_IMG_NAME]}
										variant="outlined"
										onChange={this.GSTOrPANImagePress}
										clearPress={() => {
											this.viewImage(
												this.state[Constants.KEY_GSTN_OR_PAN_IMG] != undefined
													? this.state[Constants.KEY_GSTN_OR_PAN_IMG]
													: "",
											);
										}}
									/>
								</div>

								<div class="col-sm ">
									<CommonMultipleSelectorImg
										required={true}
										disabled={false}
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="building_image"
										fullWidth
										className={classes.textField}
										label={this.strings(StringKeys.Building_Front_Image)}
										value={this.state[
											Constants.KEY_BUILDING_FRONT_IMG_NAME
										].toString()}
										variant="outlined"
										onChange={this.buildingImagePress}
										clearPress={() => {
											this.viewImageMultiple(
												this.state[Constants.KEY_BUILDING_FRONT_IMG] !=
													undefined
													? this.state[Constants.KEY_BUILDING_FRONT_IMG]
													: "",
											);
										}}
									/>
								</div>
								<div class="col-sm ">
									<CommonMultipleSelectorImg
										required={true}
										disabled={false}
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="dining_image"
										fullWidth
										className={classes.textField}
										label={this.strings(StringKeys.Dining_Packaging_Image)}
										value={this.state[
											Constants.KEY_DINING_PACKAGING_IMG_NAME
										].toString()}
										variant="outlined"
										onChange={this.diningImagePress}
										clearPress={() => {
											this.viewImageMultiple(
												this.state[Constants.KEY_DINING_PACKAGING_IMG] !=
													undefined
													? this.state[Constants.KEY_DINING_PACKAGING_IMG]
													: "",
											);
										}}
									/>
								</div>
							</div>
						</div>

						<div class="justify-content-start">
							<div class="row">
								<div class="col-sm ">
									<CommonMultipleSelectorImg
										required={true}
										disabled={false}
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="locality_image"
										fullWidth
										className={classes.textField}
										label={this.strings(StringKeys.Locality_Image)}
										value={this.state[
											Constants.KEY_LOCALITY_IMAGE_NAME
										].toString()}
										variant="outlined"
										onChange={this.localityImagePress}
										clearPress={() => {
											this.viewImageMultiple(
												this.state[Constants.KEY_LOCALITY_IMAGE] != undefined
													? this.state[Constants.KEY_LOCALITY_IMAGE]
													: "",
											);
										}}
									/>
								</div>
							</div>
						</div>

						{/* Upload Doc Information start */}

						<Grid
							item
							xs={TEXTFIELD_XS}
							style={{ width: "50%", alignItems: "center" }}>
							<CommonButton
								type="submit"
								fullWidth={false}
								variant="contained"
								color="secondary"
								style={{ width: "50%", alignItems: "center" }}
								className={classes.submit}
								onClick={this.checkVaidation}
								label={this.strings(StringKeys.Save)}
							/>
						</Grid>

						<Snackbar
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							open={this.state.iserror}
							autoHideDuration={1000}
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

					<CommonDocImageViewer
						showYesNo={this.state.isVisible}
						secondBtnClick={this.closeDilaog}
						title="View Image"
						firstBtnName="Dismiss"
						secondBtnName="Cancel"
						image={this.state.viewAbleImage}
						firstBtnClick={this.closeDilaog}
					/>

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

					{
						// (this.state[Constants.KEY_KITCHEN_IMG] != undefined &&
						// this.state[Constants.KEY_KITCHEN_IMG].length > 0) &&
						<CommonMultipleImgViewer
							showYesNo={this.state.isMultiVisible}
							secondBtnClick={this.closeMultiDilaog}
							title={this.strings(StringKeys.View_Image)}
							secondBtnName={this.strings(StringKeys.Dismiss)}
							secondBtnName={this.strings(StringKeys.Cancel)}
							image={this.state.viewAbleMultiImage}
							firstBtnClick={this.closeMultiDilaog}
						/>
					}

					{/* <ToastContainer autoClose={Constants.TIME_OUT_TOAST} /> */}

					<CategoryDialog
						valueId={this.state.categoriesId}
						showYesNo={this.state.isCatShow}
						secondBtnClick={this.catDialogClose}
						title={this.strings(StringKeys.Select_Categories)}
						content=""
						value={this.state.categoriesId != undefined && "...update by view"}
						secondBtnName={this.strings(StringKeys.Okay)}
						list={this.state[Constants.KEY_CATEGORIES]}
						secondBtnName={this.strings(StringKeys.Done)}
						firstBtnClick={() => this.catDialogClose()}
					/>
				</Fragment>
			);
	}
	catDialogOpen = () => {
		this.setState({ isCatShow: true });
	};
	catDialogClose = (checkedItem) => {
		this.setState(
			{ isCatShow: false, categoriesId: checkedItem },
			console.log("cate::::::", this.state.categoriesId),
		);
	};

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

	getCatoryList = () => {
		let data = {
			[Constants.KEY_USERID]:
				userData != undefined ? userData[Constants.KEY_USERID] : undefined,
		};
		this.props.reqGetCategoryList(data, this);
	};

	checkVaidation = (event) => {
		event.preventDefault();
		let houseNo =
			this.state[Constants.KEY_HOUSE_NAME_AND_NO] != undefined &&
			this.state[Constants.KEY_HOUSE_NAME_AND_NO] != ""
				? this.state[Constants.KEY_HOUSE_NAME_AND_NO]
				: "";
		let streatName =
			this.state[Constants.KEY_ADDRESS_2] != undefined &&
			this.state[Constants.KEY_ADDRESS_2] != ""
				? this.state[Constants.KEY_ADDRESS_2]
				: "";
		let areaNameName =
			this.state[Constants.KEY_ADDRESS_3] != undefined &&
			this.state[Constants.KEY_ADDRESS_3] != ""
				? this.state[Constants.KEY_ADDRESS_3]
				: "";
		let landMarkName =
			this.state[Constants.KEY_ADDRESS_4] != undefined &&
			this.state[Constants.KEY_ADDRESS_4] != ""
				? this.state[Constants.KEY_ADDRESS_4]
				: "";

		let selectedRegionName =
			this.state.selectedRegion != undefined && this.state.selectedRegion != ""
				? this.state.selectedRegion[Constants.KEY_NAME]
				: "";
		let selectedCityName =
			this.state.selectedCity != undefined && this.state.selectedCity != ""
				? this.state.selectedCity[Constants.KEY_NAME]
				: "";
		let selectedStateName =
			this.state.selectedState != undefined && this.state.selectedState != ""
				? this.state.selectedState[Constants.KEY_NAME]
				: "";
		let selectedCountryName =
			this.state.selectedCountry != undefined &&
			this.state.selectedCountry != ""
				? this.state.selectedCountry[Constants.KEY_NAME]
				: "";

		let addressFinal =
			houseNo +
			" " +
			streatName +
			" " +
			areaNameName +
			" " +
			landMarkName +
			", " +
			selectedRegionName +
			", " +
			selectedCityName +
			", " +
			selectedStateName +
			", " +
			selectedCountryName;

		var data = {
			[Constants.KEY_NAME]: this.state[Constants.KEY_NAME],
			[Constants.KEY_EMAIL]: this.state[Constants.KEY_EMAIL],
			[Constants.KEY_PHONE]: this.state[Constants.KEY_PHONE],
			[Constants.KEY_ADDRESS]: addressFinal,
			[Constants.KEY_CITY_ID]: this.state[Constants.KEY_CITY_ID],
			[Constants.KEY_STATE_ID]: this.state[Constants.KEY_STATE_ID],
			[Constants.KEY_HOUSE_NAME_AND_NO]: this.state[
				Constants.KEY_HOUSE_NAME_AND_NO
			],
			[Constants.KEY_ZIP]: this.state[Constants.KEY_ZIP],
			[Constants.KEY_COUNTRY_ID]: this.state[Constants.KEY_COUNTRY_ID],
			[Constants.KEY_REGION_ID]: this.state[Constants.KEY_REGION_ID],
			[Constants.KEY_LAT]: this.state[Constants.KEY_LAT],
			[Constants.KEY_LNG]: this.state[Constants.KEY_LNG],
			[Constants.KEY_PASSWORD]: this.state[Constants.KEY_PASSWORD],
			[Constants.KEY_CONFIRM_PASSWORD]: this.state[
				Constants.KEY_CONFIRM_PASSWORD
			],
			[Constants.KEY_CATEGORIES]: this.state.categoriesId,
			[Constants.KEY_COST_FOR_TWO]: this.state[Constants.KEY_COST_FOR_TWO],

			[Constants.KEY_OPENING_TIME]: this.state[Constants.KEY_OPENING_TIME],

			[Constants.KEY_CLOSING_TIME]: this.state[Constants.KEY_CLOSING_TIME],
			[Constants.KEY_RESTAURENT_TYPE]:
				this.state.selectedRestroType != undefined &&
				this.state.selectedRestroType != "" &&
				this.state.selectedRestroType[Constants.KEY_VALUE] != undefined
					? this.state.selectedRestroType[Constants.KEY_VALUE]
					: "",
		};

		let imageSource = {
			[Constants.KEY_KITCHEN_IMG_NAME]: this.state[
				Constants.KEY_KITCHEN_IMG_NAME
			],
			[Constants.KEY_SHOP_LICENCE_IMG_NAME]: this.state[
				Constants.KEY_SHOP_LICENCE_IMG_NAME
			],
			[Constants.KEY_LICENSE_IMAGE_NAME]: this.state[
				Constants.KEY_LICENSE_IMAGE_NAME
			],
			[Constants.KEY_FSSAI_LICENCE_IMG_NAME]: this.state[
				Constants.KEY_FSSAI_LICENCE_IMG_NAME
			],
			[Constants.KEY_GSTN_OR_PAN_IMG_NAME]: this.state[
				Constants.KEY_GSTN_OR_PAN_IMG_NAME
			],
			[Constants.KEY_BUILDING_FRONT_IMG_NAME]: this.state[
				Constants.KEY_BUILDING_FRONT_IMG_NAME
			],
			[Constants.KEY_DINING_PACKAGING_IMG_NAME]: this.state[
				Constants.KEY_DINING_PACKAGING_IMG_NAME
			],
			[Constants.KEY_LOCALITY_IMAGE_NAME]: this.state[
				Constants.KEY_LOCALITY_IMAGE_NAME
			],
			[Constants.KEY_IMG_NAME]: this.state[Constants.KEY_IMG],
		};

		if (Utility.checkAddRestoVaidation(data, imageSource, this)) {
			this.addRestaurentReq(data);
		}
	};

	addRestaurentReq = (data) => {
		console.log("Data", data);
		if (userData != undefined && userData != null) {
			data[Constants.KEY_USERID] = userData[Constants.KEY_USERID];
		}

		if (
			this.state[Constants.KEY_IMG_UPLOAD] !== null &&
			this.state[Constants.KEY_IMG_UPLOAD] !== undefined
		) {
			data[Constants.KEY_IMG] = this.state[Constants.KEY_IMG_UPLOAD];
		}
		if (
			this.state[Constants.KEY_KITCHEN_IMG] !== null &&
			this.state[Constants.KEY_KITCHEN_IMG] !== undefined
		) {
			data[Constants.KEY_KITCHEN_IMG] = this.state[
				Constants.KEY_KITCHEN_IMG_UPLOAD
			];
		}
		if (
			this.state[Constants.KEY_SHOP_LICENCE_IMG_UPLOAD] !== null &&
			this.state[Constants.KEY_SHOP_LICENCE_IMG_UPLOAD] !== undefined
		) {
			data[Constants.KEY_SHOP_LICENCE_IMG] = this.state[
				Constants.KEY_SHOP_LICENCE_IMG_UPLOAD
			];
		}
		if (
			this.state[Constants.KEY_FSSAI_LICENCE_IMG_UPLOAD] !== null &&
			this.state[Constants.KEY_FSSAI_LICENCE_IMG_UPLOAD] !== undefined
		) {
			data[Constants.KEY_FSSAI_LICENCE_IMG] = this.state[
				Constants.KEY_FSSAI_LICENCE_IMG_UPLOAD
			];
		}
		if (
			this.state[Constants.KEY_GSTN_OR_PAN_IMG_UPLOAD] !== null &&
			this.state[Constants.KEY_GSTN_OR_PAN_IMG_UPLOAD] !== undefined
		) {
			data[Constants.KEY_GSTN_OR_PAN_IMG] = this.state[
				Constants.KEY_GSTN_OR_PAN_IMG_UPLOAD
			];
		}
		if (
			this.state[Constants.KEY_BUILDING_FRONT_IMG_UPLOAD] !== null &&
			this.state[Constants.KEY_BUILDING_FRONT_IMG_UPLOAD] !== undefined
		) {
			data[Constants.KEY_BUILDING_FRONT_IMG] = this.state[
				Constants.KEY_BUILDING_FRONT_IMG_UPLOAD
			];
		}
		if (
			this.state[Constants.KEY_DINING_PACKAGING_IMG_UPLOAD] !== null &&
			this.state[Constants.KEY_DINING_PACKAGING_IMG_UPLOAD] !== undefined
		) {
			data[Constants.KEY_DINING_PACKAGING_IMG] = this.state[
				Constants.KEY_DINING_PACKAGING_IMG_UPLOAD
			];
		}
		if (
			this.state[Constants.KEY_LOCALITY_IMAGE_UPLOAD] !== null &&
			this.state[Constants.KEY_LOCALITY_IMAGE_UPLOAD] !== undefined
		) {
			data[Constants.KEY_LOCALITY_IMAGE] = this.state[
				Constants.KEY_LOCALITY_IMAGE_UPLOAD
			];
		}
		if (
			this.state[Constants.KEY_WEBISTE_LINK] !== null &&
			this.state[Constants.KEY_WEBISTE_LINK] !== undefined &&
			this.state[Constants.KEY_WEBISTE_LINK] !== ""
		) {
			data[Constants.KEY_WEBISTE_LINK] = this.state[Constants.KEY_WEBISTE_LINK];
		}
		if (
			this.state[Constants.KEY_HOUSE_NAME_AND_NO] !== null &&
			this.state[Constants.KEY_HOUSE_NAME_AND_NO] !== undefined &&
			this.state[Constants.KEY_HOUSE_NAME_AND_NO] !== ""
		) {
			data[Constants.KEY_HOUSE_NAME_AND_NO] = this.state[
				Constants.KEY_HOUSE_NAME_AND_NO
			];
		}
		if (
			this.state[Constants.KEY_ADDRESS_2] !== null &&
			this.state[Constants.KEY_ADDRESS_2] !== undefined &&
			this.state[Constants.KEY_ADDRESS_2] !== ""
		) {
			data[Constants.KEY_STREET_NAME] = this.state[Constants.KEY_ADDRESS_2];
		}
		if (
			this.state[Constants.KEY_ADDRESS_3] !== null &&
			this.state[Constants.KEY_ADDRESS_3] !== undefined &&
			this.state[Constants.KEY_ADDRESS_3] !== ""
		) {
			data[Constants.KEY_AREA_NAME] = this.state[Constants.KEY_ADDRESS_3];
		}
		if (
			this.state[Constants.KEY_ADDRESS_4] !== null &&
			this.state[Constants.KEY_ADDRESS_4] !== undefined &&
			this.state[Constants.KEY_ADDRESS_4] !== ""
		) {
			data[Constants.KEY_LANDMARK] = this.state[Constants.KEY_ADDRESS_4];
		}
		if (
			this.state[Constants.KEY_LANDLINE_NUMBER] !== null &&
			this.state[Constants.KEY_LANDLINE_NUMBER] !== undefined
		) {
			data[Constants.KEY_LANDLINE_NUMBER] = this.state[
				Constants.KEY_LANDLINE_NUMBER
			];
		}
		if (
			this.state[Constants.KEY_OPENING_TIME] != null &&
			this.state[Constants.KEY_OPENING_TIME] != undefined &&
			this.state[Constants.KEY_OPENING_TIME] != ""
		) {
			data[Constants.KEY_OPENING_TIME] = this.state[Constants.KEY_OPENING_TIME];
		}
		if (
			this.state[Constants.KEY_CLOSING_TIME] != null &&
			this.state[Constants.KEY_CLOSING_TIME] != undefined &&
			this.state[Constants.KEY_CLOSING_TIME] != ""
		) {
			data[Constants.KEY_CLOSING_TIME] = this.state[Constants.KEY_CLOSING_TIME];
		}

		this.props.reqAddRestrorent(data, this);
	};

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
			[Constants.KEY_REGION_ID]: undefined,
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
		console.log("nestProps", nextProps);

		var respObj = null;
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		} else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (nextProps[Constants.KEY_TYPE] === types.API_ADDRESTRO) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					disabledClickedBtn: false,
				};

				if (userData != undefined && userData != null) {
					toast(nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE]);
				} else {
					toast(
						"Restaurant details have been submitted. Please wait for the admin verification. You will be notified on your email address.",
						toastStyle,
					);
				}
				setTimeout(() => {
					this.setState(respObj);
					this.goBack();
				}, Constants.TIME_OUT_TOAST);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_LIST_CATEGORY) {
				var respObjTmp = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_CATEGORIES]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				console.log("res ", respObjTmp);
				this.setState(respObjTmp);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_COUNTRY_LIST) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_COUNTRY_LIST_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				this.setState(respObj);
				console.log("response opbject", respObj);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_STATE_LIST) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_STATE_LIST_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				this.setState(respObj);
				console.log("response opbject", respObj);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_CITY_LIST) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_CITY_LIST_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				this.setState(respObj);
				console.log("response opbject", respObj);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_LOCALITY_LIST) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_REGION_LIST_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};

				this.setState(respObj);
				console.log("response opbject", respObj);
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
	fuwidthTimerPicker: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
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
	button: {
		margin: theme.spacing.unit * 3,
		borderColor: "red",
		borderWidth: 2,
	},
	paper: {
		height: 140,
		width: 100,
	},
	alignItems: {
		display: "flex",
		flexGrow: "auto",
		justifyContent: "center",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
});
AddRestaurent.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}

export default connect(mapStateToProps, {
	reqRegionList,
	reqAddRestrorent,
	reqGetCategoryList,
	reqCountryList,
	reqStateList,
	reqCityList,
})(withStyles(styles)(AddRestaurent));
