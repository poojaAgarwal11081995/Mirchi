
import React from 'react';
import Button from '@material-ui/core/Button';
import Basecomponent from './BaseComponent'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default class CommonSnackbar extends Basecomponent {

    render() {

        return (<Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={this.props.open}
            autoHideDuration={6000}
            onClose={this.props.onClose}
            onExited={this.handleExited}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.props.message}</span>}
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={this.props.onClose}
                >
                    <CloseIcon />
                </IconButton>,
            ]
            }
        />)

    }
}