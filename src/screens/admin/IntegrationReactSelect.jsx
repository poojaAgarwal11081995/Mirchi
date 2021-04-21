import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { sizing } from '@material-ui/system';


const colourOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const animatedComponents = makeAnimated();

export default function IntegrationReactSelect(props) {
    //  alert('data => '+JSON.stringify(props.data))
    return (
        <Select
            height={sizing}
            closeMenuOnSelect={false}
            components={animatedComponents}
            //defaultValue={[colourOptions[4], colourOptions[5]]}
            isMulti={true}
            options={props.data}
        />
    );
}