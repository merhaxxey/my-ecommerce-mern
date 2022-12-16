import React from 'react'
import {MdOutlineWarningAmber} from 'react-icons/md'

const CloseAccount = ()=>{
    return <main className='logout-wrapper closeAccount'>
        <nav className='warning'>
            <MdOutlineWarningAmber className='icon'/>
            <span className='title'>Warning</span>
        </nav>
        <article>
            <p className='warning-message'>Please this action will let your account to be deleted and you will loose all information on this account. This action cannot be reversed</p>
        </article>
        <div className='btn-wrapper'>
            <button type='button' className='btn1'>Ok </button>
            <button type='button' className='btn2'>Cancel</button>
        </div>
    </main>
}

export default CloseAccount