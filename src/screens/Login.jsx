/** @format */

import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as Constants from "../utils/Constants";
import * as CustomStorage from "../utils/CustomStorage";
import * as Utility from "../utils/Utility";
import { reqLogin, reqRestroLogin, reqGroceryLogin } from "../actions";
import BaseComponent from "../common/BaseComponent";
import CommonButton from "../common/CommonButton";
import CustomPBar from "../common/CustomPBar";
import CommonTextField from "../common/CommonTextField";
import * as StringKeys from "../res/StringKeys";
import { connect } from "react-redux";
import * as types from "../actions/types";
import * as Colors from "../res/Colors";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let toastStyle = { background: "#F62C3A", text: "#FFFFFF" };

let user_type = Constants.ROLE_SUPER_ADMIN;

class Login extends BaseComponent {
	constructor(props) {
		super(props);

		let web_page_name = window.location.href.split("/");
		console.log("web_page_name login :- ", web_page_name);

		if (
			web_page_name[web_page_name.length - 1] ==
				Constants.WEB_TYPE_RESTAURANT_WITHOUT_SLACE ||
			web_page_name[web_page_name.length - 2] ==
				Constants.WEB_TYPE_RESTAURANT_WITHOUT_SLACE
		) {
			user_type = Constants.ROLE_RESTAURANT;
			console.log("web_page_name 2 app login: - ", user_type);
		}
		if (
			web_page_name[web_page_name.length - 1] ==
				Constants.WEB_TYPE_GROCERY_WITHOUT_SLACE ||
			web_page_name[web_page_name.length - 2] ==
				Constants.WEB_TYPE_GROCERY_WITHOUT_SLACE
		) {
			user_type = Constants.ROLE_GROCERY;
			console.log("web_page_name 3 app login: - ", user_type);
		}
		this.state = {
			email: "",
			password: "",
			emailError: false,
			passwordError: false,
			data: null,
			isCheck: false,
		};
		CustomStorage.clearSessionData();
		CustomStorage.setSessionDataAsObject(Constants.KEY_LOGIN_TYPE, user_type);
		// console.log('user_type 2 :- ', temp_user_type)
	}

	componentDidMount() {
		//this.callFetch();
		this.setState({
			email: "",
			password: "",
		});
	}

	handleClick = (Transition) => {
		this.setState({
			iserror: true,
			errorText: Transition,
		});
	};

	handleChange = (input) => (e) => {
		console.log("input", input);
		console.log("value", e.target.value);
		this.setState({
			[input]: e.target.value,
		});
	};

	checkValidation = (event) => {
		event.preventDefault();
		const { email, password } = this.state;

		var data = {
			email: email,
			password: password,
			[Constants.KEY_ROLE]: user_type,
		};

		this.loginReq(data, this);
	};

	loginReq = (data) => {
		if (user_type == Constants.ROLE_SUPER_ADMIN) {
			this.props.reqLogin(data, this);
		} else if (user_type == Constants.ROLE_RESTAURANT) {
			this.props.reqRestroLogin(data, this);
		} else if (user_type == Constants.ROLE_GROCERY) {
			this.props.reqGroceryLogin(data, this);
		}
	};

	error = (message) => (
		<FormHelperText style={{ color: "red" }}>{message}</FormHelperText>
	);
	render() {
		const { classes } = this.props;
		const { email, password } = this.state;
		if (
			localStorage.getItem(Constants.KEY_USER_DATA) !== undefined &&
			localStorage.getItem(Constants.KEY_USER_DATA) !== null
		) {
			localStorage.clear();
		}
		return (
			<div className={classes.mainView}>
				<main className={classes.main}>
					<CssBaseline />
					<Paper className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							{user_type == Constants.ROLE_SUPER_ADMIN &&
								this.strings(StringKeys.Login)}
							{user_type == Constants.ROLE_RESTAURANT &&
								this.strings(StringKeys.Restaurant_Login)}
							{user_type == Constants.ROLE_GROCERY &&
								this.strings(StringKeys.Grocery_Login)}
						</Typography>
						<form className={classes.form}>
							<FormControl margin="normal" fullWidth>
								<CommonTextField
									id="email"
									label="Email"
									required
									className={classes.textField}
									value={email}
									type="email"
									onChange={this.handleChange("email")}
									margin="normal"
									autoFocus
								/>
								{this.state.emailError && this.error("invalid Email")}
							</FormControl>
							<FormControl margin="normal" fullWidth>
								<CommonTextField
									id="password"
									label="Password"
									required
									className={classes.textField}
									type="password"
									autoComplete="current-password"
									value={password}
									onChange={this.handleChange("password")}
									margin="normal"
								/>
								{this.state.passwordError && this.error("invalid Password")}
							</FormControl>
							<FormControlLabel
								control={
									<Checkbox
										checked={this.state.isCheck}
										value="remember"
										color={Colors.KEY_PRIMARY}
										onChange={(isChange) =>
											this.setState({ isCheck: !this.state.isCheck })
										}
									/>
								}
								label={this.strings(StringKeys.Remember_Me)}
							/>
							<CommonButton
								type="submit"
								fullWidth={true}
								variant="contained"
								color={Colors.KEY_PRIMARY}
								className={classes.submit}
								//onClick={this.submit}
								onClick={this.checkValidation}
								label={this.strings(StringKeys.Login)}
							/>
							{user_type === Constants.ROLE_RESTAURANT ? (
								<Link
									color="secondary"
									variant="inherit"
									to={Constants.SCREEN_ADD_RESTAURENT_ON_RESTRO}>
									<Typography
										color="secondary"
										component="h9"
										variant="h9"
										style={{ marginBottom: 20, marginTop: 20 }}
										onClick={() => {
											//  this.navigate();
										}}>
										{this.strings(StringKeys.not_registereted)}
									</Typography>
								</Link>
							) : (
								false
							)}

							{user_type === Constants.ROLE_GROCERY ? (
								<Link
									color="secondary"
									variant="inherit"
									to={Constants.SCREEN_ADD_STORE_IN_GROCERY}>
									<Typography
										color="secondary"
										component="h9"
										variant="h9"
										style={{ marginBottom: 20, marginTop: 20 }}
										onClick={() => {
											//  this.navigate();
										}}>
										{this.strings(StringKeys.not_registereted)}
									</Typography>
								</Link>
							) : (
								false
							)}
						</form>
					</Paper>
				</main>
				{/* <ToastContainer autoClose={Constants.TIME_OUT_TOAST} /> */}
				<CustomPBar showProgress={this.state[Constants.KEY_SHOW_PROGRESS]} />
			</div>
		);
	}

	navigate() {
		this.props.history.push({
			pathname: Constants.SCREEN_ADD_RESTAURENT_ON_RESTRO,
		});
	}

	handleResponse = (nextProps) => {
		console.log("handleResponse called in nextProps Login Screen: ", nextProps);

		toast(nextProps["message"]);

		var respObj = null;
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
		}

		if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (nextProps[Constants.KEY_TYPE] === types.API_LOGIN) {
				toast(nextProps[Constants.KEY_RESPONSE]["message"]);
				var otp = "";
				if (
					nextProps[Constants.KEY_RESPONSE].hasOwnProperty(
						Constants.KEY_DATA,
					) &&
					nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA].hasOwnProperty(
						Constants.KEY_OTP,
					)
				) {
					respObj = {
						[Constants.KEY_SHOW_PROGRESS]: false,
						[Constants.KEY_OTP_TMP]: otp,
					};
				}
				CustomStorage.setSessionDataAsObject(
					Constants.KEY_USER_DATA,
					nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_LOGIN_RESTRO) {
				toast(nextProps[Constants.KEY_RESPONSE]["message"]);
				var otp = "";
				if (
					nextProps[Constants.KEY_RESPONSE].hasOwnProperty(
						Constants.KEY_DATA,
					) &&
					nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA].hasOwnProperty(
						Constants.KEY_OTP,
					)
				) {
					respObj = {
						[Constants.KEY_SHOW_PROGRESS]: false,
						[Constants.KEY_OTP_TMP]: otp,
					};
				}

				CustomStorage.setSessionDataAsObject(
					Constants.KEY_USER_DATA,
					nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_LOGIN_GROCERY) {
				toast(nextProps[Constants.KEY_RESPONSE]["message"]);
				var otp = "";
				if (
					nextProps[Constants.KEY_RESPONSE].hasOwnProperty(
						Constants.KEY_DATA,
					) &&
					nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA].hasOwnProperty(
						Constants.KEY_OTP,
					)
				) {
					respObj = {
						[Constants.KEY_SHOW_PROGRESS]: false,
						[Constants.KEY_OTP_TMP]: otp,
					};
				}
				// alert(
				// 	JSON.stringify(nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA]),
				// );
				CustomStorage.setSessionDataAsObject(
					Constants.KEY_USER_DATA,
					nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
				);
			}
		}

		this.setState(respObj);
		if (
			localStorage.getItem(Constants.KEY_USER_DATA) !== undefined &&
			localStorage.getItem(Constants.KEY_USER_DATA) !== null
		) {
			CustomStorage.setSessionDataAsObject(
				Constants.KEY_IS_REMEMBER,
				this.state.isCheck,
			);
			let path = Constants.SCREEN_DASHBOARD;
			switch (nextProps.type) {
				case Constants.LOGIN_FOR_Grocery_TEMP:
					path = Constants.SCREEN_DASHBOARD_RECENT_GROCERY;
					break;
				case Constants.LOGIN_FOR_RESTRO_TEMP:
					path = Constants.SCREEN_DASHBOARD_RECENT_RESTRO;
					break;
				default:
					path;
					break;
			}

			this.props.history.replace({
				pathname: path,
				[Constants.KEY_USER_DATA]:
					nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
			});
		}
	};
}
const styles = (theme) => ({
	main: {
		width: "auto",
		display: "block", // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: "auto",
			marginRight: "auto",
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
			theme.spacing.unit * 3
		}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
	language: {
		marginLeft: 10,
	},
	link: {
		textDecoration: "none",
		color: "secondary",
	},
	mainView: {
		display: "flex",
		height: "100vh",
		width: "100vw",
	},
});

Login.propTypes = {
	classes: PropTypes.object.isRequired,
};
` `;

function mapStateToProps({ response }) {
	return response;
}

export default connect(mapStateToProps, {
	reqLogin,
	reqRestroLogin,
	reqGroceryLogin,
})(withStyles(styles)(Login));
