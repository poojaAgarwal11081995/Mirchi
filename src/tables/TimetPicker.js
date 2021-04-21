/** @format */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DetailButton from "@material-ui/icons/RemoveRedEye";
import IconButton from "@material-ui/core/IconButton";
import * as Constants from "../utils/Constants";
import * as Utility from "../utils/Utility";

import { Link } from "react-router-dom";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import ActiveIcon from "@material-ui/icons/Check";
import InActiveIcon from "@material-ui/icons/Clear";
import { TimePicker, Button } from "antd";
import ReactDOM from "react-dom";
import moment from "moment";
// const format = "HH:mm a";
const format = "h:mm: a";
// h:mm:ss

const styles = {
	root: {
		width: "100%",
		height: 100,
		overflowX: "auto",
	},
	table: {
		minWidth: 700,
	},
};
const pickerStyle = { height: 50 };
let id = 0;
function createData(name, calories, fat, carbs, protein) {
	id += 1;
	return { id, name, calories, fat, carbs, protein };
}

function TimetPicker(props) {
	const {
		classes,
		timeValue,
		keyValue,
		placeholder,
		style,
		context,
		className,
	} = props;

	const [open, setOpen] = React.useState(false);

	function onChange(time, timeString, key) {
		console.log("time value=", time, timeString);

		context.onChangeTime(key, timeString);
	}
	function handleOpenChange(open) {
		setOpen(open);
	}
	function handleClose() {
		setOpen(!open);
	}

	const goDetails = (data) => {
		<Link
			className={classes.link}
			to={Constants.SCREEN_RESTAURANT_DETAIL}></Link>;
	};

	return (
		<div className={className}>
			<TimePicker
				open={open}
				defaultValue={
					timeValue != "" && timeValue != undefined && moment(timeValue, format)
				}
				format={format}
				style={style}
				use12Hours
				onOpenChange={handleOpenChange}
				onChange={(time, timeString) => onChange(time, timeString, keyValue)}
				height={pickerStyle.height}
				className={className}
				placeholder={placeholder}
				addon={() => (
					<Button size="small" type="primary" onClick={handleClose}>
						Okay
					</Button>
				)}
			/>
		</div>
	);
}

TimetPicker.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimetPicker);
