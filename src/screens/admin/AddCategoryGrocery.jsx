/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import SimpleTable from "./SimpleTable";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { toast, ToastContainer } from "react-toastify";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import BaseComponent from "../../common/BaseComponent";
import CommonButton from "../../common/CommonButton";
import CommonTextField from "../../common/CommonTextField";
import * as StringKeys from "../../res/StringKeys";
import * as Constants from "../../utils/Constants";
import * as Utility from "../../utils/Utility";
import * as ResourcesConstants from "../../res/ResourcesConstants";
import { connect } from "react-redux";
import { reqAddCateGrocery } from "../../actions";
import * as types from "../../actions/types";

import Avatar from "@material-ui/core/Avatar";
import CustomPBar from "../../common/CustomPBar";
import CommonGridTextField from "../../common/CommonGridTextField";
import * as CustomStorage from "../../utils/CustomStorage";
import * as Dimens from "../../res/Dimens";

const userData = {};

let TEXTFIELD_XS = 12;
let TEXTFIELD_MARGINTOP = 15;

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

class AddCategoryGrocery extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			isTopCat: false,
			[Constants.KEY_IMAGE]: null,
			[Constants.KEY_IMAGE_UPLOAD]: null,
			[Constants.KEY_NAME]: "",
			[Constants.KEY_DESCRIPTION]: "",
			[Constants.KEY_SHOW_PROGRESS]: false,
			disabledClickedBtn: false,
		};
		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
		this.handleInputChange = this.handleInputChange.bind(this);
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
	handleInputChange = (input) => (event) => {
		this.setState({
			isTopCat: true,
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
		toast(nextProps[Constants.KEY_MESSAGE]);
		var respObj = null;
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				isTopCat: false,
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};

			this.setState(respObj);
		} else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (nextProps[Constants.KEY_TYPE] === types.API_ADD_CATEGORY_GROCERY) {
				toast(nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE]);
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					disabledClickedBtn: false,
					isTopCat: false,
				};

				this.setState(respObj);
				this.goBack();
			}
		}
	};
	render() {
		const { classes } = this.props;
		const { image, name, description } = this.state;

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
						<br />

						{/* <label>
							<input
								required
								name="isTopCat"
								type="checkbox"
								checked={this.state.isTopCat}
								onClick={this.handleInputChange(this.state.isTopCat)}
							/>{" "}
							is Top Category
						</label> */}
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
					{/* <CustomPBar showProgress={this.state[Constants.KEY_SHOW_PROGRESS]}
                    mainView={classes.mainView} /> */}
				</Fragment>
			);
	}

	addEditCate = (event) => {
		event.preventDefault();
		const { name, image_upload, description, isTopCat } = this.state;

		var data = {
			// is_top_category: isTopCat,
			[Constants.KEY_LABEL]: name,
			[Constants.KEY_DESCRIPTION]: description,
			[Constants.KEY_ROLE]: userData[Constants.KEY_ROLE],
			[Constants.KEY_USERID]: userData[Constants.KEY_USERID],
		};
		if (image_upload !== null && image_upload !== undefined) {
			data[Constants.KEY_IMAGE] = image_upload;
			console.warn("image for uploading 2 ", data);
		}

		this.props.reqAddCateGrocery(data, this);
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
AddCategoryGrocery.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, { reqAddCateGrocery })(
	withStyles(styles)(AddCategoryGrocery),
);
