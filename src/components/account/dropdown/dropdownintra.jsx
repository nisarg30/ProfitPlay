import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import BackendLink from '../../../datasource/backendlink';
import './DropdownMenuIntra.css';

function DropdownMenuIntra() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [intradayTrades, setIntradayTrades] = useState([]);

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const fetchData = async (date) => {
        try {
            const formattedDate = [
                date.getMonth() + 1,
                date.getDate(),
                date.getFullYear()
            ].join('/');

            const token = localStorage.getItem('token');
            const response = await axios.post(BackendLink.intradayfetch, { token, date: formattedDate });

            // Update state with the fetched trades
            if (response.data && response.data.logos) {
                setIntradayTrades(response.data.logos);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Use useEffect to fetch trades when the component mounts or when selectedDate changes
    useEffect(() => {
        fetchData(selectedDate);
    }, [selectedDate]); // Run useEffect whenever selectedDate changes

    return (
        <div className='intra-pop'>
            <div className="left-partition">
                <h1>Pick a Date</h1>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy" 
                    inline
                    maxDate={new Date()}
                    className='custom-date'
                />
                <button className='fetch-data' onClick={() => fetchData(selectedDate)}>Fetch Trades</button>
            </div>
            
            <div className="right-partition">
                {intradayTrades.length > 0 ? (
                    <div className="trade-data">
                        <h1> Number Of Trades : {intradayTrades.length}</h1>
                        <div className="data-header">
                            <div className="data-cell">Stock Name</div>
                            <div className="data-cell">Quantity</div>
                            <div className="data-cell">Buy Price</div>
                            <div className="data-cell">Sell Price</div>
                            <div className="data-cell">Realised</div>
                        </div>
                        <div className="data-table">
                            {intradayTrades.map((trade, idx) => (
                                <div className="data-row" key={idx}>
                                    <div className="data-cell">{trade.stockname}</div>
                                    <div className="data-cell">{trade.quantity}</div>
                                    <div className="data-cell">{trade.buy_price}</div>
                                    <div className="data-cell">{trade.sell_price}</div>
                                    <div className="data-cell">{trade.realised}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="trade-data">
                        <h3>No intraday trades for the selected date.</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DropdownMenuIntra;
