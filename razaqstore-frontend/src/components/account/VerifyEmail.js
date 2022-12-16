import {useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setAccountComponentsMsg} from '../../features/home/homeSlice'
import { API_URL } from '../../ApiUrl'

function useQuery(){
    return new URLSearchParams(window.location.search)
}

const VerifyEmail = ()=>{
    const {accountComponentsMsg} = useSelector((store)=> store.home)
    const dispatch = useDispatch()
    const query = useQuery()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState({status:false, msg:''})
    const navigate = useNavigate()

    const verifyToken = async()=>{
        try {
            const data = await axios.post(`${API_URL}/api/v1/auth/verify-email`, {
                verificationToken: query.get('token'),
                email: query.get('email')
            }, {withCredentials: true})

        } catch (error) {
            setError({status:true, msg:'There was a problem, please double check your verification link'})
        }
        setLoading(false)
    }

    
    useEffect(()=>{
        if(loading){
            verifyToken()
        }
        dispatch(setAccountComponentsMsg({ ...accountComponentsMsg, accVerified: true}))
        navigate('/account/login')
    }, [])

    if(loading){
        return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h4 style={{color: 'blue'}}>Please wait...</h4>
        </div>
    }

    if(error.status){
        return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h4 style={{color: 'red'}}>{error.msg}</h4>
        </div>
    }
    if(!loading){
        dispatch(setAccountComponentsMsg({ ...accountComponentsMsg, accVerified: true}))
        navigate('/account/login')
        return <div>
            <p>Redirecting...</p>
        </div>
    }
}

export default VerifyEmail