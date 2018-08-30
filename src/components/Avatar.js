import React from 'react'
import Avatar from 'react-avatar'

// Avatar component - display pseudo with initialal picture on left (or gravatar if exist)
const CustomAvatar = ({member, small}) => {
    let size = small ? '25px' : '30px'
    let margin = small ? '5px' : '10px'
    return (
        <span>
            {member && member.id !== 0 ? (
                <span>
                <Avatar size={size} name={member.attributes.pseudo} md5Email={member.attributes.email} />
                <b style={{marginLeft: margin}}>{member.attributes.pseudo} </b>
                </span>
            ) : (
                <span>
                    <Avatar src="http://www.gravatar.com/avatar/?d=mm" size={size}/>
                    <b style={{marginLeft: margin}}>{member.attributes.pseudo} </b>
                </span>
            )}
        </span>
    )
}

export default CustomAvatar
