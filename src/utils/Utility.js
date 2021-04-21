/** @format */

import moment from "moment";

import * as Constants from "./Constants";

const splChrs = /^[^a-zA-Z]+$/;
const emailPtrn = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
import * as CustomStorage from "./CustomStorage";

export const checkEditUser = (state, context) => {
	let msg = "";
	let isValid = false;
	if (!isValidName(state[Constants.KEY_NAME])) {
		context.setState({});
		return false;
	} else {
		isValid = true;
	}
	return isValid;
};

export const goBack = () => {
	window.history.back();
};
export const addCateValidation = (state, state2, context) => {
	let msg = "";
	let isValid = false;

	if (
		!isValidImageName(state2[Constants.KEY_IMAGE_NAME]) ||
		!isValidLabel(state[Constants.KEY_LABEL]) ||
		!isValidDescription(state[Constants.KEY_DESCRIPTION])
		// || !isValidType(state[Constants.KEY_PARENT_CATEGORY_ID])
	) {
		if (!isValidImageName(state2[Constants.KEY_IMAGE_NAME])) {
			msg = imageNameErrorMsg2(state2[Constants.KEY_IMAGE_NAME]);
		} else if (!isValidLabel(state[Constants.KEY_LABEL])) {
			msg = labelNameMsg(state[Constants.KEY_LABEL]);
		} else if (!isValidDescription(state[Constants.KEY_DESCRIPTION])) {
			msg = descriptionErrorMsg(state[Constants.KEY_DESCRIPTION]);
		}
		// else if (!isValidType(state[Constants.KEY_PARENT_CATEGORY_ID])) {
		//   msg = typeMsg(state[Constants.KEY_PARENT_CATEGORY_ID])
		// }
		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};

export const typeMsg = (value) => {
	if (value == undefined || value == "null" || value == "") {
		return "Please select type";
	} else if (value.trim().length <= 0) {
		return "Please select type";
	}
	return "";
};
export const isValidType = (value) => {
	if (value == undefined || value == "null" || value == "") {
		return false;
	} else if (value.trim().length <= 0) {
		return false;
	}
	return true;
};

export const labelNameMsg = (value) => {
	if (value == undefined || value == "null" || value == "") {
		return "Please enter Category name";
	} else if (value.trim().length <= 0) {
		return "Please enter Category name";
	}
	return "";
};
export const isValidLabel = (value) => {
	if (value == undefined || value == "null" || value == "") {
		return false;
	} else if (value.trim().length <= 0) {
		return false;
	}
	return true;
};

export const fromDateErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please select Valid From date";
	} else if (value.trim().length <= 0) {
		return "Please select Valid From date";
	}
	return "";
};

export const isValidFromDate = (value) => {
	if (value == "" || value == undefined) {
		return false;
	} else if (value.trim().length <= 0) {
		return false;
	}
	return true;
};
export const toDateErrorMsg = (fromDate, toDate) => {
	if (toDate == "" || toDate == undefined) {
		return "Please select Valid To date";
	} else if (toDate.trim().toDate <= 0) {
		return "Please select Valid To date";
	}

	return "";
};

export const isValidToDate = (fromDate, toDate) => {
	if (toDate == "" || toDate == undefined) {
		return false;
	} else if (toDate.trim().length <= 0) {
		return false;
	}

	// let date1 = new Date(fromDate);
	// let date2 = new Date(toDate);

	// let diffrenceTime = Math.abs(date2 - date1);
	// let diffrenceDay = Math.ceil(diffrenceTime / (1000 * 60 * 60 * 24))

	// console.log("vhjdsvfhjvjhhjd", diffrenceTime);
	// console.log("vhjdsvfhjvjhhjd", diffrenceDay);

	let a = new Date(toDate) >= new Date(fromDate);
	console.log("jyotish :::::: ", a);

	return a;
};

export const checkVaidationAddDiscountRes = (state, context) => {
	let msg = "";
	let isValid = false;
	if (
		!isValidImage(state[Constants.KEY_IMAGE]) ||
		!isValidDiscountDetail(state[Constants.KEY_DISCOUNT_DETAILS]) ||
		!isValidDiscountInPercent(state[Constants.KEY_DISCOUNT_IN_PERCENT]) ||
		!isValidFromDate(state[Constants.KEY_VALID_FROM]) ||
		!isValidToDate(
			state[Constants.KEY_VALID_FROM],
			state[Constants.KEY_VALID_TO],
		)
	) {
		if (!isValidImage(state[Constants.KEY_IMAGE])) {
			msg = imageErrorMsg(state[Constants.KEY_IMAGE]);
		} else if (!isValidDiscountDetail(state[Constants.KEY_DISCOUNT_DETAILS])) {
			msg = discountDetailErrorMsg(state[Constants.KEY_DISCOUNT_DETAILS]);
		} else if (
			!isValidDiscountInPercent(state[Constants.KEY_DISCOUNT_IN_PERCENT])
		) {
			msg = discountInPercentErrorMsg(state[Constants.KEY_DISCOUNT_IN_PERCENT]);
		} else if (!isValidFromDate(state[Constants.KEY_VALID_FROM])) {
			msg = fromDateErrorMsg(state[Constants.KEY_VALID_FROM]);
		} else if (
			!isValidToDate(
				state[Constants.KEY_VALID_FROM],
				state[Constants.KEY_VALID_TO],
			)
		) {
			msg = toDateErrorMsg(state[Constants.KEY_VALID_TO]);
		}
		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};
export const checkVaidationAddDiscount = (state, context) => {
	let msg = "";
	let isValid = false;
	if (
		// !isValidImage(state[Constants.KEY_IMAGE]) ||
		!isValidDiscountDetail(state[Constants.KEY_DISCOUNT_DETAILS]) ||
		!isValidDiscountInPercent(state[Constants.KEY_DISCOUNT_IN_PERCENT]) ||
		!isValidFromDate(state[Constants.KEY_VALID_FROM]) ||
		!isValidToDate(
			state[Constants.KEY_VALID_FROM],
			state[Constants.KEY_VALID_TO],
		)
	) {
		// if (!isValidImage(state[Constants.KEY_IMAGE])) {
		// 	msg = imageErrorMsg(state[Constants.KEY_IMAGE]);
		// } else
		if (!isValidDiscountDetail(state[Constants.KEY_DISCOUNT_DETAILS])) {
			msg = discountDetailErrorMsg(state[Constants.KEY_DISCOUNT_DETAILS]);
		} else if (
			!isValidDiscountInPercent(state[Constants.KEY_DISCOUNT_IN_PERCENT])
		) {
			msg = discountInPercentErrorMsg(state[Constants.KEY_DISCOUNT_IN_PERCENT]);
		} else if (!isValidFromDate(state[Constants.KEY_VALID_FROM])) {
			msg = fromDateErrorMsg(state[Constants.KEY_VALID_FROM]);
		} else if (
			!isValidToDate(
				state[Constants.KEY_VALID_FROM],
				state[Constants.KEY_VALID_TO],
			)
		) {
			msg = toDateErrorMsg(state[Constants.KEY_VALID_TO]);
		}
		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};

export const checkVaidationAddCoupon = (state, context) => {
	let msg = "";
	let isValid = false;

	if (
		!isValidTitle(state[Constants.KEY_TITLE]) ||
		!isValidCouponCode(state[Constants.KEY_COUPON_CODE]) ||
		!isValidCouponDetail(state[Constants.KEY_COUPON_DETAILS]) ||
		!isValidCouponDiscountInPercent(
			state[Constants.KEY_COUPON_DISCOUNT_IN_PERCENT],
		) ||
		!isValidCouponMaxDiscountAmount(
			state[Constants.KEY_COUPON_MAX_DISCOUNT_AMOUNT],
		) ||
		!isValidCouponMinDiscountAmount(
			state[Constants.KEY_COUPON_MIN_DISCOUNT_AMOUNT],
		) ||
		!isValidFromDate(state[Constants.KEY_VALID_FROM]) ||
		!isValidToDate(
			state[Constants.KEY_VALID_FROM],
			state[Constants.KEY_VALID_TO],
		)
	) {
		if (!isValidTitle(state[Constants.KEY_TITLE])) {
			msg = titleCodeErrorMsg(state[Constants.KEY_TITLE]);
		} else if (!isValidCouponCode(state[Constants.KEY_COUPON_CODE])) {
			msg = couponCodeErrorMsg(state[Constants.KEY_COUPON_CODE]);
		} else if (!isValidCouponDetail(state[Constants.KEY_COUPON_DETAILS])) {
			msg = couponDetailErrorMsg(state[Constants.KEY_COUPON_DETAILS]);
		} else if (
			!isValidCouponDiscountInPercent(
				state[Constants.KEY_COUPON_DISCOUNT_IN_PERCENT],
			)
		) {
			msg = couponDiscountInPercentErrorMsg(
				state[Constants.KEY_COUPON_DISCOUNT_IN_PERCENT],
			);
		} else if (
			!isValidCouponMaxDiscountAmount(
				state[Constants.KEY_COUPON_MAX_DISCOUNT_AMOUNT],
			)
		) {
			msg = couponMaxDiscountAmountErrorMsg(
				state[Constants.KEY_COUPON_MAX_DISCOUNT_AMOUNT],
			);
		} else if (
			!isValidCouponMinDiscountAmount(
				state[Constants.KEY_COUPON_MIN_DISCOUNT_AMOUNT],
			)
		) {
			msg = couponMinDiscountAmountErrorMsg(
				state[Constants.KEY_COUPON_MIN_DISCOUNT_AMOUNT],
			);
		} else if (
			!isValidFromDate(
				state[Constants.KEY_VALID_FROM],
				state[Constants.KEY_VALID_TO],
			)
		) {
			msg = fromDateErrorMsg(state[Constants.KEY_VALID_FROM]);
		} else if (
			!isValidToDate(
				state[Constants.KEY_VALID_FROM],
				state[Constants.KEY_VALID_TO],
			)
		) {
			msg = toDateErrorMsg(state[Constants.KEY_VALID_TO]);
		}
		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};

export const isValidCouponMinDiscountAmount = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const couponMinDiscountAmountErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter Coupon Min Discount Amount";
	}
	return "";
};

export const isValidCouponMaxDiscountAmount = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const couponMaxDiscountAmountErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter Coupon Max Discount Amount";
	}
	return "";
};

export const isValidCouponDiscountInPercent = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const couponDiscountInPercentErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter Coupon Discount in Percent";
	}
	return "";
};

export const isValidDiscountInPercent = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const discountInPercentErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter Discount in Percent";
	}
	return "";
};

export const isValidDiscountDetail = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const discountDetailErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter Discount Detail";
	}
	return "";
};

export const isValidCouponDetail = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const couponDetailErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter Coupon Detail";
	}
	return "";
};

export const isValidTitle = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const titleCodeErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter title";
	}
	return "";
};

export const isValidCouponCode = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const couponCodeErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter Coupon code";
	}
	return "";
};

export const checkFareValidationFirst = (state, context) => {
	let msg = "";
	let isValid = false;
	if (!isValidCountry(state[Constants.KEY_COUNTRY_ID])) {
		msg = countryNameErrorMsg(state[Constants.KEY_COUNTRY_ID]);
		context.handleClick("" + msg);
		return isValid;
	} else if (!isValidState(state[Constants.KEY_STATE_ID])) {
		msg = stateErrorMsg(state[Constants.KEY_STATE_ID]);
		context.handleClick("" + msg);
		return isValid;
	} else if (!isValidCity(state[Constants.KEY_CITY_ID])) {
		msg = cityErrorMsg(state[Constants.KEY_CITY_ID]);
		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};

export const checkDileveryChargeValidation = (state, context) => {
	let msg = "";
	let isValid = false;
	console.log("data=", JSON.stringify(state));

	if (!isValidCountry(state[Constants.KEY_COUNTRY_ID])) {
		msg = countryNameErrorMsg(state[Constants.KEY_COUNTRY_ID]);
		context.handleClick("" + msg);
		return isValid;
	} else if (!isValidState(state[Constants.KEY_STATE_ID])) {
		msg = stateErrorMsg(state[Constants.KEY_STATE_ID]);
		context.handleClick("" + msg);
		return isValid;
	} else if (!isValidCity(state[Constants.KEY_CITY_ID])) {
		msg = cityErrorMsg(state[Constants.KEY_CITY_ID]);
		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};

export const checkFareValidationOnLoadMore = (state, context, index, data) => {
	let msg = "";
	let isValid = false;

	msg = "Value Requied For ";
	let newMsg = "";

	if (!isValidMinKM(state[Constants.KEY_MIN_KM], index, data)) {
		newMsg = newMsg + "Min KM";
	}

	if (!isValidMaxKM(state[Constants.KEY_MAX_KM], state[Constants.KEY_MIN_KM])) {
		if (newMsg != "") {
			newMsg = newMsg + ", " + "Max KM";
		} else {
			newMsg = "Max KM";
		}
	}
	if (!isValidFare(state[Constants.KEY_FARE])) {
		if (newMsg != "") {
			newMsg = newMsg + ", " + "Fare";
		} else {
			newMsg = "Fare";
		}
	}

	if (newMsg != "") {
		context.handleClick("" + msg + newMsg);
	} else {
		isValid = true;
	}

	return isValid;
};

export const checkAdminCommissionValidationOnLoadMore = (
	state,
	context,
	index,
	data,
) => {
	let msg = "";
	let isValid = false;
	console.log("validation=", JSON.stringify(state));

	msg = "Value Requied For ";
	let newMsg = "";

	if (
		!isValidMinOrderAmount(state[Constants.KEY_MIN_ORDER_AMOUNT], index, data)
	) {
		newMsg = newMsg + "Min Order Amount";
	}

	if (
		!isValidMaxOrderAmount(
			state[Constants.KEY_MAX_ORDER_AMOUNT],
			state[Constants.KEY_MIN_ORDER_AMOUNT],
		)
	) {
		if (newMsg != "") {
			newMsg = newMsg + ", " + "Max Order Amount";
		} else {
			newMsg = "Max Order Amount";
		}
	}
	if (
		!isValidCommissionInPercentage(
			state[Constants.KEY_COMMISSION_IN_PERCENTAGE],
		)
	) {
		if (newMsg != "") {
			newMsg = newMsg + ", " + "Commission in percent";
		} else {
			newMsg = "Commission in percent";
		}
	}

	if (newMsg != "") {
		context.handleClick("" + msg + newMsg);
	} else {
		isValid = true;
	}

	return isValid;
};

export const checkDileveryChargeLoadMore = (state, context, index, data) => {
	let msg = "";
	console.log("data retsro", JSON.stringify(state));
	let isValid = false;
	if (!isValidMinKM(state[Constants.KEY_MIN_KM], index, data)) {
		msg = minKMErrorMsg(state[Constants.KEY_MIN_KM], index, data);
		console.log("data retsro", "1");
		context.handleClick("" + msg);
		return isValid;
	} else if (
		!isValidMaxKM(state[Constants.KEY_MAX_KM], state[Constants.KEY_MIN_KM])
	) {
		msg = maxKMErrorMsg(
			state[Constants.KEY_MAX_KM],
			state[Constants.KEY_MIN_KM],
		);
		console.log("data retsro", "2");
		context.handleClick("" + msg);
		return isValid;
	} else if (
		!isValidMinDileveryOrderAmount(
			state[Constants.KEY_MIN_ORDER_AMOUNT],
			index,
			data,
		)
	) {
		msg = minDileveryOrderAmountErrorMsg(
			state[Constants.KEY_MIN_ORDER_AMOUNT],
			index,
			data,
		);
		console.log("data retsro", "3", "msg=", msg);
		context.handleClick("" + msg);

		return isValid;
	} else if (
		!isValidMaxOrderAmount(
			state[Constants.KEY_MAX_ORDER_AMOUNT],
			state[Constants.KEY_MIN_ORDER_AMOUNT],
		)
	) {
		msg = maxOrderAmountErrorMsg(
			state[Constants.KEY_MAX_ORDER_AMOUNT],
			state[Constants.KEY_MIN_ORDER_AMOUNT],
		);
		console.log("Check==", msg);
		context.handleClick("" + msg);
		return isValid;
	}

	// else if (!isValidDileveryCharge(state[Constants.KEY_DILEVERY_CHARGE])) {
	//   msg = dileveryChargeErrorMsg(state[Constants.KEY_DILEVERY_CHARGE])
	//   context.handleClick('' + msg);
	//   return isValid;
	// }
	else if (!isValidDileveryCharge(state[Constants.KEY_FARE])) {
		msg = dileveryChargeErrorMsg(state[Constants.KEY_FARE]);
		console.log("Check==", msg);

		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};

export const checkFareValidationSecond = (state, context, index, data) => {
	let msg = "";
	let isValid = false;

	if (!isValidMinKM(state[Constants.KEY_MIN_KM], index, data)) {
		msg = minKMErrorMsg(state[Constants.KEY_MIN_KM], index, data);
		context.handleClick("" + msg);
		return isValid;
	} else if (
		!isValidMaxKM(state[Constants.KEY_MAX_KM], state[Constants.KEY_MIN_KM])
	) {
		msg = maxKMErrorMsg(
			state[Constants.KEY_MAX_KM],
			state[Constants.KEY_MIN_KM],
		);
		context.handleClick("" + msg);
		return isValid;
	} else if (!isValidFare(state[Constants.KEY_FARE])) {
		msg = fareKMErrorMsg(state[Constants.KEY_FARE]);
		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};

export const checkCommissionValidationSecond = (
	state,
	context,
	index,
	data,
) => {
	let msg = "";
	let isValid = false;

	if (
		!isValidMinOrderAmount(state[Constants.KEY_MIN_ORDER_AMOUNT], index, data)
	) {
		msg = minOrderAmountErrorMsg(
			state[Constants.KEY_MIN_ORDER_AMOUNT],
			index,
			data,
		);
		context.handleClick("" + msg);
		return isValid;
	} else if (
		!isValidMaxOrderAmount(
			state[Constants.KEY_MAX_ORDER_AMOUNT],
			state[Constants.KEY_MIN_ORDER_AMOUNT],
		)
	) {
		msg = maxOrderAmountErrorMsg(
			state[Constants.KEY_MAX_ORDER_AMOUNT],
			state[Constants.KEY_MIN_ORDER_AMOUNT],
		);
		context.handleClick("" + msg);
		return isValid;
	} else if (
		!isValidCommissionInPercentage(
			state[Constants.KEY_COMMISSION_IN_PERCENTAGE],
		)
	) {
		msg = orderCommissionErrorMsg(
			state[Constants.KEY_COMMISSION_IN_PERCENTAGE],
		);
		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};

export const isValidDileveryCharge = (value) => {
	if (value === "") {
		return false;
	} else if (parseInt(value) <= 0) {
		return false;
	}
	return true;
};

export const isValidFare = (value) => {
	if (value === "") {
		return false;
	} else if (parseInt(value) <= 0) {
		return false;
	}
	return true;
};

export const dileveryChargeErrorMsg = (value, minvalue) => {
	if (value === "") {
		return "Please enter delivery charge amount";
	} else if (parseInt(value) <= 0) {
		return "Please enter delivery charge amount";
	}
	return "";
};

export const fareKMErrorMsg = (value, minvalue) => {
	if (value === "") {
		return "Please enter fare";
	} else if (parseInt(value) <= 0) {
		return "Please enter fare";
	}
	return "";
};

export const isValidMaxKM = (value, minvalue) => {
	if (value == "") {
		return false;
	} else if (parseInt(value) <= 0) {
		return false;
	} else if (parseInt(value) <= parseInt(minvalue)) {
		return false;
	}
	return true;
};

export const maxKMErrorMsg = (value, minvalue) => {
	if (value == "") {
		return "Please enter max KM";
	} else if (parseInt(value) <= 0) {
		return "Please enter max KM";
	} else if (parseInt(value) <= parseInt(minvalue)) {
		return "Max KM  should be grater than Min KM";
	}
	return "";
};

export const isValidMinKM = (value, index, data) => {
	if (index == 0) {
		return true;
	} else if (value === "") {
		return false;
	} else if (parseInt(value) <= 0) {
		return false;
	} else if (
		index > 0 &&
		parseInt(value) < parseInt(data[index - 1][Constants.KEY_MAX_KM])
	) {
		return false;
	}
	return true;
};

export const isValidMinDileveryOrderAmount = (value, index, data) => {
	if (index == 0) {
		return true;
	} else if (value === "") {
		return false;
	} else if (parseInt(value) <= 0) {
		return false;
	}
	// else if (index > 0 && parseInt(value) < parseInt(data[index - 1][Constants.KEY_MAX_ORDER_AMOUNT])) {
	//   return false;
	// }
	return true;
};

export const isValidMinOrderAmount = (value, index, data) => {
	if (index == 0) {
		return true;
	} else if (value === "") {
		return false;
	} else if (parseInt(value) <= 0) {
		return false;
	} else if (
		index > 0 &&
		parseInt(value) < parseInt(data[index - 1][Constants.KEY_MAX_ORDER_AMOUNT])
	) {
		return false;
	}
	return true;
};

export const minKMErrorMsg = (value, index, data) => {
	if (value == "") {
		return "Please enter min KM";
	} else if (parseInt(value) <= 0) {
		return "Please enter Min KM";
	} else if (
		index > 0 &&
		parseInt(value) < parseInt(data[index - 1][Constants.KEY_MAX_KM])
	) {
		return false;
	} else if (index == 0) {
		return "";
	} else if (value.length <= 0) {
		return "Please enter Min KM";
	}
	return "";
};

export const minDileveryOrderAmountErrorMsg = (value, index, data) => {
	if (value == "") {
		return "Please enter min Order Amount";
	} else if (parseInt(value) <= 0) {
		return "Please enter Min Order Amount";
	}
	// } else if (index > 0 && parseInt(value) < parseInt(data[index - 1][Constants.KEY_MAX_ORDER_AMOUNT])) {
	//   return false;
	// }
	else if (index == 0) {
		return "";
	} else if (value.length <= 0) {
		return "Please enter Min Order Amount";
	}
	return "";
};

export const minOrderAmountErrorMsg = (value, index, data) => {
	if (value == "") {
		return "Please enter min Order Amount";
	} else if (parseInt(value) <= 0) {
		return "Please enter Min Order Amount";
	} else if (
		index > 0 &&
		parseInt(value) < parseInt(data[index - 1][Constants.KEY_MAX_ORDER_AMOUNT])
	) {
		return false;
	} else if (index == 0) {
		return "";
	} else if (value.length <= 0) {
		return "Please enter Min Order Amount";
	}
	return "";
};

export const isValidMaxOrderAmount = (value, minvalue) => {
	if (value == "") {
		return false;
	} else if (parseInt(value) <= 0) {
		return false;
	} else if (parseInt(value) <= parseInt(minvalue)) {
		return false;
	}
	return true;
};

export const maxOrderAmountErrorMsg = (value, minvalue) => {
	if (value == "") {
		return "Please enter max Order Amount";
	} else if (parseInt(value) <= 0) {
		return "Please enter max Order Amount";
	} else if (parseInt(value) <= parseInt(minvalue)) {
		return "Max Order Amount  should be grater than Min Order Amount";
	}
	return "";
};

export const isValidCommissionInPercentage = (value) => {
	if (value === "") {
		return false;
	} else if (parseInt(value) <= 0) {
		return false;
	}
	// else if (parseInt(value) > 100) {
	//   return false;
	// }

	return true;
};

export const orderCommissionErrorMsg = (value, minvalue) => {
	if (value === "") {
		return "Please enter Commission in Percentage";
	} else if (parseInt(value) <= 0) {
		return "Please enter Commission in Percentage";
	} else if (parseInt(value) > 100) {
		return "Please enter Commission in Percentage less than or equal 100";
	}
	return "";
};

export const checkRegionValidation = (state, context) => {
	let msg = "";
	let isValid = false;
	if (!isValidCountry(state[Constants.KEY_COUNTRY_ID])) {
		msg = countryNameErrorMsg(state[Constants.KEY_COUNTRY_ID]);
		context.handleClick("" + msg);
		return isValid;
	} else if (!isValidState(state[Constants.KEY_STATE_ID])) {
		msg = stateErrorMsg(state[Constants.KEY_STATE_ID]);
		context.handleClick("" + msg);
		return isValid;
	} else if (!isValidCity(state[Constants.KEY_CITY_ID])) {
		msg = cityErrorMsg(state[Constants.KEY_CITY_ID]);
		context.handleClick("" + msg);
		return isValid;
	} else if (!isValidRegion(state[Constants.KEY_NAME])) {
		msg = regionErrorMsg(state[Constants.KEY_NAME]);
		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};

export const checkCityValidation = (state, context) => {
	let msg = "";
	let isValid = false;
	if (!isValidCountry(state[Constants.KEY_COUNTRY_ID])) {
		msg = countryNameErrorMsg(state[Constants.KEY_COUNTRY_ID]);
		context.handleClick("" + msg);
		return isValid;
	} else if (!isValidState(state[Constants.KEY_STATE_ID])) {
		msg = stateErrorMsg(state[Constants.KEY_STATE_ID]);
		context.handleClick("" + msg);
		return isValid;
	} else if (!isValidCity(state[Constants.KEY_NAME])) {
		msg = cityErrorMsg(state[Constants.KEY_NAME]);
		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};

export const countryNameErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please select country";
	} else if (value.length <= 0) {
		return "Country name must be valid";
	}
	return "";
};

export const checkStateValidation = (state, context) => {
	let msg = "";
	let isValid = false;
	if (!isValidCountry(state[Constants.KEY_COUNTRY_ID])) {
		msg = countryNameErrorMsg(state[Constants.KEY_COUNTRY_ID]);
		context.handleClick("" + msg);
		return isValid;
	} else if (!isValidState(state[Constants.KEY_NAME])) {
		msg = stateErrorMsg(state[Constants.KEY_NAME]);
		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};

export const checkCountryValidation = (state, context) => {
	let msg = "";
	let isValid = false;
	if (!isValidCountry(state.name)) {
		msg = countryNameErrorMsg(state.name);
		context.handleClick("" + msg);
		return isValid;
	} else if (!isValidDialCode(state.country_code)) {
		msg = dialCodeErrorMsg(state.country_code);
		context.handleClick("" + msg);
		return isValid;
	} else if (!isValidDialCode(state.dial_code)) {
		msg = dialCodeErrorMsg(state.dial_code);
		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};

export const isValidDialCode = (value) => {
	//alert(value)
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};
export const dialCodeErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter dial code";
	}

	return "";
};

export const isValidCountryCode = (value) => {
	//alert(value)
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};
export const countyCodeErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter country code";
	}

	return "";
};

export const isValidDescription = (value) => {
	//alert(value)
	if (value == "" || value == undefined) {
		return false;
	} else if (value.trim().length < 2) {
		return false;
	}
	return true;
};
export const descriptionErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter description";
	} else if (value.trim().length < 2) {
		return "Please enter description";
	}

	return "";
};

export const isValidFinalAmount = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};
export const finalAmountErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter final amount";
	}
	return "";
};

export const isValidProductType = (value) => {
	if (value == undefined || value == null || value == "") {
		return false;
	}
	return true;
};
export const productTypeErrorMsg = (value) => {
	if (value == undefined || value == null || value == "") {
		return "Please select product type";
	}
	return "";
};
export const isValidAddress2 = (value) => {
	if (value == undefined || value == null || value == "") {
		return "Please enter street name";
	}
};

export const isValidCookingTime = (value) => {
	//alert(value)
	if (value == undefined || value == null || value == "") {
		return false;
	} else if (parseInt(value) <= 0) {
		return false;
	}
	return true;
};
export const finalCookingTimeErrorMsg = (value) => {
	if (value == undefined || value == null || value == "") {
		return "Please enter cooking time";
	} else if (parseInt(value) <= 0) {
		return "Please enter cooking time";
	}
	return "";
};

export const isValidDiscount = (value) => {
	//alert(value)
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};
export const discountErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter discount price";
	}

	return "";
};

export const isValidPrice = (value) => {
	//alert(value)
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};
export const priceErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter price";
	}

	return "";
};

export const isValidProductWeight = (value) => {
	//alert(value)
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};
export const validProductWeightErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter Product Weight";
	}

	return "";
};

export const isValidProductQuantity = (value) => {
	//alert(value)
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};
export const validProductQuantityErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter Product quantity";
	}

	return "";
};

export const isValidStockAvailibilty = (value) => {
	//alert(value)
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};
export const validStockAvailibiltyErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter stock availibilty";
	}

	return "";
};

export const isValidPassword = (value) => {
	if (value == "" || value == undefined) {
		return false;
	} else if (value.length < 6) {
		return false;
	}
	return true;
};
export const isValidImage = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const isValidConfirmPassword = (value, confim_password) => {
	if (confim_password == "" || confim_password == undefined) {
		return false;
	} else if (value.length != confim_password.length) {
		return false;
	}
	return true;
};

export const isValidCountry = (value) => {
	if (value == "" || value == undefined) {
		return false;
	} else if (value.trim().length <= 0) {
		return false;
	}
	return true;
};

export const countryErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter country";
	}
	return "";
};

export const isValidOffice = (value) => {
	if (value == "" || value == undefined) {
		return false;
	} else if (value.trim().length <= 0) {
		return false;
	}
	return true;
};

export const officeErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter office";
	}
	return "";
};
export const imageErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Image is required";
	}
	return "";
};

export const passwordErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter password";
	} else if (value.length < 6) {
		return "Password length should be minimum 6 digits";
	}
	return "";
};
export const confimPasswordErrorMsg = (value, confirm_password) => {
	if (confirm_password == "" || confirm_password == undefined) {
		return "Please enter confim password";
	} else if (value.length != confirm_password.length) {
		return "Password and Confim password should be match";
	}
	return "";
};

export const isValidVehicleNo = (value) => {
	if (value == "" || value == undefined) {
		return false;
	} else if (
		value.length < Constants.MIN_LENGTH_OF_VECHILE_NUMBER ||
		value.length > Constants.MAX_LENGTH_OF_VECHILE_NUMBER
	) {
		return false;
	}
	return true;
};

export const vehicleNoErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter vehicle number";
	} else if (value.length <= 9 || value.length >= 10) {
		return "Enter Vechile No 9 Or 10 digits only";
	}
	return "";
};

export const isValidIFSC = (value) => {
	if (value == "" || value == undefined) {
		return false;
	} else if (value.length != Constants.LENGTH_OF_IFSC_CODE) {
		return false;
	}
	return true;
};

export const IFSCErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter IFSC code";
	} else if (value.length != Constants.LENGTH_OF_IFSC_CODE) {
		return "Please Enter 11 Number IFSC Code";
	}
	return "";
};

export const isValidAccountNo = (value) => {
	if (value == "" || value == undefined) {
		return false;
	} else if (value.length <= Constants.MIN_LENGTH_ACCOUNT_NUMBER) {
		return false;
	}
	return true;
};

export const accountNoErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter account number";
	} else if (value.length <= Constants.MIN_LENGTH_ACCOUNT_NUMBER) {
		return "Please  Enter Account Number Minimum  6 Digits";
	}
	return "";
};

export const isValidAccountHolderName = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const accountHolderNameErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter account holder name";
	}
	return "";
};

export const isValidBankName = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const bankNameErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter bank name";
	}
	return "";
};

export const isValidZip = (number) => {
	var isValid = true;
	var msg = "";

	var zipCodeRegex = /^\d{5}$/;
	if (number == undefined) {
		return false;
	} else if (number == "" || number == null) {
		return false;
	} else if (zipCodeRegex.test(number)) {
		return false;
	} else if (
		number.length < Constants.MIN_LENGTH_OF_ZIP_NUMBER ||
		number.length > Constants.MAX_LENGTH_OF_ZIP_NUMBER
	) {
		return false;
	}

	return isValid;

	// if (value == '' || value == undefined) {
	//   return false;
	// }
	// return true;
};

export const zipErrorMsg = (number) => {
	var isValid = true;
	var msg = "";
	var zipCodeRegex = /^\d{5}$/;
	if (number == undefined) {
		return "Please enter Zip";
	} else if (number == "" || number == null) {
		return "Please enter ZIP";
	} else if (zipCodeRegex.test(number)) {
		return "ZIP must be valid";
	} else if (
		number.length < Constants.MIN_LENGTH_OF_ZIP_NUMBER ||
		number.length > Constants.MAX_LENGTH_OF_ZIP_NUMBER
	) {
		return "ZIP must be 6 digits";
	}
	return isValid;
};

// export const zipErrorMsg = (value) => {
//   if (value == '' || value == undefined) {
//     return 'Please enter zip code';
//   }
//   return "";

// }

export const isValidOpeningTime = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const setOpeningTimeErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "please enter Opening Time";
	}
	return "";
};

export const isValidClosingTime = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const setClosingTimeErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "please enter Closing Time";
	}
	return "";
};

export const isValidCostForTwo = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const costForTwoErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter cost for two amount";
	}
	return "";
};

export const isValidState = (value) => {
	if (value == "" || value == undefined) {
		return false;
	} else if (value.trim().length <= 0) {
		return false;
	}
	return true;
};

export const stateErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please select state";
	}
	return "";
};

export const isValidCity = (value) => {
	if (value == "" || value == undefined) {
		return false;
	} else if (value.trim().length <= 0) {
		return false;
	}
	return true;
};

export const cityErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please select city";
	} else if (value.trim().length <= 0) {
		return "Please select city";
	}
	return "";
};

export const regionErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please select region";
	} else if (value.trim().length <= 0) {
		return "Please select region";
	}
	return "";
};

export const isValidRegion = (value) => {
	if (value == "" || value == undefined) {
		return false;
	} else if (value.trim().length <= 0) {
		return false;
	}
	return true;
};

export const isValidAddress1 = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const address1ErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter House Name and Number";
	}
	return "";
};

export const isValidMobileNumber = (number) => {
	var isValid = true;
	var msg = "";
	var IndNum = /^[0]?[6789]\d{9}$/;
	var regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
	if (number == undefined) {
		return false;
	} else if (number == "" || number == null) {
		return false;
	} else if (regex.test(number)) {
		return false;
	} else if (
		number.length < Constants.MIN_LENGTH_OF_PHONE_NUMBER ||
		number.length > Constants.MAX_LENGTH_OF_PHONE_NUMBER
	) {
		return false;
	} else if (!IndNum.test(number)) {
		return false;
	}
	return isValid;
};

export const isValidMobileNumberMsg = (number) => {
	var isValid = true;
	var msg = "";
	var IndNum = /^[0]?[6789]\d{9}$/;
	var regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
	if (number == undefined) {
		return "Please enter phone";
	} else if (number == "" || number == null) {
		return "Please enter phone";
	} else if (regex.test(number)) {
		console.log("agghsadhy", regex);

		return "Enter Phone number must be valid";
	} else if (
		number.length < Constants.MIN_LENGTH_OF_PHONE_NUMBER ||
		number.length > Constants.MAX_LENGTH_OF_PHONE_NUMBER
	) {
		return "Phone must be 10 digits";
	} else if (!IndNum.test(number)) {
		return "Phone Number start only Indian number";
	}
	return isValid;
};

export const isValidEmergencyNumber = (number, emergency_number) => {
	var isValid = true;
	var msg = "";
	var regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
	if (emergency_number == undefined) {
		return false;
	} else if (emergency_number == "" || emergency_number == null) {
		return false;
	} else if (regex.test(emergency_number)) {
		return false;
	} else if (
		emergency_number.length < Constants.MIN_LENGTH_OF_PHONE_NUMBER ||
		emergency_number.length > Constants.MAX_LENGTH_OF_PHONE_NUMBER
	) {
		return false;
	} else if (emergency_number == number) {
		return false;
	}

	return isValid;
};

export const isValidEmergancyNumberErrorMsg = (emergency_number, number) => {
	var isValid = true;
	var msg = "";
	var regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
	if (number == undefined) {
		return "Please enter emergency phone number";
	} else if (number == "" || number == null) {
		return "Please enter emergency phone number";
	} else if (regex.test(number)) {
		return "Emergency phone number must be valid";
	} else if (
		number.length < Constants.MIN_LENGTH_OF_PHONE_NUMBER ||
		number.length > Constants.MAX_LENGTH_OF_PHONE_NUMBER
	) {
		return "Emergency phone number must be 10 digits";
	} else if (emergency_number == number) {
		return "Emergency Phone number Not same as Mobile Number";
	}

	return isValid;
};

// export const isValidLandLineNo = (number) => {
//   var isValid = true;
//   var msg = '';
//   var regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
//   if (number == undefined) {
//     return false;
//   } else if (number == '' || number == null) {
//     return false;
//   }
//   else if (regex.test(number)) {
//     return false;
//   }
//   else if (number.length < Constants.MIN_LENGTH_OF_PHONE_NUMBER ||
//     number.length > Constants.MAX_LENGTH_OF_PHONE_NUMBER) {
//     return false;
//   }
//   return isValid;
// }

// export const isValidLandLineNoMsg = (number) => {
//   var isValid = true;
//   var msg = '';
//   var regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
//   if (number == undefined) {
//     return 'Please enter LandLine Number';
//   } else if (number == '' || number == null) {
//     return 'Please enter LandLine Number';
//   }
//   else if (regex.test(number)) {
//     return 'LandLine  must be valid';
//   }
//   else if (number.length < Constants.MIN_LENGTH_OF_PHONE_NUMBER ||
//     number.length > Constants.MAX_LENGTH_OF_PHONE_NUMBER) {
//     return 'LandLine  must be 10 digits';
//   }
//   return isValid;
// }

export const isValidEmail = (value) => {
	//alert(value)
	if (value == "" || value == undefined) {
		return false;
	} else if (!value.match(emailPtrn)) {
		return false;
	}
	return true;
};
export const emailErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter email";
	} else if (!value.match(emailPtrn)) {
		return "Email must be valid";
	}
	return "";
};

export const isValidName = (value) => {
	if (value == "" || value == undefined) {
		return false;
	} else if (value.trim().length < 2) {
		return false;
	} else if (checkStringsStartWithChar(name)) {
	}
	return true;
};

export const nameErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter name";
	} else if (value.trim().length < 2) {
		return "Name must be valid";
	}
	return "";
};

export const restoNameErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter restaurant name";
	} else if (value.length < 2) {
		return "Restaurant name must be valid";
	}
	return "";
};
export const groceryNameErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter store name";
	} else if (value.length < 2) {
		return "Store name must be valid";
	}
	return "";
};

export const officeNameErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter office name";
	} else if (value.length < 2) {
		return "Office name must be valid";
	}
	return "";
};

export const checkStringsStartWithChar = (inputString) => {
	var isValid = false;

	var inputStringTmp = inputString.split("");
	isValid = String(inputStringTmp[0]).match(/^[a-zA-Z]+$/);
	return isValid;
};

export const showToast = (context, message) => {
	alert(message);
};

export const getPicUpload = (imageSourceObj) => {
	if (imageSourceObj != undefined && imageSourceObj != null) {
		return imageSourceObj;
	} else {
		return undefined;
	}
};

// addProduct grocery validation::::::::::::

export const checkVaidationAddGroceryProduct = (state, state2, context) => {
	let msg = "";
	let isValid = false;

	if (
		!isValidImageName(state2[Constants.KEY_IMG_NAME]) ||
		!isValidName(state.name) ||
		!isValidStockAvailibilty(state.stock_availability) ||
		!isValidPrice(state.price) ||
		!isValidFinalAmount(state.final_price) ||
		!isValidDescription(state.description) ||
		!isValidProductWeight(state.product_weight) ||
		!isValidProductQuantity(state.product_quantity)
		// ||
		// !isValidDiscountInPercent(state.discount_in_percentage)
	) {
		if (!isValidImageName(state2[Constants.KEY_IMG_NAME])) {
			msg = imageNameErrorMsg1(state2[Constants.KEY_IMG_NAME]);
		} else if (!isValidName(state.name)) {
			msg = nameErrorMsg(state.name);
		}
		// else if (!isValidProductType(state[Constants.KEY_PRODUCT_TYPE])) {
		//   msg = productTypeErrorMsg(state[Constants.KEY_PRODUCT_TYPE])
		// }
		else if (!isValidProductWeight(state.product_weight)) {
			msg = validProductWeightErrorMsg(state.product_weight);
		} else if (!isValidProductQuantity(state.product_quantity)) {
			msg = validProductQuantityErrorMsg(state.product_quantity);
		} else if (!isValidStockAvailibilty(state.stock_availability)) {
			msg = validStockAvailibiltyErrorMsg(state.stock_availability);
		} else if (!isValidPrice(state.price)) {
			msg = priceErrorMsg(state.price);
		}
		// else if (!isValidDiscountInPercent(state.discount_in_percentage)) {
		// 	msg = discountInPercentErrorMsg(state.discount_in_percentage);
		// }

		// else if (!isValidFinalAmount(state.final_price)) {
		//   msg = finalAmountErrorMsg(state.final_price);
		// }
		else if (!isValidDescription(state.description)) {
			msg = descriptionErrorMsg(state.description);
		} else if (!isValidType(state[Constants.KEY_PARENT_CATEGORY_ID])) {
			msg = typeMsg(state[Constants.KEY_PARENT_CATEGORY_ID]);
		}

		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};

export const checkVaidationAddProduct = (state, state2, context) => {
	let msg = "";
	let isValid = false;

	if (
		!isValidImageName(state2[Constants.KEY_IMG_NAME]) ||
		!isValidName(state.name) ||
		!isValidStockAvailibilty(state.stock_availability) ||
		!isValidPrice(state.price) ||
		!isValidFinalAmount(state.final_price) ||
		!isValidCookingTime(state[Constants.KEY_COOKING_TIME]) ||
		!isValidProductType(state[Constants.KEY_PRODUCT_TYPE])
	) {
		if (!isValidImageName(state2[Constants.KEY_IMG_NAME])) {
			msg = imageNameErrorMsg1(state2[Constants.KEY_IMG_NAME]);
		} else if (!isValidName(state.name)) {
			msg = nameErrorMsg(state.name);
		} else if (!isValidProductType(state[Constants.KEY_PRODUCT_TYPE])) {
			msg = productTypeErrorMsg(state[Constants.KEY_PRODUCT_TYPE]);
		} else if (!isValidCookingTime(state[Constants.KEY_COOKING_TIME])) {
			msg = finalCookingTimeErrorMsg(state[Constants.KEY_COOKING_TIME]);
		} else if (!isValidStockAvailibilty(state.stock_availability)) {
			msg = validStockAvailibiltyErrorMsg(state.stock_availability);
		} else if (!isValidPrice(state.price)) {
			msg = priceErrorMsg(state.price);
		} else if (!isValidFinalAmount(state.final_price)) {
			msg = finalAmountErrorMsg(state.final_price);
		} else if (!isValidDescription(state[Constants.KEY_DESCRIPTION])) {
			msg = descriptionErrorMsg(state[Constants.KEY_DESCRIPTION]);
		} else if (!isValidType(state[Constants.KEY_PARENT_CATEGORY_ID])) {
			msg = typeMsg(state[Constants.KEY_PARENT_CATEGORY_ID]);
		}

		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};

export const checkEditOfficeVaidation = (state, state2, context) => {
	let msg = "";
	let isValid = false;

	if (
		!isValidName(state.name) ||
		!isValidEmail(state.email) ||
		!isValidMobileNumber(state.phone) ||
		!isValidAddress1(state[Constants.KEY_HOUSE_ADDRESS]) ||
		// !isValidAddress1(state[Constants.KEY_HOUSE_NAME_AND_NO]) ||
		!isValidCity(state.city_id) ||
		!isValidState(state.state_id) ||
		!isValidRegion(state.region_id) ||
		!isValidZip(state.zip) ||
		!isValidCountry(state.country_id) ||
		!isValidaLocalityImage(state2[Constants.KEY_LOCALITY_IMAGE_NAME]) ||
		!isValidaBuildingImage(state2[Constants.KEY_BUILDING_FRONT_IMG_NAME])
	) {
		if (!isValidName(state.name)) {
			msg = officeNameErrorMsg(state.name);
		} else if (!isValidEmail(state.email)) {
			msg = emailErrorMsg(state.email);
		} else if (!isValidMobileNumber(state.phone)) {
			msg = isValidMobileNumberMsg(state.phone);
		} else if (!isValidCountry(state.country_id)) {
			msg = countryErrorMsg(state.country_id);
		} else if (!isValidState(state.state_id)) {
			msg = stateErrorMsg(state.state_id);
		} else if (!isValidCity(state.city_id)) {
			msg = cityErrorMsg(state.city_id);
		} else if (!isValidRegion(state.region_id)) {
			msg = regionErrorMsg(state.region_id);
		} else if (!isValidAddress1(state[Constants.KEY_HOUSE_ADDRESS])) {
			msg = address1ErrorMsg(state[Constants.KEY_HOUSE_ADDRESS]);
		} else if (!isValidZip(state.zip)) {
			msg = zipErrorMsg(state.zip);
		} else if (
			!isValidaLocalityImage(state2[Constants.KEY_LOCALITY_IMAGE_NAME])
		) {
			msg = localityImageErrorMsg(state2[Constants.KEY_LOCALITY_IMAGE_NAME]);
		} else if (
			!isValidaBuildingImage(state2[Constants.KEY_BUILDING_FRONT_IMG_NAME])
		) {
			msg = buildingImageErrorMsg(
				state2[Constants.KEY_BUILDING_FRONT_IMG_NAME],
			);
		}

		//alert(msg)
		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};
//pooja
export const checkAddOfficeVaidation = (state, state2, context) => {
	let msg = "";
	let isValid = false;

	if (
		!isValidName(state.name) ||
		!isValidEmail(state.email) ||
		!isValidMobileNumber(state.phone) ||
		!isValidAddress1(state[Constants.KEY_HOUSE_ADDRESS]) ||
		// !isValidAddress1(state[Constants.KEY_HOUSE_NAME_AND_NO]) ||
		!isValidCity(state.city_id) ||
		!isValidState(state.state_id) ||
		!isValidRegion(state.region_id) ||
		!isValidZip(state.zip) ||
		!isValidCountry(state.country_id) ||
		!isValidPassword(state.password) ||
		!isValidConfirmPassword(state.password, state.confirm_password) ||
		!isValidaLocalityImage(state2[Constants.KEY_LOCALITY_IMAGE_NAME]) ||
		!isValidaBuildingImage(state2[Constants.KEY_BUILDING_FRONT_IMG_NAME])
		// ||
		// !isValidAddress2(state[Constants.KEY_STREET_NAME]) ||
		// !isValidAddress3(state[Constants.KEY_LANDMARK]) ||
		// !isValidAddress4(state[Constants.KEY_AREA_NAME])
	) {
		if (!isValidName(state.name)) {
			msg = officeNameErrorMsg(state.name);
		} else if (!isValidEmail(state.email)) {
			msg = emailErrorMsg(state.email);
		} else if (!isValidMobileNumber(state.phone)) {
			msg = isValidMobileNumberMsg(state.phone);
		} else if (!isValidCountry(state.country_id)) {
			msg = countryErrorMsg(state.country_id);
		} else if (!isValidState(state.state_id)) {
			msg = stateErrorMsg(state.state_id);
		} else if (!isValidCity(state.city_id)) {
			msg = cityErrorMsg(state.city_id);
		} else if (!isValidRegion(state.region_id)) {
			msg = regionErrorMsg(state.region_id);
		} else if (!isValidAddress1(state[Constants.KEY_HOUSE_ADDRESS])) {
			msg = address1ErrorMsg(state[Constants.KEY_HOUSE_ADDRESS]);
		} else if (!isValidZip(state.zip)) {
			msg = zipErrorMsg(state.zip);
		} else if (!isValidPassword(state.password)) {
			msg = passwordErrorMsg(state.password);
		} else if (
			!isValidConfirmPassword(state.password, state.confirm_password)
		) {
			msg = confimPasswordErrorMsg(state.password, state.confirm_password);
		} else if (
			!isValidaLocalityImage(state2[Constants.KEY_LOCALITY_IMAGE_NAME])
		) {
			msg = localityImageErrorMsg(state2[Constants.KEY_LOCALITY_IMAGE_NAME]);
		} else if (
			!isValidaBuildingImage(state2[Constants.KEY_BUILDING_FRONT_IMG_NAME])
		) {
			msg = buildingImageErrorMsg(
				state2[Constants.KEY_BUILDING_FRONT_IMG_NAME],
			);
		}

		// else if (!isValidAddress2(state[Constants.KEY_STREET_NAME])) {
		// 	msg = isStreetErrorMsg(state[Constants.KEY_STREET_NAME]);
		// }else if (!isValidAddress3(state[Constants.KEY_LANDMARK])) {
		// 	msg = "";
		// }else if (!isValidAddress4(state[Constants.KEY_AREA_NAME])) {
		// 	msg = "";
		// }

		//alert(msg)
		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};

export const checkAddRestoVaidation = (state, state2, context) => {
	let msg = "";
	let isValid = false;

	if (
		!isValidImageName(state2[Constants.KEY_IMG_NAME]) ||
		!isValidName(state.name) ||
		!isValidEmail(state.email) ||
		!isValidMobileNumber(state.phone) ||
		!isValidAddress1(state.address) ||
		!isValidCity(state.city_id) ||
		!isValidState(state.state_id) ||
		!isValidRegion(state[Constants.KEY_REGION_ID]) ||
		!isValidHouseName(state[Constants.KEY_HOUSE_NAME_AND_NO]) ||
		!isValidZip(state.zip) ||
		!isValidCountry(state.country_id) ||
		!isValidOpeningTime(state[Constants.KEY_OPENING_TIME]) ||
		!isValidClosingTime(state[Constants.KEY_CLOSING_TIME]) ||
		!isValidCostForTwo(state[Constants.KEY_COST_FOR_TWO]) ||
		// || isValidLandLineNo(state[Constants.KEY_LANDLINE_NUMBER])

		// !isValidPassword(state.password) ||
		// !isValidConfirmPassword(state.password, state.confirm_password) ||
		!isValidRestaurentType(state[Constants.KEY_RESTAURENT_TYPE]) ||
		!isValidKitchenImageName(state2[Constants.KEY_KITCHEN_IMG_NAME]) ||
		!isValidShopLicenseImageName(state2[Constants.KEY_SHOP_LICENCE_IMG_NAME]) ||
		!isValidFssiLicenceImageName(
			state2[Constants.KEY_FSSAI_LICENCE_IMG_NAME],
		) ||
		!isValidGstnOrPanImageName(state2[Constants.KEY_GSTN_OR_PAN_IMG_NAME]) ||
		!isValidaBuildingImage(state2[Constants.KEY_BUILDING_FRONT_IMG_NAME]) ||
		!isValidDiningPackagingImageName(
			state2[Constants.KEY_DINING_PACKAGING_IMG_NAME],
		) ||
		!isValidaLocalityImage(state2[Constants.KEY_LOCALITY_IMAGE_NAME])
	) {
		if (!isValidImageName(state2[Constants.KEY_IMG_NAME])) {
			msg = imageNameErrorMsg(state2[Constants.KEY_IMG_NAME]);
		} else if (!isValidName(state.name)) {
			msg = restoNameErrorMsg(state.name);
		} else if (!isValidEmail(state.email)) {
			msg = emailErrorMsg(state.email);
		} else if (!isValidMobileNumber(state.phone)) {
			msg = isValidMobileNumberMsg(state.phone);
		}

		// else if (!isValidLandLineNo(state[Constants.KEY_LANDLINE_NUMBER])) {
		//   msg = isValidLandLineNoMsg(state[Constants.KEY_LANDLINE_NUMBER]);
		// }
		else if (!isValidCountry(state.country_id)) {
			msg = countryErrorMsg(state.country_id);
		} else if (!isValidState(state.state_id)) {
			msg = stateErrorMsg(state.state_id);
		} else if (!isValidCity(state.city_id)) {
			msg = cityErrorMsg(state.city_id);
		} else if (!isValidRegion(state[Constants.KEY_REGION_ID])) {
			msg = regionErrorMsg(state[Constants.KEY_REGION_ID]);
		} else if (!isValidHouseName(state[Constants.KEY_HOUSE_NAME_AND_NO])) {
			msg = houseNameErrorMsg(state[[Constants.KEY_HOUSE_NAME_AND_NO]]);
		} else if (!isValidAddress1(state.address)) {
			msg = address1ErrorMsg(state.address);
		} else if (!isValidZip(state.zip)) {
			msg = zipErrorMsg(state.zip);
		} else if (!isValidOpeningTime(state[Constants.KEY_OPENING_TIME])) {
			msg = setOpeningTimeErrorMsg(state[Constants.KEY_OPENING_TIME]);
		} else if (!isValidClosingTime(state[Constants.KEY_CLOSING_TIME])) {
			msg = setClosingTimeErrorMsg(state[Constants.KEY_CLOSING_TIME]);
		}
		// else if (!isValidPassword(state.password)) {
		// 	msg = passwordErrorMsg(state.password);
		// } else if (
		// 	!isValidConfirmPassword(state.password, state.confirm_password)
		// ) {
		// 	msg = confimPasswordErrorMsg(state.password, state.confirm_password);
		// }
		else if (!isValidCostForTwo(state[Constants.KEY_COST_FOR_TWO])) {
			msg = costForTwoErrorMsg(state[Constants.KEY_COST_FOR_TWO]);
		} else if (!isValidRestaurentType(state[Constants.KEY_RESTAURENT_TYPE])) {
			msg = restaurentTypeErrorMsg(state[Constants.KEY_RESTAURENT_TYPE]);
		} else if (
			!isValidKitchenImageName(state2[Constants.KEY_KITCHEN_IMG_NAME])
		) {
			msg = kitchenImageErrorMsg(state2[Constants.KEY_KITCHEN_IMG_NAME]);
		} else if (
			!isValidShopLicenseImageName(state2[Constants.KEY_SHOP_LICENCE_IMG_NAME])
		) {
			msg = shopLicenceImageErrorMsg(
				state2[Constants.KEY_SHOP_LICENCE_IMG_NAME],
			);
		} else if (
			!isValidFssiLicenceImageName(state2[Constants.KEY_FSSAI_LICENCE_IMG_NAME])
		) {
			msg = fssiLicenseImageErrorMsg(
				state2[Constants.KEY_FSSAI_LICENCE_IMG_NAME],
			);
		} else if (
			!isValidGstnOrPanImageName(state2[Constants.KEY_GSTN_OR_PAN_IMG_NAME])
		) {
			msg = gstnOrPanImageErrorMsg(state2[Constants.KEY_GSTN_OR_PAN_IMG_NAME]);
		} else if (
			!isValidaBuildingImage(state2[Constants.KEY_BUILDING_FRONT_IMG_NAME])
		) {
			msg = buildingImageErrorMsg(
				state2[[Constants.KEY_BUILDING_FRONT_IMG_NAME]],
			);
		} else if (
			!isValidDiningPackagingImageName(
				state2[Constants.KEY_DINING_PACKAGING_IMG_NAME],
			)
		) {
			msg = diningPackagingErrorMsg(
				state2[Constants.KEY_DINING_PACKAGING_IMG_NAME],
			);
		} else if (
			!isValidaLocalityImage(state2[Constants.KEY_LOCALITY_IMAGE_NAME])
		) {
			msg = localityImageErrorMsg(state2[Constants.KEY_LOCALITY_IMAGE_NAME]);
		}

		//alert(msg)
		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};
export const checkGroceryDetails = (state, context) => {
	let msg = "";
	let isValid = false;

	if (
		!isValidHouseName(state[Constants.KEY_HOUSE_NAME_AND_NO]) ||
		!isValidName(state.store_name) ||
		!isValidEmail(state.email) ||
		!isValidMobileNumber(state.phone) ||
		!isValidAddress1(state.address) ||
		!isValidCity(state.city_id) ||
		!isValidState(state.state_id) ||
		!isValidRegion(state[Constants.KEY_REGION_ID]) ||
		!isValidHouseName(state[Constants.KEY_HOUSE_NAME_AND_NO]) ||
		!isValidZip(state.zip) ||
		!isValidCountry(state.country_id) ||
		!isValidOpeningTime(state[Constants.KEY_OPENING_TIME]) ||
		!isValidClosingTime(state[Constants.KEY_CLOSING_TIME]) ||
		// !isValidPassword(state.password) ||
		// !isValidConfirmPassword(state.password, state.confirm_password) ||
		!isValidStoreType(state[Constants.KEY_STORE_TYPE_ID])
	) {
		if (!isValidName(state.store_name)) {
			msg = groceryNameErrorMsg(state.store_name);
		} else if (!isValidEmail(state.email)) {
			msg = emailErrorMsg(state.email);
		} else if (!isValidMobileNumber(state.phone)) {
			msg = isValidMobileNumberMsg(state.phone);
		} else if (!isValidCountry(state.country_id)) {
			msg = countryErrorMsg(state.country_id);
		} else if (!isValidState(state.state_id)) {
			msg = stateErrorMsg(state.state_id);
		} else if (!isValidCity(state.city_id)) {
			msg = cityErrorMsg(state.city_id);
		} else if (!isValidRegion(state[Constants.KEY_REGION_ID])) {
			msg = regionErrorMsg(state[Constants.KEY_REGION_ID]);
		} else if (!isValidHouseName(state[Constants.KEY_HOUSE_NAME_AND_NO])) {
			msg = houseNameErrorMsg(state[Constants.KEY_HOUSE_NAME_AND_NO]);
		} else if (!isValidAddress1(state.address)) {
			msg = address1ErrorMsg(state.address);
		} else if (!isValidZip(state.zip)) {
			msg = zipErrorMsg(state.zip);
		} else if (!isValidOpeningTime(state[Constants.KEY_OPENING_TIME])) {
			msg = setOpeningTimeErrorMsg(state[Constants.KEY_OPENING_TIME]);
		} else if (!isValidClosingTime(state[Constants.KEY_CLOSING_TIME])) {
			msg = setClosingTimeErrorMsg(state[Constants.KEY_CLOSING_TIME]);
		}
		// else if (!isValidPassword(state.password)) {
		// 	msg = passwordErrorMsg(state.password);
		// } else if (
		// 	!isValidConfirmPassword(state.password, state.confirm_password)
		// ) {
		// 	msg = confimPasswordErrorMsg(state.password, state.confirm_password);
		// }
		else if (!isValidStoreType(state[Constants.KEY_STORE_TYPE_ID])) {
			msg = groceryTypeErrorMsg(state[Constants.KEY_STORE_TYPE_ID]);
		}
		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};
export const checkRestaurantDetails = (state, context) => {
	let msg = "";
	let isValid = false;

	// if (!isValidHouseName(state[Constants.KEY_HOUSE_NAME_AND_NO])) {
	// 	msg = houseNameErrorMsg(state[Constants.KEY_HOUSE_NAME_AND_NO]);
	// 	context.handleClick("" + msg);
	// 	return isValid;
	// } else {
	// 	isValid = true;
	// }
	// return isValid;
	if (
		!isValidHouseName(state[Constants.KEY_HOUSE_NAME_AND_NO]) ||
		!isValidName(state.name) ||
		!isValidEmail(state.email) ||
		!isValidMobileNumber(state.phone) ||
		!isValidAddress1(state.address) ||
		!isValidCity(state.city_id) ||
		!isValidState(state.state_id) ||
		!isValidRegion(state[Constants.KEY_REGION_ID]) ||
		!isValidHouseName(state[Constants.KEY_HOUSE_NAME_AND_NO]) ||
		!isValidZip(state.zip) ||
		!isValidCountry(state.country_id) ||
		!isValidOpeningTime(state[Constants.KEY_OPENING_TIME]) ||
		!isValidClosingTime(state[Constants.KEY_CLOSING_TIME]) ||
		// !isValidPassword(state.password) ||
		// !isValidConfirmPassword(state.password, state.confirm_password) ||
		!isValidRestaurentType(state[Constants.KEY_RESTAURENT_TYPE])
	) {
		if (!isValidName(state.name)) {
			msg = groceryNameErrorMsg(state.name);
		} else if (!isValidEmail(state.email)) {
			msg = emailErrorMsg(state.email);
		} else if (!isValidMobileNumber(state.phone)) {
			msg = isValidMobileNumberMsg(state.phone);
		} else if (!isValidCountry(state.country_id)) {
			msg = countryErrorMsg(state.country_id);
		} else if (!isValidState(state.state_id)) {
			msg = stateErrorMsg(state.state_id);
		} else if (!isValidCity(state.city_id)) {
			msg = cityErrorMsg(state.city_id);
		} else if (!isValidRegion(state[Constants.KEY_REGION_ID])) {
			msg = regionErrorMsg(state[Constants.KEY_REGION_ID]);
		} else if (!isValidHouseName(state[Constants.KEY_HOUSE_NAME_AND_NO])) {
			msg = houseNameErrorMsg(state[Constants.KEY_HOUSE_NAME_AND_NO]);
		} else if (!isValidAddress1(state.address)) {
			msg = address1ErrorMsg(state.address);
		} else if (!isValidZip(state.zip)) {
			msg = zipErrorMsg(state.zip);
		} else if (!isValidOpeningTime(state[Constants.KEY_OPENING_TIME])) {
			msg = setOpeningTimeErrorMsg(state[Constants.KEY_OPENING_TIME]);
		} else if (!isValidClosingTime(state[Constants.KEY_CLOSING_TIME])) {
			msg = setClosingTimeErrorMsg(state[Constants.KEY_CLOSING_TIME]);
		}
		// else if (!isValidPassword(state.password)) {
		// 	msg = passwordErrorMsg(state.password);
		// } else if (
		// 	!isValidConfirmPassword(state.password, state.confirm_password)
		// ) {
		// 	msg = confimPasswordErrorMsg(state.password, state.confirm_password);
		// }
		else if (!isValidRestaurentType(state[Constants.KEY_RESTAURENT_TYPE])) {
			msg = restaurentTypeErrorMsg(state[Constants.KEY_RESTAURENT_TYPE]);
		}
		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};
export const checkAddGroceryVaidation = (state, state2, context) => {
	let msg = "";
	let isValid = false;

	if (
		!isValidImageName(state2[Constants.KEY_IMG_NAME]) ||
		!isValidName(state.store_name) ||
		!isValidEmail(state.email) ||
		!isValidMobileNumber(state.phone) ||
		!isValidAddress1(state.address) ||
		!isValidCity(state.city_id) ||
		!isValidState(state.state_id) ||
		!isValidRegion(state[Constants.KEY_REGION_ID]) ||
		!isValidHouseName(state[Constants.KEY_HOUSE_NAME_AND_NO]) ||
		!isValidZip(state.zip) ||
		!isValidCountry(state.country_id) ||
		!isValidOpeningTime(state[Constants.KEY_OPENING_TIME]) ||
		!isValidClosingTime(state[Constants.KEY_CLOSING_TIME]) ||
		// || isValidLandLineNo(state[Constants.KEY_LANDLINE_NUMBER])
		// !isValidPassword(state.password) ||
		// !isValidConfirmPassword(state.password, state.confirm_password) ||
		!isValidStoreType(state[Constants.KEY_STORE_TYPE_ID]) ||
		!isValidShopLicenseImageName(state2[Constants.KEY_SHOP_LICENCE_IMG_NAME]) ||
		!isValidGstnOrPanImageName(state2[Constants.KEY_GSTN_OR_PAN_IMG_NAME]) ||
		!isValidaBuildingImage(state2[Constants.KEY_BUILDING_FRONT_IMG_NAME]) ||
		!isValidaLocalityImage(state2[Constants.KEY_LOCALITY_IMAGE_NAME])
	) {
		if (!isValidImageName(state2[Constants.KEY_IMG_NAME])) {
			msg = imageNameErrorMsgs(state2[Constants.KEY_IMG_NAME]);
		} else if (!isValidName(state.store_name)) {
			msg = groceryNameErrorMsg(state.store_name);
		} else if (!isValidEmail(state.email)) {
			msg = emailErrorMsg(state.email);
		} else if (!isValidMobileNumber(state.phone)) {
			msg = isValidMobileNumberMsg(state.phone);
		} else if (!isValidCountry(state.country_id)) {
			msg = countryErrorMsg(state.country_id);
		} else if (!isValidState(state.state_id)) {
			msg = stateErrorMsg(state.state_id);
		} else if (!isValidCity(state.city_id)) {
			msg = cityErrorMsg(state.city_id);
		} else if (!isValidRegion(state[Constants.KEY_REGION_ID])) {
			msg = regionErrorMsg(state[Constants.KEY_REGION_ID]);
		} else if (!isValidHouseName(state[Constants.KEY_HOUSE_NAME_AND_NO])) {
			msg = houseNameErrorMsg(state[Constants.KEY_HOUSE_NAME_AND_NO]);
		} else if (!isValidAddress1(state.address)) {
			msg = address1ErrorMsg(state.address);
		} else if (!isValidZip(state.zip)) {
			msg = zipErrorMsg(state.zip);
		} else if (!isValidOpeningTime(state[Constants.KEY_OPENING_TIME])) {
			msg = setOpeningTimeErrorMsg(state[Constants.KEY_OPENING_TIME]);
		} else if (!isValidClosingTime(state[Constants.KEY_CLOSING_TIME])) {
			msg = setClosingTimeErrorMsg(state[Constants.KEY_CLOSING_TIME]);
		} else if (!isValidPassword(state.password)) {
			msg = passwordErrorMsg(state.password);
		} else if (
			!isValidConfirmPassword(state.password, state.confirm_password)
		) {
			msg = confimPasswordErrorMsg(state.password, state.confirm_password);
		} else if (!isValidStoreType(state[Constants.KEY_STORE_TYPE_ID])) {
			msg = groceryTypeErrorMsg(state[Constants.KEY_STORE_TYPE_ID]);
		} else if (
			!isValidShopLicenseImageName(state2[Constants.KEY_SHOP_LICENCE_IMG_NAME])
		) {
			msg = shopLicenceImageErrorMsg(
				state2[Constants.KEY_SHOP_LICENCE_IMG_NAME],
			);
		} else if (
			!isValidGstnOrPanImageName(state2[Constants.KEY_GSTN_OR_PAN_IMG_NAME])
		) {
			msg = gstnOrPanImageErrorMsg(state2[Constants.KEY_GSTN_OR_PAN_IMG_NAME]);
		} else if (
			!isValidaBuildingImage(state2[Constants.KEY_BUILDING_FRONT_IMG_NAME])
		) {
			msg = buildingImageErrorMsg(
				state2[[Constants.KEY_BUILDING_FRONT_IMG_NAME]],
			);
		} else if (
			!isValidaLocalityImage(state2[Constants.KEY_LOCALITY_IMAGE_NAME])
		) {
			msg = localityImageErrorMsg(state2[Constants.KEY_LOCALITY_IMAGE_NAME]);
		}

		//alert(msg)
		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};

export const diningPackagingErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please choose Dining Packaging Image";
	}
	return "";
};

export const isValidDiningPackagingImageName = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const gstnOrPanImageErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please choose GStn Or Pan Image";
	}
	return "";
};

export const isValidGstnOrPanImageName = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const fssiLicenseImageErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please choose Fssi License Image";
	}
	return "";
};

export const isValidFssiLicenceImageName = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const shopLicenceImageErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please choose Shop License Image";
	}
	return "";
};

export const isValidShopLicenseImageName = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const restaurentTypeErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please choose Restaurant Type";
	} else if (value.trim().length <= 0) {
		return "Please choose Restaurant Type";
	}
	return "";
};

export const groceryTypeErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please choose Grocery Type";
	} else if (value.trim().length <= 0) {
		return "Please choose Grocery Type";
	}
	return "";
};

export const isValidRestaurentType = (value) => {
	if (value == "" || value == undefined) {
		return false;
	} else if (value.trim().length <= 0) {
		return false;
	}
	return true;
};

export const isValidStoreType = (value) => {
	if (value == "" || value == undefined) {
		return false;
	} else if (value.trim().length <= 0) {
		return false;
	}
	return true;
};

export const imageNameErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please choose Restaurant image";
	}
	return "";
};

export const imageNameErrorMsgs = (value) => {
	if (value == "" || value == undefined) {
		return "Please choose Grocery image";
	}
	return "";
};

export const imageNameErrorMsg1 = (value) => {
	if (value == "" || value == undefined) {
		return "Please choose Product image";
	}
	return "";
};

export const imageNameErrorMsg2 = (value) => {
	if (value == "" || value == undefined) {
		return "Please choose Product Category image";
	}
	return "";
};

export const isValidImageName = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const kitchenImageErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please choose Kitchen image";
	}
	return "";
};

export const isValidKitchenImageName = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const checkVaidation = (state, context) => {
	let msg = "";
	let isValid = false;

	if (
		!isValidName(state.name) ||
		!isValidEmail(state.email) ||
		!isValidMobileNumber(state.phone) ||
		!isValidAddress1(state.address) ||
		!isValidCity(state.city_id) ||
		!isValidState(state.state_id) ||
		!isValidRegion(state.region_id) ||
		!isValidHouseName(state[Constants.KEY_HOUSE_NAME_AND_NO]) ||
		!isValidZip(state.zip) ||
		!isValidCountry(state.country_id) ||
		!isValidOpeningTime(state[Constants.KEY_OPENING_TIME]) ||
		!isValidClosingTime(state[Constants.KEY_CLOSING_TIME]) ||
		!isValidCostForTwo(state[Constants.KEY_COST_FOR_TWO]) ||
		!isValidRestaurentType(state[Constants.KEY_RESTAURENT_TYPE])
	) {
		if (!isValidName(state.name)) {
			msg = restoNameErrorMsg(state.name);
		} else if (!isValidEmail(state.email)) {
			msg = emailErrorMsg(state.email);
		} else if (!isValidMobileNumber(state.phone)) {
			msg = isValidMobileNumberMsg(state.phone);
		} else if (!isValidCountry(state.country_id)) {
			msg = countryErrorMsg(state.country_id);
		} else if (!isValidState(state.state_id)) {
			msg = stateErrorMsg(state.state_id);
		} else if (!isValidCity(state.city_id)) {
			msg = cityErrorMsg(state.city_id);
		} else if (!isValidRegion(state.region_id)) {
			msg = regionErrorMsg(state.region_id);
		} else if (!isValidHouseName(state[Constants.KEY_HOUSE_NAME_AND_NO])) {
			msg = houseNameErrorMsg(state[Constants.KEY_HOUSE_NAME_AND_NO]);
		}
		// else if (!isValidAddress1(state.address)) {
		//   msg = address1ErrorMsg(state.address);
		// }
		else if (!isValidZip(state.zip)) {
			msg = zipErrorMsg(state.zip);
		} else if (!isValidOpeningTime(state[Constants.KEY_OPENING_TIME])) {
			msg = setOpeningTimeErrorMsg(state[Constants.KEY_OPENING_TIME]);
		} else if (!isValidClosingTime(state[Constants.KEY_CLOSING_TIME])) {
			msg = setClosingTimeErrorMsg(state[Constants.KEY_CLOSING_TIME]);
		} else if (!isValidCostForTwo(state[Constants.KEY_COST_FOR_TWO])) {
			msg = costForTwoErrorMsg(state[Constants.KEY_COST_FOR_TWO]);
		} else if (!isValidRestaurentType(state[Constants.KEY_RESTAURENT_TYPE])) {
			msg = restaurentTypeErrorMsg(state[Constants.KEY_RESTAURENT_TYPE]);
		}

		//alert(msg)
		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};

export const checkGroeceryVaidation = (state, context) => {
	let msg = "";
	let isValid = false;
	if (
		!isValidImageName(state[Constants.KEY_IMG_NAME]) ||
		!isValidName(state.store_name) ||
		!isValidEmail(state.email) ||
		!isValidMobileNumber(state.phone) ||
		!isValidAddress1(state.address) ||
		!isValidCity(state.city_id) ||
		!isValidState(state.state_id) ||
		!isValidRegion(state[Constants.KEY_REGION_ID]) ||
		!isValidHouseName(state[Constants.KEY_HOUSE_NAME_AND_NO]) ||
		!isValidZip(state.zip) ||
		!isValidCountry(state.country_id) ||
		!isValidOpeningTime(state[Constants.KEY_OPENING_TIME]) ||
		!isValidClosingTime(state[Constants.KEY_CLOSING_TIME]) ||
		// || isValidLandLineNo(state[Constants.KEY_LANDLINE_NUMBER])
		!isValidPassword(state.password) ||
		!isValidConfirmPassword(state.password, state.confirm_password) ||
		!isValidStoreType(state[Constants.KEY_STORE_TYPE_ID]) ||
		!isValidShopLicenseImageName(state[Constants.KEY_SHOP_LICENCE_IMG_NAME]) ||
		!isValidGstnOrPanImageName(state[Constants.KEY_GSTN_OR_PAN_IMG_NAME]) ||
		!isValidaBuildingImage(state[Constants.KEY_BUILDING_FRONT_IMG_NAME]) ||
		!isValidaLocalityImage(state[Constants.KEY_LOCALITY_IMAGE_NAME])
	) {
		if (!isValidName(state.store_name)) {
			msg = groceryNameErrorMsg(state.store_name);
		} else if (!isValidEmail(state.email)) {
			msg = emailErrorMsg(state.email);
		} else if (!isValidMobileNumber(state.phone)) {
			msg = isValidMobileNumberMsg(state.phone);
		} else if (!isValidCountry(state.country_id)) {
			msg = countryErrorMsg(state.country_id);
		} else if (!isValidState(state.state_id)) {
			msg = stateErrorMsg(state.state_id);
		} else if (!isValidCity(state.city_id)) {
			msg = cityErrorMsg(state.city_id);
		} else if (!isValidRegion(state.region_id)) {
			msg = regionErrorMsg(state.region_id);
		} else if (!isValidHouseName(state[Constants.KEY_HOUSE_NAME_AND_NO])) {
			msg = houseNameErrorMsg(state[Constants.KEY_HOUSE_NAME_AND_NO]);
		}
		// else if (!isValidAddress1(state.address)) {
		//   msg = address1ErrorMsg(state.address);
		// }
		else if (!isValidZip(state.zip)) {
			msg = zipErrorMsg(state.zip);
		} else if (!isValidOpeningTime(state[Constants.KEY_OPENING_TIME])) {
			msg = setOpeningTimeErrorMsg(state[Constants.KEY_OPENING_TIME]);
		} else if (!isValidClosingTime(state[Constants.KEY_CLOSING_TIME])) {
			msg = setClosingTimeErrorMsg(state[Constants.KEY_CLOSING_TIME]);
		} else if (!isValidStoreType(state[Constants.KEY_STORE_TYPE_ID])) {
			msg = groceryTypeErrorMsg(state[Constants.KEY_STORE_TYPE_ID]);
		}

		//alert(msg)
		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};

export const houseNameErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter House number";
	} else if (value.trim().length <= 0) {
		return "Please enter House number";
	}
	return "";
};

export const isValidHouseName = (value) => {
	if (value == "" || value == undefined) {
		return false;
	} else if (value.trim().length <= 0) {
		return false;
	}
	return true;
};

export const licenseNoErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter licence number";
	} else if (value.trim().length <= 0) {
		return "Please enter licence number";
	} else if (value.length != Constants.LENGTH_OF_LICENSE_NUMBER) {
		return "Enter 16 Digit Licence Number";
	}
	return "";
};

export const isValidlicenseNo = (value) => {
	if (value == "" || value == undefined) {
		return false;
	} else if (value.trim().length <= 0) {
		return false;
	} else if (value.length != Constants.LENGTH_OF_LICENSE_NUMBER) {
		return false;
	}
	return true;
};
export const licenseImageErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please choose licence image";
	} else if (value.length <= 0) {
		return "Please choose licence image";
	}
	return "";
};

export const isValidlicenseImage = (value) => {
	if (value == "" || value == undefined) {
		return false;
	} else if (value.length <= 0) {
		return false;
	}
	return true;
};

export const licenseExpiryDateErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please select expiry date";
	} else if (value.trim().length <= 0) {
		return "Please select expiry date";
	}
	return "";
};

export const isValidlicenseExpiryDate = (value) => {
	if (value == "" || value == undefined) {
		return false;
	} else if (value.trim().length <= 0) {
		return false;
	}
	return true;
};

export const aadharNuErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter aadhar number";
	} else if (value.trim().length <= 0) {
		return "Please enter aadhar number";
	} else if (value.length != Constants.LENGTH_OF_AADHAR_NUMBER) {
		return "Please Enter 12 Digit Aadhar Number";
	}
	return "";
};

export const isValidAadharNu = (value) => {
	if (value == "" || value == undefined) {
		return false;
	} else if (value.trim().length <= 0) {
		return false;
	} else if (value.length != Constants.LENGTH_OF_AADHAR_NUMBER) {
		return false;
	}
	return true;
};

export const aadharImageErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please choose aadhar image";
	}
	return "";
};

export const isValidaadharImage = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const localityImageErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please choose locality image";
	}
	return "";
};

export const isValidaLocalityImage = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const buildingImageErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please choose building image";
	}
	return "";
};

export const isValidaBuildingImage = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const PANNuErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please enter PAN number";
	} else if (value.trim().length <= 0) {
		return "Please enter PAN number";
	} else if (value.length != Constants.LENGTH_OF_PAN_NUMBER) {
		return "Please Enter 10 Digit Pan Number";
	}
	return "";
};

export const isValidPANNu = (value) => {
	if (value == "" || value == undefined) {
		return false;
	} else if (value.trim().length <= 0) {
		return false;
	} else if (value.length != Constants.LENGTH_OF_PAN_NUMBER) {
		return false;
	}
	return true;
};

export const BloodGroupErrorMsg = (value) => {
	var isValid = true;
	var msg = "";
	var regex = /^(A|B|AB|H|O)(\+|\-)*$/i;
	if (value == "" || value == undefined) {
		return "Please enter Blood Group";
	} else if (value.trim().length <= 0) {
		return "Please enter Blood Group";
	} else if (!regex.test(value)) {
		return "Please enter Valid Blood Group";
	}
	return isValid;
};

export const isValidBloodGroup = (value) => {
	var isValid = true;
	var msg = "";
	var regex = /^(A|B|AB|H|O)(\+|\-)*$/i;

	if (value == "" || value == undefined) {
		return false;
	} else if (value.trim().length <= 0) {
		return false;
	} else if (!regex.test(value)) {
		return false;
	}
	return isValid;
};

export const vpcImageErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please choose ehicle pollution certificate image";
	}
	return "";
};

export const isValidVPCImage = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const rcImageErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please choose RC image";
	}
	return "";
};

export const isValidRCImage = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const PANImageErrorMsg = (value) => {
	if (value == "" || value == undefined) {
		return "Please choose PAN image";
	}
	return "";
};

export const isValidPANImage = (value) => {
	if (value == "" || value == undefined) {
		return false;
	}
	return true;
};

export const checkVaidationDoc = (state, context) => {
	let msg = "";
	let isValid = false;
	if (
		!isValidRCImage(state[Constants.RC_IMAGE_NAME]) ||
		!isValidVPCImage(state[Constants.VPC_IMAGE_NAME]) ||
		!isValidlicenseImage(state[Constants.KEY_LICENSE_IMAGE_NAME]) ||
		!isValidaadharImage(state[Constants.KEY_AADHAR_IMAGE_NAME]) ||
		!isValidPANImage(state[Constants.KEY_PAN_IMAGE_NAME])
	) {
		if (!isValidRCImage(state[Constants.RC_IMAGE_NAME])) {
			msg = rcImageErrorMsg(state[Constants.RC_IMAGE_NAME]);
		} else if (!isValidVPCImage(state[Constants.VPC_IMAGE_NAME])) {
			msg = vpcImageErrorMsg(state[Constants.VPC_IMAGE_NAME]);
		} else if (!isValidlicenseImage(state[Constants.KEY_LICENSE_IMAGE_NAME])) {
			msg = licenseImageErrorMsg(state[Constants.KEY_LICENSE_IMAGE_NAME]);
		} else if (!isValidaadharImage(state[Constants.KEY_AADHAR_IMAGE_NAME])) {
			msg = aadharImageErrorMsg(state[Constants.KEY_AADHAR_IMAGE_NAME]);
		} else if (!isValidPANImage(state[Constants.KEY_PAN_IMAGE_NAME])) {
			msg = PANImageErrorMsg(state[Constants.KEY_PAN_IMAGE_NAME]);
		}
		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};

export const checkVaidationLogin = (state, context) => {
	let msg = "";
	let isValid = false;

	if (!isValidEmail(state.email) || !isValidPassword(state.password)) {
		if (!isValidEmail(state.email)) {
			msg = emailErrorMsg(state.email);
		} else if (!isValidPassword(state.password)) {
			msg = passwordErrorMsg(state.password);
		}

		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};

export const checkVaidationEditUser = (state, context) => {
	let msg = "";
	let isValid = false;

	if (
		!isValidName(state.name) ||
		!isValidEmail(state.email) ||
		!isValidMobileNumber(state.phone) ||
		!isValidPassword(state.password) ||
		!isValidImage(state.image)
	) {
		if (!isValidName(state.name)) {
			msg = nameErrorMsg(state.name);
		} else if (!isValidEmail(state.email)) {
			msg = emailErrorMsg(state.email);
		} else if (!isValidMobileNumber(state.phone)) {
			msg = isValidMobileNumberMsg(state.phone);
		} else if (!isValidPassword(state.password)) {
			msg = passwordErrorMsg(state.password);
		} else if (!isValidImage(state.image)) {
			msg = imageErrorMsg(state.image);
		}

		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};

export const checkVaidationAddDriver = (state, state2, context) => {
	let msg = "";
	let isValid = false;

	if (
		!isValidName(state.name) ||
		!isValidEmail(state.email) ||
		!isValidMobileNumber(state.phone) ||
		!isValidEmergencyNumber(state.phone, state[Constants.KEY_EMERGENCY_NO]) ||
		!isValidBloodGroup(state[Constants.KEY_BLOOD_GROUP]) ||
		!isValidAddress1(state.address) ||
		!isValidCity(state.city_id) ||
		!isValidState(state.state_id) ||
		!isValidZip(state.zip) ||
		// || !isValidOffice(state.office_id)

		!isValidCountry(state.country_id) ||
		!isValidRegion(state.region_id) ||
		!isValidlicenseNo(state[Constants.KEY_LICENSE_NUMBER]) ||
		!isValidlicenseExpiryDate(state[Constants.KEY_LICENSE_EXPIRY_DATE]) ||
		!isValidAadharNu(state[Constants.KEY_AADHAR_NUMBER]) ||
		!isValidPANNu(state[Constants.KEY_PAN_NUMBER]) ||
		!isValidRCImage(state2[Constants.RC_IMAGE_NAME]) ||
		!isValidVPCImage(state2[Constants.VPC_IMAGE_NAME]) ||
		!isValidlicenseImage(state2[Constants.KEY_LICENSE_IMAGE_NAME]) ||
		!isValidaadharImage(state2[Constants.KEY_AADHAR_IMAGE_NAME]) ||
		!isValidPANImage(state2[Constants.KEY_PAN_IMAGE_NAME]) ||
		!isValidAccountHolderName(state[Constants.ACCOUNT_HOLDER_NAME]) ||
		!isValidBankName(state[Constants.BANK_NAME]) ||
		!isValidAccountNo(state[Constants.ACCOUNT_NUMBER]) ||
		!isValidIFSC(state[Constants.IFSC_CODE]) ||
		!isValidVehicleNo(state[Constants.VEHICLE_NUMBER])
	) {
		if (!isValidName(state.name)) {
			msg = nameErrorMsg(state.name);
		} else if (!isValidEmail(state.email)) {
			msg = emailErrorMsg(state.email);
		} else if (!isValidMobileNumber(state.phone)) {
			msg = isValidMobileNumberMsg(state.phone);
		} else if (
			!isValidEmergencyNumber(state.phone, state[Constants.KEY_EMERGENCY_NO])
		) {
			msg = isValidEmergancyNumberErrorMsg(
				state.phone,
				state[Constants.KEY_EMERGENCY_NO],
			);
		} else if (!isValidBloodGroup(state[Constants.KEY_BLOOD_GROUP])) {
			msg = BloodGroupErrorMsg(state[Constants.KEY_BLOOD_GROUP]);
		} else if (!isValidCountry(state.country_id)) {
			msg = countryErrorMsg(state.country_id);
		} else if (!isValidState(state.state_id)) {
			msg = stateErrorMsg(state.state_id);
		} else if (!isValidCity(state.city_id)) {
			msg = cityErrorMsg(state.city_id);
		} else if (!isValidRegion(state.region_id)) {
			msg = regionErrorMsg(state.region_id);
		} else if (!isValidAddress1(state.address)) {
			msg = address1ErrorMsg(state.address);
		} else if (!isValidZip(state.zip)) {
			msg = zipErrorMsg(state.zip);
		} else if (
			!isValidAccountHolderName(state[Constants.ACCOUNT_HOLDER_NAME])
		) {
			msg = accountHolderNameErrorMsg(state[Constants.ACCOUNT_HOLDER_NAME]);
		} else if (!isValidBankName(state[Constants.BANK_NAME])) {
			msg = bankNameErrorMsg(state[Constants.BANK_NAME]);
		} else if (!isValidAccountNo(state[Constants.ACCOUNT_NUMBER])) {
			msg = accountNoErrorMsg(state[Constants.ACCOUNT_NUMBER]);
		} else if (!isValidIFSC(state[Constants.IFSC_CODE])) {
			msg = IFSCErrorMsg(state[Constants.IFSC_CODE]);
		} else if (!isValidVehicleNo(state[Constants.VEHICLE_NUMBER])) {
			msg = vehicleNoErrorMsg(state[Constants.VEHICLE_NUMBER]);
		} else if (!isValidRCImage(state2[Constants.RC_IMAGE_NAME])) {
			msg = rcImageErrorMsg(state2[Constants.RC_IMAGE_NAME]);
		} else if (!isValidVPCImage(state2[Constants.VPC_IMAGE_NAME])) {
			msg = vpcImageErrorMsg(state2[Constants.VPC_IMAGE_NAME]);
		} else if (!isValidlicenseNo(state[Constants.KEY_LICENSE_NUMBER])) {
			msg = licenseNoErrorMsg(state[Constants.KEY_LICENSE_NUMBER]);
		} else if (
			!isValidlicenseExpiryDate(state[Constants.KEY_LICENSE_EXPIRY_DATE])
		) {
			msg = licenseExpiryDateErrorMsg(state[Constants.KEY_LICENSE_EXPIRY_DATE]);
		} else if (!isValidlicenseImage(state2[Constants.KEY_LICENSE_IMAGE_NAME])) {
			msg = licenseImageErrorMsg(state2[Constants.KEY_LICENSE_IMAGE_NAME]);
		} else if (!isValidAadharNu(state[Constants.KEY_AADHAR_NUMBER])) {
			msg = aadharNuErrorMsg(state[Constants.KEY_AADHAR_NUMBER]);
		} else if (!isValidaadharImage(state2[Constants.KEY_AADHAR_IMAGE_NAME])) {
			msg = aadharImageErrorMsg(state2[Constants.KEY_AADHAR_IMAGE_NAME]);
		} else if (!isValidPANNu(state[Constants.KEY_PAN_NUMBER])) {
			msg = PANNuErrorMsg(state[Constants.KEY_PAN_NUMBER]);
		} else if (!isValidPANImage(state2[Constants.KEY_PAN_IMAGE_NAME])) {
			msg = PANImageErrorMsg(state2[Constants.KEY_PAN_IMAGE_NAME]);
		}

		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};

export const checkVaidationEditDriver = (state, context) => {
	let msg = "";
	let isValid = false;

	if (
		!isValidName(state.name) ||
		!isValidEmail(state.email) ||
		!isValidMobileNumber(state.phone) ||
		!isValidAddress1(state.address) ||
		!isValidCity(state.city_id) ||
		!isValidState(state.state_id) ||
		!isValidZip(state.zip) ||
		!isValidCountry(state.country_id) ||
		!isValidRegion(state.region_id) ||
		!isValidlicenseNo(state[Constants.KEY_LICENSE_NUMBER]) ||
		!isValidlicenseExpiryDate(state[Constants.KEY_LICENSE_EXPIRY_DATE]) ||
		!isValidAadharNu(state[Constants.KEY_AADHAR_NUMBER]) ||
		!isValidPANNu(state[Constants.KEY_PAN_NUMBER])
	) {
		if (!isValidName(state.name)) {
			msg = nameErrorMsg(state.name);
		} else if (!isValidEmail(state.email)) {
			msg = emailErrorMsg(state.email);
		} else if (!isValidMobileNumber(state.phone)) {
			msg = isValidMobileNumberMsg(state.phone);
		} else if (!isValidCountry(state.country_id)) {
			msg = countryErrorMsg(state.country_id);
		} else if (!isValidState(state.state_id)) {
			msg = stateErrorMsg(state.state_id);
		} else if (!isValidCity(state.city_id)) {
			msg = cityErrorMsg(state.city_id);
		} else if (!isValidRegion(state.region_id)) {
			msg = regionErrorMsg(state.region_id);
		} else if (!isValidAddress1(state.address)) {
			msg = address1ErrorMsg(state.address);
		} else if (!isValidZip(state.zip)) {
			msg = zipErrorMsg(state.zip);
		} else if (!isValidlicenseNo(state[Constants.KEY_LICENSE_NUMBER])) {
			msg = licenseNoErrorMsg(state[Constants.KEY_LICENSE_NUMBER]);
		} else if (
			!isValidlicenseExpiryDate(state[Constants.KEY_LICENSE_EXPIRY_DATE])
		) {
			msg = licenseExpiryDateErrorMsg(state[Constants.KEY_LICENSE_EXPIRY_DATE]);
		} else if (!isValidAadharNu(state[Constants.KEY_AADHAR_NUMBER])) {
			msg = aadharNuErrorMsg(state[Constants.KEY_AADHAR_NUMBER]);
		} else if (!isValidPANNu(state[Constants.KEY_PAN_NUMBER])) {
			msg = PANNuErrorMsg(state[Constants.KEY_PAN_NUMBER]);
		}

		context.handleClick("" + msg);
		return isValid;
	} else {
		isValid = true;
	}
	return isValid;
};
export const jsUcfirst = (value) => {
	return value.charAt(0).toUpperCase() + value.slice(1);
};

export const getRestroStatusValue = (e) => {
	let STATUS = "";

	if (Constants.STATUS_BLOCKED == e) {
		STATUS = Constants.ORDER_STATUS_STR_BLOCK;
	} else if (Constants.STATUS_UNBLOCKED == e) {
		STATUS = Constants.ORDER_STATUS_STR_UNBLOCK;
	} else {
		STATUS = Constants.ORDER_STATUS_STR_UNBLOCK;
	}

	// if (Constants.ORDER_STATUS_BLOCK == e) {
	//   STATUS = Constants.ORDER_STATUS_STR_BLOCK;
	// } else if (Constants.ORDER_STATUS_UNBLOCK == e) {
	//   STATUS = Constants.ORDER_STATUS_STR_UNBLOCK;
	// } else {
	//   STATUS = Constants.ORDER_STATUS_STR_UNBLOCK;
	// }

	return STATUS;
};

export const getRestroStatusKey = (e) => {
	let STATUS = "";
	if (Constants.ORDER_STATUS_STR_BLOCK == e) {
		STATUS = Constants.ORDER_STATUS_BLOCK;
	} else if (Constants.ORDER_STATUS_STR_UNBLOCK == e) {
		STATUS = Constants.ORDER_STATUS_UNBLOCK;
	} else {
		STATUS = Constants.ORDER_STATUS_UNBLOCK;
	}
	return STATUS;
};

export const getStatusValue = (e) => {
	let STATUS = "";

	if (Constants.ORDER_STATUS_PENDING == e) {
		STATUS = Constants.ORDER_STATUS_STR_PENDING;
	} else if (Constants.ORDER_STATUS_ACCEPTED == e) {
		STATUS = Constants.ORDER_STATUS_STR_ACCEPTED;
	} else if (Constants.ORDER_STATUS_PREPARING == e) {
		STATUS = Constants.ORDER_STATUS_STR_PREPARING;
	} else if (Constants.ORDER_STATUS_PREPARED == e) {
		STATUS = Constants.ORDER_STATUS_STR_PREPARED;
	} else if (Constants.ORDER_STATUS_ASSIGN_DELIVERY == e) {
		STATUS = Constants.ORDER_STATUS_STR_ASSIGN_DELIVERY;
	} else if (Constants.ORDER_STATUS_PICKED_UP == e) {
		STATUS = Constants.ORDER_STATUS_STR_PICKED_UP;
	} else if (Constants.ORDER_STATUS_CANCEL_BY_RESTAURANT == e) {
		STATUS = Constants.ORDER_STATUS_STR_CANCEL_BY_RESTAURANT;
	} else if (Constants.ORDER_STATUS_CANCEL_BY_CUSTOMER == e) {
		STATUS = Constants.ORDER_STATUS_STR_CANCEL_BY_CUSTOMER;
	} else if (Constants.ORDER_STATUS_DELIVER == e) {
		STATUS = Constants.ORDER_STATUS_STR_DELIVER;
	} else if (Constants.ORDER_STATUS_ASSIGNED_PREPARED == e) {
		STATUS = Constants.ORDER_STATUS_STR_DELIVER_PREPARED;
	} else if (Constants.ORDER_STATUS_ASSIGNED_PREPARING == e) {
		STATUS = Constants.ORDER_STATUS_STR_ASSIGN_DELIVER_PREPARING;
	} else if (Constants.ORDER_STATUS_ASSIGNED_PREPARED_REACHED == e) {
		STATUS = Constants.ORDER_STATUS_STR_DELIVER_PREPARED;
	} else if (Constants.ORDER_STATUS_ASSIGNED_PREPARING_REACHED == e) {
		STATUS = Constants.ORDER_STATUS_STR_ASSIGN_DELIVER_PREPARING;
	} else if (Constants.ORDER_STATUS_CANCEL_BY_GROCERY == e) {
		STATUS = Constants.ORDER_STATUS_STR_CANCEL_BY_GROCERY;
	}

	return STATUS;
};
export const getStatusValueGrocery = (e) => {
	let STATUS = "";

	if (Constants.ORDER_STATUS_PENDING == e) {
		STATUS = Constants.ORDER_STATUS_STR_PENDING;
	} else if (Constants.ORDER_STATUS_ACCEPTED == e) {
		STATUS = Constants.ORDER_STATUS_STR_ACCEPTED;
	} else if (Constants.ORDER_STATUS_PREPARING == e) {
		STATUS = Constants.ORDER_STATUS_STR_PREPARING;
	} else if (Constants.ORDER_STATUS_PREPARED == e) {
		STATUS = Constants.ORDER_STATUS_STR_PREPARED;
	} else if (Constants.ORDER_STATUS_ASSIGN_DELIVERY == e) {
		STATUS = Constants.ORDER_STATUS_STR_ASSIGN_DELIVERY;
	} else if (Constants.ORDER_STATUS_PICKED_UP == e) {
		STATUS = Constants.ORDER_STATUS_STR_PICKED_UP;
	} else if (Constants.ORDER_STATUS_CANCEL_BY_GROCERY == e) {
		STATUS = Constants.ORDER_STATUS_STR_CANCEL_BY_GROCERY;
	} else if (Constants.ORDER_STATUS_CANCEL_BY_CUSTOMER == e) {
		STATUS = Constants.ORDER_STATUS_STR_CANCEL_BY_CUSTOMER;
	} else if (Constants.ORDER_STATUS_DELIVER == e) {
		STATUS = Constants.ORDER_STATUS_STR_DELIVER;
	} else if (Constants.ORDER_STATUS_ASSIGNED_PREPARED == e) {
		STATUS = Constants.ORDER_STATUS_STR_DELIVER_PREPARED;
	} else if (Constants.ORDER_STATUS_ASSIGNED_PREPARING == e) {
		STATUS = Constants.ORDER_STATUS_STR_ASSIGN_DELIVER_PREPARING;
	} else if (Constants.ORDER_STATUS_ASSIGNED_PREPARED_REACHED == e) {
		STATUS = Constants.ORDER_STATUS_STR_DELIVER_PREPARED;
	} else if (Constants.ORDER_STATUS_ASSIGNED_PREPARING_REACHED == e) {
		STATUS = Constants.ORDER_STATUS_STR_ASSIGN_DELIVER_PREPARING;
	}

	return STATUS;
};

export const getStatusKey = (e) => {
	let STATUS = "";
	if (Constants.ORDER_STATUS_STR_PENDING == e) {
		STATUS = Constants.ORDER_STATUS_PENDING;
	} else if (Constants.ORDER_STATUS_STR_ACCEPTED == e) {
		STATUS = Constants.ORDER_STATUS_ACCEPTED;
	} else if (Constants.ORDER_STATUS_STR_ACCEPT == e) {
		STATUS = Constants.ORDER_STATUS_ACCEPTED;
	} else if (Constants.ORDER_STATUS_STR_SELECT == e) {
		STATUS = Constants.ORDER_STATUS_STR_SELECT;
	} else if (Constants.ORDER_STATUS_STR_PREPARING == e) {
		STATUS = Constants.ORDER_STATUS_PREPARING;
	} else if (Constants.ORDER_STATUS_STR_PREPARED == e) {
		STATUS = Constants.ORDER_STATUS_PREPARED;
	} else if (Constants.ORDER_STATUS_STR_ASSIGN_DELIVERY == e) {
		STATUS = Constants.ORDER_STATUS_ASSIGN_DELIVERY;
	} else if (Constants.ORDER_STATUS_STR_REJECT == e) {
		//STATUS = Constants.ORDER_STATUS_CANCEL_BY_CUSTOMER;
		STATUS = Constants.ORDER_STATUS_CANCEL_BY_RESTAURANT;
	} else if (Constants.ORDER_STATUS_STR_CANCEL_BY_RESTAURANT == e) {
		STATUS = Constants.ORDER_STATUS_CANCEL_BY_RESTAURANT;
	} else if (Constants.ORDER_STATUS_STR_CANCEL_BY_CUSTOMER == e) {
		STATUS = Constants.ORDER_STATUS_CANCEL_BY_CUSTOMER;
	} else if (Constants.ORDER_STATUS_STR_DECLINED == e) {
		STATUS = Constants.ORDER_STATUS_CANCEL_BY_RESTAURANT;
	} else if (
		Constants.ORDER_STATUS_STR_DELIVER == e ||
		Constants.ORDER_STATUS_STR_DELIVERED == e
	) {
		STATUS = Constants.ORDER_STATUS_DELIVER;
	}
	return STATUS;
};

export const getStatusKeyGrocery = (e) => {
	let STATUS = "";
	if (Constants.ORDER_STATUS_STR_PENDING == e) {
		STATUS = Constants.ORDER_STATUS_PENDING;
	} else if (Constants.ORDER_STATUS_STR_ACCEPTED == e) {
		STATUS = Constants.ORDER_STATUS_ACCEPTED;
	} else if (Constants.ORDER_STATUS_STR_ACCEPT == e) {
		STATUS = Constants.ORDER_STATUS_ACCEPTED;
	} else if (Constants.ORDER_STATUS_STR_SELECT == e) {
		STATUS = Constants.ORDER_STATUS_STR_SELECT;
	} else if (Constants.ORDER_STATUS_STR_PREPARING == e) {
		STATUS = Constants.ORDER_STATUS_PREPARING;
	} else if (Constants.ORDER_STATUS_STR_PREPARED == e) {
		STATUS = Constants.ORDER_STATUS_PREPARED;
	} else if (Constants.ORDER_STATUS_STR_ASSIGN_DELIVERY == e) {
		STATUS = Constants.ORDER_STATUS_ASSIGN_DELIVERY;
	} else if (Constants.ORDER_STATUS_STR_REJECT == e) {
		//STATUS = Constants.ORDER_STATUS_CANCEL_BY_CUSTOMER;
		STATUS = Constants.ORDER_STATUS_CANCEL_BY_GROCERY;
	} else if (Constants.ORDER_STATUS_STR_CANCEL_BY_RESTAURANT == e) {
		STATUS = Constants.ORDER_STATUS_CANCEL_BY_GROCERY;
	} else if (Constants.ORDER_STATUS_STR_CANCEL_BY_CUSTOMER == e) {
		STATUS = Constants.ORDER_STATUS_CANCEL_BY_CUSTOMER;
	} else if (Constants.ORDER_STATUS_STR_DECLINED == e) {
		STATUS = Constants.ORDER_STATUS_CANCEL_BY_GROCERY;
	} else if (
		Constants.ORDER_STATUS_STR_DELIVER == e ||
		Constants.ORDER_STATUS_STR_DELIVERED == e
	) {
		STATUS = Constants.ORDER_STATUS_DELIVER;
	}
	return STATUS;
};

export const isAdmin = (e) => {
	let userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
	if (userData[Constants.KEY_ROLE] == Constants.ROLE_SUPER_ADMIN) {
		return true;
	} else {
		return false;
	}
	return false;
};

export const isLogin = (e) => {
	let userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
	if (userData != undefined && userData != null && userData != "") {
		return true;
	} else {
		return false;
	}
	return false;
};

export const userDetails = (callBack) => {
	let userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
	if (userData != undefined && userData != null && userData != "") {
		callBack(userData);
	} else {
		return callBack(undefined);
	}
	return callBack(undefined);
};

export const userRole = () => {
	let userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
	return userData[Constants.KEY_ROLE];
};
export const userImage = () => {
	let userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
	if (
		userData != undefined &&
		userData != null &&
		userData != "" &&
		userData[Constants.KEY_ROLE] == Constants.ROLE_RESTAURANT
	) {
		return (
			userData[Constants.KEY_RETSRO_DETAILS] != undefined &&
			userData[Constants.KEY_RETSRO_DETAILS] != null &&
			userData[Constants.KEY_RETSRO_DETAILS][Constants.KEY_IMAGE]
		);
	} else {
		return (
			userData[Constants.KEY_PROFILE] != undefined &&
			userData[Constants.KEY_PROFILE] != null &&
			userData[Constants.KEY_PROFILE][Constants.KEY_IMAGE]
		);
	}
};

export const userImageGrocery = () => {
	let userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
	if (
		userData != undefined &&
		userData != null &&
		userData != "" &&
		userData[Constants.KEY_ROLE] == Constants.ROLE_GROCERY
	) {
		return (
			userData[Constants.KEY_GROCERY_DETAILS] != undefined &&
			userData[Constants.KEY_GROCERY_DETAILS] != null &&
			userData[Constants.KEY_GROCERY_DETAILS][Constants.KEY_IMAGE]
		);
	} else {
		return (
			userData[Constants.KEY_PROFILE] != undefined &&
			userData[Constants.KEY_PROFILE] != null &&
			userData[Constants.KEY_PROFILE][Constants.KEY_IMAGE]
		);
	}
};

export const isRestuarant = (e) => {
	let userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
	if (userData[Constants.KEY_ROLE] == Constants.ROLE_RESTAURANT) {
		return true;
	} else {
		return false;
	}
	return false;
};
export const isGrocery = (e) => {
	let userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
	if (userData[Constants.KEY_ROLE] == Constants.ROLE_GROCERY) {
		return true;
	} else {
		return false;
	}
	return false;
};
export const restroId = (e) => {
	let userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
	if (userData != undefined) {
		return userData[Constants.KEY_USERID];
	} else {
		return undefined;
	}
	return undefined;
};
export const GroceryStoreId = (e) => {
	let userData = CustomStorage.getSessionDataAsObject(Constants.KEY_USER_DATA);
	if (userData != undefined) {
		return userData[Constants.KEY_USERID];
	} else {
		return undefined;
	}
	return undefined;
};

export const getRequestValue = (e) => {
	let STATUS = "";
	if (Constants.ORDER_STATUS_PENDING == e) {
		STATUS = Constants.ORDER_STATUS_STR_PENDING;
	} else if (Constants.ORDER_STATUS_APPROVED == e) {
		STATUS = Constants.ORDER_STATUS_STR_APPROVED;
	} else if (Constants.ORDER_STATUS_DECLINED == e) {
		STATUS = Constants.ORDER_STATUS_STR_DECLINED;
	} else {
		STATUS = Constants.ORDER_STATUS_STR_PENDING;
	}

	return STATUS;
};

export const getRequestValue1 = (e) => {
	let STATUS = "";
	if (Constants.ORDER_STATUS_STR_PENDING == e) {
		STATUS = Constants.STATUS_Pending;
	} else if (Constants.ORDER_STATUS_STR_APPROVED == e) {
		STATUS = Constants.STATUS_Approved;
	} else if (Constants.ORDER_STATUS_STR_DECLINED == e) {
		STATUS = Constants.STATUS_Rejected;
	} else {
		STATUS = Constants.STATUS_Pending;
	}
	return STATUS;
};

export const getRequestKey = (e) => {
	let STATUS = "";
	if (Constants.ORDER_STATUS_STR_PENDING == e) {
		STATUS = Constants.STATUS_PENDING;
	} else if (Constants.ORDER_STATUS_STR_APPROVED == e) {
		STATUS = Constants.STATUS_APPROVED;
	} else if (Constants.ORDER_STATUS_STR_DECLINED == e) {
		STATUS = Constants.STATUS_REJECTED;
	} else {
		STATUS = Constants.STATUS_PENDING;
	}
	return STATUS;
};

export const getRequestKey1 = (e) => {
	let STATUS = "";
	if (Constants.ORDER_STATUS_STR_PENDING == e) {
		STATUS = Constants.STATUS_Pending;
	} else if (Constants.ORDER_STATUS_STR_APPROVED == e) {
		STATUS = Constants.STATUS_Approved;
	} else if (Constants.ORDER_STATUS_STR_DECLINED == e) {
		STATUS = Constants.STATUS_Rejected;
	} else {
		STATUS = Constants.STATUS_Pending;
	}
	return STATUS;
};

export const getRestroType = (e) => {
	let STATUS = "";

	if (Constants.KEY_VEG == e) {
		STATUS = Constants.RESTRO_TYPE_VEG;
	} else if (Constants.KEY_NON_VEG == e) {
		STATUS = Constants.RESTRO_TYPE_NON_VEG;
	} else if (Constants.KEY_VEG_AND_NON_VEG == e) {
		STATUS = Constants.RESTRO_TYPE_VEG_AND_NON_VEG;
	}

	return STATUS;
};

export const convertStrDateFormat = (
	utcDateTime,
	comingFormat,
	forShowFormat,
) => {
	if (utcDateTime !== null && utcDateTime !== undefined && utcDateTime !== "") {
		var momentObj = moment(utcDateTime, comingFormat);
		utcDateTime = momentObj.format(forShowFormat);
	} else utcDateTime = "";
	return utcDateTime;
};

export const convertUTCMiliSToLocalDateFormat = (
	utcDateTime,
	forShowFormat,
) => {
	if (utcDateTime !== null && utcDateTime !== undefined && utcDateTime !== "") {
		var momentObj = moment(utcDateTime);
		utcDateTime = momentObj.format(forShowFormat);
	} else utcDateTime = "";
	return utcDateTime;
};

export const convertDate = (str) => {
	var date = new Date(str),
		mnth = ("0" + (date.getMonth() + 1)).slice(-2),
		day = ("0" + date.getDate()).slice(-2);
	return [date.getFullYear(), mnth, day].join("-");
};

export const currentDate = () => {
	var date = moment(new Date().toISOString()).format("DD MMM YYYY");
	return date + "";
};

export const getTimeIn24 = (str) => {
	let date = moment(new Date(str).toISOString()).format("HH:MM:SS");
	return date;
};
export const getHoursOnly = (str) => {
	let date = moment(new Date(str).toISOString()).format("HH");
	let mnts = getMintsOnly(str);
	let valFloat = date + "." + mnts;
	return valFloat;
};
export const getMintsOnly = (str) => {
	let date = moment(new Date(str).toISOString()).format("MM");
	return date;
};
export const getSecondsOnly = (str) => {
	let date = moment(new Date(str).toISOString()).format("MM");
	return date;
};

export const earningCheckTodayDate = (str) => {
	let today = moment(new Date().toISOString()).format("DD MMM YYYY");
	console.log("Today=", today);
	let date = moment(new Date(str).toISOString()).format("DD MMM YYYY");
	if (today == date) {
		date = "Today, " + date;
	}

	return date;
};

export const convertTimeFromMiliseconds = (dateTime, forShowFormat) => {
	var showDateValue = "";
	if (dateTime !== null || dateTime !== undefined) {
		showDateValue = moment(dateTime).format(forShowFormat);
	}
	return showDateValue;
};

export const getFormDataFromObject = async (data, callBack) => {
	const formData = new FormData();
	for (var key in data) {
		if (typeof data[key] === "object") {
			var dataValue = data[key];
			if (
				key === Constants.KEY_IMAGES_ARRAY ||
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
				key == Constants.KEY_GSTN_OR_PAN_IMG
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
				console.log(
					"key name :- ",
					data[key],
					" Key name value :- ",
					key,
					JSON.stringify(formData),
				);
			}
		}
	}
	callBack(formData);
};

export const getFormDataFromObjectGrocery = async (data, callBack) => {
	const formData = new FormData();
	for (var key in data) {
		if (typeof data[key] === "object") {
			var dataValue = data[key];
			if (
				key === Constants.KEY_IMAGES_ARRAY ||
				key == Constants.KEY_BUILDING_FRONT_IMG ||
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
				key == Constants.KEY_GSTN_OR_PAN_IMG
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
				console.log(
					"key name :- ",
					data[key],
					" Key name value :- ",
					key,
					JSON.stringify(formData),
				);
			}
		}
	}
	callBack(formData);
};

export const getStartWeekDate = () => {
	let end = moment().endOf("week").toDate();
	let start = moment().startOf("week").toDate();
	let start2 = moment().startOf("week").toDate();
	var dt = start; // current date of week
	dt.setHours(5, 30, 0, 0);
	var dtend = start2; // current date of week
	dtend.setHours(23, 59, 59, 999);
	var wkEnd = new Date(new Date(dtend).setDate(dtend.getDate() + 6));
	console.log("date:::::::start date11: ", dt.getTime());
	console.log("date::::::: end11: ", wkEnd.getTime());
	return new start.getTime();
};

export const getEarnDateMMMInUtc = (dateGat) => {
	let date = new Date(dateGat);
	return moment(date.toISOString()).utc().format("DD MMM");
	//return moment(new Date(date).toISOString()).utc().format('DD MMM')
};

export function getCurrentDate(separator = "") {
	let newDate = new Date();
	let date = newDate.getDate();
	let month = newDate.getMonth() + 1;
	let year = newDate.getFullYear();

	return `${year}${separator}${
		month < 10 ? `0${month}` : `${month}`
	}${separator}${date}`;
}
export function removeWhiteSpace(stringvalue) {
	let str = stringvalue;
	let strTrim = str.split(".").join("").trim();
	return strTrim;
}
