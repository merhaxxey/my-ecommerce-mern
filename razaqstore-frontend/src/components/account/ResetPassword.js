import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useNavigate, useLocation} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {setAccountComponentsMsg} from '../../features/home/homeSlice'
import Loading from './Loading'
import axios from 'axios'
import Alert from './Alert'
import './Reset-password.css'
import { API_URL } from '../../ApiUrl'

function useQuery(){
    return new URLSearchParams(useLocation().search)
}

const ResetPassword = ()=>{
    const query = useQuery()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {accountComponentsMsg} = useSelector((store)=> store.home)
    const [errormsg, setErrorMsg] = useState('Password field is required')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [showFormError, setShowFormError] = useState({})
    const [loadingCircle, setLoadingCircle] = useState(false)
    const [onClickBtn, setOnClickBtn] = useState(false)
    const [alert, setAlert] = useState({failure: undefined, success: undefined})

    const passwordReset = async(e)=>{

        e.preventDefault()
        if(!password1 || !password2){
            setErrorMsg('Password field is required')
            setShowFormError({...showFormError, password1: password1? false :true, password2: password2? false : true})
            return
        }
        if(password1 !== password2){
            setErrorMsg('password does not match')
            setShowFormError({...showFormError, password1:true, password2: true})
            return
        }

        // checking if nothing is provided in password
        try {
            setLoadingCircle(true)
            setOnClickBtn(true)
            await axios.post(`${API_URL}/api/v1/auth/reset-password`,{
                password: password1,
                email: query.get('email'),
                token: query.get('token')
            }, {withCredentials: true})
            dispatch(setAccountComponentsMsg({...accountComponentsMsg, resetPassword: true}))
            navigate('/account/login/')
            

        } catch (error) {
            if(error.response.status=== 400 ){
                setAlert({success: undefined, failure: 'password must be greater than 5'})
            }
            else{
                setAlert({success: undefined, failure:'Something went wrong, please try again'})
            }
        }
        setLoadingCircle(false)
        setOnClickBtn(false)
    }
    
// ---------    useEffect starts         -----------
    useEffect(()=>{
        const timer = setTimeout(() => {
            setAlert((state)=>{
                return { success: undefined, failure: undefined}
            })
        }, 9000);
        return ()=> clearTimeout(timer)
    }, [alert])
    
    return <main  id='account-main' className='reset-password login-account-main'>
        <section id='form-wrapper-id' className='login-form-wrapper form-wrapper'>
        <span className='logo'>
            <img src="https://res.cloudinary.com/dswxrlrm6/image/upload/v1669796699/my-website-logos/Razaq_emonjb.jpg" alt="razaqstore" />
        </span>
        
        <Alert alert={alert}/>

        <form onSubmit={passwordReset} classaName='form login-form' id="form-id" action="">
            <h2>Reset your password</h2>

            <div className='input-wrapper'>
                <input 
                    onChange={(e)=>{
                        setPassword1(e.target.value)
                        setShowFormError({...showFormError, password1:false})
                    }} 
                    id='input1'
                    className="text-input" 
                    type="password" 
                    placeholder='New password' 
                    name="password1"
                />
                {!showFormError.password1 || <small>*{errormsg}</small>}
            </div>
            <div className='input-wrapper'>
                <input 
                    onChange={(e)=>{
                        setPassword2(e.target.value)
                        setShowFormError({...showFormError, password2:false})
                    }}
                    id='input2' 
                    className="text-input" 
                    type="password" 
                    placeholder='Confirm password' 
                    name="password2"
                />
                {!showFormError.password2 || <small>*{errormsg}</small>}
            </div>

            <button id='reset-password-btn' style={{cursor: onClickBtn?'not-allowed': 'auto'}} className='button-id-spin-animation' type="submit">
                {loadingCircle? <Loading/>: 'Reset password'}
            </button>
        </form>

    </section>
   </main>
}

export default ResetPassword