/** @format */

import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import * as Utility from "./../utils/Utility";
import * as Constants from "./../utils/Constants";
class BaseComponent extends Component {
	// handleBackButtonClick = () => {
	//   this.props.goBack();
	//   return true;
	// }

	strings(name) {
		if (name !== undefined) return <FormattedMessage id={name} />;
	}

	goBack = () => {
		window.history.back();
	};

	goBackdashboard = () => {
		if (Utility.isAdmin()) {
			window.location.href = "/admin/dashboard";
		} else if (Utility.isGrocery()) {
			window.location.href = "/grocery/dashboardRecentGrocery";
		} else if (Utility.isRestuarant()) {
			window.location.href = "/restaurant/dashboardRecentRestro";
		} else {
			window.history.back();
		}
	};

	gogrocerydasboard = () => {
		if (Utility.isGrocery()) {
			window.location.href = "/grocery/dashboardRecentGrocery";
		} else if (Utility.isRestuarant()) {
			window.location.href = "/restaurant/dashboardRecentRestro";
		} else if (Utility.isAdmin()) {
			window.history.back();
		}
	};
}
export default BaseComponent;
