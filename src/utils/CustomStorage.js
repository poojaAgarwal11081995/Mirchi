/** @format */

import * as Constants from "./Constants";

export const setSessionDataAsObject = (keyAsString, value) => {
	localStorage.setItem(keyAsString, JSON.stringify(value));
};

export const getSessionDataAsObject = (keyAsString) => {
	//  alert('getSessionDataAsObject=', keyAsString + '=' + localStorage.getItem(keyAsString))

	if (localStorage.getItem(keyAsString) != undefined) {
		var objData = undefined;
		try {
			var data = localStorage.getItem(keyAsString);
			if (typeof data !== "undefined" && data !== "undefined") {
				objData = JSON.parse(data);
			}
		} catch (error) {
			console.log(
				" error getSessionDataAsObject : ",
				error[Constants.KEY_MESSAGE],
			);
		}

		return objData;
	}
};

export const clearLocalData = () => {
	try {
		localStorage.clear();
	} catch (error) {
		alert("error " + error);
		console.log("logout 2 error ::::: ", error);
		// Error retrieving data
	}
};

export const clearSessionData = () => {
	try {
		localStorage.clear();
	} catch (error) {
		alert("error " + error);
		console.log("logout 2 error ::::: ", error);
		// Error retrieving data
	}
};
