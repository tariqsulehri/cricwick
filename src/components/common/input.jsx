import React from 'react';

//We can also use distructured way as follows
//const input = ({name}) => {

const Input = (props) => {
    const {name, label, value, placeHolder , onChange} =  props;
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input autoFocus
                className="form-control"
                id={name}
                value={value}
                type="text"
                name={name}
                onChange={onChange}
                placeholder={placeHolder}
                // onFocus={focus}    
            />
        </div>
    );
}

export default Input;
