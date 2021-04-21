
import React from 'react';

import Basecomponent from './BaseComponent'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Grid from '@material-ui/core/Grid';
import * as StringKeys from '../res/StringKeys';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import * as ResourcesConstants from '../res/ResourcesConstants';
import moment from 'moment';
import 'react-day-picker/lib/style.css';
import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default class CommonDatePicketBtn extends Basecomponent {

    constructor(props) {
        super(props)
        this.state = {
            startDate: undefined,
            strDateVaule: undefined,
            selectedDay: undefined,
        }
    }


    handleDateChange(date) {

        this.setState({
            selectedDate: date
        })
    }

    getPickerValue = (value) => {
        console.log(value);
    }

    handleChange(date, value) {

        this.setState({
            startDate: date
        });
        const dateString = Date(date).toString();
        var momentObj = moment(dateString);
        var momentString = momentObj.format('DD-MM-YYYY'); // 2016-07-15
        console.log('startDate: ', momentString)
        this.props.listenDate(momentString)
    }

    handleDayChange(day) {
        // this.setState({ selectedDay: day });
        const dateString = Date(day).toString();
        var momentObj = moment(dateString);
        var momentString = momentObj.format('DD-MM-YYYY'); // 2016-07-15
        console.log('startDate: ', momentString)
    }

    handleSubmit(e) {
        e.preventDefault();
        let main = this.state.startDate
        console.log(main.format('L'));
    }



    render() {
        const { required,
            placeholderText, style, xs,
            disabled,
            id,
            autoComplete,
            label,
            fullWidth,
            type,
            value,
            onChange,
            variant,
            error,
            editable,
            helperText, fieldStyle,
            strDateVaule,
            maxLengthVal
        } = this.props;

       // const classess = useStyles();

        return (
            <Grid item xs={xs} alignItems="center"
                style={style}
                container spacing={500}

            >
                {/* <div xs={xs} class="col-sm-10" style={{}}>

                 <DayPickerInput class="col-sm-10" onDayChange={this.handleDayChange} /> */}

                <TextField
                    id="date"
                    label={placeholderText}
                    type="date"
                    variant="outlined"
                    value={this.props.strDateVaule}
                    defaultValue={this.props.strDateVaule}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(date) => this.handleChange(date, date.toString())}
                    fullWidth={fullWidth}
                    autoComplete={autoComplete}
                    autoCapitalize='words'
                    inputProps={{
                        maxLength: maxLengthVal,
                        autoCapitalize: 'words',
                    }}
                />

            </Grid>
        );
    }

}
