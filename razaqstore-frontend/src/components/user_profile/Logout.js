import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {MdOutlineWarningAmber} from 'react-icons/md'
import {getAllCart} from '../../features/cart/cartSlice'
import {getCurrentUser, logoutUser, setUser} from '../../features/header/headerSlice'
import axios from 'axios'
import {API_URL} from '../../ApiUrl'

const Logout = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [referesh, setReferesh] = useState(true)
    
    const handleSignOut = async()=>{
        try{
            const response = await axios.delete(`${API_URL}/api/v1/auth/logout`, {withCredentials: true})
            console.log('wait the fuck up', response)
            if(response?.status === 200){
                dispatch(getCurrentUser())
                dispatch(getAllCart())
                navigate('/')
            }
        }catch(error){
            console.log(error)
        }
    }


    return <main className='logout-wrapper'>
        <nav className='warning'>
            <MdOutlineWarningAmber className='icon'/>
            <span className='title'>Warning</span>
        </nav>
        <article>
            <p className='warning-message'>You will be logged out of your account, are you sure you want to continue</p>
        </article>
        <div className='btn-wrapper'>
            <button type='button' className='btn1' onClick={handleSignOut}>Ok</button>
            <button type='button' className='btn2'>Cancel</button>
        </div>
    </main>
}

export default Logout