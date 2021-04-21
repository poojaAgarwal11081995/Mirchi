/** @format */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { reqEditUser } from "../../actions";
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
import makeAnimated from "react-select/animated";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DateRange from "@material-ui/icons/DateRange";
import CommonDatePicketBtn from "../../common/CommonDatePicketBtn";
import LocationSearchInput from "../locationservice/LocationSearchInput";
import CommonImageSelector from "../../common/CommonImageSelector";
import CommonDocImageViewer from "../../common/CommonDocImageViewer";
import { toast } from "react-toastify";
const animatedComponents = makeAnimated();
let TEXTFIELD_XS = 12;
let TEXTFIELD_MARGINTOP = 0;
let userData = undefined;

class AddUserGrocery extends BaseComponent {
	constructor(props) {
		super(props);
		userData = this.props.location[Constants.KEY_USER_DATA];
		this.state = {
			[Constants.KEY_IMAGE]: null,
			[Constants.KEY_NAME]:
				userData !== undefined ? userData[Constants.KEY_NAME] : "",
			[Constants.KEY_EMAIL]:
				userData !== undefined ? userData[Constants.KEY_EMAIL] : "",

			[Constants.KEY_PHONE]:
				userData !== undefined ? userData[Constants.KEY_PHONE] : "",
			[Constants.KEY_PASSWORD]: "",
		};

		//    DRIVER_ID = this.props.location[Constants.KEY_DRIVER_ID];
	}

	componentDidMount() {}

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

	getPickerValue = (value) => {
		console.log(value);
	};

	listenDate = (date) => {
		this.setState({
			[Constants.KEY_LICENSE_EXPIRY_DATE]: date,
		});
	};

	render() {
		const { classes } = this.props;

		const {
			image,
			name,
			phone,
			email,
			password,
			errorText,
			iserror,
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

						<Grid container spacing={5}>
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
			[Constants.KEY_PASSWORD]: this.state[Constants.KEY_PASSWORD],
			[Constants.KEY_IMAGE]: this.state[Constants.KEY_IMAGE],
		};
		// if (this.state[Constants.KEY_PASSWORD] !== '')
		//     data[Constants.KEY_PASSWORD] = this.state[Constants.KEY_PASSWORD]
		if (
			userData !== undefined &&
			userData[Constants.KEY_COUNTRY_CODE] !== undefined
		)
			data[Constants.KEY_COUNTRY_CODE] = userData[Constants.KEY_COUNTRY_CODE];
		else {
			data[Constants.KEY_COUNTRY_CODE] = Constants.COUNTRY_CODE_VALUE;
		}
		if (
			userData !== undefined &&
			userData[Constants.KEY_UNDERSCORE_ID] !== undefined
		)
			data[Constants.KEY_UNDERSCORE_ID] = userData[Constants.KEY_UNDERSCORE_ID];
		data[Constants.KEY_ROLE_FOR_USER] = Constants.ROLE_USER;
		if (Utility.checkVaidationEditUser(data, this)) {
			this.editUserReq(data);
		}
	};

	editUserReq = (data) => {
		if (
			this.state[Constants.KEY_IMAGE_UPLOAD] !== null &&
			this.state[Constants.KEY_IMAGE_UPLOAD] !== undefined
		) {
			data[Constants.KEY_IMAGE] = this.state[Constants.KEY_IMAGE_UPLOAD];
		}
		console.log(data, "user", userData);
		this.props.reqEditUser(data, this);
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
				nextProps[Constants.KEY_TYPE] === types.API_EDIT_USER ||
				nextProps[Constants.KEY_TYPE] === types.API_ADD_USER
			) {
				toast(nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE]);
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					disabledClickedBtn: false,
				};
				this.setState(respObj);
				this.goBack();
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

AddUserGrocery.propTypes = {
	classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
	return response;
}

export default connect(mapStateToProps, { reqEditUser })(
	withStyles(styles)(AddUserGrocery),
);
