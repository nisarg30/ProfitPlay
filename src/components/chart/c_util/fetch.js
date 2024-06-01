import axios from "axios";

export async function fetchStockData(symbol, timeFrame) {
    try {
        const apiUrl = `https://cyborg0-1.onrender.com/api/stockData/${symbol}/${timeFrame}`;
        const response = await axios.get(apiUrl);
        const convertedData = response.data.reverse().map(dataPoint => ([
            (dataPoint.time + 19800) * 1000,  
            dataPoint.open,
            dataPoint.max,
            dataPoint.min,
            dataPoint.close,
        ]));

        const volumeData = response.data.map(dataPoint => ([
            (dataPoint.time + 19800) * 1000,
            dataPoint.volume,
        ]));

        console.log('fetch success');

        return { 'convert':convertedData, 'vol' : volumeData };
    } catch (error) {
        console.log(error);
    }
}

export async function fetchStockDatatime(symbol, timeFrame, time=null) {
    try {
        const apiUrl = `https://cyborg0-1.onrender.com/api/stockData/${symbol}/${timeFrame}/${time}`;
        const response = await axios.get(apiUrl);
        const convertedData = response.data.reverse().map(dataPoint => ([
            (dataPoint.time + 19800) * 1000,  
            dataPoint.open,
            dataPoint.max,
            dataPoint.min,
            dataPoint.close,
        ]));

        const volumeData = response.data.map(dataPoint => ([
            (dataPoint.time + 19800) * 1000,
            dataPoint.volume,
        ]));

        console.log('fetch success');

        return { 'convert':convertedData, 'vol' : volumeData };
    } catch (error) {
        console.log(error);
    }
}

