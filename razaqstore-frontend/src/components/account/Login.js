import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import {FcGoogle} from 'react-icons/fc'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {setAccountComponentsMsg} from '../../features/home/homeSlice'
import {setLoggedIn} from '../../features/account/accountSlice'
import {useLocation} from 'react-router-dom'
import {API_URL} from '../../ApiUrl'
import {GoogleLogin} from 'react-google-login'
import Alert from './Alert'
import axios from 'axios'
import Loading from './Loading'
import Footer from './Footer'
import './Signup.css'
import './Login.css'

const clientId = "688490579415-o9n2raker1ttiir1tmss56cq95oijasg.apps.googleusercontent.com"

function useQuery(){
    const url = useLocation()  

    let redirect = url.search.split('?redirect=')
    if(redirect.length < 2){
        return ''
    }

    redirect = redirect[1]
    return redirect

}


const Login = ()=>{
    const redirect = useQuery()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {allCartItems} = useSelector((store)=> store.cart)
    const [localCartItems, setLocalCartItems] = useState([])
    const {accountComponentsMsg} = useSelector((store)=> store.home)
    const [user, setUser] = useState({})
    const [email, setEmail] = useState('')
    const [errormsg, setErrorMsg] = useState('')
    const [password, setPassword] = useState('')
    const [showFormError, setShowFormError] = useState({})
    const [loadingCircle, setLoadingCircle] = useState(false)
    const buttonRef = useState(null)
    const [onClickBtn, setOnClickBtn] = useState(false)
    const [alert, setAlert] = useState({success: undefined, failure: undefined})

    useEffect(()=>{
        setLocalCartItems(allCartItems)
    }, [])

    // some functions
    const loginUser = async(e)=>{
        e.preventDefault()
        
        if(!email || !password){
            setErrorMsg('please provide your email or password')
            setShowFormError({email: email? false: true, password: password? false: true})
            return
        }
        try {
            
            setLoadingCircle(true)
            setOnClickBtn(true)            
            const {data, status} = await axios.post(`${API_URL}/api/v1/auth/login`,{
                email,
                password
            }, {withCredentials: true})
            if(status===200){
                console.log('now now', localCartItems)
                dispatch(setAccountComponentsMsg({...accountComponentsMsg, localCartItems, user:{name:data.user.name, role:data.user.role, userId: data.user.userId}}))
            }
            console.log('hey up')
            if(redirect=='cart'){
                return navigate('/'+redirect+'?from=login')
            }
            navigate('/')
        } catch (error) {
            if(error?.response?.status!== 404){
                setAlert({success: undefined, failure:'Something went wrong, please try again'})
            }
            else{
                setAlert({success: undefined, failure: 'Email or password is incorrect'})
            }
        }
        
        setLoadingCircle(false)
        setOnClickBtn(false)
    }

    // ------ useEffects starts         -------------------------
    useEffect(()=>{
        const {payload} = accountComponentsMsg

        console.log(payload?.resetPassword)
        console.log(payload?.accVerified)
        
        if(payload?.resetPassword===true){
            setAlert({
                success: 'Password was reset, please login',
                failure:undefined
            })
        }
        if(payload?.accVerified === true){
            setAlert({
                success: 'Account confirmed, please login',
                failure: undefined
            })
        }
    
    }, [])


    useEffect(()=>{
        const timer = setTimeout(() => {
            setAlert((state)=>{
                return { success: undefined, failure: undefined}
            })
        }, 9000);

        return ()=> clearTimeout(timer)
    }, [alert])
    
    const onSuccess = async(res)=>{
        const {email, name, googleId} = res.profileObj
        console.log(res.profileObj)
        try {
            const {data} = await axios.get(`${API_URL}/api/v1/user/email/${res.profileObj.email}`, {withCredentials: true})
            console.log(data)
            if(!data){
                setAlert({failure: 'You are not connected', success: undefined})
            }
            const {status} = await axios.post(`${API_URL}/api/v1/auth/login`, {email, password: googleId}, {withCredentials: true})

            if(status === 200){
                dispatch(setAccountComponentsMsg({...accountComponentsMsg, localCartItems, user:{name:data.user.name, role:data.user.role, userId: data.user.userId}}))
            }

            if(redirect=='cart'){
                return navigate('/'+redirect+'?from=login')
            }
            navigate('/'+redirect)
        } catch (error) {
            await axios.post(`${API_URL}/api/v1/auth/register`, {email, name, role:'buyer', password: googleId}, {withCredentials: true})
            const {data, status} = await axios.post(`${API_URL}/api/v1/auth/login`, {email, password: googleId}, {withCredentials: true})
            if(status === 200){
                dispatch(setAccountComponentsMsg({...accountComponentsMsg, localCartItems, user:{name:data.user.name, role:data.user.role, userId: data.user.userId}}))
            }

            if(redirect=='cart'){
                return navigate('/'+redirect+'?from=login')
            }
            navigate('/'+redirect)
        }
    }
    const onFailure = (res)=>{
        console.log('Login failed, res: ', res)
    }


    // ---  HTML   -----
    return <main id='account-main' className='login-account-main'>
    <section id='form-wrapper-id' className='login-form-wrapper form-wrapper'>
       <span className='logo'>
           <img src="https://res.cloudinary.com/dswxrlrm6/image/upload/v1669796699/my-website-logos/Razaq_emonjb.jpg" alt="razaqstore" />
       </span>
       
       <Alert alert={alert} />

       <form onSubmit={loginUser} className='form login-form' id="form-id" action="">
           <h2>Login to your account</h2>
           <div className='input-wrapper'>
               <input onChange={(e)=> {
                   setShowFormError({...showFormError, email:false})
                   setEmail(e.target.value)}
               }
                className="text-input" type="email" placeholder='Email address' name='email'/>
                {!showFormError.email || <small>*field required</small>}
            </div>
           <div className='input-wrapper'>
               <input onChange={(e)=> {
                   setShowFormError({...showFormError, password:false})
                   setPassword(e.target.value)
               }}
                className="text-input" type="text" placeholder='Password' name='password'/>
                {!showFormError.password || <small>*field required</small>}
            </div>

            <button style={{cursor: onClickBtn?'not-allowed': 'auto'}} className='button-id-spin-animation' type="submit">
                {loadingCircle?<Loading/>: 'Login'}
            </button>

           <div className='signup-option login-option'>
               <p>continue with</p>
               <div>
                    <GoogleLogin
                        clientId={clientId}
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={"single_host_origin"}
                        className='googlelogin'
                    />
                </div>
           </div>

           <div className='new-to-razaqStore'>
                <hr />
                <p>New to RazaqStore</p>
                <hr />
           </div>
           <Link className='login create-account' to='/account/signup'>create an account</Link>
       </form>

   </section>
   </main>
}
export default Login