import {Outlet} from 'react-router-dom'
import Footer from '../components/account/Footer'

const SharedLayoutAccount = ()=>{
    return <>
        <Outlet/>
        <Footer/>
    </>
}
export default SharedLayoutAccount