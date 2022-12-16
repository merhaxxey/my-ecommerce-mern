import React,{useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import {FcGoogle} from 'react-icons/fc'
import Alert from './Alert'
import Loading from './Loading'
import Footer from './Footer'
import axios from 'axios'
import { useEffect } from 'react';
import {GoogleLogin} from 'react-google-login'
import {gapi} from 'gapi-script'
import {setGoogleLoginDetails} from '../../features/user-profile/profileSlice'
import {useNavigate, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setAccountComponentsMsg} from '../../features/home/homeSlice'
import './Signup.css'
import './GoogleButtons.css'
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

const Signup = ()=>{
    const redirect = useQuery()
    const [check, setCheck] = useState(true)
    const changeCheckStatus = ()=>{
        setCheck(!check)
    }
    const {accountComponentsMsg} = useSelector((store)=> store.home)
    const [alert, setAlert] = useState({success: undefined, failure: undefined})
    const [values, setValues] = useState({})
    const [showFormError, setShowFormError] = useState({})
    const [loadingCircle, setLoadingCircle] = useState(false)
    const buttonRef = useState(null)
    const [onClickBtn, setOnClickBtn] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e)=>{

        setValues({...values, [e.target.name]:e.target.value})
        
        setShowFormError({...showFormError, [e.target.name]:false})
    }

    const submitData = async()=>{
        const {name, email, role, buisnessName, password} = values
        try{
            let formError = {}

            if(role==='seller' && !buisnessName){
                formError.buisnessName = true
            }
            if(!name){
                formError.name = true
            }
            if(!email){
                formError.email = true
            }
            if(!role){   
                formError.role = true
            }
            if(!password){
                formError.password = true
            }

            setShowFormError(formError)
            if(!name || !email || !role || !password){
                return
            }
            
            setLoadingCircle(true)
            setOnClickBtn(true)
            const {data} = await axios.post('/api/v1/auth/register', {name, email, role, password}, {withCredentials: true})
            setAlert({failure: undefined, success: 'Account created successfully'})
        }
        catch(error){
            if(error.response.status!== 400){
                setAlert({success: undefined, failure:'Something went wrong, please try again'})
            }
            else{
                setAlert({success: undefined, failure: error.response.data.msg})
            }
        }
   
        setLoadingCircle(false)
        setOnClickBtn(false)

        navigate('/account/login')
    }

    useEffect(()=>{
        const timer = setTimeout(() => {
            setAlert((state)=>{
                return { success: undefined, failure: undefined}
            })
        }, 9000);
        return ()=> clearTimeout(timer)
    }, [alert])
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        submitData()
    }
    const onSuccess = async(res)=>{
        const {email, name, googleId} = res.profileObj
        console.log(res.profileObj)
        try {
            const {data} = await axios.get(`/api/v1/user/email/${res.profileObj.email}`, {withCredentials: true})
            console.log(data)
            if(!data){
                setAlert({failure: 'You are not connected', success: undefined})
            }
            await axios.post(`/api/v1/auth/login`, {email, password: googleId}, {withCredentials: true})
            
            if(redirect=='cart'){
                return navigate('/'+redirect+'?from=login')
            }

            navigate('/')
        } catch (error) {
            await axios.post(`/api/v1/auth/register`, {email, name, role:'buyer', password: googleId}, {withCredentials: true})
            await axios.post(`/api/v1/auth/login`, {email, password: googleId}, {withCredentials: true})
            
            if(redirect=='cart'){
                return navigate('/'+redirect+'?from=login')
            }

            navigate('/')
        }
    }
    const onFailure = (res)=>{
        console.log('Login failed, res: ', res)
    }

    return <main id='account-main'>
     <section id='form-wrapper-id' className='form-wrapper'>
        <span className='logo'>
            <img src="https://res.cloudinary.com/dswxrlrm6/image/upload/v1669796699/my-website-logos/Razaq_emonjb.jpg" alt="razaqstore" />
        </span>
        
        {!(alert.success || alert.failure) || <Alert alert={alert}/>}
        <form onSubmit={handleSubmit} className='form' id="form-id" action="">
            <h2>Create an razaqStore account</h2>
        
            <div className='input-wrapper'>
                <input onChange={handleChange} className="text-input" type="text" placeholder='Full name' name='name'/>
                {!showFormError.name || <small>*field required</small>}
            </div>
            <div className='input-wrapper'>
                <input className="text-input" onChange={handleChange} type="email" placeholder='Email address' name='email'/>
                {!showFormError.email || <small>*field required</small>}
            </div>
            <div className='input-wrapper'>
                <input className="text-input" onChange={handleChange} type="text" placeholder='Role' name='role'/>
                {!showFormError.role || <small>*field required</small>}
            </div>
            <div className='input-wrapper'>
                <input className="text-input" onChange={handleChange} type="password" placeholder='Create a password' name='password'/>
                {!showFormError.password || <small>*field required</small>}
            </div>
            <div className='checkbox-wrapper'>
                <input onChange={changeCheckStatus} className='checkbox' type="checkbox" checked={check} />
                <span>Keep me signed in</span>
            </div>
            <span className='agreement'>By clicking on create account, you acknowledge you have read and agreed to our <a href="#">Terms of use</a> and <a href="#">Privacy policy</a></span>
            <button ref={buttonRef} style={{cursor: onClickBtn?'not-allowed': 'auto'}} className='button-id-spin-animation' type="submit">
                {loadingCircle? <Loading/>: 'Create account'}
            </button>
            
            <div className='signup-option'>
                <p>OR</p>
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

            <p>Already have an account?</p>
            <Link className='login' to='/account/login'>Sign in</Link>
        </form>

    </section>
    </main>
}
export default Signup