/** @format */

export const SHARE_APP_LINK_IOS =
	"https://itunes.apple.com/us/app/gonear/id1425381449?ls=1&mt=8";
export const RATE_SHARE_APP_LINK_IOS =
	"itms-apps://itunes.apple.com/us/app/id${1425381449}?mt=8.";
export const RATE_SHARE_APP_LINK_ANDROID =
	"https://play.google.com/store/apps/details?id=com.gonear";

export const COUNTRY_CODE_VALUE = 91;

export const WEB_TYPE_RESTAURANT_WITHOUT_SLACE = "restaurant";
export const WEB_TYPE_RESTAURANT = "/" + WEB_TYPE_RESTAURANT_WITHOUT_SLACE;
export const WEB_TYPE_GROCERY_WITHOUT_SLACE = "grocery";
export const WEB_TYPE_GROCERY = "/" + WEB_TYPE_GROCERY_WITHOUT_SLACE;
export const WEB_TYPE_ADMIN_WITHOUT_SLACE = "admin";
export const WEB_TYPE_PRIVACY_AND_POLICY = "PrivacyPolicy";
export const WEB_TYPE_ADMIN = "/" + WEB_TYPE_ADMIN_WITHOUT_SLACE;

export const SCREEN_LOGIN = WEB_TYPE_ADMIN + "/login";
export const LOGIN_FOR_RESTRO_TEMP = "loginRestro";
export const LOGIN_FOR_Grocery_TEMP = "loginGrocery";

export const SCREEN_DISCOUNT = WEB_TYPE_ADMIN + "/discount";

export const DATE_FORMAT_COMING_FROM_SERVER = "YYYY-MM-DDTHH:mm:ss.SSSZ";
export const DATE_FORMAT_SHOW = "YYYY-MM-DD";
export const DATE_FORMAT_SHOW_WITH_TIME = "YYYY-MM-DD HH:mm";

export const TIME_FORMAT_SHOW = "hh:mm a";

export const DATE_FORMAT_SEND = "YYYY-MM-DD";

export const SCREEN_LOGIN_FOR_RESTRO = WEB_TYPE_RESTAURANT + "/loginRestro";
export const SCREEN_ADD_RESTAURENT = WEB_TYPE_ADMIN + "/addrestro";
export const SCREEN_ADD_RESTAURENT_ON_RESTRO =
	WEB_TYPE_RESTAURANT + "/addrestro";
export const SCREEN_ADD_CATEGORY = WEB_TYPE_ADMIN + "/addcat";
export const SCREEN_ADD_CATEGORY_GROCERY = WEB_TYPE_ADMIN + "/addcatGrocery";
export const SCREEN_ADD_PRODUCT_CATEGORY = WEB_TYPE_ADMIN + "/addProductCat";
export const SCREEN_ADD_PRODUCT_CATEGORY_RESTRO =
	WEB_TYPE_RESTAURANT + "/addProductCat";
export const SCREEN_ADD_PRODUCT_CATEGORY_GROCERY_ADMIN =
	WEB_TYPE_ADMIN + "/addProductCatGrocery";
export const SCREEN_ADD_PRODUCT_CATEGORY_GROCERY =
	WEB_TYPE_GROCERY + "/addProductCatGrocery";
export const SCREEN_CATEGORY_LIST = WEB_TYPE_ADMIN + "/categoryList";
export const SCREEN_CATEGORY_LIST_ADMIN_GROCERY =
	WEB_TYPE_ADMIN + "/categoryListGrocery";
export const SCREEN_CATEGORY_LIST_RESTRO =
	WEB_TYPE_RESTAURANT + "/categoryList";
export const SCREEN_CATEGORY_LIST_GROCERY = WEB_TYPE_GROCERY + "/categoryList";
export const SCREEN_PRODUCT_CATEGORY_LIST =
	WEB_TYPE_ADMIN + "/productCategoryList";
export const SCREEN_PRODUCT_CATEGORY_LIST_RESTRO =
	WEB_TYPE_RESTAURANT + "/productCategoryList";
export const SCREEN_RESTAURENT_LIST = WEB_TYPE_ADMIN + "/restrolist";
export const SCREEN_RAILWAY_PARCEL = WEB_TYPE_ADMIN + "/railwayParcelList";
export const SCREEN_PARTY_BOOKING = WEB_TYPE_ADMIN + "/partyBookingList";

// Grocery //
export const SCREEN_LOGIN_FOR_GROCERY = WEB_TYPE_GROCERY + "/loginGrocery";
export const SCREEN_ADD_GROCERY_STORE = WEB_TYPE_ADMIN + "/addgrocery";
export const SCREEN_GROCERY_LIST = WEB_TYPE_ADMIN + "/grocerylist";
export const SCREEN_ADD_STORE_IN_GROCERY = WEB_TYPE_GROCERY + "/addgrocery";
export const SCREEN_DASHBOARD_RECENT_GROCERY =
	WEB_TYPE_GROCERY + "/dashboardRecentGrocery";
export const SCREEN_DASHBOARD_GROCERY = WEB_TYPE_GROCERY + "/dashboard";
export const SCREEN_PRODUCT_CATEGORY_GROCERY_LIST =
	WEB_TYPE_ADMIN + "/productCategoryGroceryList";
export const SCREEN_PRODUCT_CATEGORY_LIST_GROCERY =
	WEB_TYPE_GROCERY + "/productCategoryGroceryList";
export const SCREEN_CHOOSE_GROCERY_ITEM = WEB_TYPE_ADMIN + "/chooseGroceryItem";
export const SCREEN_CHOOSE_GROCERY_ITEM_STORE =
	WEB_TYPE_GROCERY + "/chooseGroceryItem";
export const SCREEN_CHOOSE_GROCERY_ITEM_FOR_ADD_PRODUCT =
	WEB_TYPE_ADMIN + "/add";
export const SCREEN_CHOOSE_GROCERY_ITEM_FOR_PRODUCT_LIST =
	WEB_TYPE_ADMIN + "/list";
export const SCREEN_COUPON_GROCERY_MANAGAMENT_ADMIN =
	WEB_TYPE_ADMIN + "/couponManagement";
export const SCREEN_COUPON_MANAGAMENT_GROCERY =
	WEB_TYPE_GROCERY + "/couponManagement";

export const SCREEN_DASHBOARD = WEB_TYPE_ADMIN + "/dashboard";
export const SCREEN_DASHBOARD_RECENT_RESTRO =
	WEB_TYPE_RESTAURANT + "/dashboardRecentRestro";
export const SCREEN_DASHBOARD_REQUESTED =
	WEB_TYPE_ADMIN + "/dashboardRequested";
export const SCREEN_DASHBOARD_REQUESTED_GROCERY =
	WEB_TYPE_ADMIN + "/dashboardRequestedGrocery";
export const SCREEN_DASHBOARD_RESTRO = WEB_TYPE_RESTAURANT + "/dashboard";
export const SCREEN_ADD_DRIVER = WEB_TYPE_ADMIN + "/addDriver";
export const SCREEN_ADD_DRIVER_GROCERY = WEB_TYPE_ADMIN + "/groceryaddDriver";
export const SCREEN_ADD_USER = WEB_TYPE_ADMIN + "/addUser";
export const SCREEN_ADD_USER_GROCERY = WEB_TYPE_ADMIN + "/addUserGrocery";

export const SCREEN_HOME = WEB_TYPE_RESTAURANT + "/home";
export const SCREEN_RESTAURANT_DRIVER_LIST_REPORT =
	WEB_TYPE_ADMIN + "/restaurantdriverreport";
export const SCREEN_RESTAURANT_DRIVER_ID_REPORT =
	WEB_TYPE_ADMIN + "/restaurantdriverreportdetails";
export const SCREEN_GROSERY_DRIVER_LIST_REPORT =
	WEB_TYPE_ADMIN + "/grocerydriverreport";
export const SCREEN_GROSERY_DRIVER_LIST_ID =
	WEB_TYPE_ADMIN + "/grocerydriverdetails";
export const SCREEN_DRIVER_LIST = WEB_TYPE_ADMIN + "/driverlist";
export const SCREEN_DRIVER_LIST_GROCERY = WEB_TYPE_ADMIN + "/grocerydriverlist";
export const SCREEN_USER_LIST = WEB_TYPE_ADMIN + "/userlist";
export const SCREEN_USER_LIST_GROCERY = WEB_TYPE_ADMIN + "/userlistGrocery";
export const SCREEN_USER_DETAIL = WEB_TYPE_ADMIN + "/userdetail";
export const SCREEN_USER_DETAIL_GROCERY = WEB_TYPE_ADMIN + "/userdetailGrocery";
export const SCREEN_HELP_AND_SUPPORT = WEB_TYPE_ADMIN + "/helpandsupport";
export const SCREEN_DRIVER_ISSUE_LIST = WEB_TYPE_ADMIN + "/driverIssuelist";
/////////////
export const SCREEN_ABOUT_US = WEB_TYPE_ADMIN + "/aboutus";
export const SCREEN_REPORT = WEB_TYPE_ADMIN + "/report";
export const SCREEN_FAQ = WEB_TYPE_ADMIN + "/faq";
export const SCREEN_SUPPORT = WEB_TYPE_ADMIN + "/support";
export const SCREEN_TERMS_AND_CONDITIONS =
	WEB_TYPE_ADMIN + "/termsAndConditions";
export const SCREEN_PRIVACY_AND_POLICY = WEB_TYPE_ADMIN + "/privacyAndPolicy";
export const SCREEN_PRIVACY_AND_POLICY_GLOBAL_URL = "/PrivacyPolicy";

export const SCREEN_OFFICE_LIST = WEB_TYPE_ADMIN + "/officelist";
export const SCREEN_OFFICE_LIST_GROCERY = WEB_TYPE_ADMIN + "/officelistGrocery";
export const SCREEN_ADD_OFFICE = WEB_TYPE_ADMIN + "/addOffice";
export const SCREEN_ADD_OFFICE_GROCERY = WEB_TYPE_ADMIN + "/addOfficeGrocery";
export const SCREEN_EDIT_OFFICE = WEB_TYPE_ADMIN + "/editOffice";
export const SCREEN_EDIT_OFFICE_GROCERY = WEB_TYPE_ADMIN + "/editOfficeGrocery";
export const SCREEN_FLOATING_CASH = WEB_TYPE_ADMIN + "/floatingcash";
export const SCREEN_FLOATING_CASH_GROCERY =
	WEB_TYPE_ADMIN + "/floatingcashGrocery";

export const SCREEN_RESTAURANT_DETAIL = WEB_TYPE_ADMIN + "/restaurantdetail";
export const SCREEN_GROCERY_DETAIL = WEB_TYPE_ADMIN + "/grocerydetail";
export const SCREEN_CATEGORIES_DETAIL = WEB_TYPE_ADMIN + "/categoriesdetail";
export const SCREEN_CATEGORIES_DETAIL_ADMIN_GROCERY =
	WEB_TYPE_ADMIN + "/categoriesdetailGrocery";
export const SCREEN_PRODUCT_CATEGORIES_DETAIL =
	WEB_TYPE_ADMIN + "/productCatDetail";
export const SCREEN_PRODUCT_CATEGORIES_DETAIL_RESTRO =
	WEB_TYPE_RESTAURANT + "/productCatDetail";
export const SCREEN_PRODUCT_CATEGORIES_DETAIL_ADMIN =
	WEB_TYPE_ADMIN + "/productCatDetailGrocery";
export const SCREEN_PRODUCT_CATEGORIES_DETAIL_GROCERY =
	WEB_TYPE_GROCERY + "/productCatDetailGrocery";
export const SCREEN_DRIVER_DETAIL = WEB_TYPE_ADMIN + "/driverdetail";
export const SCREEN_DRIVER_DETAIL_GROCERY =
	WEB_TYPE_ADMIN + "/driverdetailGrocery";
export const SCREEN_ADD_PRODUCT = WEB_TYPE_ADMIN + "/addproduct";
export const SCREEN_ADD_PRODUCT_GROCERY_ADMIN =
	WEB_TYPE_ADMIN + "/addproductGrocery";
export const SCREEN_ADD_PRODUCT_RESTRO = WEB_TYPE_RESTAURANT + "/addproduct";
export const SCREEN_ADD_PRODUCT_GROCERY =
	WEB_TYPE_GROCERY + "/addproductGrocery";
export const SCREEN_CHOOSE_RESTO_ITEM = WEB_TYPE_ADMIN + "/chooseRestoItem";
export const SCREEN_CHOOSE_RESTO_ITEM_RESTRO =
	WEB_TYPE_RESTAURANT + "/chooseRestoItem";
export const SCREEN_PRODUCT_LIST = WEB_TYPE_ADMIN + "/productList";
export const SCREEN_PRODUCT_LIST_GROCERY_ADMIN =
	WEB_TYPE_ADMIN + "/productListGrocery";
export const SCREEN_PRODUCT_LIST_RETSRO = WEB_TYPE_RESTAURANT + "/productList";
export const SCREEN_PRODUCT_LIST_GROCERY =
	WEB_TYPE_GROCERY + "/productListGrocery";
export const SCREEN_PRODUCT_DETAILS = WEB_TYPE_ADMIN + "/productDetails";
export const SCREEN_PRODUCT_GROCERY_DETAILS_ADMIN =
	WEB_TYPE_ADMIN + "/productDetailsGrocery";
export const SCREEN_PRODUCT_DETAILS_RESTRO =
	WEB_TYPE_RESTAURANT + "/productDetails";
export const SCREEN_PRODUCT_DETAILS_GROCERY =
	WEB_TYPE_GROCERY + "/productDetailsGrocery";
export const SCREEN_ADD_OFFER = WEB_TYPE_ADMIN + "/addOffer";
export const SCREEN_OFFER_LIST = WEB_TYPE_ADMIN + "/offerList";
export const SCREEN_ADD_COUNTRY = WEB_TYPE_ADMIN + "/countryAdd";
export const SCREEN_COUNTRY_LIST = WEB_TYPE_ADMIN + "/countryList";
export const SCREEN_EDIT_COUNTRY = WEB_TYPE_ADMIN + "/countryEdit";
export const SCREEN_ADD_STATE = WEB_TYPE_ADMIN + "/stateAdd";
export const SCREEN_EDIT_STATE = WEB_TYPE_ADMIN + "/stateEdit";
export const SCREEN_STATE_LIST = WEB_TYPE_ADMIN + "/stateList";
export const SCREEN_ADD_CITY = WEB_TYPE_ADMIN + "/cityAdd";
export const SCREEN_EDIT_CITY = WEB_TYPE_ADMIN + "/cityEdit";
export const SCREEN_CITY_LIST = WEB_TYPE_ADMIN + "/cityList";
export const SCREEN_ADD_REGION = WEB_TYPE_ADMIN + "/regionAdd";
export const SCREEN_COUNTRY_MANAGEMENT = WEB_TYPE_ADMIN + "/countryManagement";
export const SCREEN_STATE_MANAGEMENT = WEB_TYPE_ADMIN + "/stateManagement";
export const SCREEN_CITY_MANAGEMENT = WEB_TYPE_ADMIN + "/cityManagement";
export const SCREEN_REGION_MANAGEMENT = WEB_TYPE_ADMIN + "/regionManagement";
export const SCREEN_SCREEN_REGION_LIST = WEB_TYPE_ADMIN + "/regionList";
export const SCREEN_SCREEN_EDIT_REGION = WEB_TYPE_ADMIN + "/regionEdit";
export const SCREEN_SCREEN_CHECK_REQUEST = WEB_TYPE_ADMIN + "/checkRequest";
export const SCREEN_ZIP_MANAGEMENT = WEB_TYPE_ADMIN + "/addziplist";
export const SCREEN_ZIP_CODE = WEB_TYPE_ADMIN + "/addzip";
export const SCREEN_PROFIT_MODE = WEB_TYPE_ADMIN + "/profitmodeforadmin";
export const SCREEN_SCREEN_CHECK_REQUEST_GROCERY =
	WEB_TYPE_ADMIN + "/checkRequestGrocery";
export const SCREEN_SCREEN_ORDER_MANAGEMENT_IN_ADMIN =
	WEB_TYPE_ADMIN + "/orderManagament";
export const SCREEN_SCREEN_ORDER_MANAGEMENT_IN_ADMIN_GROCERY =
	WEB_TYPE_ADMIN + "/orderManagamentGrocery";
export const SCREEN_ORDER_DETAILS = WEB_TYPE_ADMIN + "/orderDetails";
export const SCREEN_ORDER_DETAILS_ADMIN_GROCERY =
	WEB_TYPE_ADMIN + "/orderDetailsGrocery";
export const SCREEN_ORDER_DETAILS_RESTRO =
	WEB_TYPE_RESTAURANT + "/orderDetails";
export const SCREEN_ORDER_DETAILS_GROCERY =
	WEB_TYPE_GROCERY + "/orderDetailsGrocery";
export const SCREEN_DRIVER_FARE_MANAGAMENT = WEB_TYPE_ADMIN + "/fareManagement";
export const SCREEN_DRIVER_FARE_MANAGAMENT_GROCERY =
	WEB_TYPE_ADMIN + "/fareManagementGrocery";
export const SCREEN_ADD_DRIVER_FARE = WEB_TYPE_ADMIN + "/driverFareManagement";
export const SCREEN_ADD_DRIVER_FARE_GROCERY =
	WEB_TYPE_ADMIN + "/driverFareManagementGrocery";
export const SCREEN_ADMIN_COMMISSION_MANAGEMENT =
	WEB_TYPE_ADMIN + "/adminCommission";
export const SCREEN_ADMIN_COMMISSION_MANAGEMENT_GROCERY =
	WEB_TYPE_ADMIN + "/adminCommissionGrocery";
export const SCREEN_ADMIN_COMMISSION_MAMAGEMENT =
	WEB_TYPE_ADMIN + "/adminCommissionManagement";
export const SCREEN_ADD_ADMIN_COMMISSION =
	WEB_TYPE_ADMIN + "/addAdminCommission";
export const SCREEN_ADD_ADMIN_COMMISSION_GROCERY =
	WEB_TYPE_ADMIN + "/addAdminCommissionGrocery";
export const SCREEN_ADD_CUSTOMARE_FARE = WEB_TYPE_ADMIN + "/addCustomareFare";
export const SCREEN_ADD_CUSTOMARE_FARE_GROCERY =
	WEB_TYPE_ADMIN + "/addCustomareFareGrocery";
export const SCREEN_COUPON_MANAGAMENT = WEB_TYPE_ADMIN + "/couponManagement";
export const SCREEN_REQUESTED_RESTRO_DETAILS =
	WEB_TYPE_ADMIN + "/requestedRestro";
export const SCREEN_REQUESTED_RESTRO_CANCEL_ORDER =
	WEB_TYPE_ADMIN + "/restrocancelorder";
export const SCREEN_REQUESTED_GROCERY_CANCEL_ORDER =
	WEB_TYPE_ADMIN + "/groceryordercancel";
export const SCREEN_REQUESTED_GROCERY_DETAILS =
	WEB_TYPE_ADMIN + "/requestedGrocery";
export const SCREEN_REQUESTED_DRIVER_DETAILS =
	WEB_TYPE_ADMIN + "/requestedDriver";
export const SCREEN_REQUESTED_DRIVER_DETAILS_GROCERY =
	WEB_TYPE_ADMIN + "/requestedDriverGrocery";
export const SCREEN_COUPON_MANAGAMENT_RESTRO =
	WEB_TYPE_RESTAURANT + "/couponManagement";

export const SCREEN_REQUESTED_RESTRO_ITEAM_WISE =
	WEB_TYPE_ADMIN + "/restroiteamvisereport";

export const SCREEN_REQUESTED_GROCERY_ITEAM_WISE =
	WEB_TYPE_ADMIN + "/groceryiteamvisereport";

export const SCREEN_RESTAURENT_PROFILE = WEB_TYPE_RESTAURANT + "/restroProfile";
export const SCREEN_GROCERY_PROFILE = WEB_TYPE_GROCERY + "/groceryProfile";
export const SCREEN_ADMIN_PROFILE = WEB_TYPE_ADMIN + "/adminProfile";
export const SCREEN_ADMIN_EARNING = WEB_TYPE_ADMIN + "/adminEarning";
export const SCREEN_ADMIN_EARNING_GROCERY =
	WEB_TYPE_ADMIN + "/adminEarningGrocery";
export const SCREEN_RESTAURENT_EARNING_IN_ADMIN =
	WEB_TYPE_ADMIN + "/restroEarning";
export const SCREEN_GROCERY_EARNING_IN_ADMIN =
	WEB_TYPE_ADMIN + "/groceryEarning";
export const SCREEN_RESTAURENT_EARNING = WEB_TYPE_RESTAURANT + "/restroEarning";
export const SCREEN_GROCERY_EARNING = WEB_TYPE_GROCERY + "/groceryEarning";

export const SCREEN_ADD_COUPON_ADMIN = WEB_TYPE_ADMIN + "/couponAdd";
export const SCREEN_ADD_COUPON_RESTAURANT = WEB_TYPE_RESTAURANT + "/couponAdd";
export const SCREEN_ADD_COUPON_ADMIN_GROCERY = WEB_TYPE_ADMIN + "/couponAdd";
export const SCREEN_ADD_COUPON_GROCERY = WEB_TYPE_GROCERY + "/couponAddGrocery";
export const SCREEN_RESTAURANT_PAYMENT_HISTORY =
	WEB_TYPE_ADMIN + "/restroPaymentHistory";
export const SCREEN_DRIVER_PAYMENT_HISTORY =
	WEB_TYPE_ADMIN + "/driverPaymentHistory";
export const SCREEN_DRIVER_PAYMENT_HISTORY_GROCERY =
	WEB_TYPE_ADMIN + "/driverPaymentHistoryGrocery";
export const SCREEN_GROCERY_PAYMENT_HISTORY =
	WEB_TYPE_ADMIN + "/groceryPaymentHistory";

export const SCREEN_DISCOUNT_MANAGAMENT =
	WEB_TYPE_RESTAURANT + "/discountManagement";
export const SCREEN_DISCOUNT_MANAGAMENT_GROCERY =
	WEB_TYPE_GROCERY + "/discountManagementGrocery";
export const SCREEN_ADD_DISCOUNT = WEB_TYPE_RESTAURANT + "/addDiscount";
export const SCREEN_ADD_DISCOUNT_GROCERY =
	WEB_TYPE_GROCERY + "/addDiscountGrocery";

export const SCREEN_RATING_AND_REVIEW_ADMIN = WEB_TYPE_ADMIN + "/ratingReview";
export const SCREEN_RATING_AND_REVIEW_ADMIN_GROCERY =
	WEB_TYPE_ADMIN + "/ratingReviewGrocery";
export const SCREEN_ORDER_LIST = WEB_TYPE_ADMIN + "/orderList";
export const SCREEN_ORDER_LIST_GROCERY = WEB_TYPE_ADMIN + "/orderListGrocery";
export const SCREEN_RATING_AND_REVIEW_RESTAURANT =
	WEB_TYPE_RESTAURANT + "/ratingReview";
export const SCREEN_RATING_AND_REVIEW_GROCERY =
	WEB_TYPE_GROCERY + "/ratingReviewGrocery";

export const SCREEN_CHOOSE_RESTO_ITEM_FOR_ADD_PRODUCT = WEB_TYPE_ADMIN + "/add";
export const SCREEN_CHOOSE_RESTO_ITEM_FOR_PRODUCT_LIST =
	WEB_TYPE_ADMIN + "/list";

export const SCREEN_TRACK_ORDER_IN_RESTRO = WEB_TYPE_RESTAURANT + "/trackOrder";
export const SCREEN_TRACK_ORDER_IN_GROCERY =
	WEB_TYPE_GROCERY + "/trackOrderGrocery";
export const SCREEN_TRACK_ORDER_IN_ADMIN = WEB_TYPE_ADMIN + "/trackOrder";
export const SCREEN_TRACK_ORDER_IN_ADMIN_GROCERY =
	WEB_TYPE_ADMIN + "/trackOrderGrocery";

export const SCREEN_ONE_PAGE_REPORT = WEB_TYPE_ADMIN + "/onePageReport";
export const SCREEN_EARRING_PAGE = WEB_TYPE_ADMIN + "/earingPage";
export const SCREEN_EARRING_PAGE_GROCERY =
	WEB_TYPE_ADMIN + "/earingPageGrocery";
export const SCREEN_EARRING_TIMEWISE = WEB_TYPE_ADMIN + "/earingTimeWise";
export const SCREEN_GROCERY_EARRING_TIMEWISE =
	WEB_TYPE_ADMIN + "/GroceryEaringTimeWise";
export const SCREEN_EARRING_TIMEWISE_GROCERY_ADMIN =
	WEB_TYPE_ADMIN + "/earingTimeWiseGrocery";
export const SCREEN_RESTRO_EARNING_TIMEWISE =
	WEB_TYPE_RESTAURANT + "/earingTimeWiseRestro";
export const SCREEN_GROCERY_EARNING_TIMEWISE =
	WEB_TYPE_GROCERY + "/earingTimeWiseGrocery";
export const SCREEN_RESTRO_EARNING_TIMEWISE_IN_ADMIN =
	WEB_TYPE_ADMIN + "/earingTimeWiseRestro";
export const SCREEN_GROCERY_EARNING_TIMEWISE_IN_ADMIN =
	WEB_TYPE_ADMIN + "/earingTimeWiseGrocery";
export const SCREEN_ADMIN_EARNING_TIMEWISE =
	WEB_TYPE_ADMIN + "/earingTimeWiseAdmin";
export const SCREEN_ADMIN_EARNING_TIMEWISE_GROCERY =
	WEB_TYPE_ADMIN + "/earingTimeWiseAdminGrocery";
export const SCREEN_DILEVERY_CHARGES = WEB_TYPE_ADMIN + "/dileveryCharges";
export const SCREEN_DILEVERY_CHARGES_GROCERY =
	WEB_TYPE_ADMIN + "/dileveryChargesGrocery";
export const SCREEN_ADD_DILEVERY_CHARGES =
	WEB_TYPE_ADMIN + "/addDileveryCharges";
export const SCREEN_ADD_DILEVERY_CHARGES_GROCERY =
	WEB_TYPE_ADMIN + "/addDileveryChargesGrocery";
export const SCREEN_ADD_GENERAL_ISSUE = WEB_TYPE_ADMIN + "/addGeneralIssue";
export const SCREEN_REVIEW_MANAGEMENT = WEB_TYPE_ADMIN + "/reviewManagement";
export const SCREEN_CMS_MANAGEMENT = WEB_TYPE_ADMIN + "/reviewManagement";
export const SCREEN_CMS_MANAGEMENT_TABEL = WEB_TYPE_ADMIN + "/retrytyrt";
export const SCREEN_REVIEW_MANAGEMENT_GROCERY =
	WEB_TYPE_ADMIN + "/reviewManagementGrocery";

export const SCREEN_VIEW_REVIEW = WEB_TYPE_ADMIN + "/viewReview";
export const SCREEN_VIEW_REVIEW_GROCERY = WEB_TYPE_ADMIN + "/viewReviewGrocery";
export const SCREEN_SETTING_MANAGMENT = WEB_TYPE_ADMIN + "/adminsetting";
export const KEY_TOTAL_AMOUNT = "total_amount";

export const KEY_DISTANCE_CHARGE_IDS_DELETE = "distance_charge_ids_delete";
export const KEY_COMMISSION_CHARGE_IDS_DELETE = "commission_charge_ids_delete";
export const KEY_ORDER_DILEVERY_CHARGE_IDS_DELETE =
	"order_delivery_charge_ids_delete";

export const KEY_DATA = "data";
export const KEY_DRIVER_LIST = "driverList";
export const KEY_DRIVER_EARNING_LIST = "driverEarningList";
export const KEY_DRIVER_EARNING_LIST_GROCERY = "driverEarningList";

export const KEY_ADMIN_EARNING_LIST = "adminEarningList";

export const KEY_RESTRO_EARNING_LIST = "restroEarningList";
export const KEY_GROCERY_EARNING_LIST = "groceryEarningList";

export const KEY_SHOW_PROGRESS = "show_progress";
export const KEY_RESPONSE = "response";
export const KEY_TYPE = "type";
export const KEY_USER_DATA = "user_data";
export const KEY_MESSAGE = "message";
export const KEY_ERROR = "error";
export const KEY_LABEL = "label";
export const KEY_PAYMENT_MODE = "payment_mode";
export const KEY_CASH = "cash";
export const KEY_STATUS = "status";
export const KEY_DESCRIPTION = "description";

export const KEY_ID = "id";
export const KEY_RESTRO_LIST = "restroList";
export const KEY_GROCERY_LIST = "groceryList";
export const KEY_PRODUCT_LIST = "product_list";

export const KEY_ORDER_DATE_CONFIRMED = "order_date_confirmed";
export const KEY_ORDER_DATE_DELIVERED = "order_date_delivered";

export const KEY_ORDER_DATE_PICKED_UP = "order_date_picked_up";

export const KEY_ORDER_DATE_PLACED = "order_date_placed";

export const KEY_PAYMENT_RECEIVER_ID = "payment_receiver_id";

export const KEY_DELIVERY_MAN_ID = "delivery_man_id";
export const KEY_PAYMENT_DONE_BY_USER_ID = "payment_done_by_user_id";
export const KEY_PAYMENT_RECEIVER_USER_TYPE = "payment_receiver_user_type";
export const KEY_RESTRO_PAYMENT_HISTORY = "restro_payment_history";

export const KEY_NAME = "name";
export const KEY_STORE_NAME = "store_name";
export const KEY_NAME_ERROR = "name_error";
export const KEY_EMAIL = "email";
export const KEY_EMAIL_ERROR = "email_error";
export const KEY_ADDRESS = "address";
export const KEY_ZIP = "zip";
export const KEY_OUTLETS = "outlets";
export const KEY_COSTOFTWO = "costoftwo";
export const KEY_DELIVERYSUPPORT = "deliverysupport";
export const KEY_LAT = "lat";
export const KEY_LNG = "lng";
export const KEY_STATE = "state";
export const KEY_CITY = "city";
export const KEY_REGION = "region";
export const KEY_LANDMARK = "landmark";
export const KEY_CATEGORIES = "categories";
export const KEY_GROCERY_CATEGORIES = "grocery categories";
export const KEY_PRODUCT_CATEGORIES = "product_categories";

export const KEY_PERSON_COUNT = "person_count";
export const KEY_IMAGE = "image";
export const KEY_IMG = "image";

export const KEY_IMG_NAME = "img_name";
export const KEY_IMG_UPLOAD = "img_upload";

export const KEY_IMAGE_NAME = "image_name";

export const KEY_VERIFICATION_STATUS = "verification_status";

export const KEY_IMAGE_UPLOAD = "image_upload";
export const KEY_OFFER_IMAGE_UPLOAD = "offer_image_upload";
export const KEY_OFFER_IMAGE = "offer_image";

export const KEY_IMAGES_ARRAY = "images[";
export const KEY_ARRAY_CLOSE = "]";
export const KEY_DOCUMENTS_ARRAY = "documents[";
export const KEY_HEADERS = "headers";
export const KEY_BODY = "body";
export const KEY_TOKEN = "token";

export const KEY_ADDRESS_1 = "address 1";
export const KEY_ADDRESS_2 = "address 2";
export const KEY_ADDRESS_3 = "address 3";
export const KEY_ADDRESS_4 = "address 4";
export const KEY_COUNTRY = "country";
export const KEY_PHONE = "phone";
export const KEY_PHONE_ERROR = "phone_error";
export const KEY_EMERGENCY_NO = "emergency_no";
export const KEY_BLOOD_GROUP = "blood_group";
export const KEY_USERID = "userid";
export const KEY_ROLE = "role";
export const KEY_PROFILE = "profile";
export const KEY_ROLE_FOR_USER = "role_for_user";

export const KEY_PASSWORD = "password";
export const KEY_CONFIRM_PASSWORD = "confirm_password";

export const KEY_RESTO_ID = "restro_id";
export const KEY_GROCERY_ID = "grocery_id";
export const KEY_DRIVER_ID = "driver_id";

export const KEY_RESTO_DETAILS = "resto_details";
export const KEY_PRODUCT_DETAILS = "product_details";
export const KEY_CATEGORIES_DETAILS = "categories_details";
export const KEY_PRODUCT_PAGE_TYPE = "KEY_PRODUCT_PAGE_TYPE"; // 1 MEAN FOR ADD AND 2 MEAN FOR LIST

export const KEY_STOCK_AVAIBILITY = "stock_availability";
export const KEY_PRICE = "price";
export const KEY_DISCOUNT = "discount";

export const KEY_GST_PRICE = "gst_charge";
export const KEY_FINAL_PRICE = "final_price";

export const KEY_COUNTRY_DETAILS = "country_details";
export const KEY_STATE_DETAILS = "state_details";
export const KEY_CITY_DETAILS = "city_details";
export const KEY_REGION_DETAILS = "region_details";

export const MIN_LENGTH_OF_PHONE_NUMBER = 10;
export const MAX_LENGTH_OF_PHONE_NUMBER = 10;

export const MIN_LENGTH_OF_ZIP_NUMBER = 6;
export const MAX_LENGTH_OF_ZIP_NUMBER = 6;

export const LENGTH_OF_IFSC_CODE = 11;

export const LENGTH_OF_AADHAR_NUMBER = 12;

export const MIN_LENGTH_OF_VECHILE_NUMBER = 9;
export const MAX_LENGTH_OF_VECHILE_NUMBER = 10;

export const LENGTH_OF_LICENSE_NUMBER = 16;

export const MIN_LENGTH_ACCOUNT_NUMBER = 5;

export const LENGTH_OF_PAN_NUMBER = 10;

export const ROLE_SUPER_ADMIN = "superAdmin";
export const ROLE_RESTAURANT = "restaurant";
export const ROLE_GROCERY = "grocery";

export const ROLE_USER = "user";
export const KEY_USER_ID = "user_id";

export const KEY_COUNTRY_ID = "country_id";
export const KEY_COUNTRY_LIST_DATA = "country_list";
export const STORE_TYPE_LIST_DATA = "story_type_list";
export const KEY_STATE_LIST_DATA = "state_list";
export const KEY_CITY_LIST_DATA = "city_list";
export const KEY_REGION_LIST_DATA = "region_list";

export const KEY_PRODUCT_LIST_DATA = "product_list";
export const KEY_PARCEL_LIST_DATA = "parcel_booking";

export const KEY_OFFICE_ID = "office_id";

//export const KEY_OFFICE_LIST_DATA = "office_list";

export const KEY_STATE_ID = "state_id";
export const KEY_CITY_ID = "city_id";
export const KEY_REGION_ID = "region_id";
export const KEY_RETSRO_DETAILS = "restro_detail";
export const KEY_GROCERY_DETAILS = "grocery_detail";
export const KEY_DRIVER_DETAILS = "driver_detail";
export const KEY_ORDER_LIST = "order_list";
export const KEY_REVIEW_RATING_LIST = "reviewRateList";

export const ORDER_STATUS_PENDING = "P";
export const ORDER_STATUS_ACCEPTED = "AC";
export const ORDER_STATUS_PREPARING = "PR";
export const ORDER_STATUS_PREPARED = "PRD";
export const ORDER_STATUS_REDY = "RD";
export const ORDER_STATUS_PAST = "PT";
export const ORDER_STATUS_ASSIGN_DELIVERY = "AD";
export const ORDER_STATUS_CANCEL_BY_RESTAURANT = "RC";
export const ORDER_STATUS_CANCEL_BY_GROCERY = "GC";
export const ORDER_STATUS_CANCEL_BY_CUSTOMER = "CC";
export const ORDER_STATUS_DELIVER = "OD";
export const ORDER_STATUS_BLOCK = "B";
export const ORDER_STATUS_UNBLOCK = "UN";
export const ORDER_STATUS_APPROVED = "AP";
export const ORDER_STATUS_DECLINED = "DC";
export const ORDER_STATUS_PICKED_UP = "OPU";

export const ORDER_STATUS_ASSIGNED_PREPARING = "AD_PR";
export const ORDER_STATUS_ASSIGNED_PREPARING_REACHED = "AD_PR_RCH";
export const ORDER_STATUS_ASSIGNED_PREPARED = "AD_PRD";
export const ORDER_STATUS_ASSIGNED_REACHED = "RCH";
export const ORDER_STATUS_ASSIGNED_PREPARED_REACHED = "AD_PRD_RCH";

export const ORDER_STATUS_STR_PENDING = "Pending";
export const ORDER_STATUS_STR_ACCEPTED = "Accepted";
export const ORDER_STATUS_STR_PREPARING = "Preparing";
export const ORDER_STATUS_STR_PREPARED = "Prepared";
export const ORDER_STATUS_STR_ACCEPT = "Accept";
export const ORDER_STATUS_STR_REDY = "Ready";
export const ORDER_STATUS_STR_PAST_ORDER = "Past Order";
export const ORDER_STATUS_STR_REJECT = "Reject";

export const ORDER_STATUS_STR_PICKED_UP = "Out for delivery";
export const ORDER_STATUS_STR_ASSIGN_DELIVERY = "Assign Delivery";
export const ORDER_STATUS_STR_CANCEL_BY_RESTAURANT = "Cancel By Restaurant";
export const ORDER_STATUS_STR_CANCEL_BY_GROCERY = "Cancel By Grocery";
export const ORDER_STATUS_STR_CANCEL_BY_CUSTOMER = "Cancel By Customer";
export const ORDER_STATUS_STR_DELIVER = "Delivered";
export const ORDER_STATUS_STR_DELIVER_PREPARED =
	"Prepared and assign to delivery";
export const ORDER_STATUS_STR_ASSIGN_DELIVER_PREPARING =
	"Preparing and assign to delivery";
export const ORDER_STATUS_STR_DELIVERED = "Delivered";

export const ORDER_STATUS_STR_BLOCK = "Blocked";
export const ORDER_STATUS_STR_UNBLOCK = "Unblock";
export const ORDER_STATUS_STR_APPROVED = "Approved";
export const ORDER_STATUS_STR_DECLINED = "Rejected";
export const ORDER_STATUS_STR_SELECT = "Select";

export const KEY_CATEGORY_ID = "category_id";
export const KEY_IS_LOGIN = "is_login";

export const KEY_COUNTRY_CODE = "country_code";
export const KEY_STATE_CODE = "state_code";
export const KEY_DIAL_CODE = "dial_code";
export const KEY_CREATED = "createdAt";

export const STATUS_ACTIVE = "A";
export const STATUS_IN_ACTIVE = "IA";
export const STATUS_BLOCKED = "BLOCKED";
export const STATUS_UNBLOCKED = "UNBLOCKED";
export const STATUS_APPROVED = "APPROVED";
export const STATUS_Approved = "Approved";
export const STATUS_REJECTED = "REJECTED";
export const STATUS_Rejected = "Rejected";
export const STATUS_PENDING = "PENDING";
export const STATUS_Pending = "Pending";

export const KEY_STATE_NAME = "state_name";
export const KEY_COUNTRY_NAME = "country_name";
export const KEY_IS_ACTIVE = "is_active";
export const KEY_LOGIN_TYPE = "login_type";
export const KEY_IS_REMEMBER = "is_remember";

export const KEY_ORDER_LIST_NEW = "order_list";
export const KEY_ORDER_LIST_PREPARING = "order_list";
export const KEY_ORDER_LIST_REDY = "order_list";
export const KEY_ORDER_LIST_PAST = "order_list";
export const KEY_VALUE = "value";
export const PROPS_ORDER_ITEM = "order_item";

export const KEY_AADHAR_IMAGE_UPLOAD = "aadhar_image_upload";
export const KEY_PAN_IMAGE_UPLOAD = "pan_image_upload";
export const KEY_LICENSE_IMAGE_UPLOAD = "license_image_upload";

export const KEY_AADHAR_IMAGE_NAME = "aadhar_image_name";
export const KEY_PAN_IMAGE_NAME = "pan_image_name";
export const KEY_LICENSE_IMAGE_NAME = "license_image_name";

export const KEY_LICENSE_NUMBER = "license_number";
export const KEY_AADHAR_NUMBER = "aadhar_number";
export const KEY_PAN_NUMBER = "pan_number";
export const KEY_AADHAR_IMAGE = "aadhar_image";
export const KEY_PAN_IMAGE = "pan_image";
export const KEY_LICENSE_IMAGE = "license_image";
export const KEY_LICENSE_EXPIRY_DATE = "license_expire_date";

export const RUPEES_SIGN = "\u20B9";
export const KEY_ORDER_DETAILS = "order_detail";
// export const KEY_REVIEW_RATING_LIST = "reviewRateList"
export const KEY_USER_DETAILS = "user_detail";
export const KEY_TOTAL_PRICE = "total_price";
export const KEY_PRODUCT_DETAIL = "product_detail";
export const KEY_QTY = "qty";

export const RC_IMAGE = "rc_image";
export const RC_IMAGE_NAME = "rc_image_name";
export const RC_IMAGE_UPLOAD = "rc_image_upload";
export const VPC_IMAGE = "vpc_image";
export const VPC_IMAGE_NAME = "vpc_image_name";
export const VPC_IMAGE_UPLOAD = "vpc_image_upload";
export const IFSC_CODE = "ifsc_code";
export const ACCOUNT_NUMBER = "account_number";
export const ACCOUNT_HOLDER_NAME = "account_holder_name";
export const BANK_NAME = "bank_name";
export const VEHICLE_NUMBER = "vehicle_number";

export const KEY_WEBISTE_LINK = "webiste_link";
export const KEY_COST_FOR_TWO = "cost_for_two";
export const KEY_RESTAURENT_TYPE = "restaurent_type";
export const KEY_STORE_TYPE = "store_type";
export const KEY_STORE_TYPE_ID = "store_type_id";
export const KEY_SUPPORT_DELIVERY = "support_delivery";
export const KEY_HOUSE_NAME_AND_NO = "house_name_and_no";
export const KEY_HOUSE_ADDRESS = "address";
export const KEY_LANDLINE_NUMBER = "landline_number";
export const KEY_STREET_NAME = "street_name";
export const KEY_AREA_NAME = "area_name";
export const KEY_SHOP_LICENCE_IMG = "shop_licence_img";
export const KEY_SHOP_LICENCE_IMG_NAME = "shop_licence_img_name";
export const KEY_SHOP_LICENCE_IMG_UPLOAD = "shop_licence_img_upload";
export const KEY_FSSAI_LICENCE_IMG = "fssai_licence_img";
export const KEY_FSSAI_LICENCE_IMG_NAME = "fssai_licence_img_name";
export const KEY_FSSAI_LICENCE_IMG_UPLOAD = "fssai_licence_img_upload";
export const KEY_GSTN_OR_PAN_IMG = "gstn_or_pan_img";
export const KEY_GSTN_OR_PAN_IMG_NAME = "gstn_or_pan_img_name";
export const KEY_GSTN_OR_PAN_IMG_UPLOAD = "gstn_or_pan_img_upload";
export const KEY_BUILDING_FRONT_IMG = "building_front_img";
export const KEY_BUILDING_FRONT_IMG_NAME = "building_front_img_name";
export const KEY_BUILDING_FRONT_IMG_UPLOAD = "building_front_img_upload";
export const KEY_KITCHEN_IMG = "kitchen_img";
export const KEY_KITCHEN_IMG_NAME = "kitchen_img_name";
export const KEY_KITCHEN_IMG_UPLOAD = "kitchen_img_upload";
export const KEY_DINING_PACKAGING_IMG = "dining_packaging_img";
export const KEY_DINING_PACKAGING_IMG_NAME = "dining_packaging_img_name";
export const KEY_DINING_PACKAGING_IMG_UPLOAD = "dining_packaging_img_upload";
export const KEY_LOCALITY_IMAGE = "locality_image";
export const KEY_LOCALITY_IMAGE_NAME = "locality_image_name";
export const KEY_LOCALITY_IMAGE_UPLOAD = "locality_image_upload";

export const KEY_VEG = "Veg";
export const KEY_NON_VEG = "Non-Veg";
export const KEY_VEG_AND_NON_VEG = "Veg And Non-Veg";

export const KEY_KIRANA_STORE = "Kirana Store"; // GROCERY_TYPE_0
export const KEY_DEPARTMENTAL_STORE = "Departmental Store"; // GROCERY_TYPE_1
export const KEY_GENERAL_STORE = "General Store"; // GROCERY_TYPE_2
export const KEY_OTHER = "Other"; // GROCERY_TYPE_3

export const GROCERY_TYPE_KIRANA_STORE = "GROCERY_TYPE_1";
export const GROCERY_TYPE_DEPARTMENTAL_STORE = "GROCERY_TYPE_2";
export const GROCERY_TYPE_GENERAL_STORE = "GROCERY_TYPE_3";
export const GROCERY_TYPE_OTHER = "GROCERY_TYPE_4";

export const RESTRO_TYPE_VEG = "veg";
export const RESTRO_TYPE_NON_VEG = "non_veg";
export const RESTRO_TYPE_VEG_AND_NON_VEG = "veg_and_non_veg";
export const KEY_TRUE = "true";
export const KEY_FALSE = "false";
export const KEY_GST_PERCENT = "gst_in_perecent";
export const KEY_COOKING_TIME = "coocking_time_in_minute";
export const KEY_QUANTITY = "product_quantity";
export const KEY_WEIGHT = "product_weight";
export const DRIVER_FARE = "driver_fare";
export const CUSTOMARE_FARE = "customare_fare";
export const DRIVER_RETING_REVIEW = "driver_reting";
export const CUSTOMARE_RETING_REVIEW = "customare_reting";

export const KEY_FARE_LOAD_MORE_DATA = "fare_load_more_data";
export const KEY_MIN_KM = "min_distance_km";
export const KEY_MAX_KM = "max_distance_km";
export const KEY_FARE = "charge_per_km";
export const KEY_DILEVERY_CHARGE = "delivery_charge";
export const KEY_ORDER_DILEVERY_CHARGES = "order_delivery_charges";
export const KEY_PRODUCT_TYPE = "product_type";
export const KEY_DISTANCE_CHARGE = "distance_charges";
export const KEY_COMMISSION_CHARGES = "commission_charges";

export const KEY_COMMISSION_LOAD_MORE_DATA = "commission_load_more_data";
export const KEY_MIN_ORDER_AMOUNT = "min_order_price";
export const KEY_MAX_ORDER_AMOUNT = "max_order_price";
export const KEY_COMMISSION_IN_PERCENTAGE = "charge_percent";

export const KEY_DRIVER_DISTANCE_FARE_DETAILS = "driver_distance_fare_detail";
export const KEY_ADMIN_COMMISSION_DETAILS = "admin_commission_detail";
export const KEY_DILEVERY_CHARGE_DETAILS = "dilevery_charge_details";

export const KEY_USER_LIST = "userList";

export const DRIVER_STATUS_APPROVED_DOC = "APR";
export const DRIVER_STATUS_REJECTED_DOC = "RJ";
export const DRIVER_STATUS_PENDING_DOC = "P";
export const KEY_AADHAR_STATUS = "aadhar_status";
export const KEY_RC_STATUS = "rc_status";
export const KEY_LICENSE_STATUS = "license_status";
export const KEY_PAN_STATUS = "pan_status";
export const KEY_KEY = "key";

export const KEY_COUPON_CODE = "coupon_code";
export const KEY_COUPON_DETAILS = "coupon_detail";
export const KEY_COUPON_DISCOUNT_IN_PERCENT = "coupon_discount_in_percentage";
export const KEY_COUPON_MAX_DISCOUNT_AMOUNT = "coupon_max_discount_amount";
export const KEY_COUPON_MIN_DISCOUNT_AMOUNT = "coupon_minimum_discount_amount";
export const KEY_SHOP_LICENCE_STATUS = "shop_licence_status";
export const KEY_FSSAI_STATUS = "fssai_licence_status";
export const KEY_GSTN_OR_PAN_STATUS = "gstn_or_pan_status";
export const KEY_VALID_FROM = "valid_from";
export const KEY_VALID_TO = "valid_to";
export const KEY_RATING_FOR = "rating_for";
export const KEY_RATING_FROM = "rating_from";
export const RATING_FOR_RESTRO = "restro";
export const RATING_FOR_GROCERY = "grocery";
export const RATING_FOR_DRIVER = "driver";
export const RATING_FOR_USER = "user";
export const RATING_NOT = "NOT";
export const RATING_D = "(D)";
export const RATING_C = "(C)";
export const RATING_R = "(R)";
export const RATING_G = "(G)";
export const KEY_ORDER_ID = "order_id";
export const KEY_RATING = "rating";
export const KEY_REVIEW = "review";
export const CHECK_ORDERS = "Check Order";
export const RATING_REVIEW = "Rating Review";
export const ORDER_HISTORY = "Order History";
export const PRODUCT_CATE_TYPE = "Product Category Type";
export const PRODUCT_LIST = "Product List";
export const EARNING_RESTRO = "Restro Earning";
export const EARNING_GROCERY = "Grocery Earning";
export const EARRING_AND_INCENTIVE = "Earing And Incentive";

export const KEY_ORDER_NUMBER = "order_number";

export const KEY_OPENING_TIME = "opening_time";
export const KEY_CLOSING_TIME = "closing_time";
export const KEY_SEARCH = "search";
export const KEY_SEARCH_CUSTOMER = "name";
export const KEY_SEARCH_ORDER = "search_order";
export const KEY_SEARCH_DRIVER_NAME = "search_driver_name";

export const GOOGLE_MAP_KEY = "AIzaSyASFwiTkWBtPIMqo21IAyxXV4566c_87mw";

export const KEY_OFFICE_LIST = "officeList";
export const KEY_OFFICE_DETAIL = "office_detail";
//export const TAB_STYLE_TWO = (selectedTab) => { backgroundColor: selectedTab == 1 ? 'rgba(0, 0, 0,0.1)' : '#ffffff' };

export const KEY_CREATED_BY_USER_TYPE = "created_by_user_type";
export const KEY_CREATED_BY = "created_by";

export const REPORT_TYPE_LIST = "report_type_list";

export const KEY_REPORT_TYPE = "report_type";
export const KEY_REPORT_USERS = "report_type_users";
export const KEY_REPORT_DRIVERS = "report_type_drivers";
export const KEY_REPORT_RESTRO = "report_type_restro";
export const KEY_START_DATE = "start_date";
export const KEY_END_DATE = "end_date";
export const KEY_OFFSET = "offset";

export const KEY_LOGIN_HISTORY = "L_H";
export const KEY_BALANCE_HISTORY = "B_H";
export const KEY_TRASACTIONS = "T_S_N";
export const KEY_ORDER_HISTORY = "O_H";
export const KEY_USER_TYPE_LIST = "user_type_list";
export const KEY_USER_TYPE_FOR_REPORT = "user_type_list";
export const KEY_LIST = "list";
export const KEY_REPORT_HISTORY_CAT = "report_history_cate";
export const KEY_USER_TYPE = "user_type";

export const KEY_HEADER_VALUES = "header_values";
export const KEY_HEADER = "header";

export const KEY_DISCOUNT_DETAILS = "discount_detail";
export const KEY_DISCOUNT_IN_PERCENT = "discount_in_percentage";
export const KEY_IS_ONLINE = "is_online";
export const KEY_PARENT_CATEGORY_ID = "parent_cate_id";
export const KEY_PRODUCT_CATE_ID = "product_cate_id";
export const KEY_IS_RECOMMENDED = "is_recommended";
export const KEY_EARINING_DETAILS = "earning_details";
export const KEY_WEEK_START_DATE = "week_start_date";
export const KEY_WEEK_END_DATE = "week_end_date";
export const KEY_WEEK_EARINING_DAYS = "week_earning_days";
export const KEY_PRODUCT_NAME_LIST = "product_name_list";
export const KEY_DELIVERY_CHARGE = "delivery_charge";
export const KEY_WEEK_NUMBER = "week_number";
export const KEY_WEEK_START_DATE_SHOW = "week_start_date_show";
export const KEY_WEEK_END_DATE_SHOW = "week_end_date_show";
export const KEY_CURRENT_WEEK_NUMBER = "current_week_number";
export const KEY_PREVIOUS_WEEK_NUMBER = "previous_week_number";
export const KEY_WEEK_NAME = "week_name";
export const KEY_ORDER_AMOUNT = "order_amount";
export const KEY_ISSUE_LIST = "issueList";
export const KEY_ISSUE_DSCR = "issue_dscr";
export const KEY_TITLE = "title";
export const KEY_IS_FIXED_AMOUNT = "is_fixed_amt";
export const TIME_OUT_TOAST = 1000;
export const TIME_OUT_TOAST_NEW = 2000;
export const BLANK_TIME = "  --:--";
export const KEY_REQ_RETSRO_COUNT = "restro_count";
export const KEY_REQ_GROCERY_COUNT = "grocery_count";
export const KEY_REQ_DRIVER_COUNT = "driver_count";
export const KEY_REQ_DRIVER_COUNT_GROCERY = "grocery_driver_count";
export const KEY_ADMIN_TODAY_EARNING = "admin_today_earn";
export const KEY_ADMIN_TODAY_EARNING_GRAPH = "admin_today_earn_graph";
export const KEY_TODAY_ORDERS = "today_orders";

export const KEY_IS_TOP_COUPON = "isTopCoupon";
export const KEY_CREATED_BY_NAME = "created_by_name";
export const DISCOUNT = "discountlist";
// dicscount

export const KEY_ORDER_LIST__DISCOUNT = "orderlist";
export const KEY_UNDERSCORE_ID = "_id";
export const KEY_ORDER_TOTAL_DISCOUNT = "total_discount";
export const KEY_DISCOUNTED_PRICE = "discounted_price";
export const KEY_APP_NAME_STRING = "Br Food And Grocery";
// export const KEY_DISCOUNT_AMOUNT = "discounted_price";
// orderCancel
