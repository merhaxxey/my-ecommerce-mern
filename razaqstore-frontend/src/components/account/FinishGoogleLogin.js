import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Alert from './Alert'
import Loading from './Loading'
import {useNavigate} from 'react-router-dom'
import {setAccountComponentsMsg} from '../../features/home/homeSlice'
import {useSelector, useDispatch} from 'react-redux'

const FinishGoogleLogin = ()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {googleLoginDetails} = useSelector((store)=> store.profile)
    const [password, setPassword] = useState('')
    const [loadingCircle, setLoadingCircle] = useState(false)
    const [onClickBtn, setOnClickBtn] = useState(false)
    const [alert, setAlert] = useState({failure: undefined, success: undefined})
    const [showFormError, setShowFormError] = useState({})

    const createAccount = async(e)=>{
        e.preventDefault()
        try{
            if(!password){
                setShowFormError({password:true})
                return
            }
            
            setLoadingCircle(true)
            setOnClickBtn(true)
            const {name, email} = googleLoginDetails
            const {data} = await axios.post('/api/v1/auth/register', {
                email,
                name,
                password,
                role: 'buyer'
            })
            setAlert({failure: undefined, success: 'Account created sucessfullly'})
            navigate('/account/login')
            
        }catch(error){
            const status = error.response.status
            if(status === 400 || status === 401 || status=== 404){
                setAlert({success: undefined, failure: error.response.data.msg})
            }
            else{
                setAlert({success: undefined, failure:'Something went wrong, please try again'})
            }
        }
        setLoadingCircle(false)
        setOnClickBtn(false)
    }

    
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

        <form onSubmit={createAccount} classaName='form login-form' id="form-id" action="">
             
            <div className='input-wrapper' >
                <input onChange={(e)=> {
                    setPassword(e.target.value)
                    setShowFormError({password: false})
                }}
                id='input1' className="text-input" type="password" placeholder='Password'/>
                {!showFormError.password || <small>*password is required</small>}
            </div>

            <button id='reset-password-btn' style={{cursor: onClickBtn?'not-allowed': 'auto'}} className='button-id-spin-animation' type="submit">
                {loadingCircle? <Loading/>: 'Complete Sign up '}
            </button>
        </form>

    </section>
   </main>
}
export default FinishGoogleLogin