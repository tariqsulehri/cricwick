import React from 'react';
import { deflate } from 'zlib';

//We can also use distructured way as follows
//const input = ({name}) => {

const Input = (props) => {
    const {name, label, value, placeHolder ,focus , onChange} =  props;
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input autoFocus
                type="text"
                value={value}
                id={name}
                name={name}
                onChange={onChange}
                placeHolder={placeHolder}
                onFocus={focus}    
                className="form-control" />
        </div>
    );
}

export default Input;
