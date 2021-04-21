/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import {
	reqAddDiscountGrocery,
	reqDiscountDetailsGrocery,
	reqEditDiscountGrocery,
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
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import * as CustomStorage from "../../utils/CustomStorage";
import * as Dimens from "../../res/Dimens";
import CommonDatePicketBtn from "../../common/CommonDatePicketBtn";
import CommonDatePicker from "../../common/CommonDatePicker";
import { toast } from "react-toastify";
import ReportDatePicker from "../../common/ReportDatePicker";

let TEXTFIELD_XS = 12;
let TEXTFIELD_MARGINTOP = 15;

let TEXTFIELD_XS_CHILD = 6;
let TEXTFIELD_XS_SUB_CHILD = 2;
//let TEXTFIELD_MARGINTOP = 10;
let TEXTFIELD_MARGINTOP_PLUS = 15;

let userDetails = undefined;
let discountDetails = undefined;

class AddDiscountGrocery extends BaseComponent {
	constructor(props) {
		super(props);
		userDetails = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
		discountDetails = CustomStorage.getSessionDataAsObject(
			Constants.KEY_COUPON_DETAILS,
		);
		//console.log('retsro details: ', JSON.stringify(restoDetails));
		this.state = {
			[Constants.KEY_IMAGE]: null,
			[Constants.KEY_IMAGE_UPLOAD]: null,
			[Constants.KEY_IMAGE_NAME]: "",

			errorText: "Empty field",
			iserror: false,
			[Constants.KEY_SHOW_PROGRESS]: false,
			[Constants.KEY_DATA]: [],
			//  [Constants.KEY_IMAGE]: "",
			[Constants.KEY_DISCOUNT_IN_PERCENT]: "",

			[Constants.KEY_DISCOUNT_DETAILS]: "",
			selectedProductType: "",
			[Constants.KEY_VALID_FROM]: null,
			[Constants.KEY_VALID_TO]: null,
			// [Constants.KEY_VALID_FROM]: Utility.convertDate(new Date()),
			// [Constants.KEY_VALID_TO]: Utility.convertDate(new Date()),
		};
	}
	componentDidMount() {
		if (
			discountDetails == undefined ||
			discountDetails == null ||
			discountDetails == ""
		) {
			this.setState({
				isEdiable: true,
			});
		}
		this.getDiscountDetails();
	}

	onSelectedDate = (date, key) => {
		this.setState({ [key]: date });
	};

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
					<div>
						<div className={classes.appBarSpacer} />
						<Grid container spacing={0}>
							<Grid item xs={12} alignItems="center">
								<div>
									<div
										className={classes.bigAvatar}
										onClick={(e) =>
											this.state.isEdiable && this.fileInput.click()
										}>
										<Avatar
											style={{ borderRadius: 0 }}
											alt="Remy Sharp"
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
										required="required"
										style={{ display: "none" }}
										accept=".png, .jpg, .jpeg"
										onChange={this.ImagePress}
									/>
								</div>
							</Grid>

							<CommonGridTextField
								xs={TEXTFIELD_XS}
								id="coupon_des"
								required
								style={{ marginTop: TEXTFIELD_MARGINTOP }}
								label={this.strings(StringKeys.Discount_Details)}
								fullWidth
								className={classes.textField}
								value={this.state[Constants.KEY_DISCOUNT_DETAILS]}
								onChange={this.handleChange(Constants.KEY_DISCOUNT_DETAILS)}
								autoComplete="resname"
								variant="outlined"
								maxLengthVal={100}
								type={"text"}
								fieldStyle={classes.fieldHeight}
							/>

							<CommonGridTextField
								xs={TEXTFIELD_XS}
								required={this.state.isEdiable}
								disabled={!this.state.isEdiable}
								style={{ marginTop: TEXTFIELD_MARGINTOP }}
								id="discount_percent"
								fullWidth
								maxLength={12}
								type={"numder"}
								autoComplete="discount_percent"
								label={this.strings(StringKeys.Discount_In_Percentage)}
								className={classes.textField}
								value={this.state[Constants.KEY_DISCOUNT_IN_PERCENT]}
								onChange={this.handleChange(Constants.KEY_DISCOUNT_IN_PERCENT)}
								variant="outlined"
							/>

							<Grid
								container
								direction="row"
								justify="space-between"
								alignItems="center">
								<Grid
									item
									xs={TEXTFIELD_XS_CHILD}
									style={{
										paddingRight: 10,
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
								<Grid
									item
									xs={TEXTFIELD_XS_CHILD}
									style={{
										paddingRight: 10,
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
							</Grid>
						</Grid>
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
				</Fragment>
			);
	}

	listenDate = (date, key) => {
		console.log("date=", date);
		this.setState({
			[key]: date,
		});
	};

	checkVaidation = (event) => {
		event.preventDefault();
		var data = {
			// [Constants.KEY_IMAGE]: this.state[Constants.KEY_IMAGE],
			[Constants.KEY_DISCOUNT_DETAILS]: this.state[
				Constants.KEY_DISCOUNT_DETAILS
			],
			[Constants.KEY_DISCOUNT_IN_PERCENT]: this.state[
				Constants.KEY_DISCOUNT_IN_PERCENT
			],
			[Constants.KEY_VALID_FROM]: this.state[Constants.KEY_VALID_FROM],
			[Constants.KEY_VALID_TO]: this.state[Constants.KEY_VALID_TO],
			[Constants.KEY_CREATED_BY]: userDetails[Constants.KEY_USERID],
			[Constants.KEY_CREATED_BY_USER_TYPE]: userDetails[Constants.KEY_ROLE],
		};

		// console.log('request =', JSON.stringify(data))
		if (Utility.checkVaidationAddDiscount(data, this)) {
			this.addDiscountReq(data);
		}
	};

	addDiscountReq = (data) => {
		if (
			this.state[Constants.KEY_IMAGE_UPLOAD] !== null &&
			this.state[Constants.KEY_IMAGE_UPLOAD] !== undefined
		) {
			data[Constants.KEY_IMAGE] = this.state[Constants.KEY_IMAGE_UPLOAD];

			console.log("dshhjfdjf", data);
		}
		if (discountDetails != undefined && discountDetails != null) {
			data[Constants.KEY_UNDERSCORE_ID] =
				discountDetails[Constants.KEY_UNDERSCORE_ID];
			this.props.reqEditDiscountGrocery(data, this);
		} else {
			this.props.reqAddDiscountGrocery(data, this);
		}
	};

	getDiscountDetails = (data) => {
		var data = {
			[Constants.KEY_CREATED_BY]: userDetails[Constants.KEY_USERID],
		};
		this.props.reqDiscountDetailsGrocery(data, this);
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
				nextProps[Constants.KEY_TYPE] === types.API_ADD_DISCOUNT_GROCERY ||
				nextProps[Constants.KEY_TYPE] === types.API_EDIT_DISCOUNT_GROCERY
			) {
				toast(nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE]);
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					disabledClickedBtn: false,
				};
				this.setState(respObj);
			}
			if (
				nextProps[Constants.KEY_TYPE] === types.API_DISCOUNT_DETAILS_GROCERY
			) {
				if (
					nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA] != undefined
				) {
					respObj = {
						[Constants.KEY_SHOW_PROGRESS]: false,
						[Constants.KEY_IMAGE]:
							nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA] !=
								undefined &&
							nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
						discountDetails:
							nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA] !=
								undefined &&
							nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
						[Constants.KEY_DISCOUNT_DETAILS]:
							nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA] !=
								undefined &&
							nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
								Constants.KEY_DISCOUNT_DETAILS
							],
						[Constants.KEY_DISCOUNT_IN_PERCENT]:
							nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA] !=
								undefined &&
							nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
								Constants.KEY_DISCOUNT_IN_PERCENT
							],
						[Constants.KEY_VALID_FROM]:
							nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
								Constants.KEY_VALID_FROM
							],
						[Constants.KEY_VALID_TO]:
							nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
								Constants.KEY_VALID_TO
							],
						[Constants.KEY_IMAGE]:
							nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
								Constants.KEY_IMAGE
							],
					};
					discountDetails =
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA];
				} else {
					respObj = {
						[Constants.KEY_SHOW_PROGRESS]: false,
					};
				}
				this.setState(respObj);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_GROCERY_LIST) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							Constants.KEY_GROCERY_LIST
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
AddDiscountGrocery.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}

export default connect(mapStateToProps, {
	reqAddDiscountGrocery,
	reqDiscountDetailsGrocery,
	reqEditDiscountGrocery,
})(withStyles(styles)(AddDiscountGrocery));
