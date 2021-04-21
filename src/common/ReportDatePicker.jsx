/** @format */

import React, { Fragment } from "react";

import Basecomponent from "./BaseComponent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Grid from "@material-ui/core/Grid";
import * as StringKeys from "../res/StringKeys";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { makeStyles } from '@material-ui/styles';
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import DayPickerInput from "react-day-picker/DayPickerInput";
import * as ResourcesConstants from "../res/ResourcesConstants";
import moment from "moment";
import "react-day-picker/lib/style.css";
import styled from "styled-components";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";

import * as Utility from "../utils/Utility";

// const useStyles = makeStyles(theme => ({
//     container: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     textField: {
//         marginLeft: theme.spacing(1),
//         marginRight: theme.spacing(1),
//         width: 200,
//     },
// }));

import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
	DateTimePicker,
} from "@material-ui/pickers";

// import { DateTimePicker } from "@material-ui/pickers";
export default function ReportDatePicker(props) {
	const {
		required,
		palceHolder,
		style,
		xs,
		disabled,
		id,
		autoComplete,
		label,
		fullWidth,
		type,
		value,
		onChange,
		variant,
		error,
		editable,
		helperText,
		fieldStyle,
		strDateVaule,
		maxLengthVal,
		onSelectedDate,
		defaultDate,
	} = props;

	{
		console.log(" date:-:-1", defaultDate);
		console.log("date date:-:-", Utility.convertDate(defaultDate));
	}
	// The first commit of Material-UI
	
	const [selectedDate, setSelectedDate] = React.useState(
		defaultDate != undefined ? defaultDate : null,
	);

	
	// const [selectedDate, setSelectedDate] = React.useState(null);

	function handleDateChange(date) {
		setSelectedDate(date);
		console.log("date:-", Utility.convertDate(date));
		onSelectedDate(Utility.convertDate(date));
	}

	return (
		<Grid item xs={12}>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
				 clearable

					style={{
						backgroundColor: "#00000000",
						width: "100%",
					}}
					margin="none"
					id={id}
					label={palceHolder}
					format="yyyy-MM-dd"
					variant={undefined}
					inputVariant="outlined"
					value={value}
					onChange={handleDateChange}
					KeyboardButtonProps={{
						"aria-label": "change date",
					}}
				/>
			</MuiPickersUtilsProvider>
		</Grid>
	);
}
