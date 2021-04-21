/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
	reqAddDriverGrocery,
	reqOfficeListGrocery,
	reqRegionList,
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
import CustomPBar from "../../common/CustomPBar";
import * as CustomStorage from "../../utils/CustomStorage";
import CommoanAutocomplete from "../../common/CommoanAutocomplete";

import ReportDatePicker from "../../common/ReportDatePicker";

import makeAnimated from "react-select/animated";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DateRange from "@material-ui/icons/DateRange";
import CommonDatePicketBtn from "../../common/CommonDatePicketBtn";
import LocationSearchInput from "../locationservice/LocationSearchInput";
import CommonImageSelector from "../../common/CommonImageSelector";
import CommonDocImageViewer from "../../common/CommonDocImageViewer";

const animatedComponents = makeAnimated();
let TEXTFIELD_XS = 12;
//let TEXTFIELD_MARGINTOP = 0;

let TEXTFIELD_HALF_XS = 6;
let TEXTFIELD_MARGINTOP = 15;
let LABEL_MARGINTOP = 15;

let userData;

class AddDriverGrocery extends BaseComponent {
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
			[Constants.KEY_EMERGENCY_NO]: "",
			[Constants.KEY_BLOOD_GROUP]: "",
			[Constants.KEY_ADDRESS]: "",
			[Constants.KEY_COUNTRY]: "",
			[Constants.KEY_LAT]: 26.9142,
			[Constants.KEY_LNG]: 75.7902,
			errorText: "Empty field",
			iserror: false,
			[Constants.KEY_SHOW_PROGRESS]: false,
			[Constants.KEY_IMAGE_UPLOAD]: null,
			[Constants.KEY_COUNTRY_ID]: "",
			//  [Constants.KEY_OFFICE_ID]: '',
			[Constants.KEY_STATE_ID]: "",
			[Constants.KEY_CITY_ID]: "",
			[Constants.KEY_REGION_ID]: "",
			[Constants.KEY_LICENSE_NUMBER]: "",
			selectedCountry: "",
			selectedState: "",
			selectedCity: "",
			selectedRegion: "",
			// selectedOffice: '',
			// [Constants.KEY_OFFICE_LIST]: [],
			date: "",
			[Constants.KEY_LICENSE_NUMBER]: "",
			[Constants.KEY_LICENSE_EXPIRY_DATE]: null,
			[Constants.KEY_AADHAR_NUMBER]: "",
			[Constants.KEY_PAN_NUMBER]: "",
			[Constants.KEY_AADHAR_IMAGE]: "",
			[Constants.KEY_PAN_IMAGE]: "",
			[Constants.KEY_LICENSE_IMAGE]: "",
			[Constants.KEY_AADHAR_IMAGE_UPLOAD]: "",
			[Constants.KEY_PAN_IMAGE_UPLOAD]: "",
			[Constants.KEY_LICENSE_IMAGE_UPLOAD]: "",
			[Constants.KEY_LICENSE_IMAGE_NAME]: "",
			[Constants.KEY_PAN_IMAGE_NAME]: "",
			[Constants.KEY_AADHAR_IMAGE_NAME]: "",
			isVisible: false,
			viewAbleImage: "",
			lic_image_new: "",
			[Constants.VEHICLE_NUMBER]: "",
			[Constants.RC_IMAGE_NAME]: "",
			[Constants.RC_IMAGE_UPLOAD]: "",
			[Constants.VPC_IMAGE]: "",
			[Constants.RC_IMAGE]: "",
			[Constants.VPC_IMAGE_NAME]: "",
			[Constants.VPC_IMAGE_UPLOAD]: "",
			[Constants.ACCOUNT_NUMBER]: "",
			[Constants.ACCOUNT_HOLDER_NAME]: "",
			[Constants.BANK_NAME]: "",
			[Constants.IFSC_CODE]: "",
		};
		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
	}

	componentDidMount() {
		this.getCountryList();
		// this.getOfficeList();
	}

	ImagePress = (e) => {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];
		this.setState({ [Constants.KEY_IMAGE_UPLOAD]: file });
		reader.onloadend = () => {
			this.setState({ [Constants.KEY_IMAGE]: reader.result });
		};
		reader.readAsDataURL(file);
	};

	VPCImagePress = (e) => {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];
		this.setState({ [Constants.VPC_IMAGE_UPLOAD]: file });
		reader.onloadend = () => {
			this.setState({
				[Constants.VPC_IMAGE]: reader.result,
				[Constants.VPC_IMAGE_NAME]: file.name,
			});
		};
		reader.readAsDataURL(file);
	};

	RCImagePress = (e) => {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];
		this.setState({ [Constants.RC_IMAGE_UPLOAD]: file });
		reader.onloadend = () => {
			this.setState({
				[Constants.RC_IMAGE]: reader.result,
				[Constants.RC_IMAGE_NAME]: file.name,
			});
		};
		reader.readAsDataURL(file);
	};

	AadharImagePress = (e) => {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];
		this.setState({ [Constants.KEY_AADHAR_IMAGE_UPLOAD]: file });
		reader.onloadend = () => {
			this.setState({
				[Constants.KEY_AADHAR_IMAGE]: reader.result,
				[Constants.KEY_AADHAR_IMAGE_NAME]: file.name,
			});
		};
		reader.readAsDataURL(file);
	};

	PANImagePress = (e) => {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];
		this.setState({ [Constants.KEY_PAN_IMAGE_UPLOAD]: file });
		reader.onloadend = () => {
			this.setState({
				[Constants.KEY_PAN_IMAGE]: reader.result,
				[Constants.KEY_PAN_IMAGE_NAME]: file.name,
			});
		};
		reader.readAsDataURL(file);
	};

	LicenseImagePress = (e) => {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];
		reader.onloadend = () => {
			this.setState({
				[Constants.KEY_LICENSE_IMAGE]: reader.result,
				[Constants.KEY_LICENSE_IMAGE_UPLOAD]: file,
				[Constants.KEY_LICENSE_IMAGE_NAME]: file.name,
			});
		};
		reader.readAsDataURL(file);
	};

	handleChange = (input) => (e) => {
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
	handleClick = (Transition) => {
		this.setState({
			iserror: true,
			errorText: Transition,
		});
	};

	handleClose = () => {
		this.setState({ iserror: false });
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
				//  [Constants.KEY_OFFICE_ID]: undefined,
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

	getPickerValue = (value) => {
		console.log(value);
	};

	onSelectedDate = (date, key) => {
		this.setState({ [key]: date });
	};

	render() {
		const { classes } = this.props;

		const {
			date,
			image,
			name,
			address,
			lat,
			lng,
			state,
			city,
			zip,
			phone,
			email,
			country,
			errorText,
			iserror,
		} = this.state;
		console.log("officeList::::::::", this.state.selectedOffice);

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

						{/* <Grid container spacing={5}> */}
						<Grid item xs={12} alignItems="center">
							<div>
								<div
									className={classes.bigAvatar}
									onClick={(e) => this.fileInput.click()}>
									<Avatar
										alt="Remy Sharp"
										src={image !== null ? image : ResourcesConstants.ic_user}
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
								{this.strings(StringKeys.Driver_Information)}
							</Typography>
						</Grid>

						<div class="justify-content-start">
							<div class="row">
								<div class="col-sm ">
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="driverName"
										label={this.strings(StringKeys.Name)}
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
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="emergency_phone"
										fullWidth
										type="number"
										label={this.strings(StringKeys.Emergency_Phone_Number)}
										className={classes.textField}
										value={this.state[Constants.KEY_EMERGENCY_NO]}
										onChange={
											this.handleChange([Constants.KEY_EMERGENCY_NO])
											// Utility.isValidEmergencyNumber(this.state[Constants.KEY_PHONE])
										}
										variant="outlined"
									/>
								</div>

								<div class="col-sm">
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="blood_group"
										fullWidth
										label={this.strings(StringKeys.Blood_Group)}
										className={classes.textField}
										value={this.state[Constants.KEY_BLOOD_GROUP]}
										onChange={this.handleChange(Constants.KEY_BLOOD_GROUP)}
										variant="outlined"
									/>
								</div>

								<div class="col-sm">
									<Grid
										item
										xs={TEXTFIELD_XS}
										alignItems="center"
										style={{ marginTop: 12 }}>
										<CommoanAutocomplete
											value={this.state.selectedCountry}
											options={this.state[Constants.KEY_COUNTRY_LIST_DATA]}
											components={animatedComponents}
											onChange={this.handleChangeCountry}
											placeholder={this.strings(StringKeys.Select_Country)}
										/>
									</Grid>
								</div>
							</div>
						</div>

						<div class="justify-content-start" style={{ marginTop: 12 }}>
							<div class="row">
								<div class="col-sm">
									<Grid
										item
										xs={TEXTFIELD_XS}
										alignItems="center"
										style={{ marginTop: 0 }}>
										<CommoanAutocomplete
											value={this.state.selectedState}
											options={this.state[Constants.KEY_STATE_LIST_DATA]}
											components={animatedComponents}
											onChange={this.handleChangeState}
											placeholder={this.strings(StringKeys.Select_State)}
										/>
									</Grid>
								</div>

								<div class="col-sm">
									<Grid
										item
										xs={TEXTFIELD_XS}
										alignItems="center"
										style={{ marginTop: 0 }}>
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
										style={{ marginTop: 0 }}>
										<CommoanAutocomplete
											value={this.state.selectedRegion}
											options={this.state[Constants.KEY_REGION_LIST_DATA]}
											components={animatedComponents}
											onChange={this.handleChangeRegion}
											placeholder={this.strings(StringKeys.Select_Region)}
										/>
									</Grid>
								</div>
							</div>
						</div>

						<div class="justify-content-start">
							<div class="row">
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
										value={address}
										onChange={this.handleChange(Constants.KEY_ADDRESS)}
										variant="outlined"
									/>
								</div>
								<div class="col-sm">
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="zip"
										fullWidth
										autoComplete="billing postal-code"
										label={this.strings(StringKeys.Zip)}
										className={classes.textField}
										value={zip}
										onChange={this.handleChange(Constants.KEY_ZIP)}
										variant="outlined"
										type="number"
									/>
								</div>
							</div>
						</div>

						<Typography
							component="h6"
							variant="h6"
							style={{ marginLeft: 15, marginTop: 15 }}>
							{this.strings(StringKeys.Account_Detail)}
						</Typography>

						<div class="justify-content-start">
							<div class="row">
								<div class="col-sm">
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="accountHolderName"
										label={this.strings(StringKeys.Account_Holder_Name)}
										fullWidth
										className={classes.textField}
										value={this.state[Constants.ACCOUNT_HOLDER_NAME]}
										onChange={this.handleChange(Constants.ACCOUNT_HOLDER_NAME)}
										autoComplete="resname"
										variant="outlined"
										fieldStyle={classes.fieldHeight}
									/>
								</div>
								<div class="col-sm">
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="bankName"
										label={this.strings(StringKeys.Bank_Name)}
										fullWidth
										className={classes.textField}
										value={this.state[Constants.BANK_NAME]}
										onChange={this.handleChange(Constants.BANK_NAME)}
										autoComplete="resname"
										variant="outlined"
										fieldStyle={classes.fieldHeight}
									/>
								</div>
							</div>
						</div>

						<div class="justify-content-start">
							<div class="row">
								<div class="col-sm">
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="account_number"
										fullWidth
										autoComplete="account_number"
										label={this.strings(StringKeys.Account_Number)}
										className={classes.textField}
										value={this.state[Constants.ACCOUNT_NUMBER]}
										onChange={this.handleChange(Constants.ACCOUNT_NUMBER)}
										variant="outlined"
										type="number"></CommonGridTextField>
								</div>
								<div class="col-sm">
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="ifsc_code"
										fullWidth
										autoComplete="ifsc_code"
										label={this.strings(StringKeys.IFSC_CODE)}
										className={classes.textField}
										value={this.state[Constants.IFSC_CODE]}
										onChange={this.handleChange(Constants.IFSC_CODE)}
										variant="outlined"></CommonGridTextField>
								</div>
							</div>
						</div>

						<Typography
							component="h6"
							variant="h6"
							style={{ marginLeft: 15, marginTop: 15 }}>
							{this.strings(StringKeys.Upload_Document)}
						</Typography>

						<div class="justify-content-start">
							<div class="row">
								<div class="col-sm">
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="vehicle_number"
										fullWidth
										autoComplete="vehicle-pnumber"
										label={this.strings(StringKeys.Vehicle_Number)}
										className={classes.textField}
										value={this.state[Constants.VEHICLE_NUMBER]}
										onChange={this.handleChange(Constants.VEHICLE_NUMBER)}
										variant="outlined"></CommonGridTextField>
								</div>

								<div class="col-sm">
									<CommonImageSelector
										required={true}
										disabled={false}
										xs={12}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="rc_image"
										fullWidth
										className={classes.textField}
										label={this.strings(StringKeys.RC_Image)}
										value={this.state[Constants.RC_IMAGE_NAME]}
										variant="outlined"
										onChange={this.RCImagePress}
										clearPress={() => {
											this.handleCloseClick(
												this.state[Constants.RC_IMAGE] != undefined
													? this.state[Constants.RC_IMAGE]
													: "",
											);
										}}
									/>
								</div>

								<div class="col-sm">
									<CommonImageSelector
										required={true}
										disabled={false}
										xs={12}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="vpc_image"
										fullWidth
										className={classes.textField}
										label={this.strings(
											StringKeys.Vehicle_Pollution_Certificate_Image,
										)}
										value={this.state[Constants.VPC_IMAGE_NAME]}
										variant="outlined"
										onChange={this.VPCImagePress}
										clearPress={() => {
											this.handleCloseClick(
												this.state[Constants.VPC_IMAGE] != undefined
													? this.state[Constants.VPC_IMAGE]
													: "",
											);
										}}
									/>
								</div>
							</div>
						</div>

						<div class="justify-content-start" style={{ marginTop: 12 }}>
							<div class="row">
								<div class="col-sm">
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="license"
										fullWidth
										autoComplete="license postal-code"
										label={this.strings(StringKeys.License_Number)}
										className={classes.textField}
										value={this.state[Constants.KEY_LICENSE_NUMBER]}
										onChange={this.handleChange(Constants.KEY_LICENSE_NUMBER)}
										variant="outlined"></CommonGridTextField>
								</div>

								<div class="col-sm" style={{ marginTop: 15 }}>
									{/* <CommonDatePicketBtn
                                        listenDate={(date) => this.listenDate(date)}
                                        placeholderText="Expire Date"
                                        xs={TEXTFIELD_XS}
                                        style={{ marginTop: TEXTFIELD_MARGINTOP, }}
                                        id="date"
                                        fullWidth
                                        variant="outlined"
                                        className={classes.textField}
                                        autoComplete="date"
                                    >
                                    </CommonDatePicketBtn> */}

									<ReportDatePicker
										value={this.state[Constants.KEY_LICENSE_EXPIRY_DATE]}
										defaultDate={this.state[Constants.KEY_LICENSE_EXPIRY_DATE]}
										palceHolder={this.strings(StringKeys.License_Expiry_Date)}
										id={"datetimepicker_end"}
										onSelectedDate={(date) =>
											this.onSelectedDate(
												Utility.convertStrDateFormat(
													date,
													Constants.DATE_FORMAT_COMING_FROM_SERVER,
													Constants.DATE_FORMAT_SEND,
												),
												[Constants.KEY_LICENSE_EXPIRY_DATE],
											)
										}
									/>
								</div>
								<div class="col-sm">
									<CommonImageSelector
										required={true}
										disabled={false}
										xs={12}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="lice_image"
										fullWidth
										className={classes.textField}
										label={this.strings(StringKeys.License_Image)}
										value={this.state[Constants.KEY_LICENSE_IMAGE_NAME]}
										variant="outlined"
										onChange={this.LicenseImagePress}
										clearPress={() => {
											this.handleCloseClick(
												this.state[Constants.KEY_LICENSE_IMAGE] != undefined
													? this.state[Constants.KEY_LICENSE_IMAGE]
													: "",
											);
										}}
									/>
								</div>
							</div>
						</div>

						<div class="justify-content-start" style={{ marginTop: 12 }}>
							<div class="row">
								<div class="col-sm">
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="aadhar"
										fullWidth
										autoComplete="aadhar postal-code"
										label={this.strings(StringKeys.Aadhar_Number)}
										className={classes.textField}
										value={this.state[Constants.KEY_AADHAR_NUMBER]}
										onChange={this.handleChange(Constants.KEY_AADHAR_NUMBER)}
										variant="outlined"
										type="number"></CommonGridTextField>
								</div>

								<div class="col-sm">
									<CommonImageSelector
										required={true}
										disabled={false}
										xs={12}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="aadhar_image"
										fullWidth
										label={this.strings(StringKeys.Aadhar_Image)}
										value={this.state[Constants.KEY_AADHAR_IMAGE_NAME]}
										variant="outlined"
										onChange={this.AadharImagePress}
										clearPress={() => {
											this.handleCloseClick(
												this.state[Constants.KEY_AADHAR_IMAGE] != undefined
													? this.state[Constants.KEY_AADHAR_IMAGE]
													: "",
											);
										}}
									/>
								</div>
							</div>
						</div>

						<div class="justify-content-start">
							<div class="row">
								<div class="col-sm">
									<CommonGridTextField
										required
										xs={TEXTFIELD_XS}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="pan"
										fullWidth
										autoComplete="aadhar postal-code"
										label={this.strings(StringKeys.Pan_Number)}
										className={classes.textField}
										value={this.state[Constants.KEY_PAN_NUMBER]}
										onChange={this.handleChange(Constants.KEY_PAN_NUMBER)}
										variant="outlined"></CommonGridTextField>
								</div>
								<div class="col-sm">
									<CommonImageSelector
										required={true}
										disabled={false}
										xs={12}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="pan_image"
										fullWidth
										label={this.strings(StringKeys.Pan_Image)}
										value={this.state[Constants.KEY_PAN_IMAGE_NAME]}
										variant="outlined"
										onChange={this.PANImagePress}
										clearPress={() => {
											this.handleCloseClick(
												this.state[Constants.KEY_PAN_IMAGE] != undefined
													? this.state[Constants.KEY_PAN_IMAGE]
													: "",
											);
										}}
									/>
								</div>
							</div>
						</div>

						{/* </Grid> */}
						<CommonButton
							type="submit"
							fullWidth={false}
							variant="contained"
							color="secondary"
							className={classes.submit}
							onClick={this.checkVaidation}
							label={this.strings(StringKeys.Save)}
						/>

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
				</Fragment>
			);
	}

	closeDilaog = () => {
		this.setState({ isVisible: !this.state.isVisible });
	};

	handleCloseClick = (image) => {
		this.setState({
			isVisible: !this.state.isVisible,
			viewAbleImage: image,
		});
	};

	checkVaidation = (event) => {
		event.preventDefault();
		var data = {
			[Constants.KEY_NAME]: this.state[Constants.KEY_NAME],
			[Constants.KEY_EMAIL]: this.state[Constants.KEY_EMAIL],
			[Constants.KEY_PHONE]: this.state[Constants.KEY_PHONE],
			[Constants.KEY_ADDRESS]: this.state[Constants.KEY_ADDRESS],
			[Constants.KEY_CITY_ID]: this.state[Constants.KEY_CITY_ID],
			[Constants.KEY_STATE_ID]: this.state[Constants.KEY_STATE_ID],
			[Constants.KEY_COUNTRY_ID]: this.state[Constants.KEY_COUNTRY_ID],
			// [Constants.KEY_OFFICE_ID]: this.state[Constants.KEY_OFFICE_ID],

			[Constants.KEY_BLOOD_GROUP]: this.state[Constants.KEY_BLOOD_GROUP],

			[Constants.KEY_REGION_ID]: this.state[Constants.KEY_REGION_ID],
			[Constants.KEY_ZIP]: this.state[Constants.KEY_ZIP],
			// [Constants.KEY_LAT]: this.state[Constants.KEY_LAT],
			// [Constants.KEY_LNG]: this.state[Constants.KEY_LNG],
			[Constants.KEY_USERID]: userData[Constants.KEY_USERID],
			[Constants.KEY_LICENSE_NUMBER]: this.state[Constants.KEY_LICENSE_NUMBER],
			[Constants.KEY_LICENSE_EXPIRY_DATE]: this.state[
				Constants.KEY_LICENSE_EXPIRY_DATE
			],
			[Constants.KEY_AADHAR_NUMBER]: this.state[Constants.KEY_AADHAR_NUMBER],
			[Constants.KEY_PAN_NUMBER]: this.state[Constants.KEY_PAN_NUMBER],
			[Constants.IFSC_CODE]: this.state[Constants.IFSC_CODE],
			[Constants.ACCOUNT_NUMBER]: this.state[Constants.ACCOUNT_NUMBER],
			[Constants.VEHICLE_NUMBER]: this.state[Constants.VEHICLE_NUMBER],
			[Constants.KEY_EMERGENCY_NO]: this.state[Constants.KEY_EMERGENCY_NO],
			[Constants.ACCOUNT_HOLDER_NAME]: this.state[
				Constants.ACCOUNT_HOLDER_NAME
			],
			[Constants.BANK_NAME]: this.state[Constants.BANK_NAME],
		};

		let imageSource = {
			[Constants.KEY_AADHAR_IMAGE_NAME]: this.state[
				Constants.KEY_AADHAR_IMAGE_NAME
			],
			[Constants.KEY_PAN_IMAGE_NAME]: this.state[Constants.KEY_PAN_IMAGE_NAME],
			[Constants.KEY_LICENSE_IMAGE_NAME]: this.state[
				Constants.KEY_LICENSE_IMAGE_NAME
			],
			[Constants.RC_IMAGE_NAME]: this.state[Constants.RC_IMAGE_NAME],
			[Constants.VPC_IMAGE_NAME]: this.state[Constants.VPC_IMAGE_NAME],
		};

		if (Utility.checkVaidationAddDriver(data, imageSource, this)) {
			if (
				this.state[Constants.KEY_AADHAR_IMAGE_UPLOAD] !== null &&
				this.state[Constants.KEY_AADHAR_IMAGE_UPLOAD] !== undefined &&
				this.state[Constants.KEY_AADHAR_IMAGE_UPLOAD] !== ""
			) {
				data[Constants.KEY_AADHAR_IMAGE] = this.state[
					Constants.KEY_AADHAR_IMAGE_UPLOAD
				];
			}
			if (
				this.state[Constants.KEY_PAN_IMAGE_UPLOAD] !== null &&
				this.state[Constants.KEY_PAN_IMAGE_UPLOAD] !== undefined &&
				this.state[Constants.KEY_PAN_IMAGE_UPLOAD] !== ""
			) {
				data[Constants.KEY_PAN_IMAGE] = this.state[
					Constants.KEY_PAN_IMAGE_UPLOAD
				];
			}
			if (
				this.state[Constants.KEY_LICENSE_IMAGE_UPLOAD] !== null &&
				this.state[Constants.KEY_LICENSE_IMAGE_UPLOAD] !== undefined &&
				this.state[Constants.KEY_LICENSE_IMAGE_UPLOAD] !== ""
			) {
				data[Constants.KEY_LICENSE_IMAGE] = this.state[
					Constants.KEY_LICENSE_IMAGE_UPLOAD
				];
			}
			if (
				this.state[Constants.VPC_IMAGE_UPLOAD] !== null &&
				this.state[Constants.VPC_IMAGE_UPLOAD] !== undefined &&
				this.state[Constants.VPC_IMAGE_UPLOAD] !== ""
			) {
				data[Constants.VPC_IMAGE] = this.state[Constants.VPC_IMAGE_UPLOAD];
			}
			if (
				this.state[Constants.RC_IMAGE_UPLOAD] !== null &&
				this.state[Constants.RC_IMAGE_UPLOAD] !== undefined &&
				this.state[Constants.RC_IMAGE_UPLOAD] !== ""
			) {
				data[Constants.RC_IMAGE] = this.state[Constants.RC_IMAGE_UPLOAD];
			}

			this.addDriverReq(data);
		}
	};

	addDriverReq = (data) => {
		if (
			this.state[Constants.KEY_IMAGE_UPLOAD] !== null &&
			this.state[Constants.KEY_IMAGE_UPLOAD] !== undefined
		) {
			data[Constants.KEY_IMAGE] = this.state[Constants.KEY_IMAGE_UPLOAD];
		}

		if (
			this.state[Constants.ACCOUNT_HOLDER_NAME] !== null &&
			this.state[Constants.ACCOUNT_HOLDER_NAME] !== undefined
		) {
			data[Constants.ACCOUNT_HOLDER_NAME] = this.state[
				Constants.ACCOUNT_HOLDER_NAME
			];
		}
		if (
			this.state[Constants.BANK_NAME] !== null &&
			this.state[Constants.BANK_NAME] !== undefined
		) {
			data[Constants.BANK_NAME] = this.state[Constants.BANK_NAME];
		}
		if (
			this.state[Constants.KEY_BLOOD_GROUP] !== null &&
			this.state[Constants.KEY_BLOOD_GROUP] !== undefined
		) {
			data[Constants.KEY_BLOOD_GROUP] = this.state[Constants.KEY_BLOOD_GROUP];
		}

		console.log(data, "user", userData);
		this.props.reqAddDriverGrocery(data, this);
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
		console.log("handle response :::", nextProps);
		var respObj = null;
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		} else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (nextProps[Constants.KEY_TYPE] === types.API_ADD_DRIVER_GROCERY) {
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
		margin: 10,
		width: 100,
		height: 100,
	},
	licenseAvatar: {
		marginTop: 20,
		width: 100,
		height: 100,
	},
	licenseAvatarWithoutTop: {
		marginTop: 0,
		width: 100,
		height: 100,
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
});

const selectStyles = {
	menu: (base) => ({
		...base,
		zIndex: 100,
	}),
	control: (base, state) => ({
		...base,
		height: "55px",
		"min-height": "55px",
	}),
};

AddDriverGrocery.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}

export default connect(mapStateToProps, {
	reqAddDriverGrocery,
	reqOfficeListGrocery,
	reqRegionList,
	reqCountryList,
	reqStateList,
	reqCityList,
})(withStyles(styles)(AddDriverGrocery));
