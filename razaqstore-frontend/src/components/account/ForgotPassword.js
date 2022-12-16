import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Alert from './Alert'
import Loading from './Loading'
import {API_URL} from '../../ApiUrl'

const ForgotPassword = ()=>{
    const [email, setEmail] = useState('')
    const [loadingCircle, setLoadingCircle] = useState(false)
    const [onClickBtn, setOnClickBtn] = useState(false)
    const [alert, setAlert] = useState({failure: undefined, success: undefined})
    const [showFormError, setShowFormError] = useState({})

    const requestReset = async(e)=>{
        e.preventDefault()
        try{
            if(!email){
                setShowFormError({email:true})
                return
            }
            
            setLoadingCircle(true)
            setOnClickBtn(true)
            await axios.post(`${API_URL}/api/v1/auth/forgot-password`, {
                email,
            }, {withCredentials: true})
            setAlert({failure: undefined, success: 'Password reset instruction has been sent to your email'})
            
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

        <form onSubmit={requestReset} classaName='form login-form' id="form-id" action="">
            <h2>Forgot password</h2>
            
             
            <div className='input-wrapper' type="email" >
                <input onChange={(e)=> {
                    setEmail(e.target.value)
                    setShowFormError({email: false})
                }}
                id='input1' className="text-input" type="email" placeholder='Password'/>
                {!showFormError.email || <small>*email is required</small>}
            </div>



            <button id='reset-password-btn' style={{cursor: onClickBtn?'not-allowed': 'auto'}} className='button-id-spin-animation' type="submit">
                {loadingCircle? <Loading/>: 'Request password reset'}
            </button>
        </form>

    </section>
   </main>
}
export default ForgotPassword