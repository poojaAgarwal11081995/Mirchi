import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as Constants from '../utils/Constants';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import * as CustomStorage from '../utils/CustomStorage';
import * as StringKeys from '../res/StringKeys';
import CommonGridTextField from '../common/CommonGridTextField';
import * as Colors from '../res/Colors'
//import { makeStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles'
import * as Utility from '../utils/Utility';

const styles = {
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    marginFBottom: {
        marginBottom: 15,
    },
};

const useStyles = makeStyles(theme => ({
    root: {
        margin: 'auto',
    },
    cardHeader: {
        padding: theme.spacing(1, 2),
    },
    list: {
        width: 200,
        height: 230,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));

let id = 0;

function getHeaderModel(context) {
    let fareOptions = [{ [Constants.KEY_NAME]: context.strings(StringKeys.MinKm) },
    { [Constants.KEY_NAME]: context.strings(StringKeys.MaxKm) },
    { [Constants.KEY_NAME]: context.strings(StringKeys.MinOrderAmount) },
    { [Constants.KEY_NAME]: context.strings(StringKeys.MaxOrderAmount) },
    { [Constants.KEY_NAME]: context.strings(StringKeys.DileveryCharge) },
    { [Constants.KEY_NAME]: context.strings(StringKeys.Action) }
    ];

    return fareOptions;
}


function getFareModelItem(newMin) {
    let fareOptions = {
        [Constants.KEY_MIN_KM]: newMin != undefined ? newMin : 0,
        [Constants.KEY_MAX_KM]: 0,
        [Constants.KEY_MIN_ORDER_AMOUNT]: 0,
        [Constants.KEY_MAX_ORDER_AMOUNT]: 0,
        [Constants.KEY_DILEVERY_CHARGE]: 0,
        [Constants.KEY_FARE]: 0,
    };
    return fareOptions;
}

function DileveryChargeLoadMoreTable(props) {
    //data = props.data == undefined ? [] : props.data,
    const { classes, dataObj, context, child } = props;
    const [headerData, setheaderData] = React.useState(getHeaderModel(props.context));
    const [min_km, setMin] = React.useState(0);
    const [max_km, setMax] = React.useState(0);
    // const [min_order_amount, setMinOrderAmount] = React.useState(0);
    // const [max_order_amount, setMaxOrderAmount] = React.useState(0);
    const [data, setData] = React.useState([]);
    const [fare, setFare] = React.useState(0);
    const TEXTFIELD_MARGINTOP = 10;
    const TEXTFIELD_MARGINBOTTOM = 10;
    const TEXTFIELD_XS = 12;

    const deleteEditRow = (data) => {
        alert(JSON.stringify(data))
    }


    const setDataValue = (newMin) => {
        let dataonj = getFareModelItem(newMin);
        var array = [...data];
        array.push(dataonj)
        setData(array)
    }

    const updateDataValue = (input) => {
        let dataonj = getFareModelItem();
        data.push(dataonj)
        setData(data)
    }

    const deleteDataValue = (index) => {
        if (data.length != 1) {
            var array = [...data];
            if (index !== -1) {
                array.splice(index, 1);
                setData(array)
            }
        }
    }

    const setMinValue = (index, e) => {
        e.preventDefault();
        console.log('max value ', e.target.value)
        var array = [...data];
        let item = array[index];
        item[Constants.KEY_MIN_KM] = e.target.value;
        array[index] = item;
        console.log('min value ', JSON.stringify(array))
        setData(array)
    }

    const setMaxValue = (index, e) => {
        e.preventDefault();
        console.log('max value ', e.target.value)
        var array = [...data];
        let item = array[index];
        item[Constants.KEY_MAX_KM] = e.target.value;
        array[index] = item;
        console.log('max value ', JSON.stringify(array))
        setData(array)

    }
    const setFareValue = (index, e) => {
        e.preventDefault();
        console.log('max value ', e.target.value)
        var array = [...data];
        let item = array[index];
        item[Constants.KEY_FARE] = e.target.value;
        array[index] = item;
        console.log('fare value ', JSON.stringify(array))
        setData(array)

    }

    const setMinOrderAmount = (index, e) => {
        e.preventDefault();
        console.log('min value ', e.target.value)
        var array = [...data];
        let item = array[index];
        item[Constants.KEY_MIN_ORDER_AMOUNT] = e.target.value;
        array[index] = item;
        console.log('min value ', JSON.stringify(array))
        setData(array)
    }

    const setMaxOrderAmount = (index, e) => {
        e.preventDefault();
        console.log('max value ', e.target.value)
        var array = [...data];
        let item = array[index];
        item[Constants.KEY_MAX_ORDER_AMOUNT] = e.target.value;
        array[index] = item;
        console.log('max value ', JSON.stringify(array))
        setData(array)
    }
    const setDilevery = (index, e) => {
        e.preventDefault();
        console.log('max value ', e.target.value)
        var array = [...data];
        let item = array[index];
        item[Constants.KEY_FARE] = e.target.value;
        array[index] = item;
        console.log('max value ', JSON.stringify(array))
        setData(array)
    }


    useEffect(function () {
        if (data.length == 0) {
            setData((dataObj))
        }

        //setheaderData(getHeaderModel(props.context))

    });

    const getDataValue = () => {
        //   return data;
        alert();
    }



    return (
        <div child={this} className={classes.root}
            style={{ marginLeft: 15, marginTop: 15, flexDirection: 'column' }}>
            <label >{context.strings(StringKeys.PerOrderCharge)}</label>

            <Paper className={classes.root} style={{ paddingBottom: 0, boxShadow: 0 }}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow key={'header_row'}>
                            {headerData.map((headerObj, index) =>
                                <TableCell align={"center"}>{headerObj[Constants.KEY_NAME]}
                                </TableCell>
                            )}
                        </TableRow>

                    </TableHead>


                    <TableBody>

                        {(data != undefined && data != null && data.length > 0) && data.map((dataObj, index) => (
                            <TableRow key={dataObj[Constants.KEY_MIN_KM]} >

                                <TableCell align="center" >
                                    <CommonGridTextField
                                        xs={TEXTFIELD_XS}
                                        style={{
                                            marginTop:
                                                TEXTFIELD_MARGINTOP
                                        }}
                                        id="minkm"
                                        label={""}
                                        required={false}
                                        disabled={true}
                                        fullWidth
                                        className={classes.textField}
                                        value={dataObj[Constants.KEY_MIN_KM]}
                                        onChange={(event) => setMinValue(index, event)}
                                        autoComplete="resname"
                                        variant="outlined"
                                        maxLengthVal={5}
                                        type={"number"}
                                        fieldStyle={classes.fieldHeight}
                                    />
                                </TableCell>

                                <TableCell align="center">
                                    <CommonGridTextField
                                        xs={TEXTFIELD_XS}
                                        style={{ marginTop: TEXTFIELD_MARGINTOP, }}
                                        id="max"
                                        label={""}
                                        fullWidth
                                        required={index <= data.length - 2 ? false : true}
                                        disabled={index <= data.length - 2 ? true : false}
                                        className={classes.textField}
                                        value={(dataObj[Constants.KEY_MAX_KM])}
                                        onChange={(event) => setMaxValue(index, event)}
                                        autoComplete="resname"
                                        variant="outlined"
                                        maxLengthVal={100}
                                        type={"number"}
                                        fieldStyle={classes.fieldHeight}
                                    />
                                </TableCell>


                                <TableCell align="center" >
                                    <CommonGridTextField
                                        xs={TEXTFIELD_XS}
                                        style={{
                                            marginTop:
                                                TEXTFIELD_MARGINTOP
                                        }}
                                        id="min_order"
                                        label={""}
                                        required={index <= data.length - 2 ? false : true}
                                        disabled={index <= data.length - 2 ? true : false}
                                        fullWidth
                                        className={classes.textField}
                                        value={dataObj[Constants.KEY_MIN_ORDER_AMOUNT]}
                                        onChange={(event) => setMinOrderAmount(index, event)}
                                        autoComplete="resname"
                                        variant="outlined"
                                        maxLengthVal={5}
                                        type={"number"}
                                        fieldStyle={classes.fieldHeight}
                                    />
                                </TableCell>

                                <TableCell align="center" xs={TEXTFIELD_XS}>{[
                                    <CommonGridTextField
                                        xs={TEXTFIELD_XS}
                                        style={{ marginTop: TEXTFIELD_MARGINTOP, }}
                                        id="max_order"
                                        label={""}
                                        required={index <= data.length - 2 ? false : true}
                                        disabled={index <= data.length - 2 ? true : false}
                                        fullWidth
                                        className={classes.textField}
                                        value={dataObj[Constants.KEY_MAX_ORDER_AMOUNT]}
                                        onChange={(event) => setMaxOrderAmount(index, event)}
                                        autoComplete="resname"
                                        variant="outlined"
                                        maxLengthVal={100}
                                        type={"number"}
                                        fieldStyle={classes.fieldHeight}
                                    />

                                ]}</TableCell>

                                <TableCell align="center" >
                                    <CommonGridTextField
                                        xs={TEXTFIELD_XS}
                                        style={{
                                            marginTop:
                                                TEXTFIELD_MARGINTOP
                                        }}
                                        id="dilevery_charge"
                                        label={""}
                                        required={index <= data.length - 2 ? false : true}
                                        disabled={index <= data.length - 2 ? true : false}
                                        fullWidth
                                        className={classes.textField}
                                        value={dataObj[Constants.KEY_FARE]}
                                        onChange={(event) => setDilevery(index, event)}
                                        autoComplete="resname"
                                        variant="outlined"
                                        maxLengthVal={5}
                                        type={"number"}
                                        fieldStyle={classes.fieldHeight}
                                    />
                                </TableCell>


                                <TableCell align="center" xs={TEXTFIELD_XS}>{[
                                    (index != 0 && data.length - 1 == index) ? (<IconButton onClick={() => {
                                        if (dataObj[Constants.KEY_UNDERSCORE_ID] != undefined) {
                                            context.deleteDriverFareItem(dataObj[Constants.KEY_UNDERSCORE_ID])
                                        }
                                        deleteDataValue(index);
                                    }} aria-label="Delete">
                                        <DeleteIcon />
                                    </IconButton>) : null

                                ]}</TableCell>


                            </TableRow>

                        ))}
                    </TableBody>
                    <label style={{
                        marginTop: 15, padding: 10, backgroundColor: Colors.colorBalckTrans, width: 150,
                        borderRadius: 5, textAlign: 'center'
                    }} onClick={() => {
                        for (const key in data) {
                            if (data.hasOwnProperty(key)) {
                                const element = data[key];
                                if (Utility.checkDileveryChargeLoadMore(element, context, key, data)) {
                                    if (key == data.length - 1) {
                                        let newObj = parseInt(data[key][Constants.KEY_MAX_KM]) + 1;
                                        setDataValue(newObj);
                                    }
                                } else {
                                    break;
                                }
                            }
                        }

                    }}

                    >{context.strings(StringKeys.AddMore)}</label>

                </Table>



            </Paper>
            <label style={{
                marginTop: 15, padding: 10, backgroundColor:
                    Colors.colorPrimary, width: 150,
                borderRadius: 5, textAlign: 'center', color: Colors.white
            }} onClick={() => {
                context.checkVaidation(data)
            }}

            >{context.strings(StringKeys.Save)}</label>


        </div>
    );
}

DileveryChargeLoadMoreTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DileveryChargeLoadMoreTable);