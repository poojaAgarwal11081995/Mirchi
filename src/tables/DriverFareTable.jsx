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
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import ListIcon from "@material-ui/icons/List";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import * as CustomStorage from "../utils/CustomStorage";
import ActiveIcon from "@material-ui/icons/Check";
import InActiveIcon from "@material-ui/icons/Clear";

const styles = {
	root: {
		width: "100%",
		overflowX: "auto",
	},
	table: {
		minWidth: 700,
	},
};

let id = 0;

function DriverFareTable(props) {
	const {
		classes,
		data = props.data == undefined ? [] : props.data,
		headerData,
		context,
	} = props;
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

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
	useEffect(() => {
		// alert(JSON.stringify(props.headerData))
	});

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow key={"header_row"}>
						{headerData.map((headerObj, index) => (
							<TableCell align={index == 0 ? "left" : "center"}>
								{headerObj[Constants.KEY_NAME]}
							</TableCell>
						))}
					</TableRow>
				</TableHead>

				<TableBody>
					{/* {data.map((dataObj, index) => ( */}
					{data
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.map((dataObj, index) => (
							<TableRow key={dataObj[Constants.KEY_UNDERSCORE_ID]}>
								<TableCell align="left">
									{dataObj[Constants.KEY_LABEL]}
								</TableCell>
								<TableCell align="center">
									{dataObj[Constants.KEY_CITY] != undefined
										? dataObj[Constants.KEY_CITY][Constants.KEY_NAME]
										: ""}
								</TableCell>

								<TableCell align="center">
									{dataObj[Constants.KEY_STATE] != undefined
										? dataObj[Constants.KEY_STATE][Constants.KEY_NAME]
										: ""}
								</TableCell>
								<TableCell align="center">
									{dataObj[Constants.KEY_COUNTRY] != undefined
										? dataObj[Constants.KEY_COUNTRY][Constants.KEY_NAME]
										: ""}
								</TableCell>

								<TableCell align="center">
									{Utility.convertStrDateFormat(
										dataObj[Constants.KEY_CREATED],
										Constants.DATE_FORMAT_COMING_FROM_SERVER,
										Constants.DATE_FORMAT_SHOW,
									)}
								</TableCell>
								<TableCell align="center">
									{[
										<IconButton
											onClick={() => {
												context.deleteRegion(
													dataObj[Constants.KEY_UNDERSCORE_ID],
												);
											}}
											aria-label="Delete">
											<DeleteIcon />
										</IconButton>,
										,
										,
										<Link
											className={classes.link}
											to={Constants.SCREEN_SCREEN_EDIT_REGION}>
											<IconButton
												aria-label="Detail"
												onClick={() => {
													CustomStorage.setSessionDataAsObject(
														Constants.KEY_REGION_DETAILS,
														dataObj,
													);
												}}>
												<DetailButton />
											</IconButton>
										</Link>,
									]}
								</TableCell>
							</TableRow>
						))}
				</TableBody>

				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							colSpan={12}
							count={data.length}
							rowsPerPage={rowsPerPage}
							page={page}
							SelectProps={{
								inputProps: { "aria-label": "Rows per page" },
								native: true,
							}}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
							// ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</Paper>
	);
}

DriverFareTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DriverFareTable);
