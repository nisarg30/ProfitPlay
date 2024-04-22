import './chart.css';
import React, { useEffect, useState, useRef } from 'react';
import Highcharts from "highcharts/highstock";

import indicatorsAll from "highcharts/indicators/indicators-all";
import annotationsAdvanced from "highcharts/modules/annotations-advanced";
import priceIndicator from "highcharts/modules/price-indicator";
import fullScreen from "highcharts/modules/full-screen";
import stockTools from "highcharts/modules/stock-tools";
import dragPanes from "highcharts/modules/drag-panes.js"
import HighchartsReact from "highcharts-react-official";
import io from 'socket.io-client'; 

import SearchBar from './c_util/sb';
import TimeframeSelector from './c_util/tf';
import fetchStockData from './c_util/fetch';
import Header from '../header/header';
// Initialize the required modules
indicatorsAll(Highcharts);
annotationsAdvanced(Highcharts);
priceIndicator(Highcharts);
fullScreen(Highcharts);
stockTools(Highcharts);  
dragPanes(Highcharts);

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div>Something went wrong. Please try again.</div>;
        }

        return this.props.children;
    }
}

const StockChart = () => {

    //prop setup
    const bbb = localStorage.getItem('chart_tf');
    const [timeFrame, setTimeFrame] = useState(bbb != undefined ? bbb : "1D");
    const aaa = localStorage.getItem('chart_stock');
    const [symbol, setSymbol] = useState(aaa != undefined ? aaa : "reliance");
    const [stockData, setStockData] = useState([]);
    const [volumeData, setVolumeData] = useState([]);
    const [xsocket, setSocket] = useState(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {

            if(xsocket) {
                console.log("disconnecting");
                xsocket.close();
                setSocket(null);
                xyz();
            }

            try {
                const result = await fetchStockData(symbol, timeFrame);
                setStockData(result.convert);
                setVolumeData(result.vol);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

        return () => {
        }
    }, [symbol, timeFrame]);
    
    function xyz() {
        const socket = io('http://localhost:3001',{
            query: {
                stockname: symbol,
                timeframe: timeFrame
            }
        });
        setSocket(socket);

        socket.on('dataUpdate', (data) => {
            if (!chartRef.current || !chartRef.current.chart) {
                return; // Exit the function if chartRef.current or chartRef.current.chart is null
            }
            if(chartRef.current.chart.series[0].data.length > 0) {
                const len = chartRef.current.chart.series[0].data.length;
                const point = chartRef.current.chart.series[0].data[len-1];
                if(point.x === ((data.time + 19800)*1000)){
                    var high = Math.max(point.high, data.max);
                    var low = Math.min(point.low, data.min);
                    chartRef.current.chart.series[0].data[len-1].update({
                        high : high,
                        low : low,
                        close : data.close,
                        open : data.open
                    });
                    chartRef.current.chart.series[1].data[len-1].update({
                        y : data.volume
                    })  
                }
                else{
                    data.time = (data.time + 19800)*1000;
                    chartRef.current.chart.series[0].addPoint([
                        data.time,
                        data.open,
                        data.max,
                        data.min,
                        data.close,
                    ], true);

                    chartRef.current.chart.series[1].addPoint([
                        data.time,
                        data.volume
                    ], true);
                }
            }
        });
        return () => {
            console.log('Disconnecting socket');
            socket.close();
        };
    }

    function abc(width, height, point) {
        const chart = chartRef.current.chart;
        let position;

        if (point.isHeader) {
            position = {
                x: Math.max(
                    // Left side limit
                    chart.plotLeft,
                    Math.min(
                        point.plotX + chart.plotLeft - width / 2,
                        // Right side limit
                        chart.chartWidth - width - chart.marginRight
                    )
                ),
                y: point.plotY
            };
        } else {
            position = {
                x: point.series.chart.plotLeft,
                y: point.series.yAxis.top - chart.plotTop
            };
        }

        return position;
    }
    
    function getOptions(elements) {
        var options = [],
            userOptions;
    
        elements.forEach(function(element) {
            userOptions = element.userOptions;
            console.log(userOptions);
            if (!userOptions.isInternal) {
                options.push(userOptions);
    
                if (userOptions.draggable && userOptions.labels) {
                    userOptions.labels.forEach(function(label) {
                        label.controlPoints = null;
                    });
                }
            }
        });
        return options;
    }

    function handleSave(){

        console.log('handle save');
        var userOptions = chartRef.current.chart.userOptions;
            if (chartRef.current.chart.annotations.length) {
                userOptions.annotations = getOptions(chartRef.current.chart.annotations);
            }
            if (chartRef.current.chart.series.length) {
                userOptions.series = getOptions(chartRef.current.chart.series);
            }
            userOptions.xAxis = getOptions(chartRef.current.chart.xAxis);
            userOptions.yAxis = getOptions(chartRef.current.chart.yAxis);
        localStorage.setItem(
            'customStockToolsChart',
            JSON.stringify(userOptions)
        );
    }

    const handleClear = () => {
        console.log('handle clear');
        localStorage.removeItem('customStockToolsChart');
    }

    try {
        var chartOptions = {};

        if(localStorage.getItem('customStockToolsChart')) {
            chartOptions = JSON.parse(localStorage.customStockToolsChart);
            chartOptions.tooltip.positioner = abc;

            if (chartOptions.yAxis && Array.isArray(chartOptions.yAxis)) {
                chartOptions.yAxis.forEach(function (yAxis, index) {
                    yAxis.showLastLabel = true;
                    if (index !== 0) {
                        yAxis.panningEnabled = false;
                    }
                });
            }
            chartOptions.chart.events.load = xyz;
            chartOptions.navigation = {
                bindings: {
                    saveChartx: {
                        className: 'highcharts-savex-chart',
                        init: handleSave
                    },
                    clearChart : {
                        className: 'highcharts-clear-chart',
                        init: handleClear
                    },
                }
            }
            chartOptions.series[0].data = stockData;
            chartOptions.series[1].data = volumeData;
        }
        else {
            chartOptions = {
                // title: {
                //     text: symbol.toUpperCase(),
                // },
                lang : {
                    resetZoom : 'Z'
                },
                stockTools: {
                    gui: {
                        enabled: true, // Enable the GUI for drawing tools
                        buttons: ['indicators', 'simpleShapes', 'lines', 
                        'advanced','crookedLines','fullScreen','currentPriceIndicator','saveChartx','clearChart'],
                        definitions: {
                            saveChartx: {
                                className: 'highcharts-savex-chart',
                                symbol: 'text.svg'
                            },
                            clearChart: {
                                className: 'highcharts-clear-chart',
                                symbol: 'text.svg'
                            },
                        }
                    },
                },
                navigation: {
                    bindings: {
                        saveChartx: {
                            className: 'highcharts-savex-chart',
                            init: handleSave
                        },
                        clearChart : {
                            className: 'highcharts-clear-chart',
                            init: handleClear
                        },
                    }
                },
                series:
                    [{
                        type: 'candlestick',
                        name: `${timeFrame}`,
                        data: stockData,
                        dataGrouping: {
                            enabled: false
                        }, 
                        color: 'red',
                        upColor: 'green',
                        lineColor: 'red',
                        upLineColor: 'green',
                        id : 'sss',
                        yAxis : 0,
                    },
                    {
                        id : 'volume',
                        type: 'column',
                        name: 'Volume',
                        data: volumeData,
                        yAxis: 1,
                        dataGrouping: {
                            enabled : false,
                        }        
                    }
                ],
                chart : {
                    panning : {
                        enabled : true,
                        type : 'x'
                    },
                    zoomEnabled : true,
                    resetZoomButton: {
                        theme: {
                            style: {
                                display: 'none'
                            }
                        }
                    },
                    events : {
                        load : xyz
                    }
                },
                tooltip: {
                    positioner: abc,
                    shadow: false,
                    borderWidth: 0,
                    backgroundColor: 'rgba(255,255,255,0.8)'
                },
                yAxis: [{
                    offset: 0, //new value
                    crosshair: {
                        label: {
                            enabled: true,
                            backgroundColor : '#000000',
                        },
                        dashStyle: 'dash',
                        color : '#000000',
                    },
                    labels: {
                        align: 'center',
                    },
                    showLastLabel : true,
                    height : "70%"
                },
                {
                    offset: 0, //new value
                    crosshair: {
                        label: {
                            enabled: true,
                            backgroundColor : '#000000',
                        },
                        dashStyle: 'dash',
                        color : '#000000'
                    },
                    labels: {
                        align: 'center',
                    },
                    showLastLabel : true,
                    top : "75%",
                    height : "25%",
                    panningEnabled : false
                }],
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        minute: '%H:%M',
                    },
                    ordinal: true,
                    crosshair: {
                        label: {
                            enabled: true,
                            backgroundColor : '#000000'
                        },
                        dashStyle: 'dash',
                        color : '#000000'
                    },
                },
                scrollbar: {
                    enabled: false
                },
                rangeSelector: {
                    enabled: true,
                    inputEnabled: false,
                    selected: 0, // Set "day" as the default
                    buttons: [
                        {
                            type: 'all',
                            count: 1,
                            text: 'all',
                        },
                        {
                            type: 'hour',
                            count: 4,
                            text: '4h',
                        },
                        {
                            type: 'day',
                            count: 1,
                            text: '1d',
                        },
                        {
                            type: 'week',
                            count: 1,
                            text: '1w',
                        },
                        {
                            type: 'month',
                            count: 1,
                            text: '1m',
                        },
                        {
                            type: 'month',
                            count: 6,
                            text: '6m',
                        },
                        {
                            type: 'year',
                            count: 1,
                            text: '1y',
                        },
                    ],
                },
                navigator: {
                    enabled: false,
                },
            };
        }   
    } catch (error) {
        console.log(error);
        console.log('error captured');
    }

    const containerProps = {
        style: {
            width: '100%',
            height: 'calc(100vh - 7rem)', // Set height based on visibility
            overflow: 'hidden', // Hide overflow when chart is closed
            transition: 'height 0.5s', // Add a smooth transition
        },
    };

    return (
        <ErrorBoundary>
                    <div>
                        <Header />
                        <div style={{display : 'flex', flexDirection : 'row'}}>
                            <SearchBar symbol={symbol} setSymbol={setSymbol}/>
                            <TimeframeSelector timeframe={timeFrame} setTimeframe={setTimeFrame}/>
                        </div>
                        <HighchartsReact 
                            highcharts={Highcharts} 
                            options={chartOptions} 
                            constructorType={'stockChart'}
                            containerProps={containerProps} 
                            ref={chartRef} />
                        </div>
        </ErrorBoundary>
    );
};

export default StockChart;