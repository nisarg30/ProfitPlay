import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

const TimeframeSelector = ({ timeframe, setTimeframe }) => {

    const handleChange = (event) => {
        setTimeframe(event.target.value);
        localStorage.setItem('chart_tf', event.target.value);
    };
    return (
        <FormControl style={{ width: '10.71rem', marginTop: '0.14rem', marginLeft: '0.7rem', marginBottom: '0.14rem'}}>
        <Select style={{ height: '2.14rem', fontSize: '1rem', backgroundColor: '#ffffff'}}
            value={timeframe}
            onChange={handleChange}
        >
            <MenuItem value="1">1 Minute</MenuItem>
            <MenuItem value="3">3 Minutes</MenuItem>
            <MenuItem value="5">5 Minutes</MenuItem>
            <MenuItem value="15">15 Minutes</MenuItem>
            <MenuItem value="30">30 Minutes</MenuItem>
            <MenuItem value="45">45 Minutes</MenuItem>
            <MenuItem value="60">1 Hour</MenuItem>
            <MenuItem value="120">2 Hours</MenuItem>
            <MenuItem value="180">3 Hours</MenuItem>
            <MenuItem value="240">4 Hours</MenuItem>
            <MenuItem value="1D">1 Day</MenuItem>
            <MenuItem value="1W">1 Week</MenuItem>
            <MenuItem value="1M">1 Month</MenuItem>
            <MenuItem value="3M">3 Months</MenuItem>
            <MenuItem value="6M">6 Months</MenuItem>
            <MenuItem value="12M">12 Months</MenuItem>
        </Select>
        </FormControl>
    );
};

export default TimeframeSelector;

