import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SimpleTable from './SimpleTable';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { reqAddRestrorent } from '../../actions';
import BaseComponent from '../../common/BaseComponent';
import CommonButton from '../../common/CommonButton';
import CommonTextField from '../../common/CommonTextField';
import Utility from '../../utils/Utility';
import * as StringKeys from '../../res/StringKeys';
import * as Constants from '../../utils/Constants';
import * as ResourcesConstants from '../../res/ResourcesConstants';
import { connect } from 'react-redux';
import * as types from '../../actions/types';
import Avatar from '@material-ui/core/Avatar';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';


class AddRestaurent extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
            [Constants.KEY_IMAGE]: null,
            [Constants.KEY_NAME]: '',
            [Constants.KEY_EMAIL]: '',
            [Constants.KEY_ADDRESS_1]: '',
            [Constants.KEY_ADDRESS_2]: '',
            [Constants.KEY_CITY]: '',
            [Constants.KEY_STATE]: '',
            [Constants.KEY_ZIP]: '',
            [Constants.KEY_PHONE]: '',
            [Constants.KEY_ADDRESS]: '',
            [Constants.KEY_LAT]: 26.5621,
            [Constants.KEY_LNG]: 75.8851,

        };
    }

    ImagePress = e => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({ [[Constants.KEY_IMAGE]]: reader.result });
        };
        reader.readAsDataURL(file);
    }

    handleChange = input => e => {
        console.log('input', input)
        console.log('value', e.target.value)
        this.setState({
            [input]: e.target.value
        })
    }

    // handleChange = (event) => {
    //     const email = event.target.value;
    //     this.setState({ email });
    // }

    handleSubmit = () => {
        // your submit logic
    }

    componentDidMount() {
        ///  Utility.isValidName()
    }

    render() {
        const { classes } = this.props;
        const { image, name, address, lat, lng, state, city, country, pincode, phone, email } = this.state;
        return (
            <Fragment>
                <div className={classes.appBarSpacer} />

                <Grid container spacing={5}>
                    <Grid item xs={12} alignItems="center">
                        <div >
                            <div className={classes.bigAvatar} onClick={(e) => this.fileInput.click()}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={(image !== null) ? image : ResourcesConstants.ic_user}
                                    className={classes.bigAvatar} />
                            </div>
                            <input
                                ref={fileInput => this.fileInput = fileInput}
                                type="file"
                                style={{ display: 'none' }}
                                accept=".png, .jpg, .jpeg"
                                onChange={this.ImagePress}
                            />
                        </div>
                    </Grid>
                    <ValidatorForm item xs={8} style={{ marginLeft: 5, width: '70%' }}
                        ref="form"
                        onSubmit={this.handleSubmit}
                        onError={errors => console.log(errors)}
                    >

                        <TextValidator
                            required
                            label={this.strings(StringKeys.Restaurant_Name)}
                            fullWidth={true}
                            onChange={this.handleChange(Constants.KEY_NAME)}
                            name="restaurantName"
                            value={name}
                            validators={['required', 'isuserName']}
                            errorMessages={['this field is required', 'resto is not valid']}
                        />

                        <TextValidator
                            required
                            label={this.strings(StringKeys.Email)}
                            fullWidth={true}
                            onChange={this.handleChange(Constants.KEY_EMAIL)}
                            name="email"
                            value={email}
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                        />

                    </ValidatorForm>


                </Grid>
                <CommonButton
                    type="submit"
                    fullWidth={false}
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={this.addRestaurentReq}
                    label={this.strings(StringKeys.Save)}
                //  disabled={true}
                />
            </Fragment >

        )
    }

    addRestaurentReq = event => {
        event.preventDefault();
        const {
            name,
            email,
            address,
            pincode,
            lat,
            lng,
            state,
            city,
            country,
            phone,
        } = this.state;
        if (email != undefined && name != undefined) {
            var data = {
                [Constants.KEY_NAME]: name,
                [Constants.KEY_EMAIL]: email,
                [Constants.KEY_PHONE]: phone,
                [Constants.KEY_ADDRESS]: address,
                [Constants.KEY_CITY]: city,
                [Constants.KEY_STATE]: state,
                [Constants.KEY_ZIP]: pincode,
                [Constants.KEY_COUNTRY]: country,
                [Constants.KEY_LAT]: lat,
                [Constants.KEY_LNG]: lng
            }
            this.props.reqAddRestrorent(data, this)
        }

    }


    handleResponse = (nextProps) => {
        var respObj = null;
        if (nextProps.hasOwnProperty(Constants.KEY_SHOW_PROGRESS)) {
            respObj = { disabledClickedBtn: false, [Constants.KEY_SHOW_PROGRESS]: nextProps[Constants.KEY_SHOW_PROGRESS] };
            this.setState(respObj)
        }
        else if (nextProps.hasOwnProperty(Constants.KEY_RESPONSE)) {
            if (nextProps[Constants.KEY_TYPE] === types.API_ADDRESTRO) {
                respObj = { [Constants.KEY_SHOW_PROGRESS]: false, disabledClickedBtn: false };
                this.setState(respObj);
                alert(JSON.stringify(nextProps))
                this.goBack();
            }
        }

    }

}

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    tableContainer: {
        height: 320,
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
    bigAvatar: {
        margin: 10,
        width: 100,
        height: 100,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    }
});
AddRestaurent.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
    return response;
}

export default connect(mapStateToProps, { reqAddRestrorent })(withStyles(styles)(AddRestaurent));

