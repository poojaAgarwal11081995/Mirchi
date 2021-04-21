/** @format */

import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Settings from "@material-ui/icons/Settings";
import CategoryIcon from "@material-ui/icons/Category";
import BarChartIcon from "@material-ui/icons/BarChart";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";
import UserIcon from "@material-ui/icons/DirectionsBike";
import HisotryIcon from "@material-ui/icons/HistoryOutlined";
import AddFood from "@material-ui/icons/FastfoodRounded";
import LocationIcon from "@material-ui/icons/LocationCityRounded";
import SupportIcon from "@material-ui/icons/Help";
import PinIcon from "@material-ui/icons/PinDrop";
import CreditCard from "@material-ui/icons/CreditCardRounded";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import Collapse from "@material-ui/core/Collapse";
import { withStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import List from "@material-ui/core/List";
import Report from "@material-ui/icons/Report";
import * as Constants from "../../utils/Constants";
import * as Utility from "../../utils/Utility";
import * as StringKeys from "../../res/StringKeys";
import * as Colors from "../../res/Colors";
import BaseComponent from "../../common/BaseComponent";
import * as CustomStorage from "../../utils/CustomStorage";
import SupervisorAccountSharpIcon from "@material-ui/icons/SupervisorAccountSharp";
import InfoSharpIcon from "@material-ui/icons/InfoSharp";
import BusinessSharpIcon from "@material-ui/icons/BusinessSharp";
import MoneySharpIcon from "@material-ui/icons/MoneySharp";
import AttachMoneySharpIcon from "@material-ui/icons/AttachMoneySharp";
import RestorePageSharpIcon from "@material-ui/icons/RestorePageSharp";
import Chat from "@material-ui/icons/Chat";
import LiveHelpSharpIcon from "@material-ui/icons/LiveHelpSharp";
import ListAltSharpIcon from "@material-ui/icons/ListAltSharp";
import SmsFailedSharpIcon from "@material-ui/icons/SmsFailedSharp";
import PersonIcon from "@material-ui/icons/Person";
import MoneyIcon from "@material-ui/icons/Money";
import DeckIcon from "@material-ui/icons/Deck";
import StarIcon from "@material-ui/icons/Star";
import Link from "@material-ui/core/Link";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import TrainIcon from "@material-ui/icons/Train";
import LocalBarIcon from "@material-ui/icons/LocalBar";

import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";

const styles = (theme) => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4,
	},
	link: {
		textDecoration: "none",
	},
	textSize: {
		fontSize: 30,
		fontWeight: "bold",
		textAlign: "center",
	},
});
let userData = undefined;
class ListItems extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			openRes: false,
			openCat: false,
			openProd: false,
			openDri: false,
			openLocation: false,
			openPaymentHistory: false,
			openCMSPages: false,
			openCMSManagment: false,
			fareManagemant: false,
			vendorMangement: false,
			orderManagement: false,
			userManagement: false,
			typeManagement: false,
			driverManagement: false,
			earningManagemant: false,
			floating_cash: false,
			floating_cash: false,
			fareManagemantGrocery: false,
			officeManagement: false,
		};
		userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
	}

	// handleClick(open) {
	//     this.setState({ [open]: !this.state[open] });
	// };

	handleClick = (open) => {
		console.log(open);
		this.setState({
			[open]: !this.state[open],
		});
	};

	render() {
		const preventDefault = (event) => event.preventDefault();

		const { classes, context } = this.props;
		return (
			<div>
				{!Utility.isAdmin() && !Utility.isGrocery() && (
					<ListItem
						button
						onClick={() => {
							this.props.context.handleDrawerClose();
							context.props.history.push({
								pathname: Constants.SCREEN_DASHBOARD_RECENT_RESTRO,
							});
						}}>
						<ListItemIcon variant="outline-primary">
							<DashboardIcon color="primary" />
						</ListItemIcon>
						<Link href="#" onClick={preventDefault}>
							<ListItemText primary={this.strings(StringKeys.Dashboard)} />
						</Link>
					</ListItem>
				)}
				{Utility.isGrocery() && (
					<ListItem
						button
						onClick={() => {
							this.props.context.handleDrawerClose();
							context.props.history.push({
								pathname: Constants.SCREEN_DASHBOARD_RECENT_GROCERY,
							});
						}}>
						<ListItemIcon variant="outline-primary">
							<DashboardIcon color="primary" />
						</ListItemIcon>
						<Link href="#" onClick={preventDefault}>
							<ListItemText primary={this.strings(StringKeys.Dashboard)} />
						</Link>
					</ListItem>
				)}

				{!Utility.isGrocery() && (
					<Link href="#" onClick={preventDefault}>
						<ListItem
							button
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Utility.isAdmin()
										? Constants.SCREEN_DASHBOARD
										: Constants.SCREEN_DASHBOARD_RESTRO,
								});
							}}>
							<ListItemIcon variant="outline-primary">
								{Utility.isAdmin() && !Utility.isGrocery() ? (
									<DashboardIcon color="primary" />
								) : (
									<DeckIcon color="primary" />
								)}
							</ListItemIcon>
							<ListItemText
								primary={
									Utility.isAdmin()
										? this.strings(StringKeys.Dashboard)
										: this.strings(StringKeys.Orders)
								}
							/>
						</ListItem>
					</Link>
				)}

				{Utility.isGrocery() && (
					<ListItem
						button
						onClick={() => {
							this.props.context.handleDrawerClose();
							context.props.history.push({
								pathname: Constants.SCREEN_DASHBOARD_GROCERY,
							});
						}}>
						<ListItemIcon variant="outline-primary">
							<DeckIcon color="primary" />
						</ListItemIcon>
						<Link href="dashboard" onClick={preventDefault}>
							<ListItemText primary={this.strings(StringKeys.Orders)} />
						</Link>
					</ListItem>
				)}

				{!Utility.isGrocery() && (
					<ListItem
						button
						onClick={() => {
							this.props.context.handleDrawerClose();
							if (Utility.isAdmin()) {
								CustomStorage.setSessionDataAsObject(
									Constants.KEY_USERID,
									Utility.restroId(),
								);
								context.props.history.push({
									pathname: Constants.SCREEN_ADMIN_PROFILE,
								});
							} else if (Utility.isRestuarant()) {
								CustomStorage.setSessionDataAsObject(
									Constants.KEY_RESTO_ID,
									Utility.restroId(),
								);

								context.props.history.push({
									pathname: Constants.SCREEN_RESTAURENT_PROFILE,
								});
							}
						}}>
						<ListItemIcon variant="outline-primary">
							<PersonIcon color="primary" />
						</ListItemIcon>
						<Link href="#" onClick={preventDefault}>
							<ListItemText primary={this.strings(StringKeys.My_Profile)} />
						</Link>
					</ListItem>
				)}
				{/* {Utility.isAdmin() && (
					<ListItem
						button
						onClick={() => {
							this.props.context.handleDrawerClose();
							CustomStorage.setSessionDataAsObject(
								Constants.KEY_USERID,
								Utility.GroceryStoreId(),
							);
							context.props.history.push({
								pathname: Constants.SCREEN_PROFIT_MODE,
							});
						}}>
						<ListItemIcon variant="outline-primary">
							<PersonIcon color="primary" />
						</ListItemIcon>
						<Link href="#" onClick={preventDefault}>
							<ListItemText primary={this.strings(StringKeys.My_Profit)} />
						</Link>
					</ListItem>
				)} */}

				{Utility.isGrocery() && (
					<ListItem
						button
						onClick={() => {
							this.props.context.handleDrawerClose();
							CustomStorage.setSessionDataAsObject(
								Constants.KEY_GROCERY_ID,
								Utility.GroceryStoreId(),
							);
							context.props.history.push({
								pathname: Constants.SCREEN_GROCERY_PROFILE,
							});
						}}>
						<ListItemIcon variant="outline-primary">
							<PersonIcon color="primary" />
						</ListItemIcon>
						<Link href="#" onClick={preventDefault}>
							<ListItemText primary={this.strings(StringKeys.My_Profile)} />
						</Link>
					</ListItem>
				)}

				{/* {!Utility.isGrocery() && (
					<ListItem
						button
						onClick={() => {
							this.props.context.handleDrawerClose();

							if (Utility.isAdmin()) {
								CustomStorage.setSessionDataAsObject(
									Constants.KEY_USERID,
									Utility.restroId(),
								);
								context.props.history.push({
									pathname: Constants.SCREEN_ADMIN_EARNING,
								});
							} else if (Utility.isRestuarant()) {
								CustomStorage.setSessionDataAsObject(
									Constants.KEY_RESTO_ID,
									Utility.restroId(),
								);
								context.props.history.push({
									pathname: Utility.isAdmin()
										? Constants.SCREEN_RESTAURENT_EARNING_IN_ADMIN
										: Constants.SCREEN_RESTAURENT_EARNING,
								});
							}
						}}>
						<ListItemIcon>
							<MoneyIcon color="primary" />
						</ListItemIcon>
						<ListItemText primary={this.strings(StringKeys.My_Earning)} />
					</ListItem>
				)} */}
				{Utility.isGrocery() && (
					<ListItem
						button
						onClick={() => {
							this.props.context.handleDrawerClose();
							CustomStorage.setSessionDataAsObject(
								Constants.KEY_GROCERY_ID,
								Utility.GroceryStoreId(),
							);
							context.props.history.push({
								pathname: Utility.isAdmin()
									? Constants.SCREEN_GROCERY_EARNING_IN_ADMIN
									: Constants.SCREEN_GROCERY_EARNING,
							});
						}}>
						<ListItemIcon>
							<MoneyIcon color="primary" />
						</ListItemIcon>
						<Link href="#" onClick={preventDefault}>
							<ListItemText primary={this.strings(StringKeys.My_Earning)} />
						</Link>
					</ListItem>
				)}
				{Utility.isRestuarant() && (
					<ListItem
						button
						onClick={() => {
							this.props.context.handleDrawerClose();
							CustomStorage.setSessionDataAsObject(
								Constants.KEY_RESTO_ID,
								Utility.restroId(),
							);
							context.props.history.push({
								pathname: Utility.isAdmin()
									? Constants.SCREEN_RESTAURENT_EARNING_IN_ADMIN
									: Constants.SCREEN_RESTAURENT_EARNING,
							});
						}}>
						<ListItemIcon>
							<MoneyIcon color="primary" />
						</ListItemIcon>
						<Link href="restroEarning" onClick={preventDefault}>
							<ListItemText primary={this.strings(StringKeys.My_Earning)} />
						</Link>
					</ListItem>
				)}
				{Utility.isAdmin() && (
					<Link href="adminEarning" onClick={preventDefault}>
						<ListItem
							disablePadding
							button
							onClick={() => this.handleClick("earningManagemant")}>
							<ListItemIcon>
								<MoneyIcon color="primary" />
							</ListItemIcon>
							<ListItemText primary={this.strings(StringKeys.My_Earning)} />
							{this.state.earningManagemant ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
					</Link>
				)}

				<Collapse
					in={this.state.earningManagemant}
					timeout="auto"
					unmountOnExit>
					<List component="div" disablePadding>
						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();

								if (Utility.isAdmin()) {
									CustomStorage.setSessionDataAsObject(
										Constants.KEY_USERID,
										Utility.restroId(),
									);
									context.props.history.push({
										pathname: Constants.SCREEN_ADMIN_EARNING,
									});
								}
							}}>
							<ListItemIcon>
								<RestaurantIcon color="primary" />
							</ListItemIcon>
							<Link href="addminEarning" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Restro_Earning)}
								/>
							</Link>
						</ListItem>

						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_ADMIN_EARNING_GROCERY,
								});
							}}>
							<ListItemIcon>
								<LocalGroceryStoreIcon color="primary" />
							</ListItemIcon>
							<Link href="addminEarning" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Grocery_Earning)}
								/>
							</Link>
						</ListItem>
					</List>
				</Collapse>

				{Utility.isAdmin() && (
					<Link href="restrolist" onClick={preventDefault}>
						<ListItem
							disablePadding
							button
							onClick={() => this.handleClick("vendorManagemant")}>
							<ListItemIcon>
								<DeveloperBoardIcon color="primary" />
							</ListItemIcon>
							<ListItemText primary={this.strings(StringKeys.Vendor)} />
							{this.state.vendorManagemant ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
					</Link>
				)}

				<Collapse in={this.state.vendorManagemant} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_RESTAURENT_LIST,
								});
							}}>
							<ListItemIcon>
								<RestaurantIcon color="primary" />
							</ListItemIcon>
							<Link href="restrolist" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Restaurant_Vendor)}
								/>
							</Link>
						</ListItem>

						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_GROCERY_LIST,
								});
							}}>
							<ListItemIcon>
								<LocalGroceryStoreIcon color="primary" />
							</ListItemIcon>

							<Link href="grocerylist" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Grocery_Vendor)}
								/>
							</Link>
						</ListItem>
						{/* Vendor Managemnet of    Railway Booking Items */}

						{/* <ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_RAILWAY_PARCEL,
								});
							}}>
							<ListItemIcon>
								<TrainIcon color="primary" />
							</ListItemIcon>

							<Link href="railwayParcelList" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Railway_Parcel)}
								/>
							</Link>
						</ListItem> */}

						{/* Vendor Managemnet -Items */}
						{/* Vendor Managemnet of    Party Booking Items */}

						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_PARTY_BOOKING,
								});
							}}>
							<ListItemIcon>
								<LocalBarIcon color="primary" />
							</ListItemIcon>
							<Link href="partBookingList" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Party_Booking)}
								/>
							</Link>
						</ListItem>

						{/* Vendor Managemnet -Items End  */}
					</List>
				</Collapse>

				{Utility.isAdmin() && (
					<Link href="orderManagament" onClick={preventDefault}>
						<ListItem
							disablePadding
							button
							onClick={() => this.handleClick("orderManagemant")}>
							<ListItemIcon>
								<DeckIcon color="primary" />
							</ListItemIcon>
							<ListItemText
								primary={this.strings(StringKeys.Order_Management)}
							/>
							{this.state.orderManagemant ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
					</Link>
				)}

				<Collapse in={this.state.orderManagemant} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_SCREEN_ORDER_MANAGEMENT_IN_ADMIN,
								});
							}}>
							<ListItemIcon>
								<RestaurantIcon color="primary" />
							</ListItemIcon>
							<Link href="orderManagamentGrocery" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Restaurant_Order)}
								/>
							</Link>
						</ListItem>
						{/* Resto cancell start */}

						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_REQUESTED_RESTRO_CANCEL_ORDER,
								});
							}}>
							<ListItemIcon>
								<RestaurantIcon color="primary" />
							</ListItemIcon>
							<Link href="restrocancelorder" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Restaurant_Order_Cancel)}
								/>
							</Link>
						</ListItem>

						{/* Resto cancell end */}
						{/* iteam waise report  */}

						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_REQUESTED_RESTRO_ITEAM_WISE,
								});
							}}>
							<ListItemIcon>
								<RestaurantIcon color="primary" />
							</ListItemIcon>
							<Link href="restroiteamvisereport" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.ITEAM_FWISE_ORDER)}
								/>
							</Link>
						</ListItem>

						{/* iteam restorent waise report  */}

						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname:
										Constants.SCREEN_SCREEN_ORDER_MANAGEMENT_IN_ADMIN_GROCERY,
								});
							}}>
							<ListItemIcon>
								<LocalGroceryStoreIcon color="primary" />
							</ListItemIcon>
							<Link href="railwayParcelList" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Grocery_Order)}
								/>
							</Link>
						</ListItem>
						{/* grosary cancell start */}

						{/* SCREEN_DRIVER_LIST_GROCERY */}

						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_REQUESTED_GROCERY_CANCEL_ORDER,
								});
							}}>
							<ListItemIcon>
								<LocalGroceryStoreIcon color="primary" />
							</ListItemIcon>
							<Link href="groceryOrderCancel" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.GROCERY_CANCEL_ORDER)}
								/>
							</Link>
						</ListItem>

						{/* grosarry cancell end */}

						{/* grcoery iteam waise report  */}

						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_REQUESTED_GROCERY_ITEAM_WISE,
								});
							}}>
							<ListItemIcon>
								<LocalGroceryStoreIcon color="primary" />
							</ListItemIcon>
							<Link href="groceryiteamvisereport" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.ITEAM_WISE_ORDER_GROCERY)}
								/>
							</Link>
						</ListItem>

						{/* iteam restorent waise report  */}

						{/* Discount  */}
						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_DISCOUNT,
								});
							}}>
							<ListItemIcon>
								<LocalOffer color="primary" />
							</ListItemIcon>
							<Link href="discountlist" onClick={preventDefault}>
								<ListItemText primary={this.strings(StringKeys.Discount)} />
							</Link>
						</ListItem>
					</List>
				</Collapse>

				{Utility.isAdmin() && (
					<Link href="driverlist" onClick={preventDefault}>
						<ListItem
							disablePadding
							button
							onClick={() => this.handleClick("driverManagement")}>
							<ListItemIcon>
								<UserIcon color="primary" />
							</ListItemIcon>
							<ListItemText primary={this.strings(StringKeys.Drivers)} />
							{this.state.driverManagement ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
					</Link>
				)}
				<Collapse in={this.state.driverManagement} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_DRIVER_LIST,
								});
							}}>
							<ListItemIcon>
								<RestaurantIcon color="primary" />
							</ListItemIcon>
							<Link href="driverlist" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Restaurant_Drivers)}
								/>
							</Link>
						</ListItem>
						{/* new Driver res */}
						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_RESTAURANT_DRIVER_LIST_REPORT,
								});
							}}>
							<ListItemIcon>
								<RestaurantIcon color="primary" />
							</ListItemIcon>
							<Link href="restaurentdriverlist" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.RESTORENT_DRIVER)}
								/>
							</Link>
						</ListItem>

						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_DRIVER_LIST_GROCERY,
								});
							}}>
							<ListItemIcon>
								<LocalGroceryStoreIcon color="primary" />
							</ListItemIcon>
							<Link href="grocerydriverlist" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Grocery_Drivers)}
								/>
							</Link>
						</ListItem>
						{/* new diiver gro */}
						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_GROSERY_DRIVER_LIST_REPORT,
								});
							}}>
							<ListItemIcon>
								<LocalGroceryStoreIcon color="primary" />
							</ListItemIcon>
							<Link href="driverlist" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.GROCERY_DRIVER)}
								/>
							</Link>
						</ListItem>
					</List>
				</Collapse>

				{/*::::::::::::::::: this is Users Data ::::::::::::*/}

				{Utility.isAdmin() && (
					<ListItem
						className={classes.link}
						button
						onClick={() => {
							this.props.context.handleDrawerClose();
							context.props.history.push({
								pathname: Constants.SCREEN_USER_LIST,
							});
						}}>
						<ListItemIcon>
							<SupervisorAccountSharpIcon color="primary" />
						</ListItemIcon>
						<Link href="userlist" onClick={preventDefault}>
							<ListItemText primary={this.strings(StringKeys.Users)} />
						</Link>
					</ListItem>
				)}

				{Utility.isAdmin() && (
					<Link href="categoryList" onClick={preventDefault}>
						<ListItem
							disablePadding
							button
							onClick={() => this.handleClick("typeManagement")}>
							<ListItemIcon>
								<CategoryIcon color="primary" />
							</ListItemIcon>
							<ListItemText primary={this.strings(StringKeys.Types)} />
							{this.state.typeManagement ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
					</Link>
				)}
				<Collapse in={this.state.typeManagement} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Utility.isAdmin()
										? Constants.SCREEN_CATEGORY_LIST
										: Constants.SCREEN_CATEGORY_LIST_RESTRO,
								});
							}}>
							<ListItemIcon>
								<RestaurantIcon color="primary" />
							</ListItemIcon>
							<Link href="categoryList" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Restaurant_Types)}
								/>
							</Link>
						</ListItem>
						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Utility.isAdmin()
										? Constants.SCREEN_CATEGORY_LIST_ADMIN_GROCERY
										: Constants.SCREEN_CATEGORY_LIST_GROCERY,
								});
							}}>
							<ListItemIcon>
								<LocalGroceryStoreIcon color="primary" />
							</ListItemIcon>
							<Link href="categoryListGrocery" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Grocery_Types)}
								/>
							</Link>
						</ListItem>
					</List>
				</Collapse>

				{!Utility.isGrocery() && !Utility.isAdmin() && (
					<ListItem
						className={classes.link}
						button
						onClick={() => {
							this.props.context.handleDrawerClose();
							context.props.history.push({
								pathname: Utility.isAdmin()
									? Constants.SCREEN_PRODUCT_CATEGORY_LIST
									: Constants.SCREEN_PRODUCT_CATEGORY_LIST_RESTRO,
							});
						}}>
						<ListItemIcon>
							<CategoryIcon color="primary" />
						</ListItemIcon>
						<Link href="productCategoryList" onClick={preventDefault}>
							<ListItemText primary={this.strings(StringKeys.Product_Types)} />
						</Link>
					</ListItem>
				)}

				{Utility.isGrocery() && (
					<ListItem
						className={classes.link}
						button
						onClick={() => {
							this.props.context.handleDrawerClose();
							context.props.history.push({
								pathname: Utility.isAdmin()
									? Constants.SCREEN_PRODUCT_CATEGORY_GROCERY_LIST
									: Constants.SCREEN_PRODUCT_CATEGORY_LIST_GROCERY,
							});
						}}>
						<ListItemIcon>
							<CategoryIcon color="primary" />
						</ListItemIcon>
						<Link href="productCategoryGroceryList" onClick={preventDefault}>
							<ListItemText primary={this.strings(StringKeys.Product_Types)} />
						</Link>
					</ListItem>
				)}

				{!Utility.isGrocery() && !Utility.isAdmin() && (
					<ListItem
						className={classes.link}
						button
						onClick={() => {
							{
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Utility.isAdmin()
										? Constants.SCREEN_CHOOSE_RESTO_ITEM
										: Constants.SCREEN_PRODUCT_LIST_RETSRO,
									[Constants.KEY_DATA]:
										Constants.SCREEN_CHOOSE_RESTO_ITEM_FOR_PRODUCT_LIST,
								});
							}
						}}>
						<ListItemIcon>
							<AddFood color="primary" />
						</ListItemIcon>
						<Link href="chooseRestoItem" onClick={preventDefault}>
							<ListItemText primary={this.strings(StringKeys.Products)} />
						</Link>
					</ListItem>
				)}

				{Utility.isGrocery() && (
					<ListItem
						className={classes.link}
						button
						onClick={() => {
							{
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Utility.isAdmin()
										? Constants.SCREEN_CHOOSE_GROCERY_ITEM
										: Constants.SCREEN_PRODUCT_LIST_GROCERY,
									[Constants.KEY_DATA]:
										Constants.SCREEN_CHOOSE_GROCERY_ITEM_FOR_PRODUCT_LIST,
								});
							}
						}}>
						<ListItemIcon>
							<AddFood color="primary" />
						</ListItemIcon>
						<Link href="chooseGroceryItem" onClick={preventDefault}>
							<ListItemText
								primary={this.strings(StringKeys.Products_Grocery)}
							/>
						</Link>
					</ListItem>
				)}

				{/* offfice management:::::::::::::::::::::::::::::::;; */}
				{/* {Utility.isAdmin() && (
					<ListItem
						button
						onClick={() => {
							this.props.context.handleDrawerClose();
							context.props.history.push({
								pathname: Constants.SCREEN_OFFICE_LIST,
							});
						}}>
						<ListItemIcon>
							<BusinessSharpIcon color="primary" />
						</ListItemIcon>
						<ListItemText
							primary={this.strings(StringKeys.Office_Management)}
						/>
					</ListItem>
				)} */}

				{Utility.isAdmin() && (
					<Link href="officelist" onClick={preventDefault}>
						<ListItem
							disablePadding
							button
							onClick={() => this.handleClick("officeManagement")}>
							<ListItemIcon>
								<BusinessSharpIcon color="primary" />
							</ListItemIcon>
							<ListItemText
								primary={this.strings(StringKeys.Office_Management)}
							/>
							{this.state.officeManagement ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
					</Link>
				)}
				<Collapse in={this.state.officeManagement} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_OFFICE_LIST,
								});
							}}>
							<ListItemIcon>
								<RestaurantIcon color="primary" />
							</ListItemIcon>
							<Link href="officelist" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Restaurant_Office)}
								/>
							</Link>
						</ListItem>
						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_OFFICE_LIST_GROCERY,
								});
							}}>
							<ListItemIcon>
								<LocalGroceryStoreIcon color="primary" />
							</ListItemIcon>
							<Link href="officelistGrocery" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Grocery_Office)}
								/>
							</Link>
						</ListItem>
					</List>
				</Collapse>

				{Utility.isAdmin() && (
					<Link href="floatingcash" onClick={preventDefault}>
						<ListItem
							disablePadding
							button
							onClick={() => this.handleClick("floating_cash")}>
							<ListItemIcon>
								<LocalAtmIcon color="primary" />
							</ListItemIcon>
							<ListItemText primary={this.strings(StringKeys.Floating_Cash)} />
							{this.state.floating_cash ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
					</Link>
				)}
				<Collapse in={this.state.floating_cash} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_FLOATING_CASH,
								});
							}}>
							<ListItemIcon>
								<RestaurantIcon color="primary" />
							</ListItemIcon>
							<Link href="floatingcash" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Restaurant_Cash)}
								/>
							</Link>
						</ListItem>
						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_FLOATING_CASH_GROCERY,
								});
							}}>
							<ListItemIcon>
								<LocalGroceryStoreIcon color="primary" />
							</ListItemIcon>
							<Link href="floatingcashGrocery" onClick={preventDefault}>
								<ListItemText primary={this.strings(StringKeys.Grocery_Cash)} />
							</Link>
						</ListItem>
					</List>
				</Collapse>

				{!Utility.isGrocery() && !Utility.isAdmin() && (
					<ListItem
						button
						onClick={() => {
							this.props.context.handleDrawerClose();
							context.props.history.push({
								pathname: Utility.isAdmin()
									? Constants.SCREEN_COUPON_MANAGAMENT
									: Constants.SCREEN_COUPON_MANAGAMENT_RESTRO,
							});
						}}>
						<ListItemIcon>
							<CreditCard color="primary" />
						</ListItemIcon>
						<Link href="coupanManagement" onClick={preventDefault}>
							<ListItemText
								primary={this.strings(StringKeys.Coupon_Management)}
							/>
						</Link>
					</ListItem>
				)}

				{Utility.isGrocery() && (
					<ListItem
						button
						onClick={() => {
							this.props.context.handleDrawerClose();
							context.props.history.push({
								pathname: Utility.isAdmin()
									? Constants.SCREEN_COUPON_GROCERY_MANAGAMENT_ADMIN
									: Constants.SCREEN_COUPON_MANAGAMENT_GROCERY,
							});
						}}>
						<ListItemIcon>
							<CreditCard color="primary" />
						</ListItemIcon>
						<Link href="coupanManagement" onClick={preventDefault}>
							<ListItemText
								primary={this.strings(StringKeys.Coupon_Management)}
							/>
						</Link>
					</ListItem>
				)}

				{Utility.isAdmin() && (
					<Link href="fareManagement" onClick={preventDefault}>
						<ListItem
							disablePadding
							button
							onClick={() => this.handleClick("fareManagemant")}>
							<ListItemIcon>
								<MonetizationOnIcon color="primary" />
							</ListItemIcon>
							<ListItemText
								primary={this.strings(StringKeys.Fare_Management_Restaurant)}
							/>
							{this.state.fareManagemant ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
					</Link>
				)}

				<Collapse in={this.state.fareManagemant} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_DRIVER_FARE_MANAGAMENT,
								});
							}}>
							<ListItemIcon>
								<AttachMoneySharpIcon color="primary" />
							</ListItemIcon>
							<Link href="fareManagement" onClick={preventDefault}>
								<ListItemText primary={this.strings(StringKeys.Driver_Fare)} />
							</Link>
						</ListItem>
						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_DILEVERY_CHARGES,
								});
							}}>
							<ListItemIcon>
								<AttachMoneySharpIcon color="primary" />
							</ListItemIcon>
							<Link href="dileveryCharges" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Customare_Fare)}
								/>
							</Link>
						</ListItem>

						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_ADMIN_COMMISSION_MANAGEMENT,
								});
							}}>
							<ListItemIcon>
								<AttachMoneySharpIcon color="primary" />
							</ListItemIcon>
							<Link href="adminCommission" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Admin_Commission)}
								/>
							</Link>
						</ListItem>
					</List>
				</Collapse>

				{Utility.isAdmin() && (
					<Link href="fareManagementGrocery" onClick={preventDefault}>
						<ListItem
							disablePadding
							button
							onClick={() => this.handleClick("fareManagemantGrocery")}>
							<ListItemIcon>
								<MonetizationOnIcon color="primary" />
							</ListItemIcon>
							<ListItemText
								primary={this.strings(StringKeys.Fare_Management_Grocery)}
							/>
							{this.state.fareManagemantGrocery ? (
								<ExpandLess />
							) : (
								<ExpandMore />
							)}
						</ListItem>
					</Link>
				)}

				<Collapse
					in={this.state.fareManagemantGrocery}
					timeout="auto"
					unmountOnExit>
					<List component="div" disablePadding>
						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_DRIVER_FARE_MANAGAMENT_GROCERY,
								});
							}}>
							<ListItemIcon>
								<AttachMoneySharpIcon color="primary" />
							</ListItemIcon>
							<Link href="fareManagementGrocery" onClick={preventDefault}>
								<ListItemText primary={this.strings(StringKeys.Driver_Fare)} />
							</Link>
						</ListItem>
						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_DILEVERY_CHARGES_GROCERY,
								});
							}}>
							<ListItemIcon>
								<AttachMoneySharpIcon color="primary" />
							</ListItemIcon>
							<Link href="dileveryChargesGrocery" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Customare_Fare)}
								/>
							</Link>
						</ListItem>

						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname:
										Constants.SCREEN_ADMIN_COMMISSION_MANAGEMENT_GROCERY,
								});
							}}>
							<ListItemIcon>
								<AttachMoneySharpIcon color="primary" />
							</ListItemIcon>
							<Link href="adminCommissionGrocery" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Admin_Commission)}
								/>
							</Link>
						</ListItem>
					</List>
				</Collapse>

				{Utility.isAdmin() && (
					<Link href="restroPaymentHistory" onClick={preventDefault}>
						<ListItem
							disablePadding
							button
							onClick={() => this.handleClick("openPaymentHistory")}>
							<ListItemIcon>
								<AccountBalanceWalletIcon color="primary" />
							</ListItemIcon>
							<ListItemText
								primary={this.strings(StringKeys.Payment_History)}
							/>
							{this.state.openPaymentHistory ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
					</Link>
				)}

				<Collapse
					in={this.state.openPaymentHistory}
					timeout="auto"
					unmountOnExit>
					<List component="div" disablePadding>
						{
							<ListItem
								button
								className={classes.nested}
								onClick={() => {
									HisotryIcon;
									this.props.context.handleDrawerClose();
									context.props.history.push({
										pathname:
											Utility.isAdmin() &&
											Constants.SCREEN_RESTAURANT_PAYMENT_HISTORY,
									});
								}}>
								<ListItemIcon>
									<AccountBalanceWalletIcon color="primary" />
								</ListItemIcon>
								<Link href="restroPaymentHistory" onClick={preventDefault}>
									<ListItemText
										primary={this.strings(StringKeys.Restro_Payment_History)}
									/>
								</Link>
							</ListItem>
						}
						{
							<ListItem
								button
								className={classes.nested}
								onClick={() => {
									HisotryIcon;
									this.props.context.handleDrawerClose();
									context.props.history.push({
										pathname:
											Utility.isAdmin() &&
											Constants.SCREEN_DRIVER_PAYMENT_HISTORY,
									});
								}}>
								<ListItemIcon>
									<AccountBalanceWalletIcon color="primary" />
								</ListItemIcon>
								<Link href="driverPaymentHistory" onClick={preventDefault}>
									<ListItemText
										primary={this.strings(
											StringKeys.Restaurant_Driver_Payment_History,
										)}
									/>
								</Link>
							</ListItem>
						}
						{
							<ListItem
								button
								className={classes.nested}
								onClick={() => {
									HisotryIcon;
									this.props.context.handleDrawerClose();
									context.props.history.push({
										pathname:
											Utility.isAdmin() &&
											Constants.SCREEN_GROCERY_PAYMENT_HISTORY,
									});
								}}>
								<ListItemIcon>
									<AccountBalanceWalletIcon color="primary" />
								</ListItemIcon>
								<Link href="groceryPaymentHistory" onClick={preventDefault}>
									<ListItemText
										primary={this.strings(StringKeys.Grocery_Payment_History)}
									/>
								</Link>
							</ListItem>
						}
						{
							<ListItem
								button
								className={classes.nested}
								onClick={() => {
									HisotryIcon;
									this.props.context.handleDrawerClose();
									context.props.history.push({
										pathname:
											Utility.isAdmin() &&
											Constants.SCREEN_DRIVER_PAYMENT_HISTORY_GROCERY,
									});
								}}>
								<ListItemIcon>
									<AccountBalanceWalletIcon color="primary" />
								</ListItemIcon>
								<Link
									href="driverPaymentHistoryGrocery"
									onClick={preventDefault}>
									<ListItemText
										primary={this.strings(
											StringKeys.Grocery_Driver_Payment_History,
										)}
									/>
								</Link>
							</ListItem>
						}
					</List>
				</Collapse>

				{!Utility.isGrocery() && !Utility.isAdmin() && (
					<ListItem
						button
						onClick={() => {
							this.props.context.handleDrawerClose();
							context.props.history.push({
								pathname: Constants.SCREEN_ADD_DISCOUNT,
							});
						}}>
						<ListItemIcon>
							<CreditCard color="primary" />
						</ListItemIcon>
						<Link href="addDiscount" onClick={preventDefault}>
							<ListItemText
								primary={this.strings(StringKeys.Discount_Management)}
							/>
						</Link>
					</ListItem>
				)}

				{Utility.isGrocery() && (
					<ListItem
						button
						onClick={() => {
							this.props.context.handleDrawerClose();
							context.props.history.push({
								pathname: Constants.SCREEN_ADD_DISCOUNT_GROCERY,
							});
						}}>
						<ListItemIcon>
							<CreditCard color="primary" />
						</ListItemIcon>
						<Link href="addDiscountGrocery" onClick={preventDefault}>
							<ListItemText
								primary={this.strings(StringKeys.Discount_Management)}
							/>
						</Link>
					</ListItem>
				)}

				{Utility.isAdmin() && (
					<Link href="countryManagement" onClick={preventDefault}>
						<ListItem
							disablePadding
							button
							onClick={() => this.handleClick("openLocation")}>
							<ListItemIcon>
								<PinIcon color="primary" />
							</ListItemIcon>
							<ListItemText
								primary={this.strings(StringKeys.Location_Settings)}
							/>
							{this.state.openLocation ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
					</Link>
				)}

				<Collapse in={this.state.openLocation} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_COUNTRY_MANAGEMENT,
								});
							}}>
							<ListItemIcon>
								<LocationIcon color="primary" />
							</ListItemIcon>
							<Link href="countryManagement" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Country_Management)}
								/>
							</Link>
						</ListItem>

						<ListItem
							className={classes.nested}
							button
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_STATE_MANAGEMENT,
								});
							}}>
							<ListItemIcon>
								<LocationIcon color="primary" />
							</ListItemIcon>
							<Link href="stateManagement" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.State_Management)}
								/>
							</Link>
						</ListItem>

						<ListItem
							className={classes.nested}
							button
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_CITY_MANAGEMENT,
								});
							}}>
							<ListItemIcon>
								<LocationIcon color="primary" />
							</ListItemIcon>
							<Link href="cityManagement" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.City_Management)}
								/>
							</Link>
						</ListItem>

						<ListItem
							className={classes.nested}
							button
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_REGION_MANAGEMENT,
								});
							}}>
							<ListItemIcon>
								<LocationIcon color="primary" />
							</ListItemIcon>
							<Link href="regionManagement" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Region_Management)}
								/>
							</Link>
						</ListItem>
						{/* add zipcode */}
						{/* <ListItem
							className={classes.nested}
							button
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_ZIP_MANAGEMENT,
								});
							}}>
							<ListItemIcon>
								<LocationIcon color="primary" />
							</ListItemIcon>
							<Link href="cityManagement" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Zip_Management)}
								/>
							</Link>
						</ListItem> */}
					</List>
				</Collapse>

				{Utility.isAdmin() && (
					<Link href="reviewManagement" onClick={preventDefault}>
						<ListItem
							disablePadding
							button
							onClick={() => this.handleClick("reviewManagement")}>
							<ListItemIcon>
								<StarIcon color="primary" />
							</ListItemIcon>
							<ListItemText
								primary={this.strings(StringKeys.Review_Management)}
							/>
							{this.state.reviewManagement ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
					</Link>
				)}
				<Collapse in={this.state.reviewManagement} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_REVIEW_MANAGEMENT,
								});
							}}>
							<ListItemIcon>
								<RestaurantIcon color="primary" />
							</ListItemIcon>
							<Link href="stateManagement" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Restaurant_Reviews)}
								/>
							</Link>
						</ListItem>

						<ListItem
							className={classes.nested}
							button
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_REVIEW_MANAGEMENT_GROCERY,
								});
							}}>
							<ListItemIcon>
								<LocalGroceryStoreIcon color="primary" />
							</ListItemIcon>
							<Link href="reviewManagementGrocery" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Grocery_Reviews)}
								/>
							</Link>
						</ListItem>
					</List>
				</Collapse>

				{Utility.isAdmin() && (
					<Link href="aboutus" onClick={preventDefault}>
						<ListItem
							disablePadding
							button
							onClick={() => this.handleClick("openCMSPages")}>
							<ListItemIcon>
								<HisotryIcon color="primary" />
							</ListItemIcon>
							<ListItemText primary={this.strings(StringKeys.CMS_Pages)} />
							{this.state.openCMSPages ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
					</Link>
				)}

				<Collapse in={this.state.openCMSPages} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{/* <ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_ABOUT_US,
								});
							}}>
							<ListItemIcon>
								<InfoSharpIcon color="primary" />
							</ListItemIcon>
							<Link href="aboutus" onClick={preventDefault}>
								<ListItemText primary={this.strings(StringKeys.AboutUs)} />
							</Link>
						</ListItem> */}

						{/* <ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_FAQ,
								});
							}}>
							<ListItemIcon>
								<SmsFailedSharpIcon color="primary" />
							</ListItemIcon>
							<Link href="faq" onClick={preventDefault}>
								<ListItemText primary={this.strings(StringKeys.FAQ)} />
							</Link>
						</ListItem> */}

						{/* <ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_SUPPORT,
								});
							}}>
							<ListItemIcon>
								<LiveHelpSharpIcon color="primary" />
							</ListItemIcon>
							<Link href="support" onClick={preventDefault}>
								<ListItemText primary={this.strings(StringKeys.Support)} />
							</Link>
						</ListItem> */}

						{/* <ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_REPORT,
								});
							}}>
							<ListItemIcon>
								<Report color="primary" />
							</ListItemIcon>
							<Link href="£" onClick={preventDefault}>
								<ListItemText primary={this.strings(StringKeys.REPORT)} />
							</Link>
						</ListItem> */}

						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_TERMS_AND_CONDITIONS,
								});
							}}>
							<ListItemIcon>
								<ListAltSharpIcon color="primary" />
							</ListItemIcon>
							<Link href="termsAndConditions" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Terms_And_Conditions)}
								/>
							</Link>
						</ListItem>

						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_PRIVACY_AND_POLICY,
								});
							}}>
							<ListItemIcon>
								<RestorePageSharpIcon color="primary" />
							</ListItemIcon>
							<Link href="privacyAndPolicy" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.Privacy_And_Policy)}
								/>
							</Link>
						</ListItem>

						{/** Ansh */}
						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_ADD_GENERAL_ISSUE,
								});
							}}>
							<ListItemIcon>
								<Chat color="primary" />
							</ListItemIcon>
							<Link href="addGeneralIssue" onClick={preventDefault}>
								<ListItemText
									primary={this.strings(StringKeys.General_Issue)}
								/>
							</Link>
						</ListItem>
					</List>
				</Collapse>
				{/* CMS managment */}
				{/* {Utility.isAdmin() && (
					<Link href="aboutus" onClick={preventDefault}>
						<ListItem
							disablePadding
							button
							onClick={() => this.handleClick("openCMSManagment")}>
							<ListItemIcon>
								<HisotryIcon color="primary" />
							</ListItemIcon>
							<ListItemText primary={this.strings(StringKeys.CMS_Managment)} />
							{this.state.openCMSManagment ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
					</Link>
				)}
				<Collapse in={this.state.openCMSManagment} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem
							button
							className={classes.nested}
							onClick={() => {
								this.props.context.handleDrawerClose();
								context.props.history.push({
									pathname: Constants.SCREEN_CMS_MANAGEMENT,
								});
							}}>
							<ListItemIcon>
								<RestaurantIcon color="primary" />
							</ListItemIcon>
							<Link href="stateManagement" onClick={preventDefault}>
								<ListItemText
									// primary={this.strings(StringKeys.CMS_Managment)}
									primary={this.strings("Terms & Condition")}
								/>
							</Link>
						</ListItem>
					</List>
				</Collapse> */}
				{Utility.isAdmin() && (
					<ListItem
						button
						onClick={() => {
							this.props.context.handleDrawerClose();
							context.props.history.push({
								pathname: Constants.SCREEN_ONE_PAGE_REPORT,
							});
						}}>
						<ListItemIcon>
							<BarChartIcon color="primary" />
						</ListItemIcon>
						<Link href="onePageReport" onClick={preventDefault}>
							<ListItemText primary={this.strings(StringKeys.Reports)} />
						</Link>
					</ListItem>
				)}
				{/* {Utility.isAdmin() && (
					<ListItem
						button
						onClick={() => {
							this.props.context.handleDrawerClose();
							context.props.history.push({
								pathname: Constants.SCREEN_SETTING_MANAGMENT,
							});
						}}>
						<ListItemIcon>
							<Settings color="primary" />
						</ListItemIcon>
						<Link href="settingmanagment" onClick={preventDefault}>
							<ListItemText
								primary={this.strings(StringKeys.SettingManagment)}
							/>
						</Link>
					</ListItem>
				)} */}

				{Utility.isAdmin() && (
					<ListItem button onClick={context.onLogoutClick}>
						<ListItemIcon>
							<LogoutIcon color="primary" />
						</ListItemIcon>
						<Link href="#" onClick={preventDefault}>
							<ListItemText primary={this.strings(StringKeys.Logout)} />
						</Link>
					</ListItem>
				)}

				{Utility.isRestuarant() && (
					<ListItem button onClick={context.onLogoutClick1}>
						<ListItemIcon>
							<LogoutIcon color="primary" />
						</ListItemIcon>
						<Link href="#" onClick={preventDefault}>
							<ListItemText primary={this.strings(StringKeys.Logout)} />
						</Link>
					</ListItem>
				)}

				{Utility.isGrocery() && (
					<ListItem button onClick={context.onLogoutClick2}>
						<ListItemIcon>
							<LogoutIcon color="primary" />
						</ListItemIcon>
						<Link href="#" onClick={preventDefault}>
							<ListItemText primary={this.strings(StringKeys.Logout)} />
						</Link>
					</ListItem>
				)}
			</div>
		);
	}
}

ListItems.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItems);
