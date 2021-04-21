/** @format */

import React from "react";
import ReactDOM from "react-dom";
import App from "../src/App.jsx";
import { IntlProvider, addLocaleData } from "react-intl";
import esLocaleData from "react-intl/locale-data/es";
import svLocaleData from "react-intl/locale-data/sv";
import enLocaleData from "react-intl/locale-data/en";
import translations from "../src/i18n/locales";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
addLocaleData([...esLocaleData, ...svLocaleData, ...enLocaleData]);

const locale = window.location.search.replace("?locale=", "") || "en";
const messages = translations[locale];

ReactDOM.render(
	<IntlProvider locale={locale} messages={messages}>
		<App />
	</IntlProvider>,
	document.getElementById("root"),
);
