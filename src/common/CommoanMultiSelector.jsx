
import React from 'react';
import Button from '@material-ui/core/Button';
import Basecomponent from './BaseComponent'
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import * as Colors from '../res/Colors'

export default class CommoanMultiSelector extends Basecomponent {

  render() {
    const { type,
      fullWidth,
      variant,
      color,
      className,
      onClick,
      label,
      size

    } = this.props;


    return (<Select

      inputId="react-select-single"
      placeholder={this.props.placeholder}
      TextFieldProps={{
        label: this.props.label,
        InputLabelProps: {
          htmlFor: 'react-select-single',
          shrink: true,
        },
        placeholder: this.props.placeholder,
      }}
      closeMenuOnSelect={false}
      isOptionDisabled={true}
      isMulti={true}
      styles={selectStyles}
      value={this.props.value}
      options={this.props.options}
      components={this.props.components}
      onChange={this.props.onChange}

      theme={(theme) => ({
        ...theme,
        borderRadius: 5,
        colors: {
          ...theme.colors,
          text: Colors.txt_color,
          primary25: Colors.colorPrimaryTrans,
          primary: Colors.colorPrimary,
        },
      })}

    />);
  }

}
const selectStyles = {
  menu: base => ({
    ...base,
    zIndex: 100,

  }),
  control: (base, state) => ({
    ...base,
    height: '55px',
    'min-height': '55px',
  }),

};

const customStyles = {
  control: (base, state) => ({
    ...base,
    height: '34px',
    'min-height': '34px',
  }),
};
