/**
 * /* eslint-disable no-script-url
 *
 * @format
 */

import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import IconButton from "@material-ui/core/IconButton";
import Title from "./TitleChart";
import * as Utility from "../../utils/Utility";
import * as Constants from "../../utils/Constants";
import * as CustomStorage from "../../utils/CustomStorage";
// import OrderPast from "../../screens/admin/orderreuest/OrderPast";
// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
	return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
	createData(
		0,
		"16 Mar, 2019",
		"Elvis Presley",
		"Tupelo, MS",
		"VISA ⠀•••• 3719",
		312.44,
	),
	createData(
		1,
		"16 Mar, 2019",
		"Paul McCartney",
		"London, UK",
		"VISA ⠀•••• 2574",
		866.99,
	),
	createData(
		2,
		"16 Mar, 2019",
		"Tom Scholz",
		"Boston, MA",
		"MC ⠀•••• 1253",
		100.81,
	),
	createData(
		3,
		"16 Mar, 2019",
		"Michael Jackson",
		"Gary, IN",
		"AMEX ⠀•••• 2000",
		654.39,
	),
	createData(
		4,
		"15 Mar, 2019",
		"Bruce Springsteen",
		"Long Branch, NJ",
		"VISA ⠀•••• 5919",
		212.79,
	),
];

const useStyles = makeStyles((theme) => ({
	seeMore: {
		marginTop: theme.spacing(3),
	},
}));

export default function ChartOrders(props) {
	const classes = useStyles();

	{
		console.log("props:::::", props.props);
	}

	return (
		<React.Fragment>
			<Title>Recent Restaurant Orders</Title>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell align="center">Restaurant Name</TableCell>
						<TableCell align="center">Order Number</TableCell>
						<TableCell align="center">Total Price</TableCell>
						<TableCell align="center">Order Id</TableCell>
						<TableCell align="center">Created At</TableCell>
						<TableCell align="center">Status</TableCell>
						<TableCell align="center">Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props[Constants.KEY_DATA] != undefined &&
					props[Constants.KEY_DATA][Constants.KEY_TODAY_ORDERS] != undefined &&
					props[Constants.KEY_DATA][Constants.KEY_TODAY_ORDERS].length > 0
						? props[Constants.KEY_DATA][Constants.KEY_TODAY_ORDERS].map(
								(n, index) => (
									<TableRow key={n._id}>
										<TableCell align="center">
											{n[Constants.KEY_RETSRO_DETAILS] != undefined &&
												n[Constants.KEY_RETSRO_DETAILS][Constants.KEY_NAME]}
										</TableCell>
										<TableCell align="center">
											{n[Constants.KEY_ORDER_NUMBER]}
										</TableCell>
										<TableCell align="center">
											{n.total_price.toFixed(2)}
										</TableCell>
										<TableCell align="center">{n._id}</TableCell>
										<TableCell align="center">
											{n.createdAt != undefined
												? Utility.convertStrDateFormat(
														n.createdAt,
														Constants.DATE_FORMAT_COMING_FROM_SERVER,
														Constants.DATE_FORMAT_SHOW_WITH_TIME,
												  )
												: ""}
										</TableCell>
										<TableCell align="center">
											{Utility.getStatusValue(n.status) + ""}
										</TableCell>
										<TableCell align="center">
											{[
												<Link
													color="primary"
													href="javascript:;"
													onClick={() => {
														// CustomStorage.setSessionDataAsObject(
														//     Constants.KEY_RESTO_ID, n[Constants.KEY_RESTO_ID]);
													}}>
													<IconButton
														aria-label="CheckOrders"
														onClick={() => {
															CustomStorage.setSessionDataAsObject(
																Constants.KEY_RESTO_ID,
																n[Constants.KEY_RETSRO_DETAILS][
																	Constants.KEY_UNDERSCORE_ID
																],
															);
															props.props.history.push({
																pathname: Utility.isAdmin()
																	? Constants.SCREEN_SCREEN_CHECK_REQUEST
																	: Constants.SCREEN_DASHBOARD_RESTRO,
															});
														}}>
														<EyeIcon />
													</IconButton>
												</Link>,
											]}
										</TableCell>
									</TableRow>
								),
						  )
						: null}
				</TableBody>
			</Table>
			{/* <div className={classes.seeMore}>
                <Link to={Constants.SCREEN_SCREEN_CHECK_REQUEST} color="primary" href="javascript:;" onClick={() => {
                   
                }}  >
                    View Requested Restaurant
        </Link>
            </div> */}
		</React.Fragment>
	);
}
