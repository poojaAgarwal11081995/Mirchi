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
import DetailButton from "@material-ui/icons/RemoveRedEye";
import IconButton from "@material-ui/core/IconButton";
import * as Constants from "../utils/Constants";
import { Link } from "react-router-dom";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import * as types from "../actions/types";
import * as StringKeys from "../res/StringKeys";
import * as Utility from "../utils/Utility";
import moment from "moment";

import CommonDropDown from "../common/CommonDropDown";
import CommonStyle from "../res/CommonStyles";

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

function DashboardGroceryItem(props) {
	const { classes, dataOb, context } = props;

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, dataOb.length - page * rowsPerPage);
	const [data, setData] = React.useState(props.dataOb);

	const [options, setOptions] = React.useState([
		Constants.ORDER_STATUS_STR_PENDING,
		Constants.ORDER_STATUS_STR_APPROVED,
		Constants.ORDER_STATUS_STR_DECLINED,
	]);

	useEffect(() => {
		// navigate_key = context.props.location[Constants.KEY_DATA];

		setData(props.dataOb);
		setPage(0);
	}, [props.dataOb]);
	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}

	function handleChangeValue(e, index, n) {
		let STATUS = Utility.getRequestKey1(e);
		let req = {
			[Constants.KEY_UNDERSCORE_ID]: n._id,
			[Constants.KEY_STATUS]: STATUS,
		};
		context.updateStatus(req);
	}

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell align="justify" style={CommonStyle.tableRowHeader}>
							{context.strings(StringKeys.Grocery_Store_Name)}
						</TableCell>
						<TableCell align="center" style={CommonStyle.tableRowHeader}>
							Created At
						</TableCell>
						<TableCell align="center" style={CommonStyle.tableRowHeader}>
							{context.strings(StringKeys.Phone)}
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
											{n.store_name}
										</TableCell>
										<TableCell align="center">
											{moment(n.createdAt).format("YYYY-MM-DD")}
										</TableCell>
										<TableCell align="center">{n.phone}</TableCell>
										<TableCell align="center">
											{n.city != undefined ? n.city.name : ""}
										</TableCell>
										<TableCell align="center">
											{[
												<CommonDropDown
													value={n.status}
													onChange={(value) => {
														handleChangeValue(value, index, n);
													}}
													options={options}></CommonDropDown>,
											]}
										</TableCell>

										<TableCell align="center">
											{[
												<IconButton
													aria-label="Detail"
													onClick={() => {
														context.navigateGroceryDetails(
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
							count={data.length}
							rowsPerPage={rowsPerPage}
							page={page}
							SelectProps={{
								inputProps: { "aria-label": "Rows per page" },
								native: true,
							}}
							style={{ color: "red" }}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
							// ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</Paper>
	);

	function handleResponse(nextProps) {
		var respObj = null;
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		} else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (nextProps[Constants.KEY_TYPE] === types.API_GROCERY_LIST) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							Constants.KEY_GROCERY_LIST
						],
				};
				this.setState(respObj);
			} else if (nextProps[Constants.KEY_TYPE] === types.API_DELETE_GROCERY) {
				respObj = { [Constants.KEY_SHOW_PROGRESS]: false };
				this.setState(respObj);
				context.getGroceryList();
			}
		}
	}

	function deleteRestro(id) {
		alert(JSON.stringify(props));
		var data = {
			[Constants.KEY_UNDERSCORE_ID]: id,
		};
		//this.props.reqDeleteRestro(data, this)
	}
}

DashboardGroceryItem.propTypes = {
	classes: PropTypes.object.isRequired,
};
function mapStateToProps({ response }) {
	return response;
}
export default withStyles(styles)(DashboardGroceryItem);
//export default connect(mapStateToProps, { reqDeleteRestro })(withStyles(styles)(SimpleTable));
