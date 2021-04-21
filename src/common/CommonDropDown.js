import React from 'react';
import { css } from '@emotion/core';
import withStyles from '@material-ui/core/styles/withStyles';

// First way to import
import { ClipLoader } from 'react-spinners';
import PropTypes from 'prop-types';
// Another way to import
import BaseComponent from './BaseComponent';
import Dropdown from 'react-drop-down'

class CommonDropDown extends BaseComponent {

  render() {



    return (
      <Dropdown
        value={this.props.value}
        onChange={this.props.onChange}
        options={this.props.options}
      />
    );


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

CommonDropDown.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommonDropDown);
