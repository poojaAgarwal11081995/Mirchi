/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import BaseComponent from "../../../common/BaseComponent";
import CommonButton from "../../../common/CommonButton";
import * as StringKeys from "../../../res/StringKeys";
import * as Constants from "../../../utils/Constants";
import * as Utility from "../../../utils/Utility";
import * as ResourcesConstants from "../../../res/ResourcesConstants";
import { connect } from "react-redux";
import { reqEditCate } from "../../../actions";
import * as types from "../../../actions/types";
import Avatar from "@material-ui/core/Avatar";
import * as CustomStorage from "../../../utils/CustomStorage";
import CommonGridTextField from "../../../common/CommonGridTextField";
import * as Dimens from "../../../res/Dimens";
import CustomPBar from "../../../common/CustomPBar";

let TEXTFIELD_XS = 12;
let TEXTFIELD_MARGINTOP = 15;
let cateDetails = undefined;
let userData = undefined;

class CategoryDetail extends BaseComponent {
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
		cateDetails = CustomStorage.getSessionDataAsObject(
			Constants.KEY_CATEGORIES_DETAILS,
			undefined,
		);
		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
	}

	componentDidMount() {
		let respObj = {
			[Constants.KEY_NAME]: cateDetails.label,
			[Constants.KEY_DESCRIPTION]: cateDetails.description,
			[Constants.KEY_IMAGE]: cateDetails.image,
		};
		this.setState(respObj);
		//  alert(JSON.stringify(userData.userid) + ' i d ' + cateDetails._id)
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

	handleChange = (input) => (e) => {
		console.log("input", input);
		console.log("value", e.target.value);
		this.setState({
			[input]: e.target.value,
		});
	};
	handleInputChange = (input) => (event) => {
		this.setState({
			isTopCat: true,
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
			if (nextProps[Constants.KEY_TYPE] === types.API_EDIT_CATEGORY) {
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

						<label>
							<input
								required
								name="isTopCat"
								type="checkbox"
								checked={this.state.isTopCat}
								onClick={this.handleInputChange(this.state.isTopCat)}
							/>{" "}
							is Top Category
						</label>
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
			is_top_category: isTopCat,
			[Constants.KEY_LABEL]: name,
			[Constants.KEY_STATUS]: true,
			[Constants.KEY_DESCRIPTION]: description,
			[Constants.KEY_ROLE]: userData[Constants.KEY_ROLE],
			[Constants.KEY_UNDERSCORE_ID]: cateDetails[Constants.KEY_UNDERSCORE_ID],
			[Constants.KEY_USERID]: userData[Constants.KEY_USERID],
		};
		if (image_upload !== null && image_upload !== undefined) {
			data[Constants.KEY_IMAGE] = Utility.getPicUpload(image_upload);
			console.log("image for uploading 2 ", data);
		}
		this.props.reqEditCate(data, this);
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
CategoryDetail.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, { reqEditCate })(
	withStyles(styles)(CategoryDetail),
);
