import React from 'react';
import { css } from '@emotion/core';
import withStyles from '@material-ui/core/styles/withStyles';

// First way to import
import { ClipLoader } from 'react-spinners';
import PropTypes from 'prop-types';
// Another way to import
import BaseComponent from './BaseComponent';
import * as Colors from '../res/Colors';
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class CustomPBar extends BaseComponent {

  render() {
    const { classes } = this.props;

    if (this.props.showProgress != undefined && this.props.showProgress != null && this.props.showProgress === true)

      return (
        <div className={classes.mainView}
        >
          <ClipLoader
            css={override}
            sizeUnit={"px"}
            color={Colors.colorPrimary}
            loading={this.props.showProgress}
          />
        </div>
      );
    else
      return null;
  }

}


const styles = theme => ({
  mainView: {
    position: 'absolute',
    display: 'flex',
    height: '100vh',
    width: '100vw',
    justifyContent: 'center',
    alignItems: 'center',


  }
});

CustomPBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPBar);
