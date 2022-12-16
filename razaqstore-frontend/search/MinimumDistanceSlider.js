import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {useSelector, useDispatch} from 'react-redux'
import {setFormValue} from '../../features/search/searchSlice'
import './MinimumDistanceSlider.css'

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider({productPrice}) {
  const dispatch = useDispatch()
  const {formValue} = useSelector((store)=>store.search)
  const [value, setValue] = React.useState([formValue.min, formValue.max]);

  const handleChange = (event, newValue) => {
    dispatch(setFormValue({ min:newValue[0], max:newValue[1]}))
    setValue(newValue);
  };

  React.useEffect(()=>{
    console.log(formValue)
    setValue([formValue.min, formValue.max])
  }, [formValue])

  return (
    <Box className='slider-wrapper' sx={{ width: '100%' }}>
      <Slider
        className='slider'
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap={true}
        max={productPrice.formValue.max}
        min={productPrice.formValue.min}
        step={200}
      />
    </Box>
  );
}
