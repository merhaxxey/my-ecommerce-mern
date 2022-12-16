import React, {useState, useEffect} from 'react'
import {MdEdit} from 'react-icons/md'
import axios from 'axios'
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {useSelector, useDispatch} from 'react-redux'
import { API_URL } from '../../ApiUrl';
// import {}

const Account = ()=>{
    const [editName, setEditName] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
    const dispatch = useDispatch()
    const {user} = useSelector((store)=> store.header)
    const {currentUser} = useSelector((store)=> store.profile)
    const [userInfo, setUserInfo] = useState({})
    const [gender, setGender] = useState(currentUser.gender? currentUser.gender: '')
    const [state, setState] = useState(currentUser.state? currentUser.state: '')
    const [allUserInfo, setAllUserInfo] = useState({
        name:currentUser.name, 
        email:currentUser.email,
        phoneNumber:currentUser?.phoneNumber, 
        birthday:currentUser?.birthday, 
        address:currentUser?.address, 
    })
    
    const handleSelectSubmit = async(obj)=>{
        const response = await axios.post(`${API_URL}/api/v1/profile/`, obj, {withCredentials: true})
        
        if(response.status === 200){
            if(obj.gender) setGender(obj.gender)
            if(obj.state) setState(obj.state)
        }
    }

    const handleEditNameSubmit = async(e)=>{
        const response = await axios.patch(`${API_URL}/api/v1/user/updateUser`, {name: allUserInfo.name}, {withCredentials: true})
        setAllUserInfo({...allUserInfo, name:response.data.user.name})
        setEditName(false)
    }
    const handleEmailSubmit = async(e)=>{
        const response = await axios.patch(`${API_URL}/api/v1/user/updateUser`, {email: allUserInfo.email}, {withCredentials: true})
        setAllUserInfo({...allUserInfo, email:response.data.user.email})
        setEditEmail(false)
    }
    const handleUserProfileSubmit = async(name)=>{
        if(!allUserInfo[name]) return
        const response = await axios.post(`${API_URL}/api/v1/profile/`, {[name]: allUserInfo[name]}, {withCredentials: true})
        setAllUserInfo({...allUserInfo, [name]:response.data.user[name]})
    }
    return <div className='account-detail-wrapper'>
        <article className='account-detail'>
            <p className='title1'>Account Detail</p>
            <hr />
            <div className='info-wrapper'>
                <div className='info profile-name'>
                    <small>name</small>
                    <span>
                        {!editName? <p>{allUserInfo.name}</p>: <input name='name' value={allUserInfo.name} onChange={(e)=> setAllUserInfo({...allUserInfo, name:e.target.value})} type="text" />}
                        {
                            !editName?
                            <MdEdit onClick={()=> setEditName(true)} className="edit-icon"/>
                            :
                            <button onClick={handleEditNameSubmit} className='save-btn' type='button'>Save</button>
                        }
                        
                    </span> 
                </div>
                
                <div className='info profile-phonenum' id='profile-phonenum'>
                    <small>Phone number (optional)</small>
                    <span>
                        <label htmlFor="phoneNumber">+234</label>
                        <input name='phoneNumber' value={allUserInfo.phoneNumber} onChange={(e)=> setAllUserInfo({...allUserInfo, phoneNumber:e.target.value})} id='phoneNmuber' type="number" />
                        <button onClick={()=> handleUserProfileSubmit('phoneNumber')} className='save-btn' type='button'>Save</button>

                    </span> 
                </div>
                
                <div className='info profile-email'>
                    <small>Email</small>
                    <span>
                        {!editEmail? <p>{allUserInfo.email}</p>: <input name='email' value={allUserInfo.email} onChange={(e)=> setAllUserInfo({...allUserInfo, email:e.target.value})} type="email" />}
                        {
                            !editEmail?
                            <MdEdit onClick={()=> setEditEmail(true)} className="edit-icon"/>
                            :
                            <button onClick={handleEmailSubmit} className='save-btn' type='button'>Save</button>
                        }
                    </span> 
                </div>
                
                <div className='info profile-birthday'>
                    <small>birthday</small>
                    <span>
                        <input name='birthday' value={allUserInfo.birthday} onChange={(e)=> setAllUserInfo({...allUserInfo, birthday:e.target.value})} type="date" />
                        <button onClick={()=> handleUserProfileSubmit('birthday')} className='save-btn' type='button'>Save</button>
                    </span> 
                </div>
                <div className='info profile-gender'>
                    <small>gender</small>
                    <Box sx={{ width: 100 }} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={gender}
                                label="Gender"
                                size= "small"
                                onChange={(e)=> {
                                    handleSelectSubmit({gender: e.target.value})
                                }}
                            >
                                <MenuItem value={'male'}>Male</MenuItem>
                                <MenuItem value={'female'}>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    
                </div>
            </div>
        </article>
        <article className="address-of-delivery">
            <p className='title1'>Address of delivery</p>
            <hr />
            
            <div className='address-of-delivery-content'>
                <Box sx={{ maxWidth: 100 }} className='state-form'>
                    <small>State</small>
                    <FormControl fullWidth>
                        <InputLabel id="state-of-delivery">Select</InputLabel>
                        <Select

                            labelId="address-of-delivery"
                            value={state}
                            label="state"
                            size= "small"
                            onChange={(e)=> handleSelectSubmit({state:e.target.value})}
                        >
                            <MenuItem value={'Ekiti State'}>Ekiti State</MenuItem>
                            <MenuItem value={'Kogi State'}>Kogi State</MenuItem>
                            <MenuItem value={'Kwara State'}>Kwara State</MenuItem>
                            <MenuItem value={'Ogun State'}>Ogun State</MenuItem>
                            <MenuItem value={'Ondo State'}>Ondo State</MenuItem>
                            <MenuItem value={'Osun State'}>Osun State</MenuItem>
                            <MenuItem value={'Oyo State'}>Oyo State</MenuItem>
                            <MenuItem value={'Lagos State'}>Lagos State</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <div className='address-form'>
                    <small>Address</small>
                    <form>
                        <input name='address' value={allUserInfo.address} onChange={(e)=>  setAllUserInfo({...allUserInfo, address: e.target.value})} type="text" />
                        <button onClick={()=> handleUserProfileSubmit('address')} className='save-btn' type='button'>Save</button>
                    </form>
                </div>
            </div>
        </article>
    </div>
}

export default Account