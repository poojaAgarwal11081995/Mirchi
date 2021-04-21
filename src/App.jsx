/** @format */

import React, { lazy, Component, Fragment } from "react";

import { createBrowserHistory, createHashHistory } from "history";
import { Router, Route, Switch, Redirect, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import * as Constants from "./utils/Constants";
import * as Colors from "./res/Colors";
// core components
import Login from "./screens/Login";
import Dashboard from "./screens/admin/Dashboard.jsx";
import AddRestaurent from "./screens/admin/AddRestaurent.jsx";
import AddCategory from "./screens/admin/AddCategory.jsx";
import CategoryList from "./screens/admin/CategoryList.jsx";
import RestaurantList from "./screens/admin/RestaurantList.jsx";
import RailwayParcelList from "./screens/admin/RailwayParcelList.jsx"; //import RailwayParcelList
import PartyBookingList from "./screens/admin/PartyBookingList.jsx"; //import PartyBookingList

import HomeRoute from "./screens/Home";
import { Offline, Online } from "react-detect-offline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import AddDriver from "./screens/admin/AddDriver";
import DriverList from "./screens/admin/DriverList";
import UserList from "./screens/admin/UserList";
import AddUser from "./screens/admin/AddUser";
import OfficeList from "./screens/admin/OfficeList";
import AddOffice from "./screens/admin/AddOffice.jsx";
import Directions from "./screens/admin/trackers/Directions/DirectionsIndex";
import FloatingCashForDriver from "./screens/admin/FloatingCashForDriver";
import AddProductCategory from "./screens/admin/AddProductCategory";
import CategoryDetail from "./screens/admin/details/CategoryDetail";
import DriverDetails from "./screens/admin/details/DriverDetails";
import AddProducts from "./screens/admin/AddProducts";
import ChooseRestoItem from "./screens/admin/ChooseRestoItem";
import ProductList from "./screens/admin/ProductList";
import ProductDetails from "./screens/admin/details/ProductDetails";
import ProductCategoryDetail from "./screens/admin/details/ProductCategoryDetail";
import AddOffers from "./screens/admin/AddOffers";
import OfferList from "./screens/admin/OffersList";
import AddCountry from "./screens/admin/locationsettings/AddCountry";
import CountryList from "./screens/admin/locationsettings/CountryList";
import RestauentDetails from "./screens/admin/details/RestauentDetails";
import EditCountry from "./screens/admin/locationsettings/locationedit/EditCountry";
import AddState from "./screens/admin/locationsettings/AddState";
import StateList from "./screens/admin/locationsettings/StateList";
import EditState from "./screens/admin/locationsettings/locationedit/EditState";
import AddCity from "./screens/admin/locationsettings/AddCity";
import AddZip from "./screens/admin/locationsettings/AddZip";
import CityList from "./screens/admin/locationsettings/CityList";
import EditCity from "./screens/admin/locationsettings/locationedit/EditCity";
import AddRegion from "./screens/admin/locationsettings/AddRegion";
import RegionList from "./screens/admin/locationsettings/RegionList";
import EditRegion from "./screens/admin/locationsettings/locationedit/EditRegion";
import MainOrder from "./screens/admin/orderreuest/MainOrder";
import OrderList from "./screens/admin/orderreuest/OrderList";
import * as Utility from "./utils/Utility";

//const RestroDashboard = React.lazy(() => import('./screens/admin/RestroDashboard'));

//const RestroDashboard = lazy(() => import('./screens/admin/RestroDashboard'));
import RestroDashboard from "./screens/admin/RestroDashboard";
import OrderDetails from "./screens/admin/orderreuest/OrderDetails";
import ProductCategoryList from "./screens/admin/ProductCategoryList";
import AddDriverFare from "./screens/admin/AddDriverFare";
import CouponManagement from "./screens/admin/CouponManagement";
import AboutUs from "./screens/admin/AboutUs";
import ProfitMode from "./screens/admin/ProfitMode";

import AdminProfile from "./screens/admin/AdminProfile";

import AddCoupon from "./screens/admin/AddCoupon";
import RatingReviewManagement from "./screens/admin/RatingReviewManagement";
import TrackOrderOnMapGrocery from "./screens/admin/TrackOrderOnMapGrocery";
import OnePageReport from "./screens/admin/report/OnePageReport";
import DiscountManagement from "./screens/admin/DiscountManagement";
import AddDiscount from "./screens/admin/AddDiscount";
import RestroPaymentHistory from "./screens/admin/RestroPaymentHistory";
import DriverFareList from "./screens/admin/DriverFareList";
import AdminCommissionList from "./screens/admin/AdminCommissionList";
import AddAdminCommission from "./screens/admin/AddAdminCommission";
import EarringPage from "./screens/admin/EarringPage";

import ViewReview from "./screens/admin/ViewReview";

import DriverPaymentHistry from "./screens/admin/DriverPaymentHistry";
import AdminEarning from "./screens/admin/AdminEarning";
import RestaurentEarning from "./screens/admin/RestaurentEarning";
import EarringTimeWise from "./screens/admin/EarringTimeWise";
import EarringTimeWiseRestro from "./screens/admin/EarringTimeWiseRestro";
import EarringTimeWiseAdmin from "./screens/admin/EarringTimeWiseAdmin";
import Faq from "./screens/admin/Faq";
import Support from "./screens/admin/Support";
import ChatApp from "./screens/admin/ChatApp";
import DileveryCharges from "./screens/admin/DileveryCharges";
import AddDileveryCharges from "./screens/admin/AddDileveryCharges";
import PrivacyAndPolicy from "./screens/admin/PrivacyAndPolicy";
import PrivacyAndPolicyGlobalUrl from "./screens/admin/PrivacyAndPolicyGlobalUrl";
import RequestedRestroDetails from "./screens/admin/details/RequestedRestroDetails";
import RequestedDriverDetails from "./screens/admin/details/RequestedDriverDetails";
import GeneralIssue from "./screens/admin/GeneralIssue";
import DashboardRecentAdmin from "./screens/admin/DashboardRecentAdmin";
import { UserProvider } from "./screens/UserContext";
import DashboardRecentRestro from "./screens/admin/DashboardRecentRestro";
import OrdersManagement from "./screens/admin/OrdersManagement";
import ReviewManagement from "./screens/admin/ReviewManagement";
import GroceryList from "./screens/admin/GroceryList";
import AddGroceryStore from "./screens/admin/AddGroceryStore";
import DashboardRecentGroceryStore from "./screens/admin/DashboardRecentGroceryStore";
import GroceryDetails from "./screens/admin/details/GroceryDetails";
import GroceryDashboard from "./screens/admin/GroceryDashboard";
import GroceryEarning from "./screens/admin/GroceryEarning";
import ProductCategoryListGrocery from "./screens/admin/ProductCategoryListGrocery";
import MainOrderGrocery from "./screens/admin/orderreuest/MainOrderGrocery";
import CouponManagementGrocery from "./screens/admin/CouponManagementGrocery";
import AddDiscountGrocery from "./screens/admin/AddDiscountGrocery";
import AddCouponGrocery from "./screens/admin/AddCouponGrocery";
import AddProductsGrocery from "./screens/admin/AddProductsGrocery";
import AddProductCategoryGrocery from "./screens/admin/AddProductCategoryGrocery";
import ProductListGrocery from "./screens/admin/ProductListGrocery";
import CategoryListGrocery from "./screens/admin/CategoryListGrocery";
import AddCategoryGrocery from "./screens/admin/AddCategoryGrocery";
import ProductDetailsGrocery from "./screens/admin/details/ProductDetailsGrocery";
import DriverListGrocery from "./screens/admin/DriverListGrocery";
import AddDriverGrocery from "./screens/admin/AddDriverGrocery";
import OrdersManagementGrocery from "./screens/admin/OrdersManagementGrocery";
import UserListGrocery from "./screens/admin/UserListGrocery";
import AddUserGrocery from "./screens/admin/AddUserGrocery";
import RequestedGroceryDetails from "./screens/admin/details/RequestedGroceryDetails";
import RequestedDriverDetailsGrocery from "./screens/admin/details/RequestedDriverDetailsGrocery";
import DriverDetailsGrocery from "./screens/admin/details/DriverDetailsGrocery";
import ProductCategoryDetailGrocery from "./screens/admin/details/ProductCategoryDetailGrocery";
import OfficeListGrocery from "./screens/admin/OfficeListGrocery";
import AddOfficeGrocery from "./screens/admin/AddOfficeGrocery";
import OrderDetailsGrocery from "./screens/admin/orderreuest/OrderDetailsGrocery";
import OrderListGrocery from "./screens/admin/orderreuest/OrderListGrocery";
import EarringTimeWiseAdminGrocery from "./screens/admin/EarringTimeWiseAdminGrocery";
import EarringTimeWiseGrocery from "./screens/admin/EarringTimeWiseGrocery";
import AdminEarningGrocery from "./screens/admin/AdminEarningGrocery";
import DashboardGrocery from "./screens/admin/DashboardGrocery";
import RatingReviewTable from "./tables/RatingReviewTable";
import RatingReviewTableGrocery from "./tables/RatingReviewTableGrocery";
import ReviewManagementGrocery from "./screens/admin/ReviewManagementGrocery";
import ViewReviewGrocery from "./screens/admin/ViewReviewGrocery";
import RatingReviewListGrocery from "./screens/admin/RatingReviewListGrocery";
import EarringPageGrocery from "./screens/admin/EarringPageGrocery";
import GroceryPaymentHistory from "./screens/admin/GroceryPaymentHistory";
import FLCashDriverTableGrocery from "./tables/FLCashDriverTableGrocery";
import FloatingCashForDriverGrocery from "./screens/admin/FloatingCashForDriverGrocery";
import AdminCommissionListGrocery from "./screens/admin/AdminCommissionListGrocery";
import AddAdminCommissionGrocery from "./screens/admin/AddAdminCommissionGrocery";
import DileveryChargesGrocery from "./screens/admin/DileveryChargesGrocery";
import AddDileveryChargesGrocery from "./screens/admin/AddDileveryChargesGrocery";
import DriverFareListGrocery from "./screens/admin/DriverFareListGrocery";
import AddDriverFareGrocery from "./screens/admin/AddDriverFareGrocery";
import DriverPaymentHistryGrocery from "./screens/admin/DriverPaymentHistryGrocery";
import GroceryEarringTimeWise from "./screens/admin/GroceryEarringTimeWise";
import TrackOrderOnMapRestro from "./screens/admin/TrackOrderOnMapRestro";
import Report from "./screens/admin/report";
import OrdersManagementGroceryCancel from "./screens/admin/OrdersManagementGroceryCancel";
import OrdersManagementCancel from "./screens/admin/OrdersManagementCancel";
import OrderReportIteamWiseComponent from "./screens/admin/orderreuest/IteamWiseReport/Restorent/OrderReportIteamWiseComponent";
import OrderReportIteamWiseGroceryComponent from "./screens/admin/orderreuest/IteamWiseReport/grocery/OrderReportIteamWiseGroceryComponent";
import DiscountComponent from "./screens/admin/orderreuest/Discountmanagment/DiscountComponent";
import GroceryDriverReportComponent from "./screens/admin/orderreuest/DriverReport/GroceryDriverReport/GroceryDriverReportComponent";
import RestorentDriverComponent from "./screens/admin/orderreuest/DriverReport/RestorentDriverReport/RestorentDriverComponent";
import GroceryDriverIdComponent from "./screens/admin/orderreuest/DriverReport/GroceryDriverReport/GroceryDriverIdComponent";
import RestaurantDriverIdReport from "./screens/admin/orderreuest/DriverReport/RestorentDriverReport/RestaurentDriverIdReportComponent";
// import EditorConvertToHTML from "./screens/admin/orderreuest/CMSmanagment/CmsDraft";
import CMStable from "./screens/admin/orderreuest/CMSmanagment/CMSEditor";
import ManagmentPrivacyPolicy from "./screens/admin/orderreuest/CMSmanagment/manegment";
import ZipcodeList from "./screens/admin/locationsettings/ZipcodeList";
import SettingManagment from "./screens/admin/orderreuest/Setting/SettingManagment";

import { ToastContainer } from "react-toastify";
const Context = React.createContext();

let redirectScreenName = Constants.SCREEN_LOGIN;
const hist = createBrowserHistory();
const theme = createMuiTheme({
	palette: {
		primary: {
			light: "#fff",
			main: Colors.colorPrimary,
			dark: Colors.colorPrimaryDark,
		},
		secondary: {
			main: Colors.colorPrimaryDark,
		},
	},
	typography: {
		useNextVariants: true,
	},
});

class App extends Component {
	constructor(props) {
		super(props);
		console.log("url :- ", window.location);
		let web_page_name = window.location.href.split("/");
		console.log("web_page_name app :- ", web_page_name);

		if (
			web_page_name[web_page_name.length - 1] ==
				Constants.WEB_TYPE_RESTAURANT_WITHOUT_SLACE ||
			web_page_name[web_page_name.length - 2] ==
				Constants.WEB_TYPE_RESTAURANT_WITHOUT_SLACE
		) {
			redirectScreenName = Constants.SCREEN_LOGIN_FOR_RESTRO;
			console.log("web_page_name 2 app: - ", redirectScreenName);
		} else if (
			web_page_name[web_page_name.length - 1] ==
				Constants.WEB_TYPE_GROCERY_WITHOUT_SLACE ||
			web_page_name[web_page_name.length - 2] ==
				Constants.WEB_TYPE_GROCERY_WITHOUT_SLACE
		) {
			redirectScreenName = Constants.SCREEN_LOGIN_FOR_GROCERY;
			console.log("web_page_name 3 app: - ", redirectScreenName);
		} else if (
			web_page_name[web_page_name.length - 1] ==
				Constants.WEB_TYPE_ADMIN_WITHOUT_SLACE ||
			web_page_name[web_page_name.length - 2] ==
				Constants.WEB_TYPE_ADMIN_WITHOUT_SLACE
		) {
			redirectScreenName = Constants.SCREEN_LOGIN;
			console.log("web_page_name 4 app: - ", redirectScreenName);
		} else if (
			web_page_name[web_page_name.length - 1] ==
				Constants.WEB_TYPE_PRIVACY_AND_POLICY ||
			web_page_name[web_page_name.length - 2] ==
				Constants.WEB_TYPE_PRIVACY_AND_POLICY
		) {
			redirectScreenName = Constants.SCREEN_PRIVACY_AND_POLICY_GLOBAL_URL;
			console.log("web_page_name 5 app: - ", redirectScreenName);
		}

		// CustomStorage.clearSessionData();
	}

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Fragment>
					<Online>
						<Provider store={store}>
							{/* <UserProvider value={{ history: hist }}> */}
							<ToastContainer
								position="top-right"
								autoClose={2000}
								hideProgressBar={false}
								newestOnTop={false}
								closeOnClick
								// rtl={false}
								pauseOnFocusLoss
								draggable
								pauseOnHover
							/>
							<Router history={hist}>
								{redirectScreenName === Constants.SCREEN_LOGIN && (
									<Switch>
										<Route path={Constants.SCREEN_LOGIN} component={Login} />

										<Route path={Constants.SCREEN_HOME} component={HomeRoute} />
										<HomeRoute
											path={Constants.SCREEN_DASHBOARD}
											component={DashboardRecentAdmin}
											title={"Dashboard"}
										/>
										<HomeRoute
											path={Constants.SCREEN_DASHBOARD_REQUESTED}
											component={Dashboard}
											title={"Requested"}
										/>
										<HomeRoute
											path={Constants.SCREEN_DASHBOARD_REQUESTED_GROCERY}
											component={DashboardGrocery}
											title={"Grocery Requested"}
										/>

										<HomeRoute
											path={Constants.SCREEN_ADD_RESTAURENT}
											component={AddRestaurent}
											title={"Add Restaurant"}
										/>
										<HomeRoute
											path={Constants.SCREEN_RESTAURANT_DETAIL}
											component={RestauentDetails}
											title={"Restaurant Details"}
										/>
										<HomeRoute
											path={Constants.SCREEN_RESTAURENT_PROFILE}
											component={RestauentDetails}
											title={"Restaurant Details"}
										/>
										<HomeRoute
											path={Constants.SCREEN_RESTAURENT_LIST}
											component={RestaurantList}
											title={"Restaurant List"}
										/>
										<HomeRoute
											path={Constants.SCREEN_RAILWAY_PARCEL}
											component={RailwayParcelList}
											title={"Railway Parcel"}
										/>
										<HomeRoute
											path={Constants.SCREEN_PARTY_BOOKING}
											component={PartyBookingList}
											title={"Party Booking"}
										/>
										<HomeRoute
											path={Constants.SCREEN_PROFIT_MODE}
											component={ProfitMode}
											title={"Admin profit"}
										/>

										<HomeRoute
											path={Constants.SCREEN_ADD_GROCERY_STORE}
											component={AddGroceryStore}
											title={"Add Grocery Store"}
										/>
										<HomeRoute
											path={Constants.SCREEN_GROCERY_DETAIL}
											component={GroceryDetails}
											title={"Grocery Details"}
										/>
										<HomeRoute
											path={Constants.SCREEN_GROCERY_PROFILE}
											component={GroceryDetails}
											title={"Grocery Details"}
										/>
										<HomeRoute
											path={Constants.SCREEN_GROCERY_LIST}
											component={GroceryList}
											title={"Grocery Vendor List"}
										/>

										<HomeRoute
											path={Constants.SCREEN_ADD_CATEGORY}
											component={AddCategory}
											title={"Add Category"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_CATEGORY_GROCERY}
											component={AddCategoryGrocery}
											title={"Add Category"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_PRODUCT_CATEGORY}
											component={AddProductCategory}
											title={"Add Product Type"}
										/>

										<HomeRoute
											path={Constants.SCREEN_CATEGORY_LIST}
											component={CategoryList}
											title={"Restaurant Types"}
										/>
										<HomeRoute
											path={Constants.SCREEN_CATEGORY_LIST_ADMIN_GROCERY}
											component={CategoryListGrocery}
											title={"Grocery Types"}
										/>

										<HomeRoute
											path={Constants.SCREEN_PRODUCT_CATEGORY_LIST}
											component={ProductCategoryList}
											title={"Product Type List"}
										/>
										<HomeRoute
											path={Constants.SCREEN_PRODUCT_CATEGORY_GROCERY_LIST}
											component={ProductCategoryListGrocery}
											title={"Store Type List"}
										/>
										<HomeRoute
											path={Constants.SCREEN_RESTAURANT_PAYMENT_HISTORY}
											component={RestroPaymentHistory}
											title={"Restaurant Payment History"}
										/>
										<HomeRoute
											path={Constants.SCREEN_GROCERY_PAYMENT_HISTORY}
											component={GroceryPaymentHistory}
											title={"Grocery Payment History"}
										/>
										<HomeRoute
											path={Constants.SCREEN_DRIVER_PAYMENT_HISTORY}
											component={DriverPaymentHistry}
											title={"Restaurant Driver Payment History"}
										/>
										<HomeRoute
											path={Constants.SCREEN_DRIVER_PAYMENT_HISTORY_GROCERY}
											component={DriverPaymentHistryGrocery}
											title={"Grocery Driver Payment History"}
										/>
										{/* Driver Add start */}

										<HomeRoute
											path={Constants.SCREEN_ADD_DRIVER}
											component={AddDriver}
											title={"Restaurant Add Driver"}
										/>

										<HomeRoute
											path={Constants.SCREEN_ADD_DRIVER_GROCERY}
											component={AddDriverGrocery}
											title={"Grocery Add Driver"}
										/>
										{/* Driver Add end */}

										<HomeRoute
											path={Constants.SCREEN_DRIVER_LIST}
											component={DriverList}
											title={"Restaurant Driver List"}
										/>

										{/* new D*/}
										<HomeRoute
											path={Constants.SCREEN_GROSERY_DRIVER_LIST_REPORT}
											component={GroceryDriverReportComponent}
											title={"Grocery Driver Report"}
										/>
										{/* new D */}
										<HomeRoute
											path={Constants.SCREEN_RESTAURANT_DRIVER_LIST_REPORT}
											component={RestorentDriverComponent}
											title={"Restaurant Driver Report"}
										/>
										<HomeRoute
											path={Constants.SCREEN_GROSERY_DRIVER_LIST_ID}
											component={GroceryDriverIdComponent}
											title={"Grocery Driver Report"}
										/>
										<HomeRoute
											path={Constants.SCREEN_RESTAURANT_DRIVER_ID_REPORT}
											component={RestaurantDriverIdReport}
											title={"Restaurant Driver Report"}
										/>
										<HomeRoute
											path={Constants.SCREEN_DRIVER_LIST_GROCERY}
											component={DriverListGrocery}
											title={"Grocery Driver List"}
										/>
										<HomeRoute
											path={Constants.SCREEN_USER_LIST}
											component={UserList}
											title={"User List"}
										/>
										<HomeRoute
											path={Constants.SCREEN_USER_LIST_GROCERY}
											component={UserListGrocery}
											title={"Grocery User List"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_USER}
											component={AddUser}
											title={"Add User"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_USER_GROCERY}
											component={AddUserGrocery}
											title={"Grocery Add User"}
										/>

										<HomeRoute
											path={Constants.SCREEN_DISCOUNT}
											component={DiscountComponent}
											title={"Discount"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ABOUT_US}
											component={AboutUs}
											title={"About us"}
										/>
										{/* report */}
										<HomeRoute
											path={Constants.SCREEN_REPORT}
											component={Report}
											title={"Report"}
										/>
										<HomeRoute
											path={Constants.SCREEN_FAQ}
											component={Faq}
											title={"FAQ"}
										/>
										<HomeRoute
											path={Constants.SCREEN_SUPPORT}
											component={Support}
											title={"Support"}
										/>
										<HomeRoute
											path={Constants.SCREEN_TERMS_AND_CONDITIONS}
											component={ChatApp}
											title={"Terms & Conditions"}
										/>
										<HomeRoute
											path={Constants.SCREEN_PRIVACY_AND_POLICY}
											component={PrivacyAndPolicy}
											title={"Privacy And Policy"}
										/>

										<HomeRoute
											path={Constants.SCREEN_OFFICE_LIST}
											component={OfficeList}
											title={"Office List"}
										/>
										<HomeRoute
											path={Constants.SCREEN_OFFICE_LIST_GROCERY}
											component={OfficeListGrocery}
											title={"Grocery Office List"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_OFFICE}
											component={AddOffice}
											title={"Add Office"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_OFFICE_GROCERY}
											component={AddOfficeGrocery}
											title={"Grocery Add Office"}
										/>
										<HomeRoute
											path={Constants.SCREEN_EDIT_OFFICE}
											component={AddOffice}
											title={"Edit Office"}
										/>
										<HomeRoute
											path={Constants.SCREEN_EDIT_OFFICE_GROCERY}
											component={AddOfficeGrocery}
											title={"Grocery Edit Office"}
										/>

										<HomeRoute
											path={Constants.SCREEN_FLOATING_CASH}
											component={FloatingCashForDriver}
											title={"Floating Cash"}
										/>
										<HomeRoute
											path={Constants.SCREEN_FLOATING_CASH_GROCERY}
											component={FloatingCashForDriverGrocery}
											title={"Floating Cash"}
										/>

										<HomeRoute
											path={Constants.SCREEN_RESTAURANT_DETAIL}
											component={AddRestaurent}
											title={"Restaurant Details"}
										/>
										<HomeRoute
											path={Constants.SCREEN_CATEGORIES_DETAIL}
											component={CategoryDetail}
											title={"Category Details"}
										/>
										<HomeRoute
											path={Constants.SCREEN_CATEGORIES_DETAIL_ADMIN_GROCERY}
											component={ProductCategoryDetailGrocery}
											title={"Grocery Category Details"}
										/>
										<HomeRoute
											path={Constants.SCREEN_PRODUCT_CATEGORIES_DETAIL}
											component={ProductCategoryDetail}
											title={"Category Details"}
										/>

										<HomeRoute
											path={Constants.SCREEN_DRIVER_DETAIL}
											component={DriverDetails}
											title={"Driver Details"}
										/>

										<HomeRoute
											path={Constants.SCREEN_DRIVER_DETAIL_GROCERY}
											component={DriverDetailsGrocery}
											title={"Grocery Driver Details"}
										/>
										<HomeRoute
											path={Constants.SCREEN_CHOOSE_RESTO_ITEM}
											component={ChooseRestoItem}
											title={"Choose Restaurant"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_PRODUCT}
											component={AddProducts}
											title={"Add Product"}
										/>

										<HomeRoute
											path={Constants.SCREEN_CHOOSE_GROCERY_ITEM}
											component={ChooseRestoItem}
											title={"Choose Restaurant"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_PRODUCT_GROCERY_ADMIN}
											component={AddProductsGrocery}
											title={"Add Product"}
										/>

										<HomeRoute
											path={Constants.SCREEN_PRODUCT_LIST}
											component={ProductList}
											title={"Product List"}
										/>

										<HomeRoute
											path={Constants.SCREEN_PRODUCT_LIST_GROCERY_ADMIN}
											component={ProductListGrocery}
											title={"Product List"}
										/>

										<HomeRoute
											path={Constants.SCREEN_PRODUCT_GROCERY_DETAILS_ADMIN}
											component={ProductDetailsGrocery}
											title={"Product Details"}
										/>

										<HomeRoute
											path={Constants.SCREEN_RATING_AND_REVIEW_ADMIN}
											component={RatingReviewTable}
											title={"Rating Details"}
										/>

										<HomeRoute
											path={Constants.SCREEN_RATING_AND_REVIEW_ADMIN_GROCERY}
											component={RatingReviewTableGrocery}
											title={"Rating Details"}
										/>

										<HomeRoute
											path={Constants.SCREEN_PRODUCT_DETAILS}
											component={ProductDetails}
											title={"Product Details"}
										/>

										<HomeRoute
											path={Constants.SCREEN_ADD_OFFER}
											component={AddOffers}
											title={"Add Offer"}
										/>

										<HomeRoute
											path={Constants.SCREEN_OFFER_LIST}
											component={OfferList}
											title={"Offers List"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_COUNTRY}
											component={AddCountry}
											title={"Add Country"}
										/>
										<HomeRoute
											path={Constants.SCREEN_COUNTRY_LIST}
											component={CountryList}
											title={"Country List"}
										/>
										<HomeRoute
											path={Constants.SCREEN_COUNTRY_MANAGEMENT}
											component={CountryList}
											title={"Country List"}
										/>
										<HomeRoute
											path={Constants.SCREEN_EDIT_COUNTRY}
											component={EditCountry}
											title={"Country Details"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_STATE}
											component={AddState}
											title={"Add State"}
										/>
										<HomeRoute
											path={Constants.SCREEN_STATE_LIST}
											component={StateList}
											title={"State List"}
										/>
										<HomeRoute
											path={Constants.SCREEN_STATE_MANAGEMENT}
											component={StateList}
											title={"State List"}
										/>
										<HomeRoute
											path={Constants.SCREEN_EDIT_STATE}
											component={EditState}
											title={"State Details"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_CITY}
											component={AddCity}
											title={"Add City"}
										/>
										<HomeRoute
											path={Constants.SCREEN_CITY_LIST}
											component={CityList}
											title={"City List"}
										/>
										<HomeRoute
											path={Constants.SCREEN_CITY_MANAGEMENT}
											component={CityList}
											title={"City List"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ZIP_MANAGEMENT}
											component={ZipcodeList}
											title={"Zip List"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ZIP_CODE}
											component={AddZip}
											title={"Add zipcode"}
										/>

										<HomeRoute
											path={Constants.SCREEN_EDIT_CITY}
											component={EditCity}
											title={"City Details"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_REGION}
											component={AddRegion}
											title={"Add Region"}
										/>
										<HomeRoute
											path={Constants.SCREEN_SCREEN_REGION_LIST}
											component={RegionList}
											title={"Region List"}
										/>
										<HomeRoute
											path={Constants.SCREEN_REGION_MANAGEMENT}
											component={RegionList}
											title={"Region List"}
										/>
										<HomeRoute
											path={Constants.SCREEN_SCREEN_EDIT_REGION}
											component={EditRegion}
											title={"Region Details"}
										/>
										<HomeRoute
											path={Constants.SCREEN_SCREEN_CHECK_REQUEST}
											component={MainOrder}
											title={"Orders"}
										/>
										<HomeRoute
											path={Constants.SCREEN_SCREEN_CHECK_REQUEST_GROCERY}
											component={MainOrderGrocery}
											title={"Grocery Orders"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ORDER_LIST}
											component={OrderList}
											title={"Order List"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ORDER_LIST_GROCERY}
											component={OrderListGrocery}
											title={"Grocery Order List"}
										/>

										<HomeRoute
											path={Constants.SCREEN_ORDER_DETAILS}
											component={OrderDetails}
											title={"Order Details"}
										/>

										<HomeRoute
											path={Constants.SCREEN_ORDER_DETAILS_ADMIN_GROCERY}
											component={OrderDetailsGrocery}
											title={"Grocery Order Details"}
										/>
										{/* restaurant fare managment */}
										<HomeRoute
											path={Constants.SCREEN_DRIVER_FARE_MANAGAMENT}
											component={DriverFareList}
											title={"Driver Fare Managament"}
										/>
										{/* Grocery fare managment */}
										<HomeRoute
											path={Constants.SCREEN_DRIVER_FARE_MANAGAMENT_GROCERY}
											component={DriverFareListGrocery}
											title={"Driver Fare Managament"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADMIN_COMMISSION_MANAGEMENT}
											component={AdminCommissionList}
											title={"Admin Commission Management"}
										/>
										<HomeRoute
											path={
												Constants.SCREEN_ADMIN_COMMISSION_MANAGEMENT_GROCERY
											}
											component={AdminCommissionListGrocery}
											title={"Admin Commission Management"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_ADMIN_COMMISSION}
											component={AddAdminCommission}
											title={"Add Admin Commission"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_ADMIN_COMMISSION_GROCERY}
											component={AddAdminCommissionGrocery}
											title={"Add Admin Commission"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_DRIVER_FARE}
											component={AddDriverFare}
											title={"Add Driver Fare"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_CUSTOMARE_FARE}
											component={AddDriverFare}
											title={"Add Customare Fare"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_DRIVER_FARE_GROCERY}
											component={AddDriverFareGrocery}
											title={"Add Driver Fare"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_CUSTOMARE_FARE_GROCERY}
											component={AddDriverFareGrocery}
											title={"Add Customare Fare"}
										/>
										<HomeRoute
											path={Constants.SCREEN_COUPON_GROCERY_MANAGAMENT_ADMIN}
											component={CouponManagement}
											title={"Coupon Managament"}
										/>

										<HomeRoute
											path={Constants.SCREEN_COUPON_MANAGAMENT}
											component={CouponManagement}
											title={"Coupon Managament"}
										/>

										<HomeRoute
											path={Constants.SCREEN_ADMIN_PROFILE}
											component={AdminProfile}
											title={"Admin Profile"}
										/>

										<HomeRoute
											path={Constants.SCREEN_ADMIN_EARNING}
											component={AdminEarning}
											title={"Restaurant Admin Earning"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADMIN_EARNING_GROCERY}
											component={AdminEarningGrocery}
											title={"Grocery Admin Earning"}
										/>

										<HomeRoute
											path={Constants.SCREEN_RESTAURENT_EARNING_IN_ADMIN}
											component={RestaurentEarning}
											title={"Restaurant Earning"}
										/>
										<HomeRoute
											path={Constants.SCREEN_GROCERY_EARNING_IN_ADMIN}
											component={GroceryEarning}
											title={"Grocery Earning"}
										/>

										<HomeRoute
											path={Constants.SCREEN_ADD_COUPON_ADMIN}
											component={AddCoupon}
											title={"Add Coupon"}
										/>
										{/* 
                                        <HomeRoute path={Constants.SCREEN_TRACK_ORDER_IN_ADMIN}
                                            component={Directions} title={'Track Order'} /> */}

										<HomeRoute
											path={Constants.SCREEN_TRACK_ORDER_IN_ADMIN}
											component={TrackOrderOnMapRestro}
											title={"Track Order"}
										/>

										{/* <HomeRoute path={Constants.SCREEN_TRACK_ORDER_IN_ADMIN_GROCERY}
                                            component={Directions} title={'Track Order'} /> */}

										<HomeRoute
											path={Constants.SCREEN_TRACK_ORDER_IN_ADMIN_GROCERY}
											component={TrackOrderOnMapGrocery}
											title={"Track Order"}
										/>

										<HomeRoute
											path={Constants.SCREEN_ONE_PAGE_REPORT}
											component={OnePageReport}
											title={"One Page Report"}
										/>
										<HomeRoute
											path={Constants.SCREEN_SETTING_MANAGMENT}
											component={SettingManagment}
											title={"Setting"}
										/>
										<HomeRoute
											path={Constants.SCREEN_DISCOUNT_MANAGAMENT}
											component={DiscountManagement}
											title={"Discount Management"}
										/>
										<HomeRoute
											path={Constants.SCREEN_EARRING_PAGE}
											component={EarringPage}
											title={"Earning And Incentive"}
										/>
										<HomeRoute
											path={Constants.SCREEN_EARRING_TIMEWISE}
											component={EarringTimeWise}
											title={"Earning And Incentive "}
										/>
										<HomeRoute
											path={Constants.SCREEN_GROCERY_EARRING_TIMEWISE}
											component={GroceryEarringTimeWise}
											title={"Earning"}
										/>
										<HomeRoute
											path={Constants.SCREEN_EARRING_PAGE_GROCERY}
											component={EarringPageGrocery}
											title={"Earning And Incentive"}
										/>
										<HomeRoute
											path={Constants.SCREEN_EARRING_TIMEWISE_GROCERY_ADMIN}
											component={EarringTimeWiseGrocery}
											title={"Earning And Incentive "}
										/>

										<HomeRoute
											path={Constants.SCREEN_ADMIN_EARNING_TIMEWISE}
											component={EarringTimeWiseAdmin}
											title={"My Earning"}
										/>

										<HomeRoute
											path={Constants.SCREEN_ADMIN_EARNING_TIMEWISE_GROCERY}
											component={EarringTimeWiseAdminGrocery}
											title={"My Earning"}
										/>

										<HomeRoute
											path={Constants.SCREEN_RESTRO_EARNING_TIMEWISE_IN_ADMIN}
											component={EarringTimeWiseRestro}
											title={"Restro Earning"}
										/>

										<HomeRoute
											path={Constants.SCREEN_GROCERY_EARNING_TIMEWISE_IN_ADMIN}
											component={EarringTimeWiseGrocery}
											title={"Grocery Earning"}
										/>
										<HomeRoute
											path={Constants.SCREEN_DILEVERY_CHARGES}
											component={DileveryCharges}
											title={"Delivery Charges List"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_DILEVERY_CHARGES}
											component={AddDileveryCharges}
											title={"Add Delivery Charges"}
										/>
										<HomeRoute
											path={Constants.SCREEN_DILEVERY_CHARGES_GROCERY}
											component={DileveryChargesGrocery}
											title={"Delivery Charges List"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_DILEVERY_CHARGES_GROCERY}
											component={AddDileveryChargesGrocery}
											title={"Add Delivery Charges"}
										/>
										<HomeRoute
											path={Constants.SCREEN_SCREEN_ORDER_MANAGEMENT_IN_ADMIN}
											component={OrdersManagement}
											title={"Restaurant Order List"}
										/>
										<HomeRoute
											path={
												Constants.SCREEN_SCREEN_ORDER_MANAGEMENT_IN_ADMIN_GROCERY
											}
											component={OrdersManagementGrocery}
											title={"Grocery Order List"}
										/>

										{/* new */}

										<HomeRoute
											path={Constants.SCREEN_REQUESTED_RESTRO_CANCEL_ORDER}
											component={OrdersManagementCancel}
											title={"Restaurant Cancel Order"}
										/>
										<HomeRoute
											path={Constants.SCREEN_REQUESTED_GROCERY_CANCEL_ORDER}
											component={OrdersManagementGroceryCancel}
											title={"Grocery Cancel Order"}
										/>
										<HomeRoute
											path={Constants.SCREEN_REQUESTED_RESTRO_ITEAM_WISE}
											component={OrderReportIteamWiseComponent}
											title={"Item Wise Restaurant Report"}
										/>
										<HomeRoute
											path={Constants.SCREEN_REQUESTED_GROCERY_ITEAM_WISE}
											component={OrderReportIteamWiseGroceryComponent}
											title={"Item Wise Grocery Order Report"}
										/>

										<HomeRoute
											path={Constants.SCREEN_REQUESTED_RESTRO_DETAILS}
											component={RequestedRestroDetails}
											title={"Restaurant Details"}
										/>
										<HomeRoute
											path={Constants.SCREEN_REQUESTED_GROCERY_DETAILS}
											component={RequestedGroceryDetails}
											title={"Grocery Details"}
										/>
										<HomeRoute
											path={Constants.SCREEN_REQUESTED_DRIVER_DETAILS}
											component={RequestedDriverDetails}
											title={"Driver Details"}
										/>
										<HomeRoute
											path={Constants.SCREEN_REQUESTED_DRIVER_DETAILS_GROCERY}
											component={RequestedDriverDetailsGrocery}
											title={"Grocery Driver Details"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_GENERAL_ISSUE}
											component={GeneralIssue}
											title={"General Issue"}
										/>
										{/* CMS */}
										{/* <HomeRoute
											path={Constants.SCREEN_CMS_MANAGEMENT}
											component={EditorConvertToHTML}
											title={"CMS Managment"}
										/> */}
										{/* <HomeRoute
											path={Constants.SCREEN_CMS_MANAGEMENT}
											component={ManagmentPrivacyPolicy}
											title={"CMS Managment"}
										/> */}

										{/* <HomeRoute
											path={Constants.SCREEN_CMS_MANAGEMENT_TABEL}
											component={CMStable}
											title={"CMS Managment table"}
										/> */}
										<HomeRoute
											path={Constants.SCREEN_REVIEW_MANAGEMENT}
											component={ReviewManagement}
											title={"Rating And Review"}
										/>
										<HomeRoute
											path={Constants.SCREEN_REVIEW_MANAGEMENT_GROCERY}
											component={ReviewManagementGrocery}
											title={"Rating And Review"}
										/>

										<HomeRoute
											path={Constants.SCREEN_VIEW_REVIEW}
											component={ViewReview}
											title={"View And Review"}
										/>

										<HomeRoute
											path={Constants.SCREEN_VIEW_REVIEW_GROCERY}
											component={ViewReviewGrocery}
											title={"View And Review"}
										/>
									</Switch>
								)}

								{/* admin for restro  start*/}
								{redirectScreenName === Constants.SCREEN_LOGIN_FOR_RESTRO && (
									<Switch>
										<Route
											path={Constants.SCREEN_LOGIN_FOR_RESTRO}
											component={Login}
										/>
										<Route
											path={Constants.SCREEN_ADD_RESTAURENT_ON_RESTRO}
											component={AddRestaurent}
										/>
										<HomeRoute
											path={Constants.SCREEN_DASHBOARD_RECENT_RESTRO}
											component={DashboardRecentRestro}
											title={"Restaurant Dashboard"}
										/>
										<HomeRoute
											path={Constants.SCREEN_DASHBOARD_RESTRO}
											component={RestroDashboard}
											title={"Manage Orders"}
										/>
										<HomeRoute
											path={Constants.SCREEN_RESTAURENT_PROFILE}
											component={RestauentDetails}
											title={"Restaurant Details"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_PRODUCT_CATEGORY_RESTRO}
											component={AddProductCategory}
											title={"Add Product Type"}
										/>
										<HomeRoute
											path={Constants.SCREEN_CATEGORY_LIST_RESTRO}
											component={CategoryList}
											title={"Restaurant Types"}
										/>

										<HomeRoute
											path={Constants.SCREEN_PRODUCT_CATEGORY_LIST_RESTRO}
											component={ProductCategoryList}
											title={"Product Type List"}
										/>

										<HomeRoute
											path={Constants.SCREEN_PRODUCT_CATEGORIES_DETAIL_RESTRO}
											component={ProductCategoryDetail}
											title={"Category Details"}
										/>

										<HomeRoute
											path={Constants.SCREEN_ADD_PRODUCT_RESTRO}
											component={AddProducts}
											title={"Add Product"}
										/>
										<HomeRoute
											path={Constants.SCREEN_PRODUCT_LIST_RETSRO}
											component={ProductList}
											title={"Product List"}
										/>
										<HomeRoute
											path={Constants.SCREEN_RATING_AND_REVIEW_RESTAURANT}
											component={RatingReviewTable}
											title={"Rating Details"}
										/>

										<HomeRoute
											path={Constants.SCREEN_RESTRO_EARNING_TIMEWISE}
											component={EarringTimeWiseRestro}
											title={"Restro Earning"}
										/>

										<HomeRoute
											path={Constants.SCREEN_PRODUCT_DETAILS_RESTRO}
											component={ProductDetails}
											title={"Product Details"}
										/>
										<HomeRoute
											path={Constants.SCREEN_COUPON_MANAGAMENT_RESTRO}
											component={CouponManagement}
											title={"Coupon Managament"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_COUPON_RESTAURANT}
											component={AddCoupon}
											title={"Add Coupon"}
										/>

										<HomeRoute
											path={Constants.SCREEN_TRACK_ORDER_IN_RESTRO}
											component={Directions}
											title={"Track Order"}
										/>
										<HomeRoute
											path={Constants.SCREEN_TRACK_ORDER_IN_RESTRO}
											component={TrackOrderOnMapRestro}
											title={"Track Order"}
										/>
										<HomeRoute
											path={Constants.SCREEN_RESTAURENT_EARNING}
											component={RestaurentEarning}
											title={"Restaurant Earning"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ORDER_DETAILS_RESTRO}
											component={OrderDetails}
											title={"Order Details"}
										/>

										<HomeRoute
											path={Constants.SCREEN_ADD_DISCOUNT}
											component={AddDiscount}
											title={"Add Discount"}
										/>
									</Switch>
								)}
								{/* admin for retro end */}

								{/* admin for GROCERY  start*/}
								{redirectScreenName === Constants.SCREEN_LOGIN_FOR_GROCERY && (
									<Switch>
										<Route
											path={Constants.SCREEN_LOGIN_FOR_GROCERY}
											component={Login}
										/>
										<Route
											path={Constants.SCREEN_ADD_STORE_IN_GROCERY}
											component={AddGroceryStore}
											title={"Add Grocery Store"}
										/>
										<HomeRoute
											path={Constants.SCREEN_DASHBOARD_RECENT_GROCERY}
											component={DashboardRecentGroceryStore}
											title={"Grocery Dashboard"}
										/>
										<HomeRoute
											path={Constants.SCREEN_DASHBOARD_GROCERY}
											component={GroceryDashboard}
											title={"Manage Store Orders"}
										/>
										<HomeRoute
											path={Constants.SCREEN_GROCERY_PROFILE}
											component={GroceryDetails}
											title={"Grocery Details"}
										/>
										<HomeRoute
											path={Constants.SCREEN_ADD_PRODUCT_CATEGORY_GROCERY}
											component={AddProductCategoryGrocery}
											title={"Add Product Type"}
										/>
										<HomeRoute
											path={Constants.SCREEN_CATEGORY_LIST_GROCERY}
											component={CategoryListGrocery}
											title={"Grocery Store Types"}
										/>

										<HomeRoute
											path={Constants.SCREEN_PRODUCT_CATEGORY_LIST_GROCERY}
											component={ProductCategoryListGrocery}
											title={"Product Type List"}
										/>

										<HomeRoute
											path={Constants.SCREEN_PRODUCT_CATEGORIES_DETAIL_GROCERY}
											component={ProductCategoryDetailGrocery}
											title={"Grocery Category Details"}
										/>

										<HomeRoute
											path={Constants.SCREEN_ADD_PRODUCT_GROCERY}
											component={AddProductsGrocery}
											title={"Add Product"}
										/>

										<HomeRoute
											path={Constants.SCREEN_PRODUCT_LIST_GROCERY}
											component={ProductListGrocery}
											title={"Product List"}
										/>

										<HomeRoute
											path={Constants.SCREEN_GROCERY_EARNING_TIMEWISE}
											component={EarringTimeWiseGrocery}
											title={"Grocery Earning"}
										/>

										<HomeRoute
											path={Constants.SCREEN_PRODUCT_DETAILS_GROCERY}
											component={ProductDetailsGrocery}
											title={"Grocery Product Details"}
										/>

										<HomeRoute
											path={Constants.SCREEN_COUPON_MANAGAMENT_GROCERY}
											component={CouponManagementGrocery}
											title={"Grocery Coupon Management"}
										/>

										<HomeRoute
											path={Constants.SCREEN_ADD_COUPON_GROCERY}
											component={AddCouponGrocery}
											title={"Add Coupon"}
										/>

										<HomeRoute
											path={Constants.SCREEN_TRACK_ORDER_IN_GROCERY}
											component={Directions}
											title={"Track Order"}
										/>

										<HomeRoute
											path={Constants.SCREEN_TRACK_ORDER_IN_GROCERY}
											component={TrackOrderOnMapGrocery}
											title={"Track Order"}
										/>

										<HomeRoute
											path={Constants.SCREEN_GROCERY_EARNING}
											component={GroceryEarning}
											title={"Grocery Earning"}
										/>

										<HomeRoute
											path={Constants.SCREEN_ORDER_DETAILS_GROCERY}
											component={OrderDetailsGrocery}
											title={"Grocery Order Details"}
										/>

										<HomeRoute
											path={Constants.SCREEN_ADD_DISCOUNT_GROCERY}
											component={AddDiscountGrocery}
											title={"Add Discount"}
										/>
										<HomeRoute
											path={Constants.SCREEN_RATING_AND_REVIEW_GROCERY}
											component={RatingReviewListGrocery}
											title={"Rating Details"}
										/>

										<HomeRoute
											path={Constants.SCREEN_GROCERY_EARNING_TIMEWISE}
											component={EarringTimeWiseAdminGrocery}
											title={"My Earning"}
										/>
									</Switch>
								)}
								{/* admin for GROCERY end */}

								{redirectScreenName ===
									Constants.SCREEN_PRIVACY_AND_POLICY_GLOBAL_URL && (
									<Switch>
										<Route
											path={Constants.SCREEN_PRIVACY_AND_POLICY_GLOBAL_URL}
											component={PrivacyAndPolicyGlobalUrl}
											title={"Privacy And Policy"}
										/>
									</Switch>
								)}

								{!Utility.isLogin() && (
									<Redirect from="/" to={redirectScreenName} />
								)}
							</Router>

							{/* </UserProvider> */}
						</Provider>
					</Online>
					<Offline>
						<div>You Are Offline</div>
					</Offline>
				</Fragment>
			</MuiThemeProvider>
		);
	}
}

export default App;
