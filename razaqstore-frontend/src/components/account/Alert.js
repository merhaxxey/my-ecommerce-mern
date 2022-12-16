import React from 'react'
import './Alert.css'

const Alert = ({alert})=>{

    return <div className={`alert-msg-wrapper ${alert.success?'msg-success':''} ${alert?.failure?'msg-failure':''}`}>
        <span className='msg'>{alert.success || alert.failure}</span>
    </div>
}
export default Alert