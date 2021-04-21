/** @format */

import * as ApiUrls from "./ApiUrls";
import * as types from "./types";
import * as Constants from "../utils/Constants";
import * as CustomStorage from "../utils/CustomStorage";

var METHOD_TYPE_POST = "post";
var METHOD_TYPE_GET = "get";
// var METHOD_TYPE_DELETE = "DELETE"
//1
export const getFormDataFromObject = (data) => {
	const formData = new FormData();

	for (var key in data) {
		if (typeof data[key] === "object") {
			var dataValue = data[key];

			if (
				key == Constants.KEY_IMAGES_ARRAY ||
				key == Constants.KEY_KITCHEN_IMG ||
				key == Constants.KEY_BUILDING_FRONT_IMG ||
				key == Constants.KEY_DINING_PACKAGING_IMG ||
				key == Constants.KEY_LOCALITY_IMAGE
			) {
				for (var itemIndex in data[key]) {
					console.log(" Key name value1 :- ", data[key][itemIndex]);
					if (
						data[key][itemIndex] != undefined &&
						data[key][itemIndex][Constants.KEY_NAME] != undefined
					) {
						var keyName = key + itemIndex + Constants.KEY_ARRAY_CLOSE;
						console.log(
							"key name :- ",
							keyName,
							" Key name value :- ",
							data[key][itemIndex],
						);
						formData.append(key, data[key][itemIndex]);
					}
				}
			} else if (key == Constants.KEY_DOCUMENTS_ARRAY) {
				for (var itemIndex in data[key]) {
					var keyName =
						Constants.KEY_DOCUMENTS_ARRAY +
						itemIndex +
						Constants.KEY_ARRAY_CLOSE;
					formData.append(keyName, data[key][itemIndex]);
				}
			} else if (
				key == Constants.KEY_IMAGE ||
				key == Constants.KEY_AADHAR_IMAGE ||
				key == Constants.KEY_PAN_IMAGE ||
				key == Constants.KEY_LICENSE_IMAGE ||
				key == Constants.VPC_IMAGE ||
				key == Constants.RC_IMAGE ||
				key == Constants.KEY_SHOP_LICENCE_IMG ||
				key == Constants.KEY_FSSAI_LICENCE_IMG ||
				key == Constants.KEY_GSTN_OR_PAN_IMG ||
				key == Constants.KEY_OFFER_IMAGE
			) {
				if (dataValue != undefined && dataValue != null) {
					formData.append(key, dataValue);
				}
			} else {
				if (
					dataValue !== null &&
					dataValue.uri !== undefined &&
					dataValue.uri !== null
				) {
				} else {
					if (dataValue != null) {
						dataValue = JSON.stringify(dataValue);
						dataValue = dataValue.replace(/\\/g, "");
					}
				}
				if (dataValue != undefined && dataValue != null) {
					formData.append(key, dataValue);
				}
			}
		} else {
			if (data[key] != undefined && data[key] != null) {
				formData.append(key, data[key]);
			}
		}
	}
	return formData;
};
//2
export const isValidResponse = (responseTmp, dispatch, apiType, context) => {
	console.log("apiType " + apiType + " response : ", responseTmp);
	var isValid = true;
	var msg = "";
	var response = JSON.parse(responseTmp);

	console.log("isValidResponse", JSON.stringify(response));

	if (response) {
		if (
			response.hasOwnProperty(Constants.KEY_ERROR) &&
			response.hasOwnProperty(Constants.KEY_MESSAGE) &&
			response[Constants.KEY_ERROR] === true
		) {
			if (
				response[Constants.KEY_MESSAGE] !== null &&
				response[Constants.KEY_MESSAGE] !== ""
			)
				msg = response[Constants.KEY_MESSAGE];
		}
	}
	if (msg !== "") {
		isValid = false;

		if (context !== undefined && context.handleResponse !== undefined) {
			console.log("one ", "one");
			context.handleResponse({
				[Constants.KEY_SHOW_PROGRESS]: false,
				type: apiType,
				[Constants.KEY_MESSAGE]: msg,
			});
		} else {
			console.log("one ", "one2");
			dispatch({
				type: "reload",
				payload: { [Constants.KEY_SHOW_PROGRESS]: false, type: apiType },
			});
		}
		// setTimeout(() => {
		//   alert(msg);
		// }, 200)
	} else {
		if (context !== undefined && context.handleResponse !== undefined) {
			context.handleResponse({
				[Constants.KEY_RESPONSE]: response,
				type: apiType,
			});
		} else {
			dispatch({
				payload: { [Constants.KEY_RESPONSE]: response, type: apiType },
			});
		}
	}
	console.log("isValidddddddddd", isValid);
	return isValid;
};
//3

export const callApiFinal = (
	data,
	dispatch,
	apiUrl,
	typeValue,
	methodType,
	showPBar,
	context,
) => {
	if (context !== undefined && context.handleResponse !== undefined) {
		context.handleResponse({
			[Constants.KEY_SHOW_PROGRESS]: showPBar,
			type: typeValue,
		});
	} else {
		dispatch({
			type: "reload",
			payload: { [Constants.KEY_SHOW_PROGRESS]: showPBar, type: typeValue },
		});
	}
	var reqObj = {
		method: methodType,
	};
	const userData = CustomStorage.getSessionDataAsObject(
		Constants.KEY_USER_DATA,
	);
	console.log("TYPE", typeValue, apiUrl, "Some", methodType);
	console.log("DATA", data);
	// setTimeout(() => {
	// 	alert(JSON.stringify(userData));
	// }, 1500);
	console.log("global[Constants.KEY_USER_DATA] ", userData);
	if (userData !== undefined && userData !== null) {
		reqObj[Constants.KEY_HEADERS] = {
			Authorization: "Bearer " + userData[Constants.KEY_TOKEN],
		};
		JSON.stringify(reqObj[Constants.KEY_HEADERS]);
	}

	if (methodType === METHOD_TYPE_POST) {
		if (data !== undefined && data !== null) {
			// alert(JSON.stringify(data));
			console.log(
				"requestData: " + JSON.stringify(data) + " API Post: " + apiUrl,
			);
			const formData = getFormDataFromObject(data);
			// alert(formData);

			reqObj[Constants.KEY_BODY] = formData;
		}

		fetch(apiUrl, reqObj)
			.then((response) => response.text())
			.then((res) => isValidResponse(res, dispatch, typeValue, context))
			.catch((error) => {
				if (context !== undefined && context.handleResponse !== undefined) {
					context.handleResponse({
						[Constants.KEY_SHOW_PROGRESS]: false,
						type: typeValue,
					});
				} else {
					dispatch({
						type: "reload",
						payload: { [Constants.KEY_SHOW_PROGRESS]: false, type: typeValue },
					});
				}
				setTimeout(() => {
					alert(error);
				}, 200);
			});
	} else if (methodType === METHOD_TYPE_GET) {
		var finalUrl = apiUrl;
		console.log("requestData: " + " API GEt: " + finalUrl);
		fetch(finalUrl, reqObj)
			.then((response) => response.text())
			.then((res) => isValidResponse(res, dispatch, typeValue, context))
			.catch((error) => {
				if (context !== undefined && context.handleResponse !== undefined) {
					context.handleResponse({
						[Constants.KEY_SHOW_PROGRESS]: false,
						type: typeValue,
					});
				} else {
					dispatch({
						type: "reload",
						payload: { [Constants.KEY_SHOW_PROGRESS]: false, type: typeValue },
					});
				}
				setTimeout(() => {
					alert(error);
				}, 200);
			});
	}
	// else if (methodType === METHOD_TYPE_DELETE) {
	//   //alert("Api delete hit")
	//   console.log('requestData: ' + ' API DELEte: ' + apiUrl);
	//   var finalUrl = apiUrl;
	//   fetch(finalUrl, reqObj).then(response => response.text())
	//     .then(res => isValidResponse(res, dispatch, typeValue, context)).catch(error => {
	//       if (context !== undefined && context.handleResponse !== undefined) {
	//         context.handleResponse({ [Constants.KEY_SHOW_PROGRESS]: false, type: typeValue })
	//       }
	//       else {
	//         dispatch({ type: 'reload', payload: { [Constants.KEY_SHOW_PROGRESS]: false, type: typeValue } });
	//       }
	//       setTimeout(() => {
	//         alert(error);
	//       }, 200)
	//     })
	// }
};
//4
export const callApiAfterNetChecking = async (
	data,
	dispatch,
	apiUrl,
	typeValue,
	methodType,
	isConnected,
	showPBar,
	context,
) => {
	if (isConnected) {
		callApiFinal(
			data,
			dispatch,
			apiUrl,
			typeValue,
			methodType,
			showPBar,
			context,
		);
	} else {
		enableDisabledClickedBtn(context, false);
		alert("Network is not available");
	}
};
//5
export const callApi = async (
	data,
	dispatch,
	apiUrl,
	typeValue,
	methodType,
	showPBar,
	context,
) => {
	try {
		callApiAfterNetChecking(
			data,
			dispatch,
			apiUrl,
			typeValue,
			methodType,
			true,
			showPBar,
			context,
		);
	} catch (e) {
		//console.log('exception', e);
	}
};
//6
export const objectToFormData = (obj, form, namespace) => {
	var fd = form || new FormData();
	var formKey;
	for (var property in obj) {
		if (obj.hasOwnProperty(property)) {
			if (namespace) {
				formKey = namespace + "[" + property + "]";
			} else {
				formKey = property;
			}
			// if the property is an object, but not a File,
			// use recursivity.
			if (
				typeof obj[property] === "object" &&
				!(obj[property] instanceof File)
			) {
				objectToFormData(obj[property], fd, property);
			} else {
				// if it's a string or a File object
				fd.append(formKey, obj[property]);
			}
		}
	}
	return fd;
};
//7
export const reqLogin = (data, context) => async (dispatch) => {
	console.log("reqLogin  Called in ", data);
	callApi(
		data,
		dispatch,
		ApiUrls.API_LOGIN,
		types.API_LOGIN,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
//8
export const reqRestroLogin = (data, context) => async (dispatch) => {
	//  console.log('reqLogin  Called in ', data);
	callApi(
		data,
		dispatch,
		ApiUrls.API_LOGIN_RESTRO,
		types.API_LOGIN_RESTRO,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
//9
export const reqGroceryLogin = (data, context) => async (dispatch) => {
	// console.log('reqLoginGrocery  Called in ', data);
	callApi(
		data,
		dispatch,
		ApiUrls.API_LOGIN_GROCERY,
		types.API_LOGIN_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
//10
export const reqAddRestrorent = (data, context) => async (dispatch) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADDRESTRO,
		types.API_ADDRESTRO,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
//11
export const reqAddGroceryStore = (data, context) => async (dispatch) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADDGROCERY,
		types.API_ADDGROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
//12

//13
export const reqRailwayParcelListing = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	let Url = ApiUrls.API_RALWAY_PARCEL_LISTING + "?";

	if (data != undefined && data[Constants.KEY_SEARCH] != undefined) {
		Url = Url + Constants.KEY_SEARCH + "=" + data[Constants.KEY_SEARCH];
	}
	if (
		data != undefined &&
		data[Constants.KEY_START_DATE] != undefined &&
		data[Constants.KEY_END_DATE] != undefined
	) {
		Url =
			Url +
			"&" +
			Constants.KEY_START_DATE +
			"=" +
			data[Constants.KEY_START_DATE];
		Url =
			Url + "&" + Constants.KEY_END_DATE + "=" + data[Constants.KEY_END_DATE];
	}

	callApi(
		data,
		dispatch,
		Url,
		types.API_RALWAY_PARCEL_LISTING,
		METHOD_TYPE_GET,
		true,
		context,
	);
};
//14
export const reqPartyBookingListing = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	let Url = ApiUrls.API_PARTY_BOOKING_LISTING + "?";

	if (data != undefined && data[Constants.KEY_SEARCH] != undefined) {
		Url = Url + Constants.KEY_SEARCH + "=" + data[Constants.KEY_SEARCH];
	}

	if (
		data != undefined &&
		data[Constants.KEY_START_DATE] != undefined &&
		data[Constants.KEY_END_DATE] != undefined
	) {
		Url =
			Url +
			"&" +
			Constants.KEY_START_DATE +
			"=" +
			data[Constants.KEY_START_DATE];
		Url =
			Url + "&" + Constants.KEY_END_DATE + "=" + data[Constants.KEY_END_DATE];
	}

	callApi(
		data,
		dispatch,
		Url,
		types.API_PARTY_BOOKING_LISTING,
		METHOD_TYPE_GET,
		true,
		context,
	);
};
//15
export const reqRailwayParcelDelete = (data, context) => async (dispatch) => {
	console.log(data._id, "Railway");
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_RALWAY_PARCEL_DELETE,
		types.API_RALWAY_PARCEL_DELETE,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
//16
export const reqPartyBookingDelete = (data, context) => async (dispatch) => {
	console.log(data._id);
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_PARTY_BOOKING_DELETE,
		types.API_PARTY_BOOKING_DELETE,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
//17
export const reqGetGroceryList = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_GROCERY_LIST,
		types.API_GROCERY_LIST,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqGetRestoList = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_RESTRO_LIST,
		types.API_RESTRO_LIST,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
//18
export const enableDisabledClickedBtn = (context, disabled) => {
	if (context.state.disabledClickedBtn !== undefined) {
		context.setState({ disabledClickedBtn: disabled });
	}
};
//19
export const getRestoDetails = (data, context) => async (dispatch) => {
	//console.log('req  Called in ', data);
	callApi(
		data,
		dispatch,
		ApiUrls.API_RESTAURENT_DETAILS,
		types.API_RESTAURENT_DETAILS,
		METHOD_TYPE_POST,
		true,
		context,
	);
}; //20
export const getGroceryDetails = (data, context) => async (dispatch) => {
	// console.log('req  Called in ', data);
	callApi(
		data,
		dispatch,
		ApiUrls.API_GROCERY_DETAILS,
		types.API_GROCERY_DETAILS,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
//21
export const reqAddProduct = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADD_PRODUCT,
		types.API_ADD_PRODUCT,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
//22
export const reqAddProductGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADD_PRODUCT_GROCERY,
		types.API_ADD_PRODUCT_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
//23

export const reqGetProductList = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_GET_PRODUCT_LIST,
		types.API_GET_PRODUCT_LIST,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
//24

export const reqGetProductListGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_GET_PRODUCT_LIST_GROCERY,
		types.API_GET_PRODUCT_LIST_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
//25
export const reqDeleteProductItem = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETE_PRODUCT,
		types.API_DELETE_PRODUCT,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
//26

export const reqDeleteProductItemGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETE_PRODUCT_GROCERY,
		types.API_DELETE_PRODUCT_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
//27
export const reqDeleteGROCERY = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETE_RESTRO,
		types.API_DELETE_RESTRO,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqDeleteGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETE_GROCERY,
		types.API_DELETE_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
//28
export const reqDriverList = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DRIVER_LIST,
		types.API_DRIVER_LIST,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
//29
export const reqGetDriverCurrentLoc = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DRIVER_CURRENT_LOC,
		types.API_DRIVER_CURRENT_LOC,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
//30
export const reqGetDriverCurrentLocGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DRIVER_CURRENT_LOC_GROCERY,
		types.API_DRIVER_CURRENT_LOC_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
//31
export const reqDriverListGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DRIVER_LIST_GROCERY,
		types.API_DRIVER_LIST_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
//32
export const reqListReqDrivers = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_LIST_REQ_DRIVER,
		types.API_LIST_REQ_DRIVER,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
//33
export const reqListReqDriversGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_LIST_REQ_DRIVER_GROCERY,
		types.API_LIST_REQ_DRIVER_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

// floating cash for driver

export const reqFloatingCashForAllDriver = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_FLOATING_CASH_FOR_ALL_DRIVER,
		types.API_FLOATING_CASH_FOR_ALL_DRIVER,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqFloatingCashForAllDriverGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_FLOATING_CASH_FOR_ALL_DRIVER_GROCERY,
		types.API_FLOATING_CASH_FOR_ALL_DRIVER_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqNeedToPayForAllRestro = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_NEED_TO_PAY_FOR_ALL_RESTRO,
		types.API_NEED_TO_PAY_FOR_ALL_RESTRO,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqNeedToPayForAllGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_NEED_TO_PAY_FOR_ALL_GROCERY,
		types.API_NEED_TO_PAY_FOR_ALL_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqReceiveFloatingCash = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_RECEIVE_FLOATING_CASH,
		types.API_RECEIVE_FLOATING_CASH,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqReceiveFloatingCashGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_RECEIVE_FLOATING_CASH_GROCERY,
		types.API_RECEIVE_FLOATING_CASH_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

//    user list api urls....

export const reqUserList = (data, context) => async (dispatch) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_USER_LIST,
		types.API_USER_LIST,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqUserListGrocery = (data, context) => async (dispatch) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_USER_LIST_GROCERY,
		types.API_USER_LIST_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

// editUser api..

export const reqEditUser = (data, context) => async (dispatch) => {
	if (data[Constants.KEY_UNDERSCORE_ID] !== undefined) {
		callApi(
			data,
			dispatch,
			ApiUrls.API_EDIT_USER,
			types.API_EDIT_USER,
			METHOD_TYPE_POST,
			true,
			context,
		);
	} else
		callApi(
			data,
			dispatch,
			ApiUrls.API_ADD_USER,
			types.API_ADD_USER,
			METHOD_TYPE_POST,
			true,
			context,
		);
};
export const reqEditUserGrocery = (data, context) => async (dispatch) => {
	if (data[Constants.KEY_UNDERSCORE_ID] !== undefined) {
		callApi(
			data,
			dispatch,
			ApiUrls.API_EDIT_USER_GROCERY,
			types.API_EDIT_USER_GROCERY,
			METHOD_TYPE_POST,
			true,
			context,
		);
	} else
		callApi(
			data,
			dispatch,
			ApiUrls.API_ADD_USER_GROCERY,
			types.API_ADD_USER_GROCERY,
			METHOD_TYPE_POST,
			true,
			context,
		);
};
// delete user Api...

export const reqDeleteUser = (data, context) => async (dispatch) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETE_USER,
		types.API_DELETE_USER,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqDeleteUserGrocery = (data, context) => async (dispatch) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETE_USER_GROCERY,
		types.API_DELETE_USER_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
// change user status

export const reqChangeUserStatus = (data, context) => async (dispatch) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_CHANGE_USER_STATUS,
		types.API_CHANGE_USER_STATUS,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqChangeUserStatusGrocery = (data, context) => async (
	dispatch,
) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_CHANGE_USER_STATUS_GROCERY,
		types.API_CHANGE_USER_STATUS_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

//

export const reqAddDriver = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADD_DRIVER,
		types.API_ADD_DRIVER,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqAddDriverGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADD_DRIVER_GROCERY,
		types.API_ADD_DRIVER_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqDriverDetails = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DRIVER_DETAILS,
		types.API_DRIVER_DETAILS,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqDriverDetailsGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DRIVER_DETAILS_GROCERY,
		types.API_DRIVER_DETAILS_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqEditDriver = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_EDIT_DRIVER,
		types.API_EDIT_DRIVER,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqEditDriverGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_EDIT_DRIVER_GROCERY,
		types.API_EDIT_DRIVER_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqDeleteDriver = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETE_DRIVER,
		types.API_DELETE_DRIVER,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqDeleteDriverGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETE_DRIVER_GROCERY,
		types.API_DELETE_DRIVER_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqProductDetails = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_PRODUCT_DETAILS,
		types.API_PRODUCT_DETAILS,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqProductDetailsGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_PRODUCT_DETAILS_GROCERY,
		types.API_PRODUCT_DETAILS_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqEditProduct = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_EDIT_PRODUCT,
		types.API_EDIT_PRODUCT,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqEditProductGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_EDIT_PRODUCT_GROCERY,
		types.API_EDIT_PRODUCT_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqAddCountry = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADD_COUNTRY,
		types.API_ADD_COUNTRY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqCountryList = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_COUNTRY_LIST,
		types.API_COUNTRY_LIST,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqStoreType = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_STORE_TYPE,
		types.API_STORE_TYPE,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqEditCountry = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_EDIT_COUNTRY,
		types.API_EDIT_COUNTRY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqDeleteCountry = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETE_COUNTRY,
		types.API_DELETE_COUNTRY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqAddState = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADD_STATE,
		types.API_ADD_STATE,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqEditState = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_EDIT_STATE,
		types.API_EDIT_STATE,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqDeleteState = (data, context, isLoading) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETE_STATE,
		types.API_DELETE_STATE,
		METHOD_TYPE_POST,
		isLoading,
		context,
	);
};

export const reqStateList = (data, context, isLoading) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_STATE_LIST,
		types.API_STATE_LIST,
		METHOD_TYPE_POST,
		isLoading,
		context,
	);
};

export const reqAddCity = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADD_CITY,
		types.API_ADD_CITY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqEditCity = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_EDIT_CITY,
		types.API_EDIT_CITY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqDeleteCity = (data, context, isLoading) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETE_CITY,
		types.API_DELETE_CITY,
		METHOD_TYPE_POST,
		isLoading,
		context,
	);
};

export const reqCityList = (data, context, isLoading) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_CITY_LIST,
		types.API_CITY_LIST,
		METHOD_TYPE_POST,
		isLoading,
		context,
	);
};

export const reqAddRegion = (data, context, isLoading) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADD_LOCALITY,
		types.API_ADD_LOCALITY,
		METHOD_TYPE_POST,
		isLoading,
		context,
	);
};

export const reqEditRegion = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_EDIT_LOCALITY,
		types.API_EDIT_LOCALITY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqDeleteRegion = (data, context, isLoading) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETE_LOCALITY,
		types.API_DELETE_LOCALITY,
		METHOD_TYPE_POST,
		isLoading,
		context,
	);
};

export const reqRegionList = (data, context, isLoading) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_LOCALITY_LIST,
		types.API_LOCALITY_LIST,
		METHOD_TYPE_POST,
		isLoading,
		context,
	);
};

export const reqOrderList = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ORDER_LIST,
		types.API_ORDER_LIST,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqOrderListGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ORDER_LIST_GROCERY,
		types.API_ORDER_LIST_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqOrderListForAdmin = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ORDER_LIST_FOR_ADMIN,
		types.API_ORDER_LIST_FOR_ADMIN,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqOrderListForAdminGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ORDER_LIST_FOR_ADMIN_GROCERY,
		types.API_ORDER_LIST_FOR_ADMIN_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqChageOrderStatus = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_CHANGE_ORDER_STATUS,
		types.API_CHANGE_ORDER_STATUS,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqChageOrderStatusGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_CHANGE_ORDER_STATUS_GROCERY,
		types.API_CHANGE_ORDER_STATUS_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqChangeStatusCountry = (data, context, isLoading) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_CHANGE_STATUS_COUNTRY,
		types.API_CHANGE_STATUS_COUNTRY,
		METHOD_TYPE_POST,
		isLoading,
		context,
	);
};

export const reqChangeStatusState = (data, context, isLoading) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_CHANGE_STATUS_STATE,
		types.API_CHANGE_STATUS_STATE,
		METHOD_TYPE_POST,
		isLoading,
		context,
	);
};

export const reqChangeStatusCity = (data, context, isLoading) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_CHANGE_STATUS_CITY,
		types.API_CHANGE_STATUS_CITY,
		METHOD_TYPE_POST,
		isLoading,
		context,
	);
};

export const reqChangeStatusProduct = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_CHANGE_STATUS_PRODUCT,
		types.API_CHANGE_STATUS_PRODUCT,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqChangeStatusProductGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_CHANGE_STATUS_PRODUCT_GROCERY,
		types.API_CHANGE_STATUS_PRODUCT_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqChangeStatusRestro = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_CHANGE_STATUS_RESTRO,
		types.API_CHANGE_STATUS_RESTRO,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqChangeStatusGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_CHANGE_STATUS_GROCERY,
		types.API_CHANGE_STATUS_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqChangeStatusDriver = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_CHANGE_STATUS_DRIVER,
		types.API_CHANGE_STATUS_DRIVER,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqChangeStatusDriverGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_CHANGE_STATUS_DRIVER_GROCERY,
		types.API_CHANGE_STATUS_DRIVER_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqChangeStatusRestroRequested = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_CHANGE_STATUS_REQUESTED_RESTRO,
		types.API_CHANGE_STATUS_REQUESTED_RESTRO,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqChangeStatusGroceryRequested = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_CHANGE_STATUS_REQUESTED_GROCERY,
		types.API_CHANGE_STATUS_REQUESTED_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqChangeStatusDriverRequested = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_CHANGE_REQ_DRIVER_STATUS,
		types.API_CHANGE_REQ_DRIVER_STATUS,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqChangeStatusDriverRequestedGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_CHANGE_REQ_DRIVER_STATUS_GROCERY,
		types.API_CHANGE_REQ_DRIVER_STATUS_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqListRequestedResto = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_LIST_REQUESTED_RESTRO,
		types.API_LIST_REQUESTED_RESTRO,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqListRequestedGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_LIST_REQUESTED_GROCERY,
		types.API_LIST_REQUESTED_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqOrderListNew = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ORDER_NEW,
		types.API_ORDER_NEW,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqOrderListNewGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ORDER_NEW_GROCERY,
		types.API_ORDER_NEW_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqOrderListPreparing = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ORDER_PREPARING,
		types.API_ORDER_PREPARING,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqOrderListPreparingGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ORDER_PREPARING_GROCERY,
		types.API_ORDER_PREPARING_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqOrderListRedy = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ORDER_REDY,
		types.API_ORDER_REDY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqOrderListRedyGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ORDER_REDY_GROCERY,
		types.API_ORDER_REDY_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqOrderListPast = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ORDER_PAST_ORDER,
		types.API_ORDER_PAST_ORDER,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqOrderListPastGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ORDER_PAST_ORDER_GROCERY,
		types.API_ORDER_PAST_ORDER_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqOrderDetails = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ORDER_DETAILS,
		types.API_ORDER_DETAILS,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqOrderDetailsGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ORDER_DETAILS_GROCERY,
		types.API_ORDER_DETAILS_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqOrderCompleted = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ORDER_COMPLETED,
		types.API_ORDER_COMPLETED,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqOrderCompletedGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ORDER_COMPLETED_GROCERY,
		types.API_ORDER_COMPLETED_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqAddCate = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADD_CATEGORY,
		types.API_ADD_CATEGORY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqAddCateGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADD_CATEGORY_PRODUCT_GROCERY,
		types.API_ADD_CATEGORY_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqEditCate = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_EDIT_CATEGORY,
		types.API_EDIT_CATEGORY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqGetCategoryList = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_LIST_CATEGORY,
		types.API_LIST_CATEGORY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqGetCategoryListGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_LIST_GROCERY_CATEGORY,
		types.API_LIST_GROCERY_CATEGORY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqDeleteCategories = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETE_CATEGORIES,
		types.API_DELETE_CATEGORIES,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqDeleteCategoriesGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETE_CATEGORIES_GROCERY,
		types.API_DELETE_CATEGORIES_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqChangeStatusCategory = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_CHANGE_STATUS_CATEGORY,
		types.API_CHANGE_STATUS_CATEGORY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqAddCateProduct = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADD_CATEGORY_PRODUCT,
		types.API_ADD_CATEGORY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqAddCateProductGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADD_CATEGORY_PRODUCT_GROCERY,
		types.API_ADD_CATEGORY_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqEditCateProduct = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_EDIT_CATEGORY_PRODUCT,
		types.API_EDIT_CATEGORY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqEditCateProductGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_EDIT_CATEGORY_PRODUCT_GROCERY,
		types.API_EDIT_CATEGORY_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqGetCategoryProductList = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_LIST_CATEGORY_PRODUCT,
		types.API_LIST_CATEGORY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqGetCategoryProductListGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_LIST_CATEGORY_PRODUCT_GROCERY,
		types.API_LIST_GROCERY_CATEGORY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqDeleteCategoriesProduct = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETE_CATEGORIES_PRODUCT,
		types.API_DELETE_CATEGORIES,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqDeleteCategoriesProductGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETE_CATEGORIES_PRODUCT_GROCERY,
		types.API_DELETE_CATEGORIES_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqChangeStatusCategoryProduct = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_CHANGE_STATUS_CATEGORY_PRODUCT,
		types.API_CHANGE_STATUS_CATEGORY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqChangeStatusCategoryProductGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_CHANGE_STATUS_CATEGORY_PRODUCT_GROCERY,
		types.API_CHANGE_STATUS_CATEGORY_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqAddDriverDistanceCharge = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	if (data[Constants.KEY_UNDERSCORE_ID] != undefined) {
		callApi(
			data,
			dispatch,
			ApiUrls.API_EDIT_DRIVER_DISTANCE_CHARGE,
			types.API_EDIT_DRIVER_DISTANCE_CHARGE,
			METHOD_TYPE_POST,
			true,
			context,
		);
	} else {
		callApi(
			data,
			dispatch,
			ApiUrls.API_DRIVER_DISTANCE_CHARGE,
			types.API_DRIVER_DISTANCE_CHARGE,
			METHOD_TYPE_POST,
			true,
			context,
		);
	}
};

export const reqAddDriverDistanceChargeGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	if (data[Constants.KEY_UNDERSCORE_ID] != undefined) {
		callApi(
			data,
			dispatch,
			ApiUrls.API_EDIT_DRIVER_DISTANCE_CHARGE_GROCERY,
			types.API_EDIT_DRIVER_DISTANCE_CHARGE_GROCERY,
			METHOD_TYPE_POST,
			true,
			context,
		);
	} else {
		callApi(
			data,
			dispatch,
			ApiUrls.API_DRIVER_DISTANCE_CHARGE_GROCERY,
			types.API_DRIVER_DISTANCE_CHARGE_GROCERY,
			METHOD_TYPE_POST,
			true,
			context,
		);
	}
};

export const reqDriverDistanceChargeDetails = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DRIVER_DISTANCE_CHARGE_DETAILS,
		types.API_DRIVER_DISTANCE_CHARGE_DETAILS,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqAdminCommissionChargeList = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADMIN_COMMISSION_CHARGE_LIST,
		types.API_ADMIN_COMMISSION_CHARGE_LIST,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqAdminCommissionChargeListGroccery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADMIN_COMMISSION_CHARGE_LIST_GROCERY,
		types.API_ADMIN_COMMISSION_CHARGE_LIST_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqDriverDistanceChargeListGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DRIVER_DISTANCE_CHARGE_LIST_GROCERY,
		types.API_DRIVER_DISTANCE_CHARGE_LIST_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqDriverDistanceChargeList = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DRIVER_DISTANCE_CHARGE_LIST,
		types.API_DRIVER_DISTANCE_CHARGE_LIST,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqDeleteDriverDistanceChargeItem = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DRIVER_DISTANCE_CHARGE_ITEM_DELETE,
		types.API_DRIVER_DISTANCE_CHARGE_ITEM_DELETE,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqDeleteDriverDistanceChargeItemGrocery = (
	data,
	context,
) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DRIVER_DISTANCE_CHARGE_ITEM_DELETE_GROCERY,
		types.API_DRIVER_DISTANCE_CHARGE_ITEM_DELETE_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqDeleteAdminCommissionChargeItem = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETE_ADMIN_COMMISSION_CHARGE_ITEM,
		types.API_DELETE_ADMIN_COMMISSION_CHARGE_ITEM,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqDeleteAdminCommissionChargeItemGrocery = (
	data,
	context,
) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETE_ADMIN_COMMISSION_CHARGE_ITEM_GROCERY,
		types.API_DELETE_ADMIN_COMMISSION_CHARGE_ITEM_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqChildDeleteDriverDistance = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DRIVER_DISTANCE_CHARGE_CHILD_DELETE,
		types.API_DRIVER_DISTANCE_CHARGE_CHILD_DELETE,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqChildDeleteDriverDistanceGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DRIVER_DISTANCE_CHARGE_CHILD_DELETE_GROCERY,
		types.API_DRIVER_DISTANCE_CHARGE_CHILD_DELETE_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqDriverDocStatusChange = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DRIVER_DOC_STATUS_CHANGE,
		types.API_DRIVER_DOC_STATUS_CHANGE,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqDriverDocStatusChangeGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DRIVER_DOC_STATUS_CHANGE_GROCERY,
		types.API_DRIVER_DOC_STATUS_CHANGE_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqAddCoupon = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADDCOUPONCODE,
		types.API_ADDCOUPONCODE,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqAddCouponGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADDCOUPONCODE_GROCERY,
		types.API_ADDCOUPONCODE_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqCouponList = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_LISTCOUPONCODE,
		types.API_LISTCOUPONCODE,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqCouponListGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_LISTCOUPONCODE_GROCERY,
		types.API_LISTCOUPONCODE_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqDiscountListGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DISCOUNT_LIST_GROCERY,
		types.API_DISCOUNT_LIST_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqDeleteCoupon = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETECOUPONCODE,
		types.API_DELETECOUPONCODE,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqDeleteCouponGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETECOUPONCODE_GROCERY,
		types.API_DELETECOUPONCODE_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqChangeStatusCoupon = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_CHANGECOUPONCODESTATUS,
		types.API_CHANGECOUPONCODESTATUS,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqChangeStatusCouponGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_CHANGECOUPONCODESTATUS_GROCERY,
		types.API_CHANGECOUPONCODESTATUS_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqEditCoupon = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_EDITCOUPONCODE,
		types.API_EDITCOUPONCODE,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqEditCouponGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_EDITCOUPONCODE_GROCERY,
		types.API_EDITCOUPONCODE_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

// jyotish api calling

export const reqAddOffice = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADD_OFFICE,
		types.API_ADD_OFFICE,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqAddOfficeGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADD_OFFICE_GROCERY,
		types.API_ADD_OFFICE_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqOfficeDetail = (data, context) => async (dispatch) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_OFFICE_DETAIL,
		types.API_OFFICE_DETAIL,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqOfficeDetailGrocery = (data, context) => async (dispatch) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_OFFICE_DETAIL_GROCERY,
		types.API_OFFICE_DETAIL_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqOfficeList = (data, context) => async (dispatch) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_OFFICE_LIST,
		types.API_OFFICE_LIST,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqOfficeListGrocery = (data, context) => async (dispatch) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_OFFICE_LIST_GROCERY,
		types.API_OFFICE_LIST_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqRestroDocStatusChange = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_RESTRO_DOC_STATUS_CHANGE,
		types.API_RESTRO_DOC_STATUS_CHANGE,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqGroceryDocStatusChange = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_GROCERY_DOC_STATUS_CHANGE,
		types.API_GROCERY_DOC_STATUS_CHANGE,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqRatingReviewList = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_RATING_REVIEW_LIST,
		types.API_RATING_REVIEW_LIST,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqRatingReviewListGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_RATING_REVIEW_LIST_GROCERY,
		types.API_RATING_REVIEW_LIST_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqDeleteOffice = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETE_OFFICE,
		types.API_DELETE_OFFICE,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqDeleteOfficeGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETE_OFFICE_GROCERY,
		types.API_DELETE_OFFICE_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqOfficeStatusChange = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_OFFICE_STATUS_CHANGE,
		types.API_OFFICE_STATUS_CHANGE,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqOfficeStatusChangeGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_OFFICE_STATUS_CHANGE_GROCERY,
		types.API_OFFICE_STATUS_CHANGE_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqReportUserHistory = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_GENERATE_REPORT,
		types.API_GENERATE_REPORT,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqReportRestroHistory = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_REPORT_HISTORY_RETSTRO,
		types.API_REPORT_HISTORY_RETSTRO,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqUserTypeListForReport = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_USER_TYPE_FOR_REPORT,
		types.API_USER_TYPE_FOR_REPORT,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqAddDiscount = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADD_DISCOUNT,
		types.API_ADD_DISCOUNT,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqAddDiscountGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADD_DISCOUNT_GROCERY,
		types.API_ADD_DISCOUNT_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqEditDiscount = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_EDIT_DISCOUNT,
		types.API_EDIT_DISCOUNT,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqEditDiscountGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_EDIT_DISCOUNT_GROCERY,
		types.API_EDIT_DISCOUNT_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqDiscountDetails = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DISCOUNT_DETAILS,
		types.API_DISCOUNT_DETAILS,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqDiscountDetailsGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DISCOUNT_DETAILS_GROCERY,
		types.API_DISCOUNT_DETAILS_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqRestroOnlineChangeStatus = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_RESTRO_ONLINE_STATUS_CHANGE,
		types.API_RESTRO_ONLINE_STATUS_CHANGE,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqGroceryOnlineChangeStatus = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_GROCERY_ONLINE_STATUS_CHANGE,
		types.API_GROCERY_ONLINE_STATUS_CHANGE,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqSelectedCate = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_SELECTED_CATEGORY,
		types.API_SELECTED_CATEGORY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqSelectedCateGrocery = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_SELECTED_CATEGORY_GROCERY,
		types.API_SELECTED_CATEGORY_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqAddAdminCommission = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	if (data[Constants.KEY_UNDERSCORE_ID] != undefined) {
		callApi(
			data,
			dispatch,
			ApiUrls.API_EDIT_ADMIN_COMMISSION,
			types.API_EDIT_ADMIN_COMMISSION,
			METHOD_TYPE_POST,
			true,
			context,
		);
	} else {
		callApi(
			data,
			dispatch,
			ApiUrls.API_ADD_ADMIN_COMMISSION,
			types.API_ADD_ADMIN_COMMISSION,
			METHOD_TYPE_POST,
			true,
			context,
		);
	}
};

export const reqAddAdminCommissionGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	if (data[Constants.KEY_UNDERSCORE_ID] != undefined) {
		callApi(
			data,
			dispatch,
			ApiUrls.API_EDIT_ADMIN_COMMISSION_GROCERY,
			types.API_EDIT_ADMIN_COMMISSION_GROCERY,
			METHOD_TYPE_POST,
			true,
			context,
		);
	} else {
		callApi(
			data,
			dispatch,
			ApiUrls.API_ADD_ADMIN_COMMISSION_GROCERY,
			types.API_ADD_ADMIN_COMMISSION_GROCERY,
			METHOD_TYPE_POST,
			true,
			context,
		);
	}
};
export const reqListDriverEarning = (data, context) => async (dispatch) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_LIST_DRIVER_EARNING,
		types.API_LIST_DRIVER_EARNING,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqListDriverEarningGrocery = (data, context) => async (
	dispatch,
) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_LIST_DRIVER_EARNING_GROCERY,
		types.API_LIST_DRIVER_EARNING_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqListAdminEarning = (data, context) => async (dispatch) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_LIST_ADMIN_EARNING,
		types.API_LIST_ADMIN_EARNING,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqListAdminEarningGrocery = (data, context) => async (
	dispatch,
) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_LIST_ADMIN_EARNING_GROCERY,
		types.API_LIST_ADMIN_EARNING_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqListRestroEarning = (data, context) => async (dispatch) => {
	//console.log("dehjsvghfjdbg", data);

	callApi(
		data,
		dispatch,
		ApiUrls.API_LIST_RESTRO_EARNING,
		types.API_LIST_RESTRO_EARNING,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqListGroceryEarning = (data, context) => async (dispatch) => {
	//console.log("dehjsvghfjdbg", data);
	callApi(
		data,
		dispatch,
		ApiUrls.API_LIST_GROCERY_EARNING,
		types.API_LIST_GROCERY_EARNING,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqNeedToPayForAllDrivers = (data, context) => async (
	dispatch,
) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_NEED_TO_PAY_FOR_ALL_DRIVERS,
		types.API_NEED_TO_PAY_FOR_ALL_DRIVERS,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqNeedToPayForAllDriversGroery = (data, context) => async (
	dispatch,
) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_NEED_TO_PAY_FOR_ALL_DRIVERS_GROCERY,
		types.API_NEED_TO_PAY_FOR_ALL_DRIVERS_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqPaidDriverPayment = (data, context) => async (dispatch) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_PAID_DRIVER_PAYMENT,
		types.API_PAID_DRIVER_PAYMENT,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqPaidDriverPaymentGrocery = (data, context) => async (
	dispatch,
) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_PAID_DRIVER_PAYMENT_GROCERY,
		types.API_PAID_DRIVER_PAYMENT_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqListDriverEarningTimeWise = (data, context) => async (
	dispatch,
) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_DRIVER_EARNING_PER_WEEK,
		types.API_DRIVER_EARNING_PER_WEEK,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqListDriverEarningTimeWiseGrocery = (data, context) => async (
	dispatch,
) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_DRIVER_EARNING_PER_WEEK_GROCERY,
		types.API_DRIVER_EARNING_PER_WEEK_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqPaidRestroPayment = (data, context) => async (dispatch) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_PAID_RESTRO_PAYMENT,
		types.API_PAID_RESTRO_PAYMENT,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqPaidGroceryPayment = (data, context) => async (dispatch) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_PAID_GROCERY_PAYMENT,
		types.API_PAID_GROCERY_PAYMENT,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqListRestroEarningTimeWise = (data, context) => async (
	dispatch,
) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_RESTRO_EARNING_PER_WEEK,
		types.API_RESTRO_EARNING_PER_WEEK,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqListGroceryEarningTimeWise = (data, context) => async (
	dispatch,
) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_GROCERY_EARNING_PER_WEEK,
		types.API_GROCERY_EARNING_PER_WEEK,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqListAdminEarningTimeWise = (data, context) => async (
	dispatch,
) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADMIN_EARNING_PER_WEEK,
		types.API_ADMIN_EARNING_PER_WEEK,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqListAdminEarningTimeWiseGrocery = (data, context) => async (
	dispatch,
) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_ADMIN_EARNING_PER_WEEK_GROCERY,
		types.API_ADMIN_EARNING_PER_WEEK_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqListSupportIssue = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_LIST_SUPPORT_ISSUE,
		types.API_LIST_SUPPORT_ISSUE,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqGetIssueCreatedDriverList = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_GET_ISSUE_CREATED_DRIVER_LIST,
		types.API_GET_ISSUE_CREATED_DRIVER_LIST,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqAddDileveryCharge = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	if (data[Constants.KEY_UNDERSCORE_ID] != undefined) {
		callApi(
			data,
			dispatch,
			ApiUrls.API_EDIT_ORDER_DILEVERY_CHARGE,
			types.API_EDIT_ORDER_DILEVERY_CHARGE,
			METHOD_TYPE_POST,
			true,
			context,
		);
	} else {
		callApi(
			data,
			dispatch,
			ApiUrls.API_ADD_ORDER_DILEVERY_CHARGE,
			types.API_ADD_ORDER_DILEVERY_CHARGE,
			METHOD_TYPE_POST,
			true,
			context,
		);
	}
};

export const reqAddDileveryChargeGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	if (data[Constants.KEY_UNDERSCORE_ID] != undefined) {
		callApi(
			data,
			dispatch,
			ApiUrls.API_EDIT_ORDER_DILEVERY_CHARGE_GROCERY,
			types.API_EDIT_ORDER_DILEVERY_CHARGE_GROCERY,
			METHOD_TYPE_POST,
			true,
			context,
		);
	} else {
		callApi(
			data,
			dispatch,
			ApiUrls.API_ADD_ORDER_DILEVERY_CHARGE_GROCERY,
			types.API_ADD_ORDER_DILEVERY_CHARGE_GROCERY,
			METHOD_TYPE_POST,
			true,
			context,
		);
	}
};

export const reqGetDileveryChargeList = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ORDER_DILEVERY_CHARGE_LIST,
		types.API_ORDER_DILEVERY_CHARGE_LIST,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqGetDileveryChargeListGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ORDER_DILEVERY_CHARGE_LIST_GROCERY,
		types.API_ORDER_DILEVERY_CHARGE_LIST_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqDeleteDileveryChargeItem = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETE_ORDER_DILEVERY_CHARGE,
		types.API_DELETE_ORDER_DILEVERY_CHARGE,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqDeleteDileveryChargeItemGrocery = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_DELETE_ORDER_DILEVERY_CHARGE_GROCERY,
		types.API_DELETE_ORDER_DILEVERY_CHARGE_GROCERY,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
//grocery order cancel api
export const reqGroceryOrderCancelListForAdmin = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_GROCERY_CANCEL,
		types.API_GROCERY_CANCEL,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqOrderCancelListForAdmin = (data, context) => async (
	dispatch,
) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_ORDER_LIST_CANCEL_FOR_ADMIN,
		types.API_ORDER_LIST_CANCEL_FOR_ADMIN,
		METHOD_TYPE_POST,
		true,
		context,
	);
};

export const reqdiscountlist = (data, context) => async (dispatch) => {
	enableDisabledClickedBtn(context, true);
	callApi(
		data,
		dispatch,
		ApiUrls.API_URL_DISCOUNT_LIST,
		types.API_URL_DISCOUNT_LIST,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqDiscountList = (data, context) => async (dispatch) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_URL_DISCOUNT_LIST,
		types.API_URL_DISCOUNT_LIST,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqIteamWiseSaleRestorentReportList = (data, context) => async (
	dispatch,
) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_URL_ITEM_WISE_SAle_Report,
		types.API_URL_ITEM_WISE_SAle_Report,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqIteamWiseSaleGroceryReportList = (data, context) => async (
	dispatch,
) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_URL_ITEM_WISE_GROCERY_SAle_Report,
		types.API_URL_ITEM_WISE_SAle_Report,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
// dirver Report
export const reqGroceryDriverAdmin = (data, context) => async (dispatch) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_URL_GROCERY_DRIVER_REPORT,
		types.API_URL_ORDER_BY_DRIVER_REPORT,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqRestorentDriverAdmin = (data, context) => async (dispatch) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_URL_RESTAURANT_DRIVER_REPORT,
		types.API_URL_ORDER_BY_DRIVER_REPORT,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
// driver report from id
export const reqGroceryDriverReportFromIdAdmin = (data, context) => async (
	dispatch,
) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_URL_GROCERY_DRIVER_REPORT_ID,
		types.API_URL_RESTAURANT_DRIVER_REPORT_ID,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqRestaurantDriverReportFromIdAdmin = (data, context) => async (
	dispatch,
) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_URL_RESTAURANT_DRIVER_REPORT_ID,
		types.API_URL_RESTAURANT_DRIVER_REPORT_ID,
		METHOD_TYPE_POST,
		true,
		context,
	);
};
export const reqSettingManagmentForAdmin = (data, context) => async (
	dispatch,
) => {
	callApi(
		data,
		dispatch,
		ApiUrls.API_URL_SETTING_MANAGMENT,
		types.API_URL_SETTING_MANAGMENT,
		METHOD_TYPE_GET,
		true,
		context,
	);
};

export const reqManagmentPolicy = (data, context) => async (dispatch) => {
	let Url = ApiUrls.API_URL_MANAGMENT_POLICY;
	if (
		data != "" &&
		data != undefined &&
		data[Constants.KEY_SEARCH] != undefined
	) {
		Url = Url + "?" + "label" + "=" + "terms";
	}
	callApi(
		data,
		dispatch,
		Url,
		types.API_URL_MANAGMENT_POLICY,
		METHOD_TYPE_GET,
		true,
		context,
	);
};
