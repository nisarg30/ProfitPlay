import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';

const SearchBar = ({symbol, setSymbol}) => {
  const [stockNames, setStockNames] = useState([]);

  const fetchStockNames = async () => {
    try {
      const apiUrl = `http://localhost:3001/data`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      setStockNames(data);
    } catch (error) {
      console.error('Error fetching stock names:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchStockNames();
    };

    fetchData();
  }, []);

  const handleStockSelection = (event, value) => {
    setSymbol(value);
  };

  return (
    <FormControl style={{ width: '300px', height: '30px', marginTop: '2px', marginLeft: '10px', marginBottom: '2px' }}>
      <Autocomplete
        id="searchBar"
        freeSolo={false}
        options={stockNames.map((option) => option.stockname)}
        value={symbol}
        onChange={handleStockSelection}
        sx={{
          width: '100%',
          height: '100%',
          '& .MuiFormControl-root': {
            color: 'red',
            fontSize: '12px',
            lineHeight: 0.5,
            padding: 0,
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Stock Name"
            variant="outlined"
            sx={{
              width: '100%',
              height: '100%',
              '& .MuiInputLabel-root': {
                color: 'red',
                fontSize: '12px',
                lineHeight: 0.5,
                padding: 0,
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'blue',
                  borderWidth: '2px',
                  height: '30px',
                  padding: 0,
                },
                '&:hover fieldset': {
                  borderColor: 'green',
                  height: '30px',
                  padding: 0,
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'purple',
                  padding: 0,
                },
              },
            }}
          />
        )}
      />
    </FormControl>
  );
};

export default SearchBar;
