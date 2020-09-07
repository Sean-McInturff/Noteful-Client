import React from 'react'

function ValidationError(props){

    return(
        <div className="validation-error">
            <p>{props.message}</p>
        </div>
    )
}export default ValidationError