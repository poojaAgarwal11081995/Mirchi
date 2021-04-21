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
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DetailButton from "@material-ui/icons/RemoveRedEye";
import IconButton from "@material-ui/core/IconButton";
import * as Constants from "../utils/Constants";
import { Link } from "react-router-dom";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import ActiveIcon from "@material-ui/icons/Check";
import InActiveIcon from "@material-ui/icons/Clear";
import CommonStyle from "../res/CommonStyles.js";
import * as StringKeys from "../res/StringKeys";
import CommonDropDown from "../common/CommonDropDown";
import * as Utility from "../utils/Utility";
import moment from "moment";

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
function createData(name, calories, fat, carbs, protein) {
	id += 1;
	return { id, name, calories, fat, carbs, protein };
}

function RequestedDriverTableGrocery(props) {
	const { classes, data, context } = props;

	const [page, setPage] = React.useState(0);
	const [dataOb, setDataOb] = React.useState(props.data);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
	const [options, setOptions] = React.useState([
		Constants.ORDER_STATUS_STR_PENDING,
		Constants.ORDER_STATUS_STR_APPROVED,
		Constants.ORDER_STATUS_STR_DECLINED,
	]);

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
		//  alert(rowsPerPage)
	}
	function handleChangeValue(e, index) {
		let STATUS = Utility.getRequestKey1(e);

		let req = {
			[Constants.KEY_UNDERSCORE_ID]: data[index]._id,
			[Constants.KEY_STATUS]: STATUS,
		};
		context.updateDriverStatus(req);
	}

	useEffect(() => {
		setDataOb(props.data);
	});

	const deleteEditRow = (data) => {
		alert(JSON.stringify(data));
	};
	const goDetails = (data) => {
		<Link className={classes.link} to={Constants.SCREEN_GROCERY_DETAIL}></Link>;
	};

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell align="justify" style={CommonStyle.tableRowHeader}>
							{context.strings(StringKeys.Name)}
						</TableCell>
						<TableCell align="center" style={CommonStyle.tableRowHeader}>
							Created At
						</TableCell>
						<TableCell align="center" style={CommonStyle.tableRowHeader}>
							{context.strings(StringKeys.Phone)}
						</TableCell>
						<TableCell align="center" style={CommonStyle.tableRowHeader}>
							{context.strings(StringKeys.Email)}
						</TableCell>
						<TableCell align="center" style={CommonStyle.tableRowHeader}>
							{context.strings(StringKeys.City)}
						</TableCell>
						<TableCell align="center" style={CommonStyle.tableRowHeader}>
							{context.strings(StringKeys.Stauts)}
						</TableCell>
						<TableCell align="center" style={CommonStyle.tableRowHeader}>
							{context.strings(StringKeys.Action)}
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data != undefined
						? data
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((n, index) => (
									<TableRow key={n.id}>
										<TableCell align="justify" component="th" scope="row">
											{n.name}
										</TableCell>
										<TableCell align="center">
											{moment(n.createdAt).format("YYYY-MM-DD")}
										</TableCell>
										<TableCell align="center">{n.phone}</TableCell>
										<TableCell align="center">{n.email}</TableCell>
										<TableCell align="center">
											{n.city != undefined ? n.city.name : ""}
										</TableCell>
										<TableCell align="center">
											{[
												<CommonDropDown
													value={n.status}
													onChange={(value) => handleChangeValue(value, index)}
													options={options}></CommonDropDown>,
											]}
										</TableCell>

										<TableCell align="center">
											{[
												<IconButton
													aria-label="Detail"
													onClick={() => {
														// context.viewImage(n[Constants.RC_IMAGE] != undefined ?
														//     n[Constants.RC_IMAGE] : '')
														// alert()
														context.navigateDriverDetails(
															n[Constants.KEY_UNDERSCORE_ID],
														);
													}}>
													<DetailButton />
												</IconButton>,
											]}
										</TableCell>
									</TableRow>
								))
						: null}
				</TableBody>

				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							colSpan={12}
							count={dataOb.length}
							rowsPerPage={rowsPerPage}
							page={page}
							SelectProps={{
								inputProps: { "aria-label": "Rows per page" },
								native: true,
							}}
							style={{ color: "red" }}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</Paper>
	);
}

RequestedDriverTableGrocery.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RequestedDriverTableGrocery);
