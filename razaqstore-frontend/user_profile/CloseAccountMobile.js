import React from 'react'
import {MdOutlineWarningAmber} from 'react-icons/md'
import {useSelector, useDispatch} from 'react-redux'
import { setDisplayCloseAccount } from '../../features/user-profile/profileSlice'

const CloseAccountMobile = ()=>{
    const dispatch = useDispatch()
    return <main className='closeAccount-wrapper'> 
        <section className='logout-wrapper closeAccount closeAccountMobile'>
            <nav className='warning'>
                <MdOutlineWarningAmber className='icon'/>
                <span className='title'>Warning</span>
            </nav>
            <article>
                <p className='warning-message'>Please this action will let your account to be deleted and you will loose all information on this account. This action cannot be reversed</p>
            </article>
            <div className='btn-wrapper'>
                <button type='button' className='btn1'>Ok </button>
                <button type='button' className='btn2' onClick={()=> dispatch(setDisplayCloseAccount(false))}>Cancel</button>
            </div>
        </section>
    </main>
}

export default CloseAccountMobile