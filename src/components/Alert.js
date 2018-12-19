import React from 'react'
import { Alert as AlertReact } from 'reactstrap';
import AlertStyle from '../styles/alert.js'

// Alert component - Display alert on the page
const Alert = ({ isVisible, type, message, onDismiss }) => {
    if (isVisible) {
        setTimeout(function(){
            onDismiss()
        }, 3000);
    }
    return (
        <div style={AlertStyle.alert}>
            { isVisible &&
                <AlertReact color={type} toggle={onDismiss}>
                    {message}
                </AlertReact>
            }
        </div>
    )
}

export default Alert




