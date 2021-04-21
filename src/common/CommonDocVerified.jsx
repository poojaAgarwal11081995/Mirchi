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

const styles = theme => ({
    root: {
        padding: 20,
    },
    dialogPaper: {
        minHeight: '30vh',
        minWidth: '30%',
    },
    appBarSpacer: theme.mixins.toolbar,
    bigAvatar: {
        marginTop: 10,
        marginRight: 10,
        marginBottom: 10,
        width: Dimens.add_retsro_image_w,
        height: Dimens.add_retsro_image_w,
    },


});

class CommonDocVerified extends Basecomponent {


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

        } = this.props;

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
                        <div className={classes.bigAvatar} >
                            <Avatar
                                style={{ borderRadius: 0, }}
                                alt=""
                                src={(image !== null) ? image :
                                    ResourcesConstants.restro_default}
                                className={classes.bigAvatar} />

                        </div>


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={firstBtnClick} color="primary">
                            {firstBtnName}
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}



CommonDocVerified.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(CommonDocVerified));

