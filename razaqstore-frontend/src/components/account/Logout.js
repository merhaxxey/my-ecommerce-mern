import React from 'react'
import {GoogleLogout} from 'react-google-login'
const clientId = "688490579415-o9n2raker1ttiir1tmss56cq95oijasg.apps.googleusercontent.com"

const Logout = ()=>{

    const onSuccess = (info)=>{
        console.log('logout successful', info)
    }

    return <main className='logoutButton'>
        <GoogleLogout
            clientId={clientId}
            buttonText={'Logout'}
            onLogoutSuccess={onSuccess}
        />
    </main>
}

export default Logout