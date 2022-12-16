import {GrClose} from 'react-icons/gr'
import {MdStar, MdStarOutline} from 'react-icons/md'
import React,{useState, useEffect} from 'react'
import {setWriteReview} from '../../features/product/productSlice'
import {useSelector, useDispatch} from 'react-redux'
import Alert from '../account/Alert'
import axios from 'axios'
import './WriteReview.css'
import { API_URL } from '../../ApiUrl'

const WriteAReview = ()=>{
    const {user, isLoading} = useSelector((store)=> store.header)
    const {product} = useSelector((store)=> store.product)
    const [writeReviewFade, setWriteReviewFade] = useState(true)
    const {writeReview} = useSelector((store)=> store.product)
    const [stars, setStars] = useState([0,0,0,0,0])
    const [starsNum, setStarsNum] = useState(0)
    const [title, setTitle] = useState(null)
    const [comment, setComment] = useState(null)
    const [alert, setAlert] = useState({success: undefined, failure: undefined})
    const [formError, setFormError] = useState({starsNum:true, title:true, comment:true})
    const dispatch = useDispatch()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const temp = {starsNum:true, title:true, comment:true}
        if(starsNum===0 || !title || !comment){
            if(starsNum===0){
                temp.starsNum = false
            }
            if(!title){
                temp.title = false
            }
            if(!comment){
                temp.comment = false
            }
            setFormError(temp)
            return
        }  

        try{
            console.log(product._id)
            const data = await axios.post(`${API_URL}/api/v1/review/${product._id}`, {
                rating: starsNum,
                title,
                comment
            })
            setAlert({success:'Review created', failure: undefined})
            console.log(data)
        }catch(error){
            console.log(error.response)
            if(error.response.status===500){
                setAlert({success:undefined, failure: 'Something went wrong, please try again later'})
                return
            }
            if(error.response.status===400 && error.response.data.type){
                setAlert({success:undefined, failure: 'You have made a review on this product already'})
                return
            }
            if(error.response.status===400){
                setAlert({success:undefined, failure:error.response.data.msg})
                return
            }
        }
    }

    useEffect(()=>{
        let timer
        timer = setTimeout(()=>{
            setAlert({success: undefined, failure: undefined})
        }, 9000)
        return ()=> clearTimeout(timer)
    }, [alert])

    return <main className={`writeReview-container ${writeReviewFade || 'writeReview-container-close'}`}>
        <section className={`writeReview ${writeReviewFade || 'writeReview-close'}`}>
            <div className="nav">
                <h4 className='nav-title'>Rate this product</h4>
                <GrClose onClick={()=>{
                    dispatch(setWriteReview(true))
                }}
                className='icon-close' />
            </div>
            <Alert alert={alert} />
            <div className='body'>
                <span className='star-icon-wrapper'>{
                    stars.map((item, index)=>{
                        if(index>=starsNum){
                            return <MdStarOutline
                                onClick={()=>{
                                    setFormError({...formError, starsNum:true})
                                    setStarsNum(index + 1)
                                }} 
                                className='star-icon'
                            />
                        }
                        else{
                            return <MdStar 
                                onClick={()=>{
                                    setStarsNum(index)
                                }}
                                className="star-icon"
                            />
                        }
                    })
                }</span>
                {formError.starsNum || <small>*Please leave at least a star as rating</small>}
                <form action="" className='review-form'>
                    <div className='title-wrapper'>
                        <label htmlFor="title-id">Title</label>
                        <input type="text" onChange={(e)=> {
                            setFormError({...formError, title:true})
                            setTitle(e.target.value)}
                        }
                        id='title-id' name='title' className='title' />
                        {formError.title || <small>*title field is required</small>}
                    </div>
                    <div className='comment-wrapper'>
                        <label htmlFor="comment-id">Comment</label>
                        <textarea name="comment" onChange={(e)=> {
                            setFormError({...formError, comment:true})
                            setComment(e.target.value)}
                        }
                        id='comment-id' className='comment' ></textarea>
                        {formError.comment || <small>*comment field is required</small>}
                    </div>
                    <button
                        onClick={handleSubmit}
                        className='save-btn'
                        type='submit'
                    >
                        Save
                    </button>
                    <button
                        onClick={()=> {
                            dispatch(setWriteReview(true))
                        }}
                        className='cancel-btn'
                        type='button'
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </section>
    </main>
}
export default WriteAReview