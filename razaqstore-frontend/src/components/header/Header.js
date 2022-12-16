import React,{useState, useEffect} from 'react'
import './Header.css'
import {AiOutlineSearch} from 'react-icons/ai'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import {Link, useNavigate} from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import SidebarCategory from './SidebarCategory';
import {setToggleSidebar, setUser} from '../../features/header/headerSlice'
import {setWindowWidth} from '../../features/home/homeSlice'
import {getCurrentUser} from '../../features/header/headerSlice'
import {getAllCart, setAllAmount, setAllCartItems} from '../../features/cart/cartSlice'
import {setSearch} from '../../features/search/searchSlice'
import {setAddItemsToCart} from '../../features/product/productSlice'
import {msg} from '../../features/header/headerSlice'
import {useSelector, useDispatch} from 'react-redux'
import {BsPerson} from 'react-icons/bs'
import {MdBookmarkBorder} from 'react-icons/md'
import {RiLogoutCircleLine} from 'react-icons/ri'
import {FiHelpCircle, FiUserCheck} from 'react-icons/fi'
import {API_URL} from '../../ApiUrl'
import axios from 'axios'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {windowWidth, categories, firstRowSectionWidth, accountComponentsMsg} = useSelector((store)=> store.home)
  const {toggleSidebar, msg} = useSelector((store)=> store.header)
  const {addItemsToCart} = useSelector((store)=> store.product)
  const {allAmount, allCartItems} = useSelector((store)=> store.cart)
  
  const {search} = useSelector((store)=> store.search)
  const [showUser, setShowUser] = useState(true)
  const [username, setUsername] = useState(accountComponentsMsg?.payload?.user?.name?.split(' ')[0])
  const {user, isLoading} = useSelector((store)=> store.header)
  const [accountOptions, setAccountOptions] = useState(false)
  const [signedInUserOption, setSignedInUserOption] = useState(0)
  const userSelectRef = React.useRef(null)
  const [searchStr, setSearchStr] = useState('')
  const [localAllAmount, setLocalAllAmount] = useState(0)
  // this is to check the window screen size
  const changeWindowWidth = ()=>{
    dispatch(setWindowWidth())
  }
  
  useEffect(()=>{
    setUsername(user?.name?.split(' ')[0])
  }, [msg])
  
  useEffect(()=>{
    dispatch(getCurrentUser())
    dispatch(getAllCart())
  }, [])

  useEffect(()=>{
    let totalCartAmountTemp = 0
    totalCartAmountTemp = allCartItems?.reduce((total, item)=>{
        return total + item.quantity
    }, 0)

    console.log(allCartItems)
    dispatch(setAllAmount(totalCartAmountTemp))
    setLocalAllAmount(totalCartAmountTemp)
  }, [allCartItems])
  
  
  useEffect(()=>{
    setUsername(accountComponentsMsg?.user?.name?.split(' ')[0])
  }, [accountComponentsMsg, msg])

  useEffect(()=>{
    dispatch(setAddItemsToCart(allAmount))
  }, [allAmount])
  console.log(allAmount)

  useEffect(()=>{
    window.addEventListener('resize', changeWindowWidth)
    
    return ()=> window.removeEventListener('resize', changeWindowWidth)
  })
  useEffect(()=>{
    if(windowWidth <= 368){
      setShowUser(false)
    }
    else{
      setShowUser(true)
    }
    console.log(showUser)
  }, [windowWidth])

  useEffect(()=>{
    setSignedInUserOption((windowWidth - userSelectRef.current.offsetLeft) - (userSelectRef.current.clientWidth+5) )
    console.log(userSelectRef)
  })
  // useEffect(()=>{
  //   if(msg?.data?.status==200){
  //       console.log('stop stop stop stop')
  //       dispatch(setUser({}))
  //   }
  //   console.log('read me please', msg)
  // }, [msg])

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(setSearch(!search))
    navigate(`/search?q=${searchStr}`)
  }

  return <>
      
      <section className='header-wrapper'>
        <section className={`${windowWidth<=962 || 'header-largeScreen'} header`}>
            <SidebarCategory payload={`${toggleSidebar?'toggleSidebar': ''}`} />
            <div className="left">
              {windowWidth<=1150 && <span onClick={()=> dispatch(setToggleSidebar())} className='categoriesIcon-wrapper'><MenuIcon className="categoriesIcon"/></span>}
              <Link to='/' className="header-logo">
                  <img 
                      src={"https://res.cloudinary.com/dswxrlrm6/image/upload/v1669796699/my-website-logos/Razaq_emonjb.jpg"}
                      alt=""
                  />
              </Link>
            </div>
            {windowWidth<=962 || <form onSubmit={handleSubmit} className="header-search" >
                <select className="header-searchOption">
                  <option>All Categories</option>
                  {
                    categories.map((item, index)=>{
                      const newItem = item.name.length<=16? item.name: `${item.name.substring(0,16)}...`
                      return <option ><a href={`/categories/${index+1}`}>{newItem}</a></option>
                    })
                  }
                </select>
                <input placeholder='Search for products' onChange={(e)=> setSearchStr(e.target.value)} type="text" />
                <button type='submit' className='searchIcon'>
                  <AiOutlineSearch className='searchIcon'/>
                </button>
            </form>}
            <div className="header-rightLinks" id="header-rightLinks-id">
              <span className='account' onMouseOver={()=> {
                  setShowUser(true)
                  setAccountOptions(true)
                }} 
                onMouseOut={()=> {
                  setAccountOptions(false)
                  setShowUser(false)
                }}
              >
                <div className='user-select' ref={userSelectRef}>
                  <BsPerson className="person-icon"/>
                  <span  className='showUser'>Hello, {user?.name?.split(' ')[0] || 'Sign In'}</span>
                </div>
                
                <div style={{right: `${signedInUserOption - 15}px`}} id='signedInUser-options-id' onMouseOut={()=> setAccountOptions(false)} className={`signedInUser-options ${accountOptions || 'signedInUser-options-remove'}`}>
                  <Link to="/account/signup" style={{display: `${!user?.name?.split(' ')[0]? 'flex': 'none'}`}} className='person'>
                    <BsPerson className='icon'/>
                    <p>Create account</p>
                  </Link >
                  <Link to="/account/login" className='person' style={{display: `${!user?.name?.split(' ')[0]? 'flex': 'none'}`}}>
                    <FiUserCheck className='icon'/>
                    <p>Sign in</p>
                  </Link >

                  {!user?.name?.split(' ')[0] || 
                  <Link to="/profile/account" className=''>
                    <BsPerson className='icon'/>
                    <p>Account</p>
                  </Link >
                  }
                  {!user?.name?.split(' ')[0] || 
                  <Link to="/profile/order" className='bookmark'>
                    <MdBookmarkBorder className='icon'/>
                    <p>Orders</p>
                  </Link >
                  }
                  {!user?.name?.split(' ')[0] || 
                  <Link to="/profile/logout" className='logout'>
                    <RiLogoutCircleLine className='icon'/>
                    <p>Log out</p>
                  </Link >
                  }

                </div>
              </span>
              <Link to='/cart' className='cart'>
                <ShoppingCartOutlinedIcon className='cart-icon'/>
                <span className="cart-text"> <p>My</p> <p>Cart</p></span>
                <span className="cart-count">{allAmount}</span>
              </Link>
            </div>
          {(windowWidth >962) || <form onSubmit={handleSubmit} className="header-search-mobile" >
            <input placeholder='Search for a product' type="text" onChange={(e)=> setSearchStr(e.target.value)} />
            <button onClick={()=> setSearch(true)} className='searchIcon-wrapper' type='submit' >
              <AiOutlineSearch className='searchIcon'/>
            </button>
          </form>}
        </section>
      </section>
    </>
}

export default Header