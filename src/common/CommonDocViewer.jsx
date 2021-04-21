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
import * as Constants from '../../src/utils/Constants';
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

        minWidth: '70%',
    }, table: {
        minWidth: 700,
    },
    appBarSpacer: theme.mixins.toolbar,
    bigAvatar: {
        marginTop: 10,
        marginRight: 10,
        marginBottom: 10,
        width: Dimens.add_doc_image_w,
        height: Dimens.add_doc_image_h,
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

class CommonDocViewer extends Basecomponent {

    render() {
        const {
            title,
            content,
            firstBtnName,
            secondBtnName,
            firstBtnClick,
            secondBtnClick,
            classes,
            data,
            context

        } = this.props;

        const getStatusValueApprove = (status) => {
            if (Constants.DRIVER_STATUS_APPROVED_DOC == status) {
                return context.strings(StringKeys.Approved_Successfully);
            } else {
                return context.strings(StringKeys.Approve);
            }
        }

        const getStatusValueReject = (status) => {
            if (Constants.DRIVER_STATUS_REJECTED_DOC == status) {
                return context.strings(StringKeys.Rejected_Successfully);
            } else {
                return context.strings(StringKeys.Reject);
            }
        }

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
                            {(data != undefined && data != '') &&
                                <Table className={classes.table}>

                                    <TableHead>
                                        <TableRow key={'header_row'}>
                                            <TableCell align="left"> {context.strings(StringKeys.Name)}</TableCell>
                                            <TableCell align="center">{context.strings(StringKeys.Images)}</TableCell>
                                            <TableCell align="center">{context.strings(StringKeys.Stauts)}</TableCell>
                                            <TableCell align="center">{context.strings(StringKeys.Action)}</TableCell>

                                        </TableRow>
                                    </TableHead>

                                    {data.map(n => (
                                        <TableRow >

                                            <TableCell align="left" component="th" scope="row">
                                                {n[Constants.KEY_NAME]}
                                            </TableCell>
                                            <TableCell align="center">

                                                <Avatar onClick={() => { context.viewFullImage(n[Constants.KEY_IMAGE]) }}
                                                    style={{ borderRadius: 0, }}
                                                    alt=""
                                                    src={(n[Constants.KEY_IMAGE] !== undefined && n[Constants.KEY_IMAGE] !== null) ? n[Constants.KEY_IMAGE] :
                                                        ResourcesConstants.restro_default}
                                                    className={classes.bigAvatar} />

                                            </TableCell>
                                            <TableCell align="center">{
                                                (<ListItemText onClick={() => {
                                                    //context.updateStatus(n[Constants.KEY_UNDERSCORE_ID], n[Constants.KEY_STATUS])
                                                }} aria-label="Check">
                                                    {n[Constants.KEY_STATUS] == Constants.DRIVER_STATUS_APPROVED_DOC ?
                                                        <ActiveIcon /> : <InActiveIcon />}
                                                </ListItemText>)

                                            }  </TableCell>

                                            <TableCell align="center" >

                                                {[<Link><label style={{ color: n[Constants.KEY_STATUS] == Constants.DRIVER_STATUS_APPROVED_DOC && '#F31A30' }} onClick={() => {

                                                    context.updateDocStatus(n, Constants.DRIVER_STATUS_REJECTED_DOC);


                                                }
                                                }>
                                                    {getStatusValueReject(n[Constants.KEY_STATUS])}
                                                </label></Link>,
                                                <Link><label style={{
                                                    paddingLeft: 10, color: n[Constants.KEY_STATUS] != Constants.DRIVER_STATUS_APPROVED_DOC && '#F31A30'
                                                }} onClick={() => {

                                                    context.updateDocStatus(n, Constants.DRIVER_STATUS_APPROVED_DOC);

                                                }
                                                }>
                                                    {getStatusValueApprove(n[Constants.KEY_STATUS])}
                                                </label></Link>]}

                                            </TableCell>

                                        </TableRow>

                                    ))}
                                </Table>}

                        </div>
                    </DialogContent>
                    <DialogActions>
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


CommonDocViewer.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default (withStyles(styles)(CommonDocViewer));

