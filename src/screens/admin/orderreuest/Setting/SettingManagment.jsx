/** @format */
import React from "react";
import BaseComponent from "../../../../common/BaseComponent";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import * as types from "../../../../actions/types";
import { withStyles } from "@material-ui/core/styles";
import CommonButton from "../../../../common/CommonButton";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import makeAnimated from "react-select/animated";
import * as StringKeys from "../../../../res/StringKeys";
import * as Constants from "../../../../utils/Constants";
import { reqSettingManagmentForAdmin } from "../../../../actions";

let TEXTFIELD_XS = 12;
const animatedComponents = makeAnimated();
class SettingManagment extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {
			fields: {
				email: "",
				contect: "",
				groseryOrder: "",
				restaurantOrder: "",
				weburl: "",
				distance: "",
			},
		};
	}
	handleResponse = (nextProps) => {
		var respObj = null;
		if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			respObj = {
				disabledClickedBtn: false,
				[Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS],
			};
			this.setState(respObj);
		} else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
			if (nextProps[Constants.KEY_TYPE] === types.API_URL_SETTING_MANAGMENT) {
				respObj = {
					[Constants.KEY_SHOW_PROGRESS]: false,
					[Constants.KEY_DATA]:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA],
					email: nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA]["email"],
					contect:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							"support_mobile"
						],
					groseryOrder:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							"max_order_accept_grocery_driver"
						],
					restaurantOrder:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							"max_order_accept_restro_driver"
						],
					weburl:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							"website_url"
						],
					distance:
						nextProps[Constants.KEY_RESPONSE][Constants.KEY_DATA][
							"max_distance_order"
						],
				};
				console.log("respObj", respObj);
				this.setState(respObj);
			}
		}
	};

	handleChange = (field, e) => {
		let fields = this.state.fields;
		fields[field] = e.target.value;
		this.setState({ fields });
	};
	contactSubmit(e) {
		const { fields, ...inputField } = this.state;
		console.log("input field", inputField);
		e.preventDefault();
	}

	render() {
		const { classes } = this.props;

		return (
			<div>
				<div className={classes.appBarSpacer} />

				<Form
					style={{ marginLeft: "10%" }}
					onSubmit={this.contactSubmit.bind(this)}>
					<Row className="p-5" form>
						<Col md={5} className="m-2">
							<FormGroup>
								<Label for="exampleEmail">Email</Label>
								<Input
									type="email"
									name="email"
									id="exampleEmail"
									placeholder="Enter email address"
									required
									value={this.state.email}
									onChange={this.handleChange.bind(this, "email")}
								/>
							</FormGroup>
						</Col>
						<Col md={5} className="m-2">
							<FormGroup>
								<Label for="contect">Support Number</Label>
								<Input
									type="text"
									name="contect"
									id="examplePassword"
									placeholder="Enter password"
									value={this.state.contect}
									onChange={this.handleChange.bind(this, "contect")}
									pattern=" /^(+?d{1,4}[s-])?(?!0+s+,?$)d{10}s*,?$)/"
								/>
							</FormGroup>
						</Col>
						<Col md={5} className="m-2">
							<FormGroup>
								<Label for="groceryOrder">
									Maximum Grocery Order Accept By Driver
								</Label>
								<Input
									type="text"
									name="groceryOrder"
									id=""
									placeholder="Maximum Grocery Order"
									value={this.state.groseryOrder}
									onChange={this.handleChange.bind(this, "groseryOrder")}
								/>
							</FormGroup>
						</Col>
						<Col md={5} className="m-2">
							<FormGroup>
								<Label for="restaurantOrder">
									Maximum Restaurant Order Accept By Driver
								</Label>
								<Input
									type="text"
									name="restaurantOrder"
									id=""
									placeholder="Maximum Restaurant Order"
									value={this.state.restaurantOrder}
									onChange={this.handleChange.bind(this, "restaurantOrder")}
								/>
							</FormGroup>
						</Col>
						<Col md={5} className="m-2">
							<FormGroup>
								<Label for="weburl">Website Url</Label>
								<Input
									type="text"
									name="weburl"
									id=""
									placeholder="website url"
									value={this.state.weburl}
									onChange={this.handleChange.bind(this, "weburl")}
									pattern="/(http(s)?://.)?(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g"
								/>
							</FormGroup>
						</Col>
						<Col md={5} className="m-2">
							<FormGroup>
								<Label for="distance">
									Maximum Distance For Order Request(Air distance in Km)
								</Label>
								<Input
									type="text"
									name="distance"
									id=""
									placeholder="Air distance in Km"
									value={this.state.distance}
									onChange={this.handleChange.bind(this, "distance")}
								/>
							</FormGroup>
						</Col>

						<Col md={3} class="col-sm-1">
							<Grid item xs={TEXTFIELD_XS} style={{ marginTop: 30 }}>
								<CommonButton
									type="submit"
									fullWidth={false}
									variant="contained"
									color="secondary"
									className={classes.submit}
									label={this.strings(StringKeys.Save)}
									onClick={this.getRequestSetting.bind(this)}
								/>
							</Grid>
						</Col>
					</Row>
				</Form>
			</div>
		);
	}
	getRequestSetting = () => {
		let data = {};
		this.props.reqSettingManagmentForAdmin(data, this);
	};
}

const styles = (theme) => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarSpacer: theme.mixins.toolbar,
	tableContainer: {
		height: 320,
	},
	h5: {
		marginBottom: theme.spacing.unit * 2,
	},
});
SettingManagment.propTypes = {
	classes: PropTypes.object.isRequired,
};
function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps, {
	reqSettingManagmentForAdmin,
})(withStyles(styles)(SettingManagment));
