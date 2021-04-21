/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
	getGroceryDetails,
	reqAddGroceryStore,
	reqRegionList,
	reqGetCategoryListGrocery,
	reqCountryList,
	reqStoreType,
	reqStateList,
	reqCityList,
} from "../../../actions";
import BaseComponent from "../../../common/BaseComponent";
import CommonButton from "../../../common/CommonButton";
import CommonTextField from "../../../common/CommonTextField";
import * as StringKeys from "../../../res/StringKeys";
import * as Constants from "../../../utils/Constants";
import * as ResourcesConstants from "../../../res/ResourcesConstants";
import { connect } from "react-redux";
import * as types from "../../../actions/types";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import CommonGridTextField from "../../../common/CommonGridTextField";
import * as Utility from "../../../utils/Utility";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import CustomPBar from "../../../common/CustomPBar";
import * as CustomStorage from "../../../utils/CustomStorage";
import { sizing } from "@material-ui/system";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import CommonSnackbar from "../../../common/CommonSnackbar";
import CommoanAutocomplete from "../../../common/CommoanAutocomplete";
import CommoanMultiSelector from "../../../common/CommoanMultiSelector";
const animatedComponents = makeAnimated();
import * as Dimens from "../../../res/Dimens";
import CommonDocImageViewer from "../../../common/CommonDocImageViewer";
import CommonMultipleImgViewer from "../../../common/CommonMultipleImgViewer";
import CommonImageSelector from "../../../common/CommonImageSelector";
import CommonMultipleSelectorImg from "../../../common/CommonMultipleSelectorImg";
import TimetPicker from "../../../tables/TimetPicker";
import MapDialog from "../../../common/MapDialog";
import LocationIcon from "@material-ui/icons/LocationOn";
import CommonLabel from "../../../common/CommonLabel";
import CommonLabelBtn from "../../../common/CommonLabelBtn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let toastStyle = { background: "#F62C3A", text: "#FFFFFF" };

let TEXTFIELD_XS = 12;
let TEXTFIELD_HALF_XS = 6;
let TEXTFIELD_MARGINTOP = 15;
let LABEL_MARGINTOP = 15;
let GROCERY_ID = 0;
const userData = undefined;
let IS_FOR_ADD = -1; // 1 for add and 2 for edit and -1 mean default
import clsx from "clsx";
import CategoryDialog from "../../../common/CategoryDialog";

class RequestedGroceryDetails extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			[Constants.KEY_IMAGE]: null,
			[Constants.KEY_STORE_NAME]: "",
			[Constants.KEY_EMAIL]: "",
			[Constants.KEY_ADDRESS_1]: "",
			[Constants.KEY_ADDRESS_2]: "",
			[Constants.KEY_CITY]: "",
			[Constants.KEY_STATE]: "",
			[Constants.KEY_ZIP]: "",
			[Constants.KEY_PHONE]: "",
			[Constants.KEY_ADDRESS]: "",
			[Constants.KEY_LAT]: 26.9142,
			[Constants.KEY_LNG]: 75.7902,
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
			//selectedRestroType: '',
			[Constants.KEY_STORE_TYPE]: "",
			storeTypeList: [],
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
			[Constants.KEY_STORE_TYPE]: "",
			[Constants.KEY_COST_FOR_TWO]: "",
			supportDeliveryArray: [
				{ label: Constants.KEY_TRUE },
				{ label: Constants.KEY_FALSE },
			],
			isCatShow: false,
		};
		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
		try {
			GROCERY_ID = this.props.location[Constants.KEY_GROCERY_ID];
		} catch (error) {
			GROCERY_ID = undefined;
		}
	}

	notifySuccess = (msg) => {
		toast(msg, toastStyle);
	};

	componentDidMount() {
		this.getStoreTypeList();
		if (GROCERY_ID != undefined && GROCERY_ID != null && GROCERY_ID != "") {
			this.getGroceryDetailsReq();
			// this.getCountryList();
		} else {
			this.goBack();
		}
	}

	getStoreTypeList = () => {
		this.props.reqStoreType(null, this);
	};

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
			nextProps.match.path == Constants.SCREEN_ADD_GROCERY_STORE
		) {
			let respObj = {
				detailObj: {},
				store_name: "",
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
			nextProps.match.path == Constants.SCREEN_GROCERY_DETAIL
		) {
			this.getGroceryDetailsReq();
			return false;
		} else if (GROCERY_ID != undefined && GROCERY_ID != null) {
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
	// handleChangeRestroType = (selectedOption, isDeleted) => {
	//     console.log('handleChangeRestroType :-', selectedOption)
	//     this.setState({
	//         selectedRestroType: selectedOption,
	//     })
	// };

	handleChangeStoreType = (selectedOption) => {
		console.log("handleChangeStoreType :-", selectedOption);
		this.setState({
			selectedStoreType: selectedOption,
		});
	};

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

	// diningImagePress = e => {

	//     e.preventDefault();
	//     let files = e.target.files;
	//     let imagesNameArray = [];
	//     let imagesPathArray = [];
	//     let imagesUploadArray = [];
	//     for (var i = 0; i < files.length; i++) {
	//         var file = files[i];
	//         var reader = new FileReader();
	//         reader.onload = (function (theFile, pos) {
	//             return function (e) {
	//                 imagesNameArray.push(theFile.name);
	//                 imagesPathArray.push(e.target.result);
	//                 imagesUploadArray.push(theFile);
	//                 if (files.length === imagesUploadArray.length) {
	//                     console.log('File name in =' + theFile.name + ' pos' + pos + '')
	//                     this.setState({
	//                         [Constants.KEY_DINING_PACKAGING_IMG]: imagesPathArray,
	//                         [Constants.KEY_DINING_PACKAGING_IMG_NAME]: imagesNameArray,
	//                         [Constants.KEY_DINING_PACKAGING_IMG_UPLOAD]: imagesUploadArray
	//                     });
	//                 }
	//             };
	//         })(file, i).bind(this);
	//         reader.readAsDataURL(file);
	//     }

	// }

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

	// FssaiImagePress = e => {
	//     e.preventDefault();
	//     let reader = new FileReader();
	//     let file = e.target.files[0];
	//     this.setState({ [Constants.KEY_FSSAI_LICENCE_IMG_UPLOAD]: file });
	//     reader.onloadend = () => {
	//         this.setState({
	//             [Constants.KEY_FSSAI_LICENCE_IMG]: reader.result,
	//             [Constants.KEY_FSSAI_LICENCE_IMG_NAME]: file.name
	//         });
	//     };
	//     reader.readAsDataURL(file);
	// }

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

	// kitchanImagePress = e => {
	//     e.preventDefault();
	//     let files = e.target.files;
	//     let imagesNameArray = [];
	//     let imagesPathArray = [];
	//     let imagesUploadArray = [];
	//     for (var i = 0; i < files.length; i++) {
	//         var file = files[i];
	//         var reader = new FileReader();
	//         reader.onload = (function (theFile, pos) {
	//             return function (e) {
	//                 imagesNameArray.push(theFile.name);
	//                 imagesPathArray.push(e.target.result);
	//                 //imagesPathArray.push(reader.result);
	//                 imagesUploadArray.push(theFile);
	//                 if (files.length === imagesUploadArray.length) {
	//                     console.log('File name in =' + theFile.name + ' pos' + pos + '')
	//                     this.setState({
	//                         [Constants.KEY_KITCHEN_IMG]: imagesPathArray,
	//                         [Constants.KEY_KITCHEN_IMG_NAME]: imagesNameArray,
	//                         [Constants.KEY_KITCHEN_IMG_UPLOAD]: imagesUploadArray
	//                     });
	//                 }
	//             };
	//         })(file, i).bind(this);
	//         reader.readAsDataURL(file);
	//     }

	// }
	handleChangeSupport = (selectedOption, isDeleted) => {
		this.setState({
			selectedSupportDelivery: selectedOption,
		});
	};

	navigateAddPage = () => {
		this.props.history.push({
			pathname: Constants.SCREEN_REQUESTED_GROCERY_DETAILS,
		});
	};

	render() {
		const { classes } = this.props;
		const {
			image,
			store_name,
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

		{
			console.log(
				"this.state.categoriesSelectedPre : ",
				this.state.categoriesSelectedPre,
			);
		}

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
									required="required"
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
								{this.strings(StringKeys.Grocery_Store_Information)}
							</Typography>
						</Grid>

						{/* Grocery Store start */}

						<div class="justify-content-start">
							<div class="row">
								<div class="col-sm ">
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="storeName"
										label={this.strings(StringKeys.Store_Name)}
										fullWidth
										className={classes.textField}
										value={store_name}
										onChange={this.handleChange(Constants.KEY_STORE_NAME)}
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
											", " +
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
													Opening Time :{" "}
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
													Closing Time :{" "}
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
						{/* Grocery Store Information end */}

						{/* Store Information start */}
						<Grid
							item
							xs={TEXTFIELD_XS}
							alignItems="center"
							style={{ marginTop: TEXTFIELD_MARGINTOP }}>
							<Typography
								component="h6"
								variant="h6"
								style={{ marginTop: TEXTFIELD_MARGINTOP }}>
								{this.strings(StringKeys.StoreInfo)}
							</Typography>
						</Grid>

						<div class="justify-content-start">
							<div class="row">
								<div class="col-sm ">
									<Grid
										item
										xs={TEXTFIELD_XS}
										alignItems="center"
										style={{ marginTop: TEXTFIELD_MARGINTOP }}>
										<CommoanAutocomplete
											value={this.state.selectedStoreType}
											options={this.state.storeTypeList}
											components={animatedComponents}
											onChange={this.handleChangeStoreType}
											placeholder={this.strings(StringKeys.Select_Store_Type)}
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
											value={
												this.state.categoriesSelectedPre != undefined &&
												"...update by view"
											}
											variant="outlined"
											forCheckBoxItem={true}
											onChange={this.catDialogOpen}
											clearPress={() => {
												this.setState({ isCatShow: true });
											}}
										/>
									</Grid>
								</div>
							</div>
						</div>
						{/* Store Information end */}

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
										value={this.state[Constants.KEY_BUILDING_FRONT_IMG_NAME]}
										variant="outlined"
										onChange={this.buildingImagePress}
										clearPress={() => {
											this.viewImage(
												this.state[Constants.KEY_BUILDING_FRONT_IMG] !=
													undefined
													? this.state[Constants.KEY_BUILDING_FRONT_IMG]
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
										value={this.state[Constants.KEY_LOCALITY_IMAGE_NAME]}
										variant="outlined"
										onChange={this.localityImagePress}
										clearPress={() => {
											this.viewImage(
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

					{/* {(this.state[Constants.KEY_KITCHEN_IMG] != undefined &&
                        this.state[Constants.KEY_KITCHEN_IMG].length > 0) &&
                        <CommonMultipleImgViewer
                            showYesNo={this.state.isMultiVisible}
                            secondBtnClick={this.closeMultiDilaog}
                            title={this.strings(StringKeys.View_Image)}
                            secondBtnName={this.strings(StringKeys.Dismiss)}
                            secondBtnName={this.strings(StringKeys.Cancel)}
                            image={(this.state.viewAbleMultiImage)}
                            firstBtnClick={this.closeMultiDilaog}
                        />
                    } */}

					{/* <ToastContainer autoClose={Constants.TIME_OUT_TOAST} /> */}
					<CategoryDialog
						valueId={this.state.categoriesId}
						showYesNo={this.state.isCatShow}
						secondBtnClick={this.catDialogClose}
						title={this.strings(StringKeys.Select_Categories)}
						content=""
						//  valueId={this.state.categoriesSelectedPre}
						firstBtnName={this.strings(StringKeys.Okay)}
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

	handleSelectedCat = (selectedOption, isDeleted) => {
		console.log("selected ids=", selectedOption);
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
		console.log("selected ids=", this.state.categoriesId);
	};

	checkVaidation = (event) => {
		event.preventDefault();

		console.log("vghasdhvswdv", event);

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
			[Constants.KEY_STORE_NAME]: this.state[Constants.KEY_STORE_NAME],
			[Constants.KEY_EMAIL]: this.state[Constants.KEY_EMAIL],
			[Constants.KEY_PHONE]: this.state[Constants.KEY_PHONE],
			[Constants.KEY_ADDRESS]: addressFinal,
			[Constants.KEY_CITY_ID]:
				this.state.selectedCity != ""
					? this.state.selectedCity[Constants.KEY_UNDERSCORE_ID]
					: undefined,
			[Constants.KEY_STATE_ID]:
				this.state.selectedState != ""
					? this.state.selectedState[Constants.KEY_UNDERSCORE_ID]
					: undefined,
			[Constants.KEY_ZIP]: this.state[Constants.KEY_ZIP],
			[Constants.KEY_COUNTRY_ID]:
				this.state.selectedCountry != undefined
					? this.state.selectedCountry[Constants.KEY_UNDERSCORE_ID]
					: undefined,
			[Constants.KEY_REGION_ID]:
				this.state.selectedRegion != undefined
					? this.state.selectedRegion[Constants.KEY_UNDERSCORE_ID]
					: undefined,
			[Constants.KEY_HOUSE_NAME_AND_NO]: this.state[
				Constants.KEY_HOUSE_NAME_AND_NO
			],
			[Constants.KEY_LAT]: this.state[Constants.KEY_LAT],
			[Constants.KEY_LNG]: this.state[Constants.KEY_LNG],
			[Constants.KEY_CATEGORIES]: this.state.categoriesId,
			[Constants.KEY_OPENING_TIME]: this.state[Constants.KEY_OPENING_TIME],
			[Constants.KEY_CLOSING_TIME]: this.state[Constants.KEY_CLOSING_TIME],
			[Constants.KEY_SUPPORT_DELIVERY]: this.state.selectedSupportDelivery
				.label,
			[Constants.KEY_STORE_TYPE_ID]:
				this.state.selectedStoreType != undefined &&
				this.state.selectedStoreType != "" &&
				this.state.selectedStoreType[Constants.KEY_VALUE] != undefined
					? this.state.selectedStoreType[Constants.KEY_VALUE]
					: "",
		};

		// if (Utility.checkGroeceryVaidation(data, this)) {
		this.addGroceryReq(data);
		// }
	};
	addGroceryReq = (data) => {
		if (!this.isForAdd()) {
			data[Constants.KEY_UNDERSCORE_ID] = GROCERY_ID;
		}

		if (
			(this.state[Constants.KEY_PASSWORD] !== undefined &&
				this.state[Constants.KEY_PASSWORD] !== null &&
				this.state[Constants.KEY_PASSWORD] !== "") ||
			(this.state[Constants.KEY_CONFIRM_PASSWORD] !== undefined &&
				this.state[Constants.KEY_CONFIRM_PASSWORD] !== null &&
				this.state[Constants.KEY_CONFIRM_PASSWORD] !== "")
		) {
			if (
				this.state[Constants.KEY_PASSWORD] !=
				this.state[Constants.KEY_CONFIRM_PASSWORD]
			) {
				this.handleClick("Password and Confim password should be match");
				return;
			} else {
				data[Constants.KEY_PASSWORD] = this.state[Constants.KEY_PASSWORD];
			}
		}

		if (
			this.state[Constants.KEY_IMAGE_UPLOAD] !== null &&
			this.state[Constants.KEY_IMAGE_UPLOAD] !== undefined
		) {
			data[Constants.KEY_IMAGE] = this.state[Constants.KEY_IMAGE_UPLOAD];
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

		if (
			this.state[Constants.KEY_IMAGE_UPLOAD] !== null &&
			this.state[Constants.KEY_IMAGE_UPLOAD] !== undefined
		) {
			data[Constants.KEY_IMAGE] = this.state[Constants.KEY_IMAGE_UPLOAD];
		}

		if (
			this.state[Constants.KEY_SHOP_LICENCE_IMG_UPLOAD] !== undefined &&
			this.state[Constants.KEY_SHOP_LICENCE_IMG_UPLOAD] !== null &&
			this.state[Constants.KEY_SHOP_LICENCE_IMG_UPLOAD] !== ""
		) {
			data[Constants.KEY_SHOP_LICENCE_IMG] = this.state[
				Constants.KEY_SHOP_LICENCE_IMG_UPLOAD
			];
		}

		if (
			this.state[Constants.KEY_GSTN_OR_PAN_IMG_UPLOAD] !== undefined &&
			this.state[Constants.KEY_GSTN_OR_PAN_IMG_UPLOAD] !== null &&
			this.state[Constants.KEY_GSTN_OR_PAN_IMG_UPLOAD] !== ""
		) {
			data[Constants.KEY_GSTN_OR_PAN_IMG] = this.state[
				Constants.KEY_GSTN_OR_PAN_IMG_UPLOAD
			];
		}
		if (
			this.state[Constants.KEY_BUILDING_FRONT_IMG_UPLOAD] !== undefined &&
			this.state[Constants.KEY_BUILDING_FRONT_IMG_UPLOAD] !== null &&
			this.state[Constants.KEY_BUILDING_FRONT_IMG_UPLOAD] !== ""
		) {
			data[Constants.KEY_BUILDING_FRONT_IMG] = this.state[
				Constants.KEY_BUILDING_FRONT_IMG_UPLOAD
			];
		}

		if (
			this.state[Constants.KEY_LOCALITY_IMAGE_UPLOAD] !== undefined &&
			this.state[Constants.KEY_LOCALITY_IMAGE_UPLOAD] !== null &&
			this.state[Constants.KEY_LOCALITY_IMAGE_UPLOAD] !== ""
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
			this.state[Constants.KEY_LANDLINE_NUMBER] != null &&
			this.state[Constants.KEY_LANDLINE_NUMBER] != undefined &&
			this.state[Constants.KEY_LANDLINE_NUMBER] != ""
		) {
			data[Constants.KEY_LANDLINE_NUMBER] = this.state[
				Constants.KEY_LANDLINE_NUMBER
			];
		}

		console.log("req=", JSON.stringify(data));
		// if (Utility.checkRestaurantDetails(data, this)) {
		this.props.reqAddGroceryStore(data, this);
		// }
	};

	getGroceryDetailsReq = () => {
		var data = {
			[Constants.KEY_UNDERSCORE_ID]: GROCERY_ID,
		};
		this.props.getGroceryDetails(data, this);
	};

	getGroceryCatoryList = () => {
		let data = {
			[Constants.KEY_USERID]: userData[Constants.KEY_USERID],
		};
		this.props.reqGetCategoryListGrocery(data, this);
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
				nextProps[Constants.KEY_TYPE] === types.API_GROCERY_DETAILS &&
				nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA] != undefined
			) {
				let data = nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA];
				let obj =
					nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
						Constants.KEY_GROCERY_DETAILS
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

				// let restroType = obj[Constants.KEY_RESTAURENT_TYPE] == Constants.RESTRO_TYPE_VEG ?
				//     this.state.storeTypeList[0] : obj[Constants.KEY_RESTAURENT_TYPE] == Constants.RESTRO_TYPE_NON_VEG
				//         ? this.state.storeTypeList[1] : this.state.storeTypeList[2]

				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					disabledClickedBtn: false,
					detailObj: obj,
					store_name: obj.store_name,
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
					// selectedRestroType: restroType,
					[Constants.KEY_LANDLINE_NUMBER]: obj[Constants.KEY_LANDLINE_NUMBER],
					[Constants.KEY_GSTN_OR_PAN_IMG_NAME]:
						obj[Constants.KEY_GSTN_OR_PAN_IMG],
					[Constants.KEY_SHOP_LICENCE_IMG_NAME]:
						obj[Constants.KEY_SHOP_LICENCE_IMG],
					[Constants.KEY_BUILDING_FRONT_IMG_NAME]:
						obj[Constants.KEY_BUILDING_FRONT_IMG],
					[Constants.KEY_LOCALITY_IMAGE_NAME]:
						obj[Constants.KEY_LOCALITY_IMAGE],
					[Constants.KEY_HOUSE_NAME_AND_NO]:
						obj[Constants.KEY_HOUSE_NAME_AND_NO],
					[Constants.KEY_ADDRESS_2]: obj[Constants.KEY_STREET_NAME],
					[Constants.KEY_ADDRESS_3]: obj[Constants.KEY_AREA_NAME],
					[Constants.KEY_ADDRESS_4]: obj[Constants.KEY_LANDMARK],
					[Constants.KEY_GSTN_OR_PAN_IMG]: obj[Constants.KEY_GSTN_OR_PAN_IMG],
					[Constants.KEY_SHOP_LICENCE_IMG]: obj[Constants.KEY_SHOP_LICENCE_IMG],
					// [Constants.KEY_FSSAI_LICENCE_IMG]: obj[Constants.KEY_FSSAI_LICENCE_IMG],
					[Constants.KEY_BUILDING_FRONT_IMG]:
						obj[Constants.KEY_BUILDING_FRONT_IMG],
					// [Constants.KEY_KITCHEN_IMG]: obj[Constants.KEY_KITCHEN_IMG],
					// [Constants.KEY_DINING_PACKAGING_IMG]: obj[Constants.KEY_DINING_PACKAGING_IMG],
					[Constants.KEY_LOCALITY_IMAGE]: obj[Constants.KEY_LOCALITY_IMAGE],
					[Constants.KEY_OPENING_TIME]: obj[Constants.KEY_OPENING_TIME],
					[Constants.KEY_CLOSING_TIME]: obj[Constants.KEY_CLOSING_TIME],
					[Constants.KEY_LAT]: obj[Constants.KEY_LAT],
					[Constants.KEY_LNG]: obj[Constants.KEY_LNG],
				};

				this.setState(respObj);
				this.getCountryList();
				this.getGroceryCatoryList();
			} else if (nextProps[Constants.KEY_TYPE] === types.API_STORE_TYPE) {
				let data = nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA] || [];
				let allStoreType = data;
				for (const element in allStoreType) {
					if (element._id === data[Constants.KEY_STORE_TYPE_ID]) {
						this.setState({ selectedStoreType: element });
					}
				}
				this.setState({ storeTypeList: allStoreType });

				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.STORE_TYPE_LIST_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				this.setState(respObj);
			} else if (
				nextProps[Constants.KEY_TYPE] === types.API_LIST_GROCERY_CATEGORY
			) {
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
				this.setState(respObjTmp);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_ADDGROCERY) {
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
RequestedGroceryDetails.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}

export default connect(mapStateToProps, {
	getGroceryDetails,
	reqAddGroceryStore,
	reqRegionList,
	reqGetCategoryListGrocery,
	reqStoreType,
	reqCountryList,
	reqStateList,
	reqCityList,
})(withStyles(styles)(RequestedGroceryDetails));
