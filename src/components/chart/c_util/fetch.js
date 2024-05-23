import axios from "axios";

export default async function fetchStockData(symbol, timeFrame) {
    try {
        const apiUrl = `http://localhost:4001/api/stockData/${symbol}/${timeFrame}`;
        const response = await axios.get(apiUrl);
        const convertedData = response.data.reverse().map(dataPoint => ([
            (dataPoint.time + 19800) * 1000,  // Assuming 'time' is in seconds, convert to milliseconds
            dataPoint.open,
            dataPoint.max,
            dataPoint.min,
            dataPoint.close,
        ]));

        const volumeData = response.data.map(dataPoint => ([
            (dataPoint.time + 19800) * 1000,
            dataPoint.volume,
        ]));

        return { 'convert':convertedData, 'vol' : volumeData };
    } catch (error) {
        console.log(error);
    }
}