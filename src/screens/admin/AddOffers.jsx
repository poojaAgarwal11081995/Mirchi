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
import * as StringKeys from '../../res/StringKeys';
import * as Constants from '../../utils/Constants';
import * as ResourcesConstants from '../../res/ResourcesConstants';
import { connect } from 'react-redux';
import * as types from '../../actions/types';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import CommonGridTextField from '../../common/CommonGridTextField';
import * as Utility from '../../utils/Utility';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import CustomPBar from '../../common/CustomPBar';
import IntegrationReactSelect from './IntegrationReactSelect';
import { sizing } from '@material-ui/system';

let TEXTFIELD_XS = 12;
let TEXTFIELD_MARGINTOP = 0;
class AddOffers extends BaseComponent {
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
            errorText: 'Empty field',
            iserror: false,
            [Constants.KEY_SHOW_PROGRESS]: false,
            [Constants.KEY_IMAGE_UPLOAD]: null,

        };
    }

    ImagePress = e => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        this.setState({ [Constants.KEY_IMAGE_UPLOAD]: file });
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

    onChange(event) {
        if (event.target.value.length > 0) {
            this.setState({ errorText: '' })
        } else {
            this.setState({ errorText: 'Invalid format: ###-###-####' })
        }
    }

    componentDidMount() {
        console.warn('componentDidMount')
    }

    componentWillUpdate() {
        console.warn('componentWillUpdate')
    }

    shouldComponentUpdate(nextProps, nextState) {
        ///console.warn('shouldComponentUpdate', nextState)
        return nextProps.isFavourite != this.props.isFavourite;
    }


    TransitionDown(props) {

        return <Slide {...props} direction="down" />;
    }
    handleClick = (Transition) => {
        //  alert(Transition)
        this.setState({
            iserror: true,
            errorText: Transition
        });
    };


    handleClose = () => {
        this.setState({ iserror: false });
    };
    handleExited = () => {

        // this.processQueue();
    };

    render() {
        const { classes } = this.props;
        const { image, name, address, lat, lng, state, city, country, pincode, phone, email,
            errorText, iserror,
        } = this.state;
        return (
            <Fragment>
                <div>
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

                        <CommonGridTextField
                            required
                            xs={TEXTFIELD_XS}
                            style={{ marginTop: TEXTFIELD_MARGINTOP, }}
                            id="restaurantName"
                            label={this.strings(StringKeys.Restaurant_Name)}
                            fullWidth
                            className={classes.textField}
                            value={name}
                            onChange={this.handleChange(Constants.KEY_NAME)}
                            autoComplete="resname"
                            variant="outlined"
                            fieldStyle={classes.fieldHeight}
                        />

                        <CommonGridTextField
                            required
                            xs={TEXTFIELD_XS}
                            style={{ marginTop: TEXTFIELD_MARGINTOP, }}
                            id="email"
                            fullWidth
                            label={this.strings(StringKeys.Email)}
                            className={classes.textField}
                            value={email}
                            variant="outlined"
                            onChange={this.handleChange(Constants.KEY_EMAIL)}
                        />

                        <CommonGridTextField
                            required
                            xs={TEXTFIELD_XS}
                            style={{ marginTop: TEXTFIELD_MARGINTOP, }}
                            id="phone"
                            fullWidth
                            label={this.strings(StringKeys.Phone)}
                            className={classes.textField}
                            value={phone}
                            onChange={this.handleChange(Constants.KEY_PHONE)}
                            variant="outlined"
                        />



                        <CommonGridTextField
                            required
                            xs={TEXTFIELD_XS}
                            style={{ marginTop: TEXTFIELD_MARGINTOP, }}
                            id="address1"
                            fullWidth
                            autoComplete="address-line1"
                            label={this.strings(StringKeys.Address_Line_1)}
                            className={classes.textField}
                            value={address}
                            onChange={this.handleChange(Constants.KEY_ADDRESS_1)}
                            variant="outlined"
                        />
                        <CommonGridTextField
                            required
                            xs={TEXTFIELD_XS}
                            style={{ marginTop: TEXTFIELD_MARGINTOP, }}
                            id="city"
                            fullWidth
                            autoComplete="address-level2"
                            label={this.strings(StringKeys.City)}
                            className={classes.textField}
                            value={city}
                            onChange={this.handleChange(Constants.KEY_CITY)}
                            variant="outlined"
                        />

                        <CommonGridTextField
                            required
                            xs={TEXTFIELD_XS}
                            style={{ marginTop: TEXTFIELD_MARGINTOP, }}
                            id="state"
                            fullWidth
                            label={this.strings(StringKeys.State_Provider_Region)}
                            className={classes.textField}
                            value={state}
                            onChange={this.handleChange(Constants.KEY_STATE)}
                            variant="outlined"
                        />
                        <CommonGridTextField
                            required
                            xs={TEXTFIELD_XS}
                            style={{ marginTop: TEXTFIELD_MARGINTOP, }}
                            id="zip"
                            fullWidth
                            autoComplete="billing postal-code"
                            label={this.strings(StringKeys.Zip)}
                            className={classes.textField}
                            value={pincode}
                            onChange={this.handleChange(Constants.KEY_ZIP)}
                            variant="outlined"
                        />
                        <CommonGridTextField
                            required
                            xs={TEXTFIELD_XS}
                            style={{ marginTop: TEXTFIELD_MARGINTOP, }}
                            id="country"
                            fullWidth
                            autoComplete="billing country"
                            label={this.strings(StringKeys.Country)}
                            className={classes.textField}
                            value={country}
                            onChange={this.handleChange(Constants.KEY_COUNTRY)}
                            variant="outlined"
                        />
                        <Grid item xs={TEXTFIELD_XS} alignItems="center"
                            style={{ marginTop: 20 }}
                        >
                            <IntegrationReactSelect
                            ></IntegrationReactSelect>
                        </Grid>

                    </Grid>
                    <CommonButton
                        type="submit"
                        fullWidth={false}
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={this.checkVaidation}
                        label={this.strings(StringKeys.Save)}

                    />



                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.iserror}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                        onExited={this.handleExited}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{errorText}</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={this.handleClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]
                        }
                    />


                </div>
                <CustomPBar showProgress={this.state[Constants.KEY_SHOW_PROGRESS]} />
            </Fragment >
        )
    }



    checkVaidation = event => {
        event.preventDefault();
        let msg = "";
        const {
            name, email, address, pincode, lat, lng,
            state, city, country, phone, } = this.state;

        if (Utility.checkVaidation(this.state, this)) {
            this.addRestaurentReq();
        }

    }


    addRestaurentReq = event => {
        //  event.preventDefault();
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
            image_upload,
        } = this.state;

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
        if (image_upload !== null && image_upload !== undefined) {
            data[Constants.KEY_IMAGE] = image_upload;
            console.log('image for uploading 2 ', data);
        }

        this.props.reqAddRestrorent(data, this)

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
    fieldHeight: {
        height: 50,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    editFildSpace: {
        margin: 1000,
    },

});
AddOffers.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({ response }) {
    return response;
}

export default connect(mapStateToProps, { reqAddRestrorent })(withStyles(styles)(AddOffers));

