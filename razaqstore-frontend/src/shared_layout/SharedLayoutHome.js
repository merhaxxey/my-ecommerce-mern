import { Outlet } from "react-router-dom"
import Header from "../components/header/Header"
import Footer from '../components/homepage/Footer'

const SharedLayoutHome = ()=>{
    return <>
        <Header />
        <Outlet/>
        {/* <Footer/> */}
    </>
}
export default SharedLayoutHome