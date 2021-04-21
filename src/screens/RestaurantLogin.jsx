/** @format */

import React, { Component } from "react";
import { FormControl } from '@material-ui/core';
import CommonButton from "../common/CommonButton";
import CommonTextField from "../common/CommonTextField";
import { reqRestroLogin } from "../actions";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as Colors from "../res/Colors";
import * as Constants from "../utils/Constants";
import { withStyles } from "@material-ui/styles";
import { Redirect } from "react-router-dom";
import { connect } from "redux";
export default class RestaurantLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password="",
            emailError: false,
			passwordError: false,
        }
    }
    handleClick = (Transition) => {
		this.setState({
			iserror: true,
			errorText: Transition,
		});
	};

	handleChange = (input) => (e) => {
		console.log("input", input);
		console.log("value", e.target.value);
		this.setState({
			[input]: e.target.value,
		});
    };
    checkValidation = (event) => {
		event.preventDefault();
		const { email, password } = this.state;
        const data = new FormData(event.target)
        fetch('URL', {
            method: "POST",
            body:data
        })
        if (data.get('email') === { email } && data.get('password') === { password }) {
            <Redirect to="/" />
        }
		
    };
    
    error = (message) => (
		<FormHelperText style={{ color: "red" }}>{message}</FormHelperText>
	);
	render() {
        return <div>
            <form>
                <FormControl>
                <CommonTextField
									id="email"
									label="Email"
									required
									className={classes.textField}
									value={email}
									type="email"
									onChange={this.handleChange("email")}
									margin="normal"
									autoFocus
                    />
                    	{this.state.emailError && this.error("invalid Email")}
                </FormControl>
                <FormControl margin="normal" fullWidth>
								<CommonTextField
									id="password"
									label="Password"
									required
									className={classes.textField}
									type="password"
									autoComplete="current-password"
									value={password}
									onChange={this.handleChange("password")}
									margin="normal"
								/>
								{this.state.passwordError && this.error("invalid Password")}
                </FormControl>
                <CommonButton
								type="submit"
								fullWidth={true}
								variant="contained"
								color={Colors.KEY_PRIMARY}
								className={classes.submit}
								onClick={this.checkValidation}
								label={this.strings(StringKeys.Login)}
							/>
            </form>
        </div>;
    }
    navigate() {
		this.props.history.push({
			pathname: Constants.SCREEN_ADD_RESTAURENT_ON_RESTRO,
		});
	}
    handleResponse = (nestProps) => {
        console.log(nestProps);
        let resObj = null
        if (nestProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
			resObj = {
				[Constants.KEY_SHOW_PROGRESS]: nestProps[Constants.KEY_SHOW_PROGRESS],
			};
        }
      this.setState(resObj)
    }
}
const styles = (theme) => ({
	main: {
		width: "auto",
		display: "block", 
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: "auto",
			marginRight: "auto",
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
			theme.spacing.unit * 3
		}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%",
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
	language: {
		marginLeft: 10,
	},
	link: {
		textDecoration: "none",
		color: "secondary",
	},
	mainView: {
		display: "flex",
		height: "100vh",
		width: "100vw",
	},
});

RestaurantLogin.propTypes = {
	classes: PropTypes.object.isRequired,
};
` `;

function mapStateToProps({ response }) {
	return response;
}
export default connect(mapStateToProps(reqRestroLogin))(withStyles(styles)(RestaurantLogin))
