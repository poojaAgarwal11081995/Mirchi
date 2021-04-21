import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Basecomponent from './BaseComponent'
import { sizing } from '@material-ui/system';
import * as ResourcesConstants from '../res/ResourcesConstants';
import * as Dimens from '../res/Dimens'
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as Constants from '../utils/Constants';
import * as StringKeys from '../res/StringKeys';
import ActiveIcon from '@material-ui/icons/Check';
import InActiveIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        padding: 20,
    },
    dialogPaper: {

        minWidth: '80%',
        minHeight: '80%',
    }, table: {
        minWidth: 700,
    },
    appBarSpacer: theme.mixins.toolbar,
    bigAvatar: {
        marginTop: 10,
        marginRight: 10,
        marginBottom: 10,
        width: '100%',
        height: '70%',
    },
    root_images: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },


});

class CommonFullImageViewer extends Basecomponent {

    render() {
        const {
            title,
            content,
            firstBtnName,
            secondBtnName,
            firstBtnClick,
            secondBtnClick,
            classes,
            image,
            context

        } = this.props;
        //  alert(data != undefined && data != '' ? JSON.stringify(data) : 'sdsd')
        return (
            <div>
                <Dialog
                    open={this.props.showYesNo}
                    onClose={secondBtnClick}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    classes={{ paper: classes.dialogPaper }}
                >
                    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        <div >
                            <TableCell align="center">
                                <img className={classes.bigAvatar} src={(image !== undefined && image !== null) ? image :
                                    ResourcesConstants.ic_veg_icon} alt={''} />

                            </TableCell>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={firstBtnClick} color="primary">
                            {firstBtnName}
                        </Button>
                        {/* <Button onClick={secondBtnClick} color="primary" autoFocus>
                            {secondBtnName}
                        </Button> */}
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const styleLabel = {
    labelSt: {
        borderRadius: 15,
        boxShadow: ' 0 2px 4px 0 #F31A30',
        display: 'inline-block',
        padding: '5px 30px',
        color: '#888'
    }
}


CommonFullImageViewer.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default (withStyles(styles)(CommonFullImageViewer));

