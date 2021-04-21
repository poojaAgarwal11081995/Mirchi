/** @format */

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import * as Constants from "../utils/Constants";
import CommonSwitch from "../common/CommonSwitch";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DetailButton from "@material-ui/icons/NavigateNext";
import * as Utility from "../utils/Utility";
import { Link } from "react-router-dom";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import * as CustomStorage from "../utils/CustomStorage";
import * as StringKeys from "../res/StringKeys";

import ActiveIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import InActiveIcon from "@material-ui/icons/Clear";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = {
	root: {
		width: "100%",
		overflowX: "auto",
	},
	table: {
		minWidth: 200,
	},
	gridList: {
		width: "100%",
	},
	icon: {
		color: "rgba(255, 255, 255, 0.54)",
	},
};

let id = 0;

function OrderTimeTableGrocery(props) {
	const { classes, data, context } = props;

	console.log("OrderTimeTable::: value ", data);

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [headerData, setheaderData] = React.useState([]);
	// const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	const deleteEditRow = (data) => {
		alert(JSON.stringify(data));
	};
	function handleChangeRowsPerPage(event) {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}

	return (
		<div>
			<CardActions
				disableSpacing
				style={{
					flexDirection: "row",
					justifyContent: "flex-strat",
					width: "100%",
					alignItems: "flex-start",
				}}>
				<CardActions
					disableSpacing
					style={{
						flexDirection: "column",
						justifyContent: "flex-strat",
						width: "100%",
						alignItems: "flex-start",
					}}>
					<Typography className={classes.pos} color="textSecondary">
						<ActiveIcon style={{ marginLeft: -5 }}></ActiveIcon>
						{data[Constants.KEY_ORDER_DATE_PLACED] != undefined &&
						data[Constants.KEY_ORDER_DATE_PLACED] > 0
							? Utility.convertUTCMiliSToLocalDateFormat(
									data[Constants.KEY_ORDER_DATE_PLACED],
									Constants.TIME_FORMAT_SHOW,
							  )
							: Constants.BLANK_TIME}
					</Typography>

					<Typography
						className={classes.pos}
						style={{ marginLeft: 0, paddingLeft: 0 }}
						color="textSecondary">
						{context.strings(StringKeys.Placed)}
					</Typography>
				</CardActions>

				<CardActions
					disableSpacing
					style={{
						flexDirection: "column",
						justifyContent: "flex-strat",
						width: "100%",
						alignItems: "flex-start",
					}}>
					<Typography className={classes.pos} color="textSecondary">
						<ActiveIcon style={{ marginLeft: -10 }}></ActiveIcon>
						{data[Constants.KEY_ORDER_DATE_CONFIRMED] != undefined &&
						data[Constants.KEY_ORDER_DATE_CONFIRMED] > 0
							? Utility.convertUTCMiliSToLocalDateFormat(
									data[Constants.KEY_ORDER_DATE_CONFIRMED],
									Constants.TIME_FORMAT_SHOW,
							  )
							: Constants.BLANK_TIME}
					</Typography>

					<Typography
						className={classes.pos}
						style={{ marginLeft: -5, paddingLeft: 0 }}
						color="textSecondary">
						{context.strings(StringKeys.Confirmed)}
					</Typography>
				</CardActions>

				<CardActions
					disableSpacing
					style={{
						flexDirection: "column",
						justifyContent: "flex-strat",
						width: "100%",
						alignItems: "flex-start",
					}}>
					<Typography className={classes.pos} color="textSecondary">
						<ActiveIcon style={{ marginLeft: -15 }}></ActiveIcon>
						{data[Constants.KEY_ORDER_DATE_PICKED_UP] != undefined &&
						data[Constants.KEY_ORDER_DATE_PICKED_UP] > 0
							? Utility.convertUTCMiliSToLocalDateFormat(
									data[Constants.KEY_ORDER_DATE_PICKED_UP],
									Constants.TIME_FORMAT_SHOW,
							  )
							: Constants.BLANK_TIME}
					</Typography>

					<Typography
						className={classes.pos}
						style={{ marginLeft: -10 }}
						color="textSecondary">
						{context.strings(StringKeys.Picked_Up)}
					</Typography>
				</CardActions>

				<CardActions
					disableSpacing
					style={{
						flexDirection: "column",
						justifyContent: "flex-strat",
						width: "100%",
						alignItems: "flex-start",
					}}>
					<Typography className={classes.pos} color="textSecondary">
						<ActiveIcon style={{ marginLeft: -15 }}></ActiveIcon>{" "}
						{data[Constants.KEY_ORDER_DATE_DELIVERED] != undefined &&
						data[Constants.KEY_ORDER_DATE_DELIVERED] > 0
							? Utility.convertUTCMiliSToLocalDateFormat(
									data[Constants.KEY_ORDER_DATE_DELIVERED],
									Constants.TIME_FORMAT_SHOW,
							  )
							: Constants.BLANK_TIME}
					</Typography>

					<Typography
						className={classes.pos}
						style={{ marginLeft: -10 }}
						color="textSecondary">
						{context.strings(StringKeys.Delivered)}
					</Typography>
				</CardActions>
			</CardActions>
		</div>
	);
}

OrderTimeTableGrocery.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderTimeTableGrocery);
