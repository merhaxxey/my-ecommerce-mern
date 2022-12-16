import React,{useEffect} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Header from './components/header/Header.js'
import Home from './components/homepage/Home'
import Signup from './components/account/Signup'
import Login from './components/account/Login'
import Logout from './components/account/Logout'
import FinishGoogleLogin from './components/account/FinishGoogleLogin'
import Footer from './components/homepage/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Category from './components/category_page/Category'
import AccountFooter from './components/account/Footer'
import Product from './components/product/Product'
import CleanProductData from './components/product/Product'
import VerifyEmail from './components/account/VerifyEmail'
import ResetPassword from './components/account/ResetPassword'
import ForgotPassword from './components/account/ForgotPassword'
import Search from './components/search/Search'
import UserProfile from './components/user_profile/UserProfile'
import Cart from './components/cart-page/Cart'

import SharedLayoutHome from './shared_layout/SharedLayoutHome'
import SharedLayoutAccount from './shared_layout/SharedLayoutAccount'

import {useSelector} from 'react-redux'
import {gapi} from 'gapi-script'
const clientId = "688490579415-o9n2raker1ttiir1tmss56cq95oijasg.apps.googleusercontent.com"


function App() {
  const {user} = useSelector((store)=> store.header)

  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    }

    gapi.load('client:auth2', start)
  })
  
  return <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayoutHome/>}>
          <Route index element={<Home/>}></Route>
          <Route path='product' element={<CleanProductData><Product/></CleanProductData>}></Route>
          <Route path='search' element={<Search/>}></Route>
          <Route path='profile/:string' element={<ProtectedRoute><UserProfile/></ProtectedRoute>}></Route>
          <Route path='cart' element={<Cart/>}></Route>
          <Route path='categories/:id' element={<Category/>}></Route>
        </Route>
        <Route path='/account' element={<SharedLayoutAccount/>}>
          <Route path='user/verify-email' element={<VerifyEmail/>}></Route>
          <Route path='signup' element={<Signup/>}></Route>
          <Route path='login' element={<Login/>}></Route>
          <Route path='logout' element={<Logout/>}></Route>
          <Route path='user/reset-password' element={<ResetPassword/>}></Route>
          <Route path='forgot-password' element={<ForgotPassword/>}></Route>
          <Route path='finish-login' element={<FinishGoogleLogin/>}></Route>
        </Route>
      </Routes>
  </BrowserRouter>
}

export default App