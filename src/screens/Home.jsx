/** @format */

import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ListItems from "./drawer/ListItems";
import BaseComponent from "../common/BaseComponent";
import { Route, Redirect } from "react-router-dom";
import * as CustomStorage from "../utils/CustomStorage";
import * as Constants from "../utils/Constants";
import Avatar from "@material-ui/core/Avatar";
import * as ResourcesConstants from "../res/ResourcesConstants";
import { toast } from "react-toastify";
import YesNoDialog from "../common/YesNoDialog";
import StatusToggle from "../common/StatusToggle";
import Grid from "@material-ui/core/Grid";
import * as Utility from "../utils/Utility";
import * as DefaultFetch from "../actions/DefaultFetch";
import * as types from "../actions/types";
import * as StringKeys from "../res/StringKeys";
const drawerWidth = 300;
const userData = undefined;
class Home extends BaseComponent {
	state = {
		open: false,
		showLogout: false,
		[Constants.KEY_IS_ONLINE]: true,
		badgeContent: 0,
	};

	componentDidMount() {
		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
		if (userData != null) {
			this.setState({
				[Constants.KEY_IS_ONLINE]: userData[Constants.KEY_IS_ONLINE],
			});
		}
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	secondBtnClick = () => {
		this.setState({ showLogout: false });
	};

	firstBtnClick = () => {
		this.setState({ showLogout: false });
		CustomStorage.setSessionDataAsObject(Constants.KEY_IS_REMEMBER, false);
		let isAdmin = Utility.isAdmin();
		let isRestuarant = Utility.isRestuarant();
		let isGrocery = Utility.isGrocery();
		CustomStorage.clearSessionData();
		let path =
			(isAdmin && Constants.SCREEN_LOGIN) ||
			(isRestuarant && Constants.SCREEN_LOGIN_FOR_RESTRO) ||
			(isGrocery && Constants.SCREEN_LOGIN_FOR_GROCERY);
		this.props.history.replace(path);
	};

	render() {
		const { classes, heading } = this.props;
		if (
			localStorage.getItem(Constants.KEY_USER_DATA) === undefined ||
			localStorage.getItem(Constants.KEY_USER_DATA) === null
		) {
			window.location = Constants.SCREEN_LOGIN;
		}

		Utility.userImage() || Utility.userImageGrocery();
		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					className={classNames(
						classes.appBar,
						this.state.open && classes.appBarShift,
					)}>
					<Toolbar
						disableGutters={!this.state.open}
						className={classes.toolbar}>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.handleDrawerOpen}
							className={classNames(
								classes.menuButton,
								this.state.open && classes.menuButtonHidden,
							)}>
							<MenuIcon />
						</IconButton>
						<Typography
							component="h1"
							variant="h6"
							color="inherit"
							noWrap
							className={classes.title}>
							{heading}
						</Typography>
						<IconButton color="inherit">
							<Badge badgeContent={this.state.badgeContent} color="secondary">
								{this.state.badgeContent > 0 ? <NotificationsIcon /> : null}
							</Badge>
						</IconButton>
					</Toolbar>
				</AppBar>

				<Drawer
					variant="temporary"
					open={this.state.open}
					onClose={this.handleDrawerClose}>
					<div className={classes.toolbarIcon}>
						<Avatar
							src={
								Utility.userImage() != undefined &&
								Utility.userImage() != null &&
								Utility.userImage() != ""
									? Utility.userImage()
									: ResourcesConstants.tab_br_food_s ||
									  (Utility.userImageGrocery() != undefined &&
											Utility.userImageGrocery() != null &&
											Utility.userImageGrocery() != "")
									? Utility.userImageGrocery()
									: ResourcesConstants.tab_br_food_s
							}
						/>
					</div>

					{!Utility.isGrocery() && !Utility.isAdmin() && (
						<Grid
							container
							direction="row"
							justify="center"
							alignItems="center">
							<StatusToggle
								isChecked={this.state[Constants.KEY_IS_ONLINE]}
								onRef={(ref) => (this.childRef = ref)}
								onChnage={this.changeStatus}></StatusToggle>
						</Grid>
					)}

					{Utility.isGrocery() && (
						<Grid
							container
							direction="row"
							justify="center"
							alignItems="center">
							<StatusToggle
								isChecked={this.state[Constants.KEY_IS_ONLINE]}
								onRef={(ref) => (this.childRef = ref)}
								onChnage={this.changeStatusGrocery}></StatusToggle>
						</Grid>
					)}

					<Divider />
					<ListItems context={this} />
				</Drawer>

				<main className={classes.content}>{this.props.children}</main>

				<YesNoDialog
					showYesNo={this.state.showLogout}
					secondBtnClick={this.secondBtnClick}
					title={this.strings(StringKeys.APP_NAME)}
					content={this.strings(StringKeys.LOGOUT_MESSAGE)}
					firstBtnName="Okay"
					secondBtnName="Cancel"
					firstBtnClick={() => this.firstBtnClick()}
				/>
			</div>
		);
	}

	onLogoutClick = (event) => {
		event.preventDefault();
		this.setState({
			showLogout: true,
		});
	};

	onLogoutClick1 = (event) => {
		event.preventDefault();
		this.setState({
			showLogout: true,
		});
	};

	onLogoutClick2 = (event) => {
		event.preventDefault();
		this.setState({
			showLogout: true,
		});
	};

	changeStatus = (isOnline) => {
		var data = {
			[Constants.KEY_IS_ONLINE]: !isOnline,
			[Constants.KEY_UNDERSCORE_ID]: userData[Constants.KEY_USERID],
		};
		DefaultFetch.callUpdateStatus(
			data,
			null,
			types.API_RESTRO_ONLINE_STATUS_CHANGE,
			this,
		);
	};

	changeStatusGrocery = (isOnline) => {
		var data = {
			[Constants.KEY_IS_ONLINE]: !isOnline,
			[Constants.KEY_UNDERSCORE_ID]: userData[Constants.KEY_USERID],
		};
		DefaultFetch.callUpdateStatusGrocery(
			data,
			null,
			types.API_GROCERY_ONLINE_STATUS_CHANGE,
			this,
		);
	};

	handleResponse = (nextProps) => {
		var respObj = null;
		if (
			nextProps[Constants.KEY_TYPE] === types.API_RESTRO_ONLINE_STATUS_CHANGE
		) {
			if (nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA] != undefined) {
				// toast(nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE]);
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
					[Constants.KEY_IS_ONLINE]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							Constants.KEY_IS_ONLINE
						],
				};

				userData[Constants.KEY_IS_ONLINE] =
					nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
						Constants.KEY_IS_ONLINE
					];
				CustomStorage.setSessionDataAsObject(Constants.KEY_USER_DATA, userData);
				this.setState(respObj);
			} else {
				alert(nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE]);
			}

			//  this.childRef.outerChange(false);
		}
		if (
			nextProps[Constants.KEY_TYPE] === types.API_GROCERY_ONLINE_STATUS_CHANGE
		) {
			if (nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA] != undefined) {
				// toast(nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE]);
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
					[Constants.KEY_IS_ONLINE]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							Constants.KEY_IS_ONLINE
						],
				};

				userData[Constants.KEY_IS_ONLINE] =
					nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
						Constants.KEY_IS_ONLINE
					];
				CustomStorage.setSessionDataAsObject(Constants.KEY_USER_DATA, userData);
				this.setState(respObj);
			} else {
				alert(nextProps[Constants.KEY_RESPONSE][Constants.KEY_MESSAGE]);
			}
		}
	};
}

const HomeRoute = ({ component: Component, ...rest }) => {
	var properties = { ...rest };
	const classes = properties.classes;
	let childRef = undefined;

	function changeOnlineStatus(is_online) {
		var data = {
			[Constants.KEY_IS_ONLINE]: is_online,
			[Constants.KEY_UNDERSCORE_ID]: userData[Constants.KEY_USERID],
		};

		//alert(is_online);
		console.log("childRef=", childRef);
		if (childRef != null) {
			childRef.changeOnlineStatus(data, this);
		}
	}

	return localStorage.getItem(Constants.KEY_USER_DATA) !== undefined &&
		localStorage.getItem(Constants.KEY_USER_DATA) !== null ? (
		<Route
			{...rest}
			render={(matchProps) => {
				console.log("matchProps ", matchProps);

				return (
					<Home {...matchProps} classes={classes} heading={properties.title}>
						<Component {...matchProps} classes={classes} />
					</Home>
				);
			}}
		/>
	) : (
		<Redirect from="/" to={Constants.SCREEN_LOGIN} />
	);
};

const styles = (theme) => ({
	root: {
		display: "flex",
		flexGrow: 1,
		width: "100%",
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	avatar: {
		margin: theme.spacing.unit,
		padding: "8px",
	},
	bigAvatarHome: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		width: "100%",
		height: "70%",
	},
	bigAvatar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		margin: 10,
		width: 100,
		height: 100,
	},
	toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
	toolbarIconsAlign: {
		display: "flex",
		flexGrow: "auto",
		justifyContent: "center",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
	appIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},

	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36,
	},
	menuButtonHidden: {
		display: "none",
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		overflow: "auto",
		height: "100%",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		[theme.breakpoints.up("md")]: {
			overflow: "auto",
			width: drawerWidth,
			position: "relative",
			height: "100%",
		},
	},
	drawerPaperClose: {
		overflowX: "hidden",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing.unit * 7,
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing.unit * 9,
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
		height: "100vh",
		overflow: "auto",
	},
	chartContainer: {
		marginLeft: -22,
	},
	tableContainer: {
		height: 320,
	},
	h5: {
		marginBottom: theme.spacing.unit * 2,
	},
});

HomeRoute.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeRoute);
