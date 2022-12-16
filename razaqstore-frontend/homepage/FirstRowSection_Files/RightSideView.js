import {FaCommentsDollar, FaUserCircle} from 'react-icons/fa'
import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {BsPerson} from 'react-icons/bs'
import {MdBookmarkBorder} from 'react-icons/md'
import {RiLogoutCircleLine} from 'react-icons/ri'
import axios from 'axios'
import { setAccountComponentsMsg } from '../../../features/home/homeSlice'
import { getAllCart } from '../../../features/cart/cartSlice'
import {API_URL} from '../../../ApiUrl'
import {getCurrentUser, logoutUser, setUser} from '../../../features/header/headerSlice'
import { useDispatch } from 'react-redux'

const RightSideView = ()=>{
    const {user, accountChanges} = useSelector((store)=> store.header)
    const [referesh, setReferesh] = useState(0)
    const dispatch = useDispatch()

    
    const handleSignOut = async()=>{
        try{
            const response = await axios.delete(`${API_URL}/api/v1/auth/logout`, {withCredentials: true})
            console.log('wait the fuck up', response)
            if(response?.status === 200){
                dispatch(getCurrentUser())
                dispatch(getAllCart())
            }
        }catch(error){
            console.log(error)
        }
    }

    return <section id="right-view">
        <div className="account">
            <span className="userCircleIcon-wrapper">
            {/* <img className="login-background" src="http://localhost:3000/login-background.jpg" alt="" /> */}
            <FaUserCircle className="userCircleIcon"/>
            </span>
             <p className="welcome">{ user?.name?.split(' ')[0]? `Hello, ${user?.name?.split(' ')[0]}`: 'Join our store today'}</p>
            <span className="btn-wrapper">
            
                {!user?.name?.split(' ')[0] || <div id='signedInUser-links-id' className='signedInUser-links'>
                    <Link to='/profile/account'>
                        <BsPerson className='icons'/>
                        <p>Account</p>
                    </Link>
                    <Link to='/profile/order'>
                        <MdBookmarkBorder className='icons'/>
                        <p>Order</p>
                    </Link>
                    <button onClick={handleSignOut}>
                        <RiLogoutCircleLine className='icons'/>
                        <p id='logout'>Logout</p>
                    </button>
                </div>}

                {user?.name?.split(' ')[0]!==undefined || <div >
                    <a href='/account/signup' className="signup" type="button">Sign up</a>
                    <a href='/account/login' className="login" type="button">Login</a>
                </div>}
            </span>
        </div>
        <article className="newCustomers-offer">
            <p>Extra Bonus sales</p>
            <h3>For new users only</h3>
            <div className="image-grid">
            <img src={"https://ae01.alicdn.com/kf/S81b31d6d00f14a1cb43db7f148b8c1e2M/Original-Air-Pro-4-TWS-Wireless-Headphones-Bluetooth-5-0-Earphone-In-Ear-Earbuds-Gaming-Headset.jpg_220x220xz.jpg_.webp"} alt=""/>
            <img src={"https://ae01.alicdn.com/kf/H606bb95b86df4489bfa571b86267c277U/Sports-Shoes-for-Men-casual-Breathable-Running-Shoes-Men-s-Sneakers.jpg_220x220xz.jpg_.webp"} alt=""/>
            <img src={"https://ae01.alicdn.com/kf/S7ba32432bad54531840fc810005ec908W/2022-Men-Polo-Men-Shirt-Short-Sleeve-Polo-Shirt-Contrast-Color-Polo-New-Clothing-Summer-Streetwear.jpg_220x220xz.jpg_.webp"} alt="" />
            <img src={"https://ae01.alicdn.com/kf/S76c93230e5284eb09a3bdcef1a66b73eF/Hip-Hop-Loose-Men-and-Women-Hoodies-Sweatshirt-Autumn-Streetwear-Bear-with-Glasses-Print-Jumpers-Harajuku.jpg_220x220xz.jpg_.webp"} alt="" />
            </div>
            <button  className="click-here">Coming soon</button>
        </article>
    </section>
}
export default RightSideView