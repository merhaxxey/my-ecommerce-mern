import React, {useState} from 'react'
import {GrLocation} from "react-icons/gr";
import {RiAccountCircleFill} from "react-icons/ri"
import {HiViewGrid} from 'react-icons/hi'
import {GoListUnordered} from 'react-icons/go'
import {AiOutlineLogout, AiOutlineCloseCircle} from 'react-icons/ai'
import {MdOutlineWarningAmber} from 'react-icons/md'
import Account from './Account'
import Order from './Order'
import RecentlyViewed from './RecentlyViewed'
import Logout from './Logout'
import CloseAccount from './CloseAccount'
import CloseAccountMobile from './CloseAccountMobile'
import ViewMore from './ViewMore';
import {useSelector, useDispatch} from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';
import { setDisplayCloseAccount } from '../../features/user-profile/profileSlice';
import Footer from '../homepage/Footer'
import './UserProfile.css'
import { useEffect } from 'react';
import CircularIndeterminate from '../progress/Circular';
import { getUser } from '../../features/user-profile/profileSlice';
import {getAllCart} from '../../features/cart/cartSlice'
import {getCurrentUser, logoutUser, setUser} from '../../features/header/headerSlice'
import {API_URL} from '../../ApiUrl'

import axios from 'axios';
import { setAccountComponentsMsg } from '../../features/home/homeSlice';

const UserProfile = ()=>{
    const dispatch = useDispatch()
    const {string} = useParams()
    const {message, displayCloseAccount, displayViewMore, isLoading, currentUser} = useSelector((store)=> store.profile)
    const {user} = useSelector((store)=> store.header)
    const {msg} = useSelector((store)=> store.account)
    const {windowWidth} = useSelector((store)=> store.home)
    const [referesh, setReferesh] = useState(true)
    const navigate = useNavigate()

    const dispValue = windowWidth<=962? '': string
    const [displayBtnContent, setDisplayBtnContent] = useState(dispValue)

    useEffect(()=>{
        if(windowWidth > 962 && displayBtnContent===''){
            setDisplayBtnContent('account')
        }
    })
    useEffect(()=>{
        dispatch(getUser())
    }, [])

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

    if(isLoading){
        return <CircularIndeterminate/>
    }
    if(message==='err'){
        return <p style={{'text-align': 'center'}}>Something went wrong</p>
    }
    return  <main className='user-profile'>
        <section className='profile-main-wrapper'>
            <nav className='nav'>
                <div className='left'>
                    <h2>Hi, {currentUser.name.split(' ')[0]}</h2>
                    
                    <span className='location'>
                        <GrLocation className='location-icon'/>
                        <span>Ekiti state</span>
                    </span>
                </div>
                <button type="button" onClick={handleSignOut} className='signout'>Sign out</button>
            </nav>
            <section className='profile-content-wrapper'>
                <article className='btns'>
                    <button onClick={()=> setDisplayBtnContent('account')} className={`btn btn1  ${displayBtnContent==='account' && 'btn-active'} `} type='button'>
                        <RiAccountCircleFill className='icon'/>
                        <span>Account</span>
                    </button>
                    <button onClick={()=> setDisplayBtnContent('order')} className={`btn btn2  ${displayBtnContent==='order' && 'btn-active'} `} type='button'>
                        <GoListUnordered className='icon'/>
                        <span>Order</span>
                    </button>
                    <button onClick={()=> setDisplayBtnContent('recentlyViewed')} className={`btn btn3  ${displayBtnContent==='recentlyViewed' && 'btn-active'} `} type='button'>
                        <HiViewGrid className='icon'/>
                        <span>Recently viewed</span>
                    </button>
                    <button onClick={()=> setDisplayBtnContent('logout')} className={`btn btn4  ${displayBtnContent==='logout' && 'btn-active'} `} type='button'>
                        <AiOutlineLogout className='icon'/>
                        <span>Logout</span>
                    </button>
                    <button onClick={()=> setDisplayBtnContent('closeAccount')} className={`btn btn5  ${displayBtnContent==='closeAccount' && 'btn-active-danger'} `} type='button'>
                        <AiOutlineCloseCircle className='icon'/>
                        <span>Close Account</span>
                    </button>
                </article>
                {displayBtnContent==='account' && <Account/>}
                {displayBtnContent==='order' && <Order/>}
                {displayBtnContent==='recentlyViewed' && <RecentlyViewed/>}
                {displayBtnContent==='logout' && <Logout/>}
                {displayBtnContent==='closeAccount' && <CloseAccount/>}

            </section>

            {windowWidth<=962 &&
                <div className='mobile'>
                    <Account/>
                    <Order/>
                    <RecentlyViewed/>
                    {displayCloseAccount && <CloseAccountMobile />}
                    {displayViewMore!=='' && <ViewMore/>}
                    <button onClick={()=> dispatch(setDisplayCloseAccount(true))} type='button' className='close-account-btn'>Close Account</button>
            </div>}
        </section>

        <Footer/>
    </main>
}

export default UserProfile