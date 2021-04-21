/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
	reqRegionList,
	reqAddOffice,
	reqGetCategoryList,
	reqCountryList,
	reqOfficeDetail,
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
import RestaurantIcon from "@material-ui/icons/Restaurant";
import CustomPBar from "../../common/CustomPBar";
import * as CustomStorage from "../../utils/CustomStorage";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { sizing } from "@material-ui/system";
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
import { toast } from "react-toastify";
const animatedComponents = makeAnimated();

const userData = undefined;

let TEXTFIELD_XS = 12;
let TEXTFIELD_MARGINTOP = 15;

class AddOffice extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			[Constants.KEY_IMAGE]: null,
			[Constants.KEY_NAME]: "",
			[Constants.KEY_EMAIL]: "",
			[Constants.KEY_ADDRESS_1]: "",
			[Constants.KEY_ADDRESS_2]: "",
			[Constants.KEY_ADDRESS_3]: "",
			[Constants.KEY_ADDRESS_4]: "",
			[Constants.KEY_CITY]: "",
			[Constants.KEY_STATE]: "",
			[Constants.KEY_ZIP]: "",
			[Constants.KEY_PHONE]: "",
			[Constants.KEY_ADDRESS]: "",
			[Constants.KEY_PASSWORD]: "",
			[Constants.KEY_CONFIRM_PASSWORD]: "",

			errorText: "Empty field",
			iserror: false,
			[Constants.KEY_SHOW_PROGRESS]: false,
			[Constants.KEY_IMAGE_UPLOAD]: null,

			[Constants.KEY_COUNTRY_ID]: "",
			[Constants.KEY_STATE_ID]: "",
			[Constants.KEY_CITY_ID]: "",
			[Constants.KEY_REGION_ID]: "",
			selectedCountry: "",
			selectedState: "",
			selectedCity: "",
			selectedRegion: "",

			[Constants.KEY_ADDRESS_2]: "",
			[Constants.KEY_ADDRESS_3]: "",
			[Constants.KEY_ADDRESS_4]: "",
			[Constants.KEY_HOUSE_ADDRESS]: "",

			[Constants.KEY_LANDLINE_NUMBER]: "",

			[Constants.KEY_BUILDING_FRONT_IMG]: "",
			[Constants.KEY_BUILDING_FRONT_IMG_NAME]: "",
			[Constants.KEY_BUILDING_FRONT_IMG_UPLOAD]: "",

			[Constants.KEY_LOCALITY_IMAGE]: "",
			[Constants.KEY_LOCALITY_IMAGE_NAME]: "",
			[Constants.KEY_LOCALITY_IMAGE_UPLOAD]: "",
			viewAbleImage: "",
			viewAbleMultiImage: [],
			isVisible: false,
			isMultiVisible: false,
			[Constants.KEY_UNDERSCORE_ID]: this.props.location[
				Constants.KEY_UNDERSCORE_ID
			],
		};

		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
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

	componentDidMount() {
		if (this.state[Constants.KEY_UNDERSCORE_ID] !== undefined) {
			this.getOfficeDetail();
		} else {
			this.getCountryList();
		}
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
		if (this.state[Constants.KEY_SHOW_PROGRESS] == true) {
			return (
				<div className={classes.mainView}>
					<CustomPBar showProgress={this.state[Constants.KEY_SHOW_PROGRESS]} />
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

						<Grid>
							<Grid item xs={12}>
								<div>
									<div
										className={classes.bigAvatar}
										onClick={(e) => this.fileInput.click()}>
										<Avatar
											style={{ borderRadius: 0 }}
											alt=""
											src={
												image !== null
													? image
													: ResourcesConstants.restro_default
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

							<div class="justify-content-start">
								<div class="row">
									<div class="col-sm ">
										<CommonGridTextField
											required
											xs={TEXTFIELD_XS}
											style={{ marginTop: TEXTFIELD_MARGINTOP }}
											id="officeName"
											label={this.strings(StringKeys.Office_Name)}
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
											type="number"
											onChange={this.handleChange(Constants.KEY_PHONE)}
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
											id="landline"
											fullWidth
											label={this.strings(StringKeys.Landline_Number)}
											className={classes.textField}
											value={this.state[Constants.KEY_LANDLINE_NUMBER]}
											onChange={this.handleChange(
												Constants.KEY_LANDLINE_NUMBER,
											)}
											variant="outlined"
										/>
									</div>

									<div class="col-sm ">
										<Grid
											item
											xs={TEXTFIELD_XS}
											alignItems="center"
											style={{ marginTop: 15 }}>
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
											style={{ marginTop: 15 }}>
											<CommoanAutocomplete
												value={this.state.selectedState}
												options={this.state[Constants.KEY_STATE_LIST_DATA]}
												components={animatedComponents}
												onChange={this.handleChangeState}
												placeholder={this.strings(StringKeys.Select_State)}
											/>
										</Grid>
									</div>
								</div>
							</div>

							<div class="justify-content-start">
								<div class="row">
									<div class="col-sm">
										<Grid
											item
											xs={TEXTFIELD_XS}
											alignItems="center"
											style={{ marginTop: 15 }}>
											<CommoanAutocomplete
												value={this.state.selectedCity}
												options={this.state[Constants.KEY_CITY_LIST_DATA]}
												components={animatedComponents}
												onChange={this.handleChangeCity}
												placeholder={this.strings(StringKeys.Select_City)}
											/>
										</Grid>
									</div>
									<div class="col-sm">
										<Grid
											item
											xs={TEXTFIELD_XS}
											alignItems="center"
											style={{ marginTop: 15 }}>
											<CommoanAutocomplete
												value={this.state.selectedRegion}
												options={this.state[Constants.KEY_REGION_LIST_DATA]}
												components={animatedComponents}
												onChange={this.handleChangeRegion}
												placeholder={this.strings(StringKeys.Select_Region)}
											/>
										</Grid>
									</div>
									<div class="col-sm">
										<CommonGridTextField
											required
											xs={TEXTFIELD_XS}
											style={{ marginTop: TEXTFIELD_MARGINTOP }}
											id="address1"
											fullWidth
											autoComplete="address-line1"
											label={this.strings(StringKeys.Address_Line_1)}
											className={classes.textField}
											value={this.state[Constants.KEY_HOUSE_ADDRESS]}
											onChange={this.handleChange(Constants.KEY_HOUSE_ADDRESS)}
											variant="outlined"
										/>
									</div>
								</div>
							</div>

							<div class="justify-content-start">
								<div class="row">
									<div class="col-sm">
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
									<div class="col-sm">
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

									<div class="col-sm">
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
								</div>
							</div>

							<div class="justify-content-start">
								<div class="row">
									{/* <div class="col-sm">

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
                                        />
                                    </div> */}

									<div class="col-sm">
										<CommonGridTextField
											required
											xs={TEXTFIELD_XS}
											style={{ marginTop: TEXTFIELD_MARGINTOP }}
											id="zip"
											fullWidth
											label={this.strings(StringKeys.Zip)}
											className={classes.textField}
											value={zip}
											type="number"
											onChange={this.handleChange(Constants.KEY_ZIP)}
											variant="outlined"
										/>
									</div>

									<div class="col-sm">
										<CommonGridTextField
											required
											xs={TEXTFIELD_XS}
											style={{ marginTop: TEXTFIELD_MARGINTOP }}
											id="password"
											type="password"
											fullWidth
											label={this.strings(StringKeys.Password)}
											className={classes.textField}
											value={password}
											onChange={this.handleChange(Constants.KEY_PASSWORD)}
											variant="outlined"
										/>
									</div>

									<div class="col-sm">
										<CommonGridTextField
											required
											xs={TEXTFIELD_XS}
											style={{ marginTop: TEXTFIELD_MARGINTOP }}
											id="confirm_password"
											type="password"
											fullWidth
											label={this.strings(StringKeys.Confirm_Password)}
											className={classes.textField}
											value={confirm_password}
											onChange={this.handleChange(
												Constants.KEY_CONFIRM_PASSWORD,
											)}
											variant="outlined"
										/>
									</div>
								</div>
							</div>

							<Typography component="h6" variant="h6" style={{ marginTop: 15 }}>
								{this.strings(StringKeys.Upload_Document)}
							</Typography>

							<div class="justify-content-start">
								<div class="row">
									<div class="col-sm ">
										<CommonMultipleSelectorImg
											required={true}
											disabled={false}
											xs={12}
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
									<div class="col-sm ">
										<CommonMultipleSelectorImg
											required={true}
											disabled={false}
											xs={12}
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
														undefined &&
														this.state[Constants.KEY_BUILDING_FRONT_IMG] != ""
														? this.state[Constants.KEY_BUILDING_FRONT_IMG]
														: "",
												);
											}}
										/>
									</div>
								</div>
							</div>
						</Grid>
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
								// onClick={() => alert(JSON.stringify(userData))}
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

					<CommonMultipleImgViewer
						showYesNo={this.state.isMultiVisible}
						secondBtnClick={this.closeMultiDilaog}
						title="View Image"
						firstBtnName="Dismiss"
						secondBtnName="Cancel"
						image={this.state.viewAbleMultiImage}
						firstBtnClick={this.closeMultiDilaog}
					/>
				</Fragment>
			);
	}

	closeDilaog = () => {
		this.setState({ isVisible: !this.state.isVisible });
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
		// /    alert('image', JSON.stringify(image))
	};

	// getCatoryList = () => {
	//     let data = {
	//         [Constants.KEY_USERID]: userData != undefined ? userData[Constants.KEY_USERID] : undefined
	//     }
	//     this.props.reqGetCategoryList(data, this)
	// }

	checkVaidation = (event) => {
		// alert("1");
		event.preventDefault();

		var data = {
			[Constants.KEY_NAME]: this.state[Constants.KEY_NAME],
			[Constants.KEY_EMAIL]: this.state[Constants.KEY_EMAIL],
			[Constants.KEY_PHONE]: this.state[Constants.KEY_PHONE],
			[Constants.KEY_HOUSE_ADDRESS]: this.state[Constants.KEY_HOUSE_ADDRESS],
			[Constants.KEY_CITY_ID]: this.state[Constants.KEY_CITY_ID],
			[Constants.KEY_STATE_ID]: this.state[Constants.KEY_STATE_ID],
			[Constants.KEY_ZIP]: this.state[Constants.KEY_ZIP],
			[Constants.KEY_COUNTRY_ID]: this.state[Constants.KEY_COUNTRY_ID],
			[Constants.KEY_REGION_ID]: this.state[Constants.KEY_REGION_ID],
			[Constants.KEY_LAT]: this.state[Constants.KEY_LAT],
			[Constants.KEY_LNG]: this.state[Constants.KEY_LNG],

			// [Constants.KEY_ADDRESS]:
			// 	this.state[Constants.KEY_HOUSE_ADDRESS] +
			// 	", " +
			// 	this.state.selectedRegion[Constants.KEY_NAME] +
			// 	", " +
			// 	this.state.selectedCity[Constants.KEY_NAME] +
			// 	", " +
			// 	this.state.selectedState[Constants.KEY_NAME] +
			// 	", " +
			// 	this.state.selectedCountry[Constants.KEY_NAME],
		};
		let imageSource = {
			[Constants.KEY_BUILDING_FRONT_IMG_NAME]: this.state[
				Constants.KEY_BUILDING_FRONT_IMG_NAME
			],
			[Constants.KEY_LOCALITY_IMAGE_NAME]: this.state[
				Constants.KEY_LOCALITY_IMAGE_NAME
			],
		};

		if (
			this.state.detailObj != undefined &&
			this.state.detailObj[Constants.KEY_UNDERSCORE_ID] != undefined
		) {
			if (Utility.checkEditOfficeVaidation(data, imageSource, this)) {
				// alert(JSON.stringify(data));
				this.addOfficeReq(data);
			}
		} else {
			data[Constants.KEY_PASSWORD] = this.state[Constants.KEY_PASSWORD];
			data[Constants.KEY_CONFIRM_PASSWORD] = this.state[
				Constants.KEY_CONFIRM_PASSWORD
			];

			if (Utility.checkAddOfficeVaidation(data, imageSource, this)) {
				// alert(JSON.stringify(data));
				this.addOfficeReq(data);
			}
		}
	};

	addOfficeReq = (data) => {
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

		if (userData != undefined && userData != null) {
			data[Constants.KEY_USERID] = userData[Constants.KEY_USERID];
		}

		if (
			this.state[Constants.KEY_IMAGE_UPLOAD] !== null &&
			this.state[Constants.KEY_IMAGE_UPLOAD] !== undefined
		) {
			data[Constants.KEY_IMAGE] = this.state[Constants.KEY_IMAGE_UPLOAD];
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
			this.state[Constants.KEY_LOCALITY_IMAGE_UPLOAD] !== null &&
			this.state[Constants.KEY_LOCALITY_IMAGE_UPLOAD] !== undefined &&
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
			this.state[Constants.KEY_HOUSE_ADDRESS] !== null &&
			this.state[Constants.KEY_HOUSE_ADDRESS] !== undefined &&
			this.state[Constants.KEY_HOUSE_ADDRESS] !== ""
		) {
			data[Constants.KEY_HOUSE_ADDRESS] = this.state[
				Constants.KEY_HOUSE_ADDRESS
			];
		}
		if (
			this.state[Constants.KEY_ADDRESS_2] !== null &&
			this.state[Constants.KEY_ADDRESS_2] !== undefined &&
			this.state[Constants.KEY_ADDRESS_2] !== ""
		) {
			data[Constants.KEY_STREET_NAME] = this.state[Constants.KEY_ADDRESS_2];
		}
		// else {
		// 	data[Constants.KEY_STREET_NAME] = "";
		// }
		if (
			this.state[Constants.KEY_ADDRESS_3] !== null &&
			this.state[Constants.KEY_ADDRESS_3] !== undefined &&
			this.state[Constants.KEY_ADDRESS_3] !== ""
		) {
			data[Constants.KEY_AREA_NAME] = this.state[Constants.KEY_ADDRESS_3];
		}
		// else {
		// 	data[Constants.KEY_AREA_NAME] = "";
		// }
		if (
			this.state[Constants.KEY_ADDRESS_4] !== null &&
			this.state[Constants.KEY_ADDRESS_4] !== undefined &&
			this.state[Constants.KEY_ADDRESS_4] !== ""
		) {
			data[Constants.KEY_LANDMARK] = this.state[Constants.KEY_ADDRESS_4];
		}
		// else {
		// 	data[Constants.KEY_LANDMARK] = "";
		// }
		if (
			this.state[Constants.KEY_LANDLINE_NUMBER] !== null &&
			this.state[Constants.KEY_LANDLINE_NUMBER] !== undefined
		) {
			data[Constants.KEY_LANDLINE_NUMBER] = this.state[
				Constants.KEY_LANDLINE_NUMBER
			];
		}
		if (
			this.state.detailObj != undefined &&
			this.state.detailObj[Constants.KEY_UNDERSCORE_ID] !== undefined
		) {
			data[Constants.KEY_UNDERSCORE_ID] = this.state.detailObj[
				Constants.KEY_UNDERSCORE_ID
			];
		}
		console.log("data<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>", data);
		this.props.reqAddOffice(data, this);
	};

	getOfficeDetail = () => {
		let data = {
			[Constants.KEY_UNDERSCORE_ID]: this.state[Constants.KEY_UNDERSCORE_ID],
		};
		this.props.reqOfficeDetail(data, this);
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
		var respObj = null;
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		} else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (nextProps[Constants.KEY_TYPE] === types.API_ADD_OFFICE) {
				toast(nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE]);
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					disabledClickedBtn: false,
				};
				this.setState(respObj);
				this.goBack();
			}

			if (
				nextProps[Constants.KEY_TYPE] === types.API_OFFICE_DETAIL &&
				nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA] != undefined
			) {
				let data = nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA];
				let obj =
					nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
						Constants.KEY_OFFICE_DETAIL
					];
				let oldcat = obj.categories;
				console.log("Filtered  =", JSON.stringify(obj));
				let ids = [];

				let allState = data.state;
				let selcetedPreState;

				try {
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
				} catch (error) {
					console.log("error= ", error);
				}

				let allCity = data.city;
				let selcetedPreCity;

				try {
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
				} catch (error) {
					console.log("error= ", error);
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
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_STATE_ID]:
						selcetedPreState != undefined &&
						selcetedPreState[Constants.KEY_UNDERSCORE_ID],
					[Constants.KEY_CITY_ID]:
						selcetedPreCity != undefined &&
						selcetedPreCity[Constants.KEY_UNDERSCORE_ID],

					[Constants.KEY_REGION_ID]:
						selcetedPreRegion != undefined &&
						selcetedPreRegion[Constants.KEY_UNDERSCORE_ID],
					[Constants.KEY_COUNTRY_ID]:
						obj[Constants.KEY_COUNTRY][Constants.KEY_UNDERSCORE_ID],
					selectedCountry: obj[Constants.KEY_COUNTRY][Constants.KEY_NAME],
					selectedState: obj[Constants.KEY_STATE][Constants.KEY_NAME],
					selectedCity: obj[Constants.KEY_CITY][Constants.KEY_NAME],
					selectedRegion: obj[Constants.KEY_REGION][Constants.KEY_NAME],

					disabledClickedBtn: false,
					detailObj: obj,
					[Constants.KEY_NAME]: obj.name,
					[Constants.KEY_EMAIL]: obj.email,
					[Constants.KEY_PHONE]: obj.phone,
					[Constants.KEY_CITY]: obj.city,
					pincode: obj.pincode,
					[Constants.KEY_STATE]: obj.state,
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
					[Constants.KEY_LANDLINE_NUMBER]: obj[Constants.KEY_LANDLINE_NUMBER],
					[Constants.KEY_BUILDING_FRONT_IMG_NAME]:
						obj[Constants.KEY_BUILDING_FRONT_IMG],
					[Constants.KEY_LOCALITY_IMAGE_NAME]:
						obj[Constants.KEY_LOCALITY_IMAGE],
					[Constants.KEY_HOUSE_ADDRESS]: obj[Constants.KEY_HOUSE_ADDRESS],
					[Constants.KEY_ADDRESS_2]: obj[Constants.KEY_STREET_NAME],
					[Constants.KEY_ADDRESS_3]: obj[Constants.KEY_AREA_NAME],
					[Constants.KEY_ADDRESS_4]: obj[Constants.KEY_LANDMARK],
					// [Constants.KEY_STREET_NAME]: obj[Constants.KEY_STREET_NAME],
					// [Constants.KEY_AREA_NAME]: obj[Constants.KEY_AREA_NAME],
					// [Constants.KEY_LANDMARK]: obj[Constants.KEY_LANDMARK],
					[Constants.KEY_BUILDING_FRONT_IMG]:
						obj[Constants.KEY_BUILDING_FRONT_IMG],
					[Constants.KEY_LOCALITY_IMAGE]: obj[Constants.KEY_LOCALITY_IMAGE],
				};

				this.setState(respObj);
				this.getCountryList();
			} else if (nextProps[Constants.KEY_TYPE] === types.API_COUNTRY_LIST) {
				let allList = nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA];
				let selectedCountryOld = "";
				for (const key in allList) {
					if (allList.hasOwnProperty(key)) {
						const element = allList[key];
						if (
							this.state.detailObj != undefined &&
							this.state.detailObj.country._id == element._id
						) {
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
	button: {
		margin: theme.spacing.unit * 3,
		borderColor: "red",
		borderWidth: 2,
	},
	paper: {
		height: 140,
		width: 100,
	},
});
AddOffice.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}

export default connect(mapStateToProps, {
	reqRegionList,
	reqAddOffice,
	reqGetCategoryList,
	reqCountryList,
	reqOfficeDetail,
	reqStateList,
	reqCityList,
})(withStyles(styles)(AddOffice));
