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

const styles = theme => ({
    root: {
        padding: 20,
    },
    dialogPaper: {
        minHeight: '30vh',
        minWidth: '30%',
    }

});

class DeleteItemDialog extends Basecomponent {


    render() {
        const {
            title,
            content,
            firstBtnName,
            secondBtnName,
            firstBtnClick,
            secondBtnClick,
            classes,

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
                        <DialogContentText id="alert-dialog-description">
                            {content}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={firstBtnClick} color="primary">
                            {firstBtnName}
                        </Button>
                        <Button onClick={secondBtnClick} color="primary" autoFocus>
                            {secondBtnName}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}



DeleteItemDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(DeleteItemDialog));

