/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { toast, ToastContainer } from "react-toastify";
import { reqAddCoupon, reqEditCoupon } from "../../actions";
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
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CustomPBar from "../../common/CustomPBar";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import * as CustomStorage from "../../utils/CustomStorage";
import * as Dimens from "../../res/Dimens";
import Typography from "@material-ui/core/Typography";

import ReportDatePicker from "../../common/ReportDatePicker";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import * as Colors from "../../res/Colors";

import CommonDocImageViewer from "../../common/CommonDocImageViewer";

let TEXTFIELD_XS = 12;
let TEXTFIELD_MARGINTOP = 15;

let TEXTFIELD_XS_CHILD = 6;
let TEXTFIELD_XS_SUB_CHILD = 2;
//let TEXTFIELD_MARGINTOP = 10;
let TEXTFIELD_MARGINTOP_PLUS = 15;

let couponDetails = undefined;
let userDetails = undefined;

class AddCoupon extends BaseComponent {
	constructor(props) {
		super(props);
		userDetails = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
		couponDetails = CustomStorage.getSessionDataAsObject(
			Constants.KEY_COUPON_DETAILS,
		);

		this.state = {
			[Constants.KEY_TITLE]:
				couponDetails != undefined && couponDetails != null
					? couponDetails[Constants.KEY_TITLE]
					: "",
			[Constants.KEY_IMAGE]: null,
			errorText: "Empty field",
			iserror: false,
			[Constants.KEY_SHOW_PROGRESS]: false,
			[Constants.KEY_DATA]: [],
			[Constants.KEY_OFFER_IMAGE_UPLOAD]: null,
			[Constants.KEY_OFFER_IMAGE]:
				couponDetails != undefined && couponDetails != null
					? couponDetails[Constants.KEY_OFFER_IMAGE]
					: "",
			[Constants.KEY_IMAGE_UPLOAD]: null,
			[Constants.KEY_IMAGE]:
				couponDetails != undefined && couponDetails != null
					? couponDetails[Constants.KEY_IMAGE]
					: "",
			[Constants.KEY_COUPON_CODE]:
				couponDetails != undefined && couponDetails != null
					? couponDetails[Constants.KEY_COUPON_CODE]
					: "",
			[Constants.KEY_COUPON_DISCOUNT_IN_PERCENT]:
				couponDetails != undefined && couponDetails != null
					? couponDetails[Constants.KEY_COUPON_DISCOUNT_IN_PERCENT]
					: "",
			[Constants.KEY_COUPON_MAX_DISCOUNT_AMOUNT]:
				couponDetails != undefined && couponDetails != null
					? couponDetails[Constants.KEY_COUPON_MAX_DISCOUNT_AMOUNT]
					: "",
			[Constants.KEY_COUPON_MIN_DISCOUNT_AMOUNT]:
				couponDetails != undefined && couponDetails != null
					? couponDetails[Constants.KEY_COUPON_MIN_DISCOUNT_AMOUNT]
					: "",
			[Constants.KEY_COUPON_DETAILS]:
				couponDetails != undefined && couponDetails != null
					? couponDetails[Constants.KEY_COUPON_DETAILS]
					: "",
			productTypeArray: [
				{
					label: Constants.KEY_VEG,
					[Constants.KEY_VALUE]: Constants.RESTRO_TYPE_VEG,
				},
				{
					label: Constants.KEY_NON_VEG,
					[Constants.KEY_VALUE]: Constants.RESTRO_TYPE_NON_VEG,
				},
			],
			selectedProductType: "",
			viewAbleImage: "",
			isVisible: false,
			[Constants.KEY_VALID_FROM]:
				couponDetails != undefined && couponDetails != null
					? couponDetails[Constants.KEY_VALID_FROM]
					: null,
			// Utility.convertDate(new Date()),
			[Constants.KEY_VALID_TO]:
				couponDetails != undefined && couponDetails != null
					? couponDetails[Constants.KEY_VALID_TO]
					: null,
			// Utility.convertDate(new Date()),
			isEdiable:
				couponDetails != undefined &&
				couponDetails != null &&
				couponDetails[Constants.KEY_CREATED_BY_USER_TYPE] ==
					userDetails[Constants.KEY_ROLE]
					? true
					: false,
			isTopCoupon: false,
		};
	}
	componentDidMount() {
		if (
			couponDetails == undefined ||
			couponDetails == null ||
			couponDetails == ""
		) {
			this.setState({
				isEdiable: true,
			});
		}
	}

	onSelectedDate = (date, key) => {
		this.setState({ [key]: date });
	};

	onCouponCodeImagePress = (e) => {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];
		this.setState({ [Constants.KEY_IMAGE_UPLOAD]: file });
		reader.onloadend = () => {
			this.setState({ [[Constants.KEY_IMAGE]]: reader.result });
		};
		reader.readAsDataURL(file);
	};

	onOfferImagePress = (e) => {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];
		this.setState({ [Constants.KEY_OFFER_IMAGE_UPLOAD]: file });
		reader.onloadend = () => {
			this.setState({ [[Constants.KEY_OFFER_IMAGE]]: reader.result });
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

	handleClick = (msg) => {
		this.setState({
			iserror: true,
			errorText: msg,
		});
	};

	handleClose = () => {
		this.setState({ iserror: false });
	};
	handleExited = () => {};

	handleSelectedCat = (selectedOption, isDeleted) => {
		this.setState({
			selectedCatOption: selectedOption,
		});
	};

	render() {
		const { classes } = this.props;
		const { image, errorText } = this.state;

		if (this.state[Constants.KEY_SHOW_PROGRESS] == true) {
			return (
				<div className={classes.mainView}>
					<CustomPBar showProgress={this.state[Constants.KEY_SHOW_PROGRESS]} />
				</div>
			);
		} else
			return (
				<Fragment>
					{/* <ToastContainer /> */}
					<div>
						<div className={classes.appBarSpacer} />

						<div class="justify-content-start">
							<div class="row">
								<div class="col-sm ">
									<Grid
										container
										direction="row"
										justify="flex-start"
										alignItems="center">
										<div
											className={classes.bigAvatar}
											style={{ borderWidth: 1, borderColor: "red" }}
											onClick={(e) => this.fileInput.click()}>
											<Avatar
												alt="Remy Sharp"
												src={
													this.state[Constants.KEY_IMAGE] != undefined &&
													this.state[Constants.KEY_IMAGE] != null
														? this.state[Constants.KEY_IMAGE]
														: ResourcesConstants.discount_logo
												}
												className={classes.bigAvatar}
											/>
										</div>
										<input
											ref={(fileInput) => (this.fileInput = fileInput)}
											type="file"
											style={{ display: "none" }}
											accept=".png, .jpg, .jpeg"
											onChange={this.onCouponCodeImagePress}
										/>
										<Grid alignItems="center" style={{}}>
											<Typography
												component="h9"
												variant="h9"
												style={{ marginTop: TEXTFIELD_MARGINTOP }}>
												{this.strings(StringKeys.Coupon_Code_Logo)}
											</Typography>
										</Grid>
									</Grid>
								</div>
								<div class="col-sm ">
									<Grid
										container
										direction="row"
										justify="flex-start"
										alignItems="center">
										<div
											className={classes.bigAvatar}
											style={{ borderWidth: 1, borderColor: "red" }}
											onClick={(e) => this.fileInputCoupon.click()}>
											<Avatar
												alt="Remy Sharp"
												src={
													this.state[Constants.KEY_OFFER_IMAGE] != undefined &&
													this.state[Constants.KEY_OFFER_IMAGE] != null
														? this.state[Constants.KEY_OFFER_IMAGE]
														: ResourcesConstants.discount_logo
												}
												className={classes.bigAvatar}
											/>
										</div>

										<Grid alignItems="center" style={{}}>
											<Typography
												component="h9"
												variant="h9"
												style={{ marginTop: TEXTFIELD_MARGINTOP }}>
												{this.strings(StringKeys.Offer_Image)}
											</Typography>
											<input
												ref={(fileInput) => (this.fileInputCoupon = fileInput)}
												type="file"
												style={{ display: "none" }}
												accept=".png, .jpg, .jpeg"
												onChange={this.onOfferImagePress}
											/>
										</Grid>
									</Grid>
								</div>
							</div>
						</div>

						<div class="justify-content-start">
							<div class="row">
								<div class="col-sm ">
									<CommonGridTextField
										xs={TEXTFIELD_XS}
										id="title"
										required={this.state.isEdiable}
										disabled={!this.state.isEdiable}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										label={this.strings(StringKeys.Title)}
										fullWidth
										className={classes.textField}
										value={this.state[Constants.KEY_TITLE]}
										onChange={this.handleChange(Constants.KEY_TITLE)}
										autoComplete="resname"
										variant="outlined"
										maxLengthVal={100}
										type={"text"}
										fieldStyle={classes.fieldHeight}
									/>
								</div>
								<div class="col-sm ">
									<CommonGridTextField
										xs={TEXTFIELD_XS}
										id="coupon_code"
										required={this.state.isEdiable}
										disabled={!this.state.isEdiable}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										label={this.strings(StringKeys.Coupon_Code)}
										fullWidth
										className={classes.textField}
										value={this.state[Constants.KEY_COUPON_CODE]}
										onChange={this.handleChange(Constants.KEY_COUPON_CODE)}
										autoComplete="resname"
										variant="outlined"
										maxLengthVal={100}
										type={"text"}
										fieldStyle={classes.fieldHeight}
									/>
								</div>
							</div>
						</div>

						<div class="justify-content-start">
							<div class="row">
								<div class="col-sm ">
									<CommonGridTextField
										xs={TEXTFIELD_XS}
										id="coupon_des"
										required={this.state.isEdiable}
										disabled={!this.state.isEdiable}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										label={this.strings(StringKeys.Coupon_Detail)}
										fullWidth
										className={classes.textField}
										value={this.state[Constants.KEY_COUPON_DETAILS]}
										onChange={this.handleChange(Constants.KEY_COUPON_DETAILS)}
										autoComplete="resname"
										variant="outlined"
										maxLengthVal={100}
										type={"text"}
										fieldStyle={classes.fieldHeight}
									/>
								</div>
								<div class="col-sm ">
									<CommonGridTextField
										xs={TEXTFIELD_XS}
										required={this.state.isEdiable}
										disabled={!this.state.isEdiable}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="discount_percent"
										fullWidth
										maxLength={12}
										type={"number"}
										autoComplete="discount_percent"
										label={this.strings(StringKeys.Discount_In_Percentage)}
										className={classes.textField}
										value={this.state[Constants.KEY_COUPON_DISCOUNT_IN_PERCENT]}
										onChange={this.handleChange(
											Constants.KEY_COUPON_DISCOUNT_IN_PERCENT,
										)}
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
										required={this.state.isEdiable}
										disabled={!this.state.isEdiable}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="max_discount"
										fullWidth
										maxLength={12}
										type={"number"}
										autoComplete="discount_percent"
										label={this.strings(StringKeys.Max_Discount_Amount)}
										className={classes.textField}
										value={this.state[Constants.KEY_COUPON_MAX_DISCOUNT_AMOUNT]}
										onChange={this.handleChange(
											Constants.KEY_COUPON_MAX_DISCOUNT_AMOUNT,
										)}
										variant="outlined"
									/>
								</div>

								<div class="col-sm ">
									{" "}
									<CommonGridTextField
										xs={TEXTFIELD_XS}
										required={this.state.isEdiable}
										disabled={!this.state.isEdiable}
										style={{ marginTop: TEXTFIELD_MARGINTOP }}
										id="min_discount"
										fullWidth
										maxLength={12}
										type={"number"}
										autoComplete="min_discount"
										label={this.strings(StringKeys.Minimum_Order_Amount)}
										className={classes.textField}
										value={this.state[Constants.KEY_COUPON_MIN_DISCOUNT_AMOUNT]}
										onChange={this.handleChange(
											Constants.KEY_COUPON_MIN_DISCOUNT_AMOUNT,
										)}
										variant="outlined"
									/>
								</div>
							</div>
						</div>

						<div class="justify-content-start">
							<div class="row">
								<div class="col-sm ">
									<Grid
										item
										xs={TEXTFIELD_XS}
										style={{
											marginTop: TEXTFIELD_MARGINTOP_PLUS,
										}}>
										<ReportDatePicker
											value={this.state[Constants.KEY_VALID_FROM]}
											defaultDate={this.state[Constants.KEY_VALID_FROM]}
											palceHolder={this.strings(StringKeys.Valid_From)}
											id={"datetimepicker_start"}
											onSelectedDate={(date) =>
												this.onSelectedDate(
													Utility.convertStrDateFormat(
														date,
														Constants.DATE_FORMAT_COMING_FROM_SERVER,
														Constants.DATE_FORMAT_SEND,
													),
													[Constants.KEY_VALID_FROM],
												)
											}
										/>
									</Grid>
								</div>

								<div class="col-sm ">
									<Grid
										item
										xs={TEXTFIELD_XS}
										style={{
											marginTop: TEXTFIELD_MARGINTOP_PLUS,
										}}>
										<ReportDatePicker
											value={this.state[Constants.KEY_VALID_TO]}
											defaultDate={this.state[Constants.KEY_VALID_TO]}
											palceHolder={this.strings(StringKeys.Valid_To)}
											id={"datetimepicker_end"}
											onSelectedDate={(date) => {
												this.onSelectedDate(
													Utility.convertStrDateFormat(
														date,
														Constants.DATE_FORMAT_COMING_FROM_SERVER,
														Constants.DATE_FORMAT_SEND,
													),
													[Constants.KEY_VALID_TO],
												);
												Utility.isValidToDate(
													this.state[Constants.KEY_VALID_FROM],
												);
											}}
										/>
									</Grid>
								</div>
							</div>
						</div>
						{Utility.isAdmin && (
							<div class="justify-content-start">
								<div class="row">
									<div class="col-sm ">
										<Grid
											item
											xs={TEXTFIELD_XS}
											style={{
												marginTop: TEXTFIELD_MARGINTOP_PLUS,
											}}>
											<FormControlLabel
												control={
													<Checkbox
														checked={this.state.isTopCoupon}
														value="remember"
														color={Colors.KEY_PRIMARY}
														onChange={(isChange) =>
															this.setState({
																isTopCoupon: !this.state.isTopCoupon,
															})
														}
													/>
												}
												label={this.strings(StringKeys.Remember_Me)}
											/>
										</Grid>
									</div>
								</div>
							</div>
						)}

						{this.state.isEdiable && (
							<CommonButton
								type="submit"
								fullWidth={false}
								variant="contained"
								color="secondary"
								className={classes.submit}
								onClick={this.checkVaidation}
								label={this.strings(StringKeys.Save)}
							/>
						)}

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
							message={<span id="message-id"> {errorText}</span>}
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
	viewImage = (image) => {
		this.setState({
			isVisible: !this.state.isVisible,
			viewAbleImage: image,
		});
	};

	listenDate = (date, key) => {
		console.log("date=", date);
		this.setState({
			[key]: date,
		});
	};

	checkVaidation = (event) => {
		event.preventDefault();

		var data = {
			[Constants.KEY_TITLE]: this.state[Constants.KEY_TITLE],
			[Constants.KEY_COUPON_CODE]: this.state[Constants.KEY_COUPON_CODE],
			[Constants.KEY_COUPON_DETAILS]: this.state[Constants.KEY_COUPON_DETAILS],
			[Constants.KEY_COUPON_DISCOUNT_IN_PERCENT]: this.state[
				Constants.KEY_COUPON_DISCOUNT_IN_PERCENT
			],
			[Constants.KEY_COUPON_MAX_DISCOUNT_AMOUNT]: this.state[
				Constants.KEY_COUPON_MAX_DISCOUNT_AMOUNT
			],
			[Constants.KEY_COUPON_MIN_DISCOUNT_AMOUNT]: this.state[
				Constants.KEY_COUPON_MIN_DISCOUNT_AMOUNT
			],
			[Constants.KEY_VALID_FROM]: this.state[Constants.KEY_VALID_FROM],
			[Constants.KEY_VALID_TO]: this.state[Constants.KEY_VALID_TO],
			[Constants.KEY_USERID]: userDetails[Constants.KEY_USERID],
			[Constants.KEY_CREATED_BY]: userDetails[Constants.KEY_USERID],
			[Constants.KEY_CREATED_BY_NAME]: userDetails[Constants.KEY_NAME],

			[Constants.KEY_CREATED_BY_USER_TYPE]: userDetails[Constants.KEY_ROLE],
		};

		if (
			this.state[Constants.KEY_IMAGE] !== undefined &&
			this.state[Constants.KEY_IMAGE] !== null &&
			this.state[Constants.KEY_IMAGE] != ""
		) {
			if (
				this.state[Constants.KEY_IMAGE_UPLOAD] !== null &&
				this.state[Constants.KEY_IMAGE_UPLOAD] !== undefined
			) {
				data[Constants.KEY_IMAGE] = this.state[Constants.KEY_IMAGE_UPLOAD];
			}
		} else {
			this.handleClick(this.strings(StringKeys.Please_Select_Coupon_Code_Logo));
			return;
		}
		if (
			this.state[Constants.KEY_OFFER_IMAGE] != undefined &&
			this.state[Constants.KEY_OFFER_IMAGE] != null &&
			this.state[Constants.KEY_OFFER_IMAGE] != ""
		) {
			if (
				this.state[Constants.KEY_OFFER_IMAGE_UPLOAD] !== null &&
				this.state[Constants.KEY_OFFER_IMAGE_UPLOAD] !== undefined
			) {
				data[Constants.KEY_OFFER_IMAGE] = this.state[
					Constants.KEY_OFFER_IMAGE_UPLOAD
				];
			}
		} else {
			this.handleClick(this.strings(StringKeys.Please_Select_Offer_Image));
			return;
		}

		console.log("request =", JSON.stringify(data));
		if (Utility.checkVaidationAddCoupon(data, this)) {
			if (
				this.state[Constants.KEY_COUPON_CODE] != undefined &&
				this.state[Constants.KEY_COUPON_CODE] != null &&
				this.state[Constants.KEY_COUPON_CODE] != ""
			) {
				data[Constants.KEY_COUPON_CODE] = this.state[
					Constants.KEY_COUPON_CODE
				].toUpperCase();
			}
			this.addCouponReq(data);
		}
	};

	addCouponReq = (data) => {
		if (
			this.state[Constants.KEY_IMAGE_UPLOAD] !== null &&
			this.state[Constants.KEY_IMAGE_UPLOAD] !== undefined
		) {
			data[Constants.KEY_IMAGE] = this.state[Constants.KEY_IMAGE_UPLOAD];
		}

		if (Utility.isAdmin()) {
			data[Constants.KEY_IS_TOP_COUPON] = true;
		} else {
			data[Constants.KEY_IS_TOP_COUPON] = this.state.isTopCoupon;
		}

		if (couponDetails != undefined && couponDetails != null) {
			data[Constants.KEY_UNDERSCORE_ID] =
				couponDetails[Constants.KEY_UNDERSCORE_ID];
			this.props.reqEditCoupon(data, this);
		} else {
			this.props.reqAddCoupon(data, this);
		}
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
				nextProps[Constants.KEY_TYPE] === types.API_ADDCOUPONCODE ||
				nextProps[Constants.KEY_TYPE] === types.API_EDITCOUPONCODE
			) {
				if (nextProps[Constants.KEY_TYPE] === types.API_ADDCOUPONCODE) {
					respObj = {
						[Constants.KEY_SHOW_PROGRESS]: false,
						disabledClickedBtn: false,
					};
					toast("coupon code successfully added");
					this.setState(respObj);
					this.goBack();
				} else {
					respObj = {
						[Constants.KEY_SHOW_PROGRESS]: false,
						disabledClickedBtn: false,
					};
					toast("coupon code successfully edited");
					this.setState(respObj);
					this.goBack();
				}
			} else if (nextProps[Constants.KEY_TYPE] === types.API_RESTRO_LIST) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							Constants.KEY_RESTRO_LIST
						],
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
		width: 60,
		height: 60,
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

	root: {
		flexGrow: 1,
		height: 250,
	},
	input: {
		display: "flex",
		padding: 0,
		height: "auto",
	},
	valueContainer: {
		display: "flex",
		flexWrap: "wrap",
		flex: 1,
		alignItems: "center",
		overflow: "hidden",
	},
	chipFocused: {
		backgroundColor: emphasize(
			theme.palette.type === "light"
				? theme.palette.grey[300]
				: theme.palette.grey[700],
			0.08,
		),
	},
	singleValue: {
		fontSize: 16,
	},
	zind: {
		zIndex: 0,
		position: "absolute",
	},
	placeholder: {
		position: "absolute",
		left: 2,
		bottom: 6,
		fontSize: 16,
	},
});
AddCoupon.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}

export default connect(mapStateToProps, { reqAddCoupon, reqEditCoupon })(
	withStyles(styles)(AddCoupon),
);
