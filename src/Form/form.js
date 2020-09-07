import React from 'react';

function Form(props) {
    const {className, ...otherProps} = props
    return (
        <form
        className={['form', className].join(' ')}
        action='#'
        {...otherProps}
        />
    )
}

export default Form