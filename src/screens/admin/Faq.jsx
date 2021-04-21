
import React, { useState, Fragment } from 'react';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import BaseComponent from '../../common/BaseComponent';
import * as StringKeys from '../../res/StringKeys';
import CommonButton from '../../common/CommonButton';


import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';


import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];








class Faq extends BaseComponent {




    render() {
        // const classes = useStyles();

        const { classes } = this.props;
        return (
            <Fragment>
                <div className={classes.appBarSpacer} />
                <Paper className={classes.root}>
                    <Table className={classes.table}>


                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.name} color="dark">

                                    <TableCell align="left" style={{ backgroundColor: '#FFBEBE', color: 'white', }}>{row.protein}</TableCell>
                                </TableRow>
                            ))}
                            {rows.map(row => (
                                <TableRow key={row.name}>

                                    {/* <TableCell align="right">{row.protein}</TableCell> */}
                                    <div style={{ alignSelf: 'flex-end' }}>
                                        <Typography style={{ backgroundColor: "yellow", maxWidth: '500px' }}>The content of the Popover.</Typography>
                                    </div>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>


                <Paper className={classes.root}>

                    <InputBase
                        className={classes.input}
                        placeholder="Send message"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />

                    <Divider className={classes.divider} orientation="vertical" />
                    <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                        <SendIcon />
                    </IconButton>
                </Paper>
            </Fragment>
        )
    }

}






const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
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
    editorStyle: {
        borderColor: "red",
        borderWidth: 10,
        backgroungColor: "green"
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },

    // root: {
    //     width: '100%',
    //     marginTop: theme.spacing(3),
    //     overflowX: 'auto',
    // },
    table: {
        minWidth: 650,
    },
    // iconButton: {
    //     padding: 10,
    //     marginLeft: '90%'
    // },
    // input: {
    //     marginLeft: theme.spacing(1),
    //     flex: 1,
    //     backgroundColor: 'red'
    // },


    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        marginTop: '10px'
        //width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },



});
Faq.propTypes = {
    classes: PropTypes.object.isRequired,
};


function mapStateToProps({ response }) {
    return response;
}
export default connect(mapStateToProps, {})(withStyles(styles)(Faq));
