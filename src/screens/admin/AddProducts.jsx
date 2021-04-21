/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
	reqGetCategoryProductList,
	reqAddProduct,
	reqGetCategoryList,
} from "../../actions";
import { toast } from "react-toastify";
import BaseComponent from "../../common/BaseComponent";
import CommonButton from "../../common/CommonButton";
import * as StringKeys from "../../res/StringKeys";
import * as Constants from "../../utils/Constants";
import * as Colors from "../../res/Colors";
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
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
import * as Dimens from "../../res/Dimens";
import CommoanAutocomplete from "../../common/CommoanAutocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

let TEXTFIELD_XS = 12;
let TEXTFIELD_MARGINTOP = 15;
let restoDetails = undefined;

class AddProducts extends BaseComponent {
	constructor(props) {
		super(props);
		restoDetails = Utility.isAdmin()
			? CustomStorage.getSessionDataAsObject(Constants.KEY_RESTO_DETAILS)
			: CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA)[
					Constants.KEY_RETSRO_DETAILS
			  ];
		console.log(
			"retsro details: ",
			JSON.stringify(
				CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA),
			),
		);
		this.state = {
			[Constants.KEY_IMAGE]: null,
			[Constants.KEY_NAME]: "",
			[Constants.KEY_STOCK_AVAIBILITY]: "",
			[Constants.KEY_PRICE]: "",
			[Constants.KEY_DISCOUNT_IN_PERCENT]: "",
			[Constants.KEY_DISCOUNTED_PRICE]: "",
			[Constants.KEY_GST_PRICE]: "",
			[Constants.KEY_FINAL_PRICE]: "",
			[Constants.KEY_DESCRIPTION]: "",
			errorText: "Empty field",
			iserror: false,
			[Constants.KEY_SHOW_PROGRESS]: false,
			[Constants.KEY_IS_RECOMMENDED]: false,
			[Constants.KEY_DATA]: [],
			[Constants.KEY_IMAGE_UPLOAD]: null,
			[Constants.KEY_CATEGORIES]:
				restoDetails[Constants.KEY_CATEGORIES] != undefined
					? restoDetails[Constants.KEY_CATEGORIES]
					: [],
			categoriesId: [],
			selectedCatOption: "",
			[Constants.KEY_GST_PERCENT]: "",
			[Constants.KEY_COOKING_TIME]: "",
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
		};
	}
	componentDidMount() {
		// if (Utility.isAdmin()) {
		//     this.getCatoryList();
		// }

		this.getProductCatoryList();
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
		if ([input] == Constants.KEY_PRICE) {
			let price =
				e.target.value != undefined && e.target.value != ""
					? e.target.value
					: 0;
			let gst = this.state[Constants.KEY_GST_PERCENT];
			let discountPercentage = this.state[Constants.KEY_DISCOUNT_IN_PERCENT];
			let gstPrice = this.getGstPriceValue(gst, price, discountPercentage);
			console.log("gst price=", gstPrice + "");
			this.setState({
				[input]: e.target.value,
				[Constants.KEY_GST_PRICE]: gstPrice,
				[Constants.KEY_FINAL_PRICE]: this.getFinalPrice(
					gst,
					price,
					discountPercentage,
				),
			});
		} else if ([input] == Constants.KEY_GST_PERCENT) {
			let gst =
				e.target.value != undefined && e.target.value != ""
					? e.target.value
					: 0;
			let price =
				this.state[Constants.KEY_PRICE] != undefined &&
				this.state[Constants.KEY_PRICE] != ""
					? this.state[Constants.KEY_PRICE]
					: 0;
			let discount = this.state[Constants.KEY_DISCOUNT_IN_PERCENT];
			let afterDiscount =
				discount != undefined && discount != "" && discount > 0
					? parseFloat(price) - (price * discount) / 100
					: 0;
			let gstPrice = this.getGstPriceValue(gst, price, discount);

			if (parseFloat(gst) > 100 || parseFloat(gst) < 0) {
				this.handleClick(this.strings(StringKeys.Gst_Invalid));
				return;
			} else if (parseFloat(discount) > 100 || parseFloat(discount) < 0) {
				this.handleClick(this.strings(StringKeys.Discount_Invalid));
				return;
			}
			console.log(
				"discounted price=",
				afterDiscount + "",
				"gstPrice=",
				gstPrice + "",
			);
			this.setState({
				[input]: e.target.value,
				[Constants.KEY_DISCOUNTED_PRICE]: afterDiscount,
				[Constants.KEY_GST_PRICE]: gstPrice,
				[Constants.KEY_FINAL_PRICE]: this.getFinalPrice(gst, price, discount),
			});
		} else if ([input] == Constants.KEY_DISCOUNT_IN_PERCENT) {
			let discount =
				e.target.value != undefined && e.target.value != ""
					? e.target.value
					: 0;
			let gst = this.state[Constants.KEY_GST_PERCENT];
			let price =
				this.state[Constants.KEY_PRICE] != undefined &&
				this.state[Constants.KEY_PRICE] != ""
					? this.state[Constants.KEY_PRICE]
					: 0;
			let afterDiscount =
				discount != undefined && discount != "" && discount > 0
					? parseFloat(price) - (price * discount) / 100
					: 0;
			// let gstPrice = (gst != undefined && gst != '' && gst > 0 ? (price * gst / 100) : 0)
			let gstPrice = this.getGstPriceValue(gst, price, discount);
			if (parseFloat(discount) > 100 || parseFloat(discount) < 0) {
				this.handleClick(this.strings(StringKeys.Discount_Invalid));
				return;
			} else if (parseFloat(gst) > 100 || parseFloat(gst) < 0) {
				this.handleClick(this.strings(StringKeys.Gst_Invalid));
				return;
			}
			console.log(
				"discounted price=",
				afterDiscount + "",
				"gstPrice=",
				gstPrice + "",
			);

			this.setState({
				[input]: e.target.value,
				[Constants.KEY_DISCOUNTED_PRICE]: afterDiscount,
				[Constants.KEY_GST_PRICE]: gstPrice,
				[Constants.KEY_FINAL_PRICE]: this.getFinalPrice(gst, price, discount),
			});
		} else {
			this.setState({
				[input]: e.target.value,
			});
		}
	};

	getGstPriceValue = (gst, price, discountInPerecent) => {
		if (gst == "") gst = 0.0;
		if (price == "") price = 0.0;
		if (discountInPerecent == "") discountInPerecent = 0.0;
		console.log(
			"gstPriceValue1 :  ",
			gst,
			" : ",
			price,
			" : ",
			discountInPerecent,
		);
		let afterDiscount =
			parseFloat(price) -
			(parseFloat(price) * parseFloat(discountInPerecent)) / 100;

		// let afterDiscount = (discountInPerecent != undefined && discountInPerecent != '' && discountInPerecent > 0 ? parseFloat(price) - (price * discountInPerecent / 100) : 0)

		// let mainPrice = price;
		// if (afterDiscount > 0)
		//     mainPrice = afterDiscount;
		let gstPriceValue =
			gst != undefined && gst != "" && gst > 0
				? (afterDiscount * gst) / 100
				: 0;
		console.log("gstPriceValue:  ", gstPriceValue);

		return gstPriceValue;
	};

	getFinalPrice = (gst, price, discountInPerecent) => {
		if (gst == "") gst = 0.0;
		if (price == "") price = 0.0;
		if (discountInPerecent == "") discountInPerecent = 0.0;

		let afterDiscount =
			parseFloat(price) -
			(parseFloat(price) * parseFloat(discountInPerecent)) / 100;

		console.log(
			"gstPriceValue1 :  ",
			gst,
			" : ",
			price,
			" : ",
			discountInPerecent,
			" : ",
			afterDiscount,
		);

		let gstPriceValue =
			gst != undefined && gst != "" && gst > 0
				? (afterDiscount * gst) / 100
				: 0;
		console.log("gstPriceValue:  ", gstPriceValue);

		return parseFloat(gstPriceValue) + parseFloat(afterDiscount);
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
	handleExited = () => {
		// this.processQueue();
	};

	handleSelectedCat = (selectedOption, isDeleted) => {
		console.log("sdfbkjsdbngkvfjn", selectedOption);

		this.setState({
			selectedCatOption: selectedOption,
		});
	};

	handleChangeProductType = (selectedOption, isDeleted) => {
		this.setState({
			selectedProductType: selectedOption,
		});
	};

	render() {
		const { classes } = this.props;
		const {
			image,
			name,
			stock_availability,
			price,
			discount,
			final_price,
			discount_in_percentage,
			categories,
			errorText,
			iserror,
			description,
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
					<div>
						<div className={classes.appBarSpacer} />

						<Grid>
							<Grid item xs={12} alignItems="center">
								<div>
									<div
										className={classes.bigAvatar}
										onClick={(e) => this.fileInput.click()}>
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
										style={{ display: "none" }}
										accept=".png, .jpg, .jpeg"
										onChange={this.ImagePress}
									/>
								</div>
							</Grid>

							<CommonGridTextField
								required
								xs={TEXTFIELD_XS}
								style={{ marginTop: TEXTFIELD_MARGINTOP }}
								id="productName"
								label={this.strings(StringKeys.Name)}
								fullWidth
								className={classes.textField}
								value={name}
								onChange={this.handleChange(Constants.KEY_NAME)}
								autoComplete="resname"
								variant="outlined"
								maxLengthVal={100}
								type={"text"}
								fieldStyle={classes.fieldHeight}
							/>

							<Grid
								item
								xs={TEXTFIELD_XS}
								alignItems="center"
								style={{ marginTop: 15 }}>
								<CommoanAutocomplete
									value={this.state.selectedProductType}
									options={this.state.productTypeArray}
									components={animatedComponents}
									onChange={this.handleChangeProductType}
									placeholder={this.strings(StringKeys.Select_Cuisine_Type)}
								/>
							</Grid>

							<CommonGridTextField
								xs={TEXTFIELD_XS}
								style={{ marginTop: TEXTFIELD_MARGINTOP }}
								id="cooking time"
								label={this.strings(StringKeys.Cooking_Time)}
								fullWidth
								className={classes.textField}
								value={this.state[Constants.KEY_COOKING_TIME]}
								onChange={this.handleChange(Constants.KEY_COOKING_TIME)}
								autoComplete="resname"
								variant="outlined"
								maxLengthVal={100}
								type={"number"}
								fieldStyle={classes.fieldHeight}
							/>

							<CommonGridTextField
								required
								xs={TEXTFIELD_XS}
								style={{ marginTop: TEXTFIELD_MARGINTOP }}
								id="price"
								maxLengthVal={12}
								type={"number"}
								fullWidth
								label={this.strings(StringKeys.Price)}
								className={classes.textField}
								value={price}
								onChange={this.handleChange(Constants.KEY_PRICE)}
								variant="outlined"
							/>

							<CommonGridTextField
								xs={TEXTFIELD_XS}
								style={{ marginTop: TEXTFIELD_MARGINTOP }}
								id="discount_percent"
								fullWidth
								maxLength={12}
								type={"number"}
								autoComplete="discount_percent"
								label={this.strings(StringKeys.Discount_Percent)}
								className={classes.textField}
								value={this.state[Constants.KEY_DISCOUNT_IN_PERCENT]}
								onChange={this.handleChange(Constants.KEY_DISCOUNT_IN_PERCENT)}
								variant="outlined"
							/>

							<CommonGridTextField
								xs={TEXTFIELD_XS}
								style={{ marginTop: TEXTFIELD_MARGINTOP }}
								id="gst_percent"
								fullWidth
								maxLength={12}
								type={"number"}
								autoComplete="gst_percent"
								label={this.strings(StringKeys.Gst_Percent)}
								className={classes.textField}
								value={this.state[Constants.KEY_GST_PERCENT]}
								onChange={this.handleChange(Constants.KEY_GST_PERCENT)}
								variant="outlined"
							/>

							<CommonGridTextField
								required={false}
								disabled={true}
								xs={TEXTFIELD_XS}
								style={{ marginTop: TEXTFIELD_MARGINTOP }}
								id="final_price"
								fullWidth
								maxLength={12}
								type={"number"}
								autoComplete="address-line2"
								label={this.strings(StringKeys.Final_Price)}
								className={classes.textField}
								value={final_price}
								onChange={this.handleChange(Constants.KEY_FINAL_PRICE)}
								variant="outlined"
							/>
							<CommonGridTextField
								required
								xs={TEXTFIELD_XS}
								style={{ marginTop: TEXTFIELD_MARGINTOP }}
								id="description"
								label={this.strings(StringKeys.Description)}
								fullWidth
								className={classes.textField}
								value={description}
								onChange={this.handleChange(Constants.KEY_DESCRIPTION)}
								autoComplete="resname"
								variant="outlined"
								maxLengthVal={200}
								type={"text"}
								fieldStyle={classes.fieldHeight}
							/>

							<Grid
								item
								xs={TEXTFIELD_XS}
								alignItems="center"
								style={{ marginTop: 15 }}>
								<CommoanAutocomplete
									value={this.state.selectedCatOption}
									options={this.state[Constants.KEY_CATEGORIES]}
									components={animatedComponents}
									onChange={this.handleSelectedCat}
									placeholder={this.strings(StringKeys.Select_Product_Type)}
								/>
							</Grid>
							<FormControlLabel
								control={
									<Checkbox
										checked={this.state[Constants.KEY_IS_RECOMMENDED]}
										value="remember"
										color={Colors.KEY_PRIMARY}
										onChange={(isChange) =>
											this.setState({
												[Constants.KEY_IS_RECOMMENDED]: !this.state[
													Constants.KEY_IS_RECOMMENDED
												],
											})
										}
									/>
								}
								label={this.strings(StringKeys.Is_Recommended)}
							/>
						</Grid>
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

	checkVaidation = (event) => {
		event.preventDefault();

		const {
			name,
			stock_availability,
			price,
			discount,
			discount_in_percentage,
			final_price,
			image_upload,
			description,
		} = this.state;

		var data = {
			[Constants.KEY_NAME]: name,
			[Constants.KEY_PRICE]: price,
			[Constants.KEY_STOCK_AVAIBILITY]: 1,
			[Constants.KEY_DISCOUNT_IN_PERCENT]:
				this.state[Constants.KEY_DISCOUNT_IN_PERCENT] != "" &&
				this.state[Constants.KEY_DISCOUNT_IN_PERCENT] != undefined &&
				this.state[Constants.KEY_DISCOUNT_IN_PERCENT] != null
					? this.state[Constants.KEY_DISCOUNT_IN_PERCENT]
					: 0,
			// ["gst_in_perecent"]:this.state["gst_in_perecent"],
			[Constants.KEY_FINAL_PRICE]: final_price,
			[Constants.KEY_IS_RECOMMENDED]: this.state[Constants.KEY_IS_RECOMMENDED],
			[Constants.KEY_DISCOUNTED_PRICE]:
				this.state[Constants.KEY_DISCOUNTED_PRICE] != "" &&
				this.state[Constants.KEY_DISCOUNTED_PRICE] != undefined &&
				this.state[Constants.KEY_DISCOUNTED_PRICE] != null
					? this.state[Constants.KEY_DISCOUNTED_PRICE]
					: 0,
			[Constants.KEY_GST_PRICE]:
				this.state[Constants.KEY_GST_PRICE] != "" &&
				this.state[Constants.KEY_GST_PRICE] != undefined
					? this.state[Constants.KEY_GST_PRICE]
					: 0,

			[Constants.KEY_PRODUCT_TYPE]:
				this.state.selectedProductType != undefined &&
				this.state.selectedProductType != ""
					? this.state.selectedProductType[Constants.KEY_VALUE]
					: "",
			[Constants.KEY_COOKING_TIME]: this.state[Constants.KEY_COOKING_TIME],
			[Constants.KEY_GST_PERCENT]:
				this.state[Constants.KEY_GST_PERCENT] != undefined &&
				this.state[Constants.KEY_GST_PERCENT] != null &&
				this.state[Constants.KEY_GST_PERCENT] != ""
					? this.state[Constants.KEY_GST_PERCENT]
					: 0,
			[Constants.KEY_DESCRIPTION]:
				description == "" || description == undefined || description == null
					? "0"
					: description,
			[Constants.KEY_RESTO_ID]: restoDetails._id,
			[Constants.KEY_PRODUCT_CATE_ID]:
				this.state.selectedCatOption != undefined &&
				this.state.selectedCatOption != ""
					? this.state.selectedCatOption._id
					: undefined,
		};
		let imageSource = {
			[Constants.KEY_IMG_NAME]: this.state[Constants.KEY_IMG],
		};

		if (Utility.checkVaidationAddProduct(data, imageSource, this)) {
			if (
				data[Constants.KEY_PRODUCT_CATE_ID] != undefined &&
				data[Constants.KEY_PRODUCT_CATE_ID] != ""
			) {
				this.addProductReq(data);
			} else {
				this.handleClick("Please select category type");
			}
		}
	};

	addProductReq = (data) => {
		if (
			this.state[Constants.KEY_IMAGE_UPLOAD] !== null &&
			this.state[Constants.KEY_IMAGE_UPLOAD] !== undefined
		) {
			data[Constants.KEY_IMAGE] = this.state[Constants.KEY_IMAGE_UPLOAD];
		}

		this.props.reqAddProduct(data, this);
	};

	getRestoList = () => {
		var data = {
			offset: 0,
		};
		this.props.reqGetRestoList(data, this);
	};

	getCatoryList = () => {
		let data = {
			[Constants.KEY_USERID]: undefined,
		};
		this.props.reqGetCategoryList(data, this);
	};

	getProductCatoryList = () => {
		let data = {
			[Constants.KEY_USERID]: restoDetails[Constants.KEY_UNDERSCORE_ID],
		};
		this.props.reqGetCategoryProductList(data, this);
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
			if (nextProps[Constants.KEY_TYPE] === types.API_ADD_PRODUCT) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					disabledClickedBtn: false,
				};
				toast("product add successfully");
				this.setState(respObj);
				this.goBack();
			} else if (nextProps[Constants.KEY_TYPE] === types.API_RESTRO_LIST) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							Constants.KEY_RESTRO_LIST
						],
				};
				this.setState(respObj);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_LIST_CATEGORY) {
				// alert('data kd ' + JSON.stringify(nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA]));

				var respObjTmp = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_CATEGORIES]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				console.log("res ", respObjTmp);
				this.setState(respObjTmp);
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
AddProducts.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}

export default connect(mapStateToProps, {
	reqGetCategoryProductList,
	reqGetCategoryList,
	reqAddProduct,
})(withStyles(styles)(AddProducts));
