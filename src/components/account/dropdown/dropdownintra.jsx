import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

function DropdownMenuIntra() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = date => {
        setSelectedDate(date);
        fetchData(date);
    };

    const fetchData = async (date) => {
        try {
            const formattedDate = [
                ('0' + (date.getMonth() + 1)).slice(-2),
                ('0' + date.getDate()).slice(-2),
                date.getFullYear()
            ].join('/');
            const response = await axios.get(`https://your-backend-url.com/data?date=${formattedDate}`);
            console.log('Data fetched:', response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h1>Pick a Date</h1>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy" 
            />
        </div>
    );
}

export default DropdownMenuIntra;
