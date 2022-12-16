import React, {useRef, useState, useEffect} from 'react'
import Slider from './mobile/Slider'
import FirstRowSection from './FirstRowSection'
import FirstOrderDeal from './mobile/FirstOrderDeal';
import FlashSales from './FlashSales'
import ExploreStore from './ExploreStore'
import VisualCategory from './mobile/VisualCategory'
import AdSlider from './AdSlider'
import Footer from './Footer'
import {useSelector} from 'react-redux'
import { setFirstRowSectionWidth } from '../../features/home/homeSlice'
import './Home.css'
import './subCategory.css'
import './ExploreStore.css'
import './mobile/VisualCategory.css'
//use reducer for category
function Home() {
  const {windowWidth, products, firstRowSectionWidth} = useSelector((store)=> store.home)

  return <main id='Home'>
      {windowWidth<=962 && <Slider/> }
      <FirstRowSection />
      <FlashSales countdownTimestampMs={1653670957777 + (1000*60*60*24*3)} width={firstRowSectionWidth}/>
      <ExploreStore width={firstRowSectionWidth}/>
      <Footer/>
    </main>
    
}
export default Home