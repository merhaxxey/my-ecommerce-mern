import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './SplitButton.css'

export default function SelectLabels() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl id='selectLabels-FormControl' sx={{ m: 1, minWidth: 120 }}>
      <span className='title'>Sort by:</span>
      <Select
        style={{outline: 'none'}}
        id='select'
        value={age}
        onChange={handleChange}
        displayEmpty
        size='small'
        inputProps={{ 'aria-label': 'Without label' }}
        variant='standard'
      >
        <MenuItem value="">
          None
        </MenuItem>
        <MenuItem value={20}>Price: High to low</MenuItem>
        <MenuItem value={30}>Price: Low to high</MenuItem>
      </Select>
    </FormControl>
  );
}
