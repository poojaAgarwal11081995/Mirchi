/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import BaseComponent from "../../common/BaseComponent";
import CommonButton from "../../common/CommonButton";
import * as StringKeys from "../../res/StringKeys";
import * as Constants from "../../utils/Constants";
import * as ResourcesConstants from "../../res/ResourcesConstants";
import { connect } from "react-redux";
import {
	reqAddCateProductGrocery,
	reqSelectedCateGrocery,
} from "../../actions";
import * as types from "../../actions/types";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
import Avatar from "@material-ui/core/Avatar";
import CustomPBar from "../../common/CustomPBar";
import CommonGridTextField from "../../common/CommonGridTextField";
import * as CustomStorage from "../../utils/CustomStorage";
import * as Dimens from "../../res/Dimens";
import * as Utility from "../../utils/Utility";
import CommoanAutocomplete from "../../common/CommoanAutocomplete";
import CommonSnackbar from "../../common/CommonSnackbar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let toastStyle = { background: "#F62C3A", text: "#FFFFFF" };

const groceryDetails = undefined;
const userData = undefined;

let TEXTFIELD_XS = 12;
let TEXTFIELD_MARGINTOP = 10;

function resizeImage(image, maxWidth, maxHeight, quality) {
	var canvas = document.createElement("canvas");
	var width = image.width;
	var height = image.height;

	if (width > height) {
		if (width > maxWidth) {
			height = Math.round((height * maxWidth) / width);
			width = maxWidth;
		}
	} else {
		if (height > maxHeight) {
			width = Math.round((width * maxHeight) / height);
			height = maxHeight;
		}
	}

	canvas.width = width;
	canvas.height = height;

	var ctx = canvas.getContext("2d");
	ctx.drawImage(image, 0, 0, width, height);
	return canvas.toDataURL("image/jpeg", quality);
}

class AddProductCategoryGrocery extends BaseComponent {
	constructor(props) {
		super(props);
		groceryDetails = CustomStorage.getSessionDataAsObject(
			Constants.KEY_GROCERY_DETAILS,
		);
		this.state = {
			[Constants.KEY_IMAGE]: null,
			[Constants.KEY_IMAGE_NAME]: "",
			[Constants.KEY_IMAGE_UPLOAD]: null,
			[Constants.KEY_NAME]: "",
			[Constants.KEY_DESCRIPTION]: "",
			[Constants.KEY_SHOW_PROGRESS]: false,
			disabledClickedBtn: false,
			[Constants.KEY_DATA]: [],
			selectedType: "",
			errorText: "Empty field",
			iserror: false,
		};
		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
	}

	componentDidMount() {
		this.getCatoryList();
	}

	ImagePress = (e) => {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];
		console.log("reader file: ", file);
		this.setState({ [Constants.KEY_IMAGE_UPLOAD]: file });

		reader.onloadend = () => {
			this.setState({ [Constants.KEY_IMAGE]: reader.result });
		};
		reader.readAsDataURL(file);
	};

	_onChange = (file) => {
		var files = file;
		var self = this;
		var maxWidth = 200;
		var maxHeight = 200;

		this.resize(files, maxWidth, maxHeight, function (resizedDataUrl) {
			alert(resizedDataUrl);
		});
	};
	resize(file, maxWidth, maxHeight, fn) {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function (event) {
			var dataUrl = event.target.result;
			var image = new Image();
			image.src = dataUrl;
			image.onload = function () {
				var resizedDataUrl = resizeImage(image, maxWidth, maxHeight, 0.7);
				fn(resizedDataUrl);
			};
		};
	}

	handleCatType = (selectedOption) => {
		//   console.log('ref=', this.onPageReportUser);
		this.setState({
			selectedType: selectedOption,
		});
	};

	handleChange = (input) => (e) => {
		console.log("input", input);
		console.log("value", e.target.value);
		this.setState({
			[input]: e.target.value,
		});
	};
	handleResponse = (nextProps) => {
		toast(nextProps["message"]);
		var respObj = null;
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		} else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (nextProps[Constants.KEY_TYPE] === types.API_ADD_CATEGORY_GROCERY) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					disabledClickedBtn: false,
				};
				// this.setState(respObj);
				// this.goBack();

				if (userData != undefined && userData != null) {
					toast(
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE],
						toastStyle,
					);
				} else {
					toast(
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE],
						toastStyle,
					);
				}

				setTimeout(() => {
					this.setState(respObj);
					this.goBack();
				}, Constants.TIME_OUT_TOAST);
			} else if (
				nextProps[Constants.KEY_TYPE] === types.API_SELECTED_CATEGORY_GROCERY
			) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				};
				this.setState(respObj);
			}
		}
	};

	handleClose = () => {
		this.setState({ iserror: false });
	};

	handleClick = (msg) => {
		this.setState({
			iserror: true,
			errorText: msg,
		});
	};

	render() {
		const { classes } = this.props;
		const { image, name, description } = this.state;

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

						<CommonGridTextField
							required
							xs={TEXTFIELD_XS}
							style={{ marginTop: TEXTFIELD_MARGINTOP }}
							id="categoryName"
							fullWidth
							label={this.strings(StringKeys.Category_Name)}
							className={classes.textField}
							value={name}
							onChange={this.handleChange(Constants.KEY_NAME)}
							variant="outlined"
						/>
						{/* <ToastContainer autoClose={Constants.TIME_OUT_TOAST} /> */}

						<CommonGridTextField
							required
							xs={TEXTFIELD_XS}
							style={{ marginTop: TEXTFIELD_MARGINTOP }}
							id="description"
							fullWidth
							label={this.strings(StringKeys.Description)}
							className={classes.textField}
							value={description}
							onChange={this.handleChange(Constants.KEY_DESCRIPTION)}
							variant="outlined"
						/>
						{/* <Grid xs={TEXTFIELD_XS} style={{ marginTop: 10, }}>
                            <CommoanAutocomplete
                                value={this.state.selectedType}
                                options={this.state[Constants.KEY_DATA]}
                                components={animatedComponents}
                                onChange={this.handleCatType}
                                placeholder={this.strings(StringKeys.Select_Store_Type)}
                            /></Grid> */}
					</Grid>
					<CommonButton
						type="submit"
						fullWidth={false}
						variant="contained"
						color="secondary"
						ref={(btnAddCate) => (this.btnAddCate = btnAddCate)}
						className={classes.submit}
						onClick={this.addEditCate}
						label={this.strings(StringKeys.Save)}
						disabled={this.state.disabledClickedBtn}
					/>

					<CommonSnackbar
						onClose={this.handleClose}
						open={this.state.iserror}
						message={this.state.errorText}></CommonSnackbar>
				</Fragment>
			);
	}

	addEditCate = (event) => {
		event.preventDefault();

		const { name, image_upload, description } = this.state;
		var data = {
			[Constants.KEY_LABEL]: name,
			[Constants.KEY_DESCRIPTION]: description,
			[Constants.KEY_ROLE]: Constants.ROLE_SUPER_ADMIN,

			[Constants.KEY_USERID]: !Utility.isAdmin()
				? userData[Constants.KEY_USERID]
				: groceryDetails != undefined
				? groceryDetails[Constants.KEY_UNDERSCORE_ID]
				: userData[Constants.KEY_USERID],
		};

		let imageSource = {
			[Constants.KEY_IMAGE_NAME]: this.state[Constants.KEY_IMAGE],
		};

		if (image_upload !== null && image_upload !== undefined) {
			data[Constants.KEY_IMAGE] = image_upload;
			console.warn("image for uploading 2 ", data);
		}
		if (
			this.state.selectedType != undefined &&
			this.state.selectedType != "" &&
			this.state.selectedType != null
		) {
			data[Constants.KEY_PARENT_CATEGORY_ID] = this.state.selectedType[
				Constants.KEY_UNDERSCORE_ID
			];
		}

		if (Utility.addCateValidation(data, imageSource, this))
			this.props.reqAddCateProductGrocery(data, this);
	};
	componentWillUnmount() {}

	getCatoryList = () => {
		let data = {
			[Constants.KEY_USERID]: !Utility.isAdmin()
				? userData[Constants.KEY_USERID]
				: groceryDetails != undefined
				? groceryDetails[Constants.KEY_UNDERSCORE_ID]
				: userData[Constants.KEY_USERID],
		};
		this.props.reqSelectedCateGrocery(data, this);
	};
}

const styles = (theme) => ({
	appBarSpacer: theme.mixins.toolbar,
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
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
	mainView: {
		display: "flex",
		height: "100vh",
		width: "100vw",
	},
});
AddProductCategoryGrocery.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, {
	reqSelectedCateGrocery,
	reqAddCateProductGrocery,
})(withStyles(styles)(AddProductCategoryGrocery));
