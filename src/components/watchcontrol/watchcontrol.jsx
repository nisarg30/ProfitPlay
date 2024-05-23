import React, { useState } from 'react';
import axios from 'axios';

import './watchcontrol.css';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useAuthorization } from '../../context/Authcontext';
import { useWebSocket } from '../../context/WebSocketCOntext';
import BackendLink from '../../datasource/backendlink';

const WatchControl = () => {
    const { socket } = useWebSocket(); 
    const { setActiveWatchlist, activeWatchlist, watchlists, setWatchlists } = useAuthorization();
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);
    const [isSettingsDialogOpen, setSettingsDialogOpen] = useState(false);
    const [anchorElAdd, setAnchorElAdd] = useState(null);
    const [anchorElSettings, setAnchorElSettings] = useState(null);
    const [error, setError] = useState(null);
    const [newWatchlistName, setWatchlistName] = useState('');

    const addWatchlist = async () => {
        if (watchlists.length >= 5) {
            setError("The maximum number of watchlists (5) has already been reached.");
            setTimeout(() => {
                setError(null);
                
            }, 3000);
            return;
        }
    
        const existingWatchlist = watchlists.find(watchlist => watchlist.watchlist === newWatchlistName);
        if (existingWatchlist) {
            setError("A watchlist with a similar name already exists.");
            setTimeout(() => {
                setError(null);
            }, 3000);
            return;
        }
    
        try {
            const token = localStorage.getItem('token');
            const bod = {
                token : token,
                watchlist : newWatchlistName
            }
            const response = await axios.post(BackendLink.addwatchlist, bod);
            if (response.status === 200) {
                const newWatchlist = { watchlist: { name: newWatchlistName, items: [] } };
                setWatchlists([...watchlists, newWatchlist]);
                setWatchlistName('');
                handleAddDialogClose();
                setActiveWatchlist(watchlists.length);
            }
        } catch (error) {
            console.error("Error adding watchlist:", error);
            setError("Failed to add watchlist. Please try again later.");
        }
    };
    
    const handleWatchlistClick = (index) => {
        const array1 = watchlists[activeWatchlist].watchlist.array;
        const array2 = watchlists[index].watchlist.array;
        setActiveWatchlist(index);

        const uncommonArray1 = [];
        const uncommonArray2 = [];

        const map = {};

        // Mark elements from array1
        if(array1) {
            array1.forEach((obj) => {
                const stockname = obj.stockname;
                map[stockname] = true;
            });
        }

        if(array2) {
            array2.forEach((obj) => {
                const stockname = obj.stockname;
                if (map[stockname]) {
                    delete map[stockname]; 
                } else {
                    uncommonArray2.push(obj); 
                }
            });
        }

        for (const key in map) {
            uncommonArray1.push({ stockname: key });
        }

        socket.emit('leaverequest1', uncommonArray1);
        socket.emit('joinrequest', uncommonArray2);
        
        setAnchorElAdd(null);
        setAnchorElSettings(null);
    };

    const deletewatchlist = async (watchlist) => {
        const token = localStorage.getItem('token');
        const body = {
            token : token,
            watchlistName : watchlist
        }

        const response = await axios.post(BackendLink.deletewatchlist, body);

        if(response.status === 200) {
            const updatedwatch = watchlists;
            socket.emit('leaverequest', watchlists[activeWatchlist].watchlist.array);
            if (watchlists[activeWatchlist].watchlist.name === watchlist) {
                if(activeWatchlist == 0) {
                    setActiveWatchlist(null);
                }
                else {
                    setActiveWatchlist(activeWatchlist - 1);
                }
            }
            const updatedWatchlists = watchlists.filter(item => item.watchlist.name !== watchlist);
            
            setWatchlists(updatedWatchlists);
        }
        else {
            console.log("error");
        }
    }

    const handleSettingsClick = (event) => {
        setAnchorElSettings(event.currentTarget);
        setSettingsDialogOpen(true);
    };

    const handleAddButtonClick = (event) => {
        setAnchorElAdd(event.currentTarget);
        setAddDialogOpen(true);
    };

    const handleAddDialogClose = () => {
        setAnchorElAdd(null);
        setAddDialogOpen(false);
    };

    const handleSettingsDialogClose = () => {
        setAnchorElSettings(null);
        setSettingsDialogOpen(false);
    };

    return (
        <div className="watchlist-controller">
            <ul className="watchlist" style={{ display: 'flex' }}>
            {watchlists.map((watchlist, index) => {
                return (
                    <li key={index} className="watchlist-control-item">
                        <button
                            className={`watch-button ${activeWatchlist === index ? 'active' : ''}`}
                            onClick={() => handleWatchlistClick(index)}
                        >
                            {activeWatchlist === index ? watchlist.watchlist.name : index + 1}
                        </button>
                    </li>
                );
            })}

                <li className="watchlist-control-item">
                    <button className="watch-button" onClick={handleAddButtonClick} style={{ backgroundColor : 'var(--color-text-blue)', color : '#ffffff'}}>
                        <Tooltip title="Add watchlist" arrow>
                            <AddIcon style={{ display: 'flex', fontSize: '1rem' }} />
                        </Tooltip>
                    </button>
                </li>
                <li className="watchlist-control-settings">
                    <button className="watch-button" onClick={handleSettingsClick}>
                        <Tooltip title="Manage watchlists" arrow>
                            <SettingsIcon style={{ display: 'flex', fontSize: '1rem' }} />
                        </Tooltip>
                    </button>
                </li>
            </ul>

            {/* Add Watchlist Dialog */}
            <Popover
                open={Boolean(anchorElAdd)}
                anchorEl={anchorElAdd}
                onClose={handleAddDialogClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div className='add-watchlist'>
                    <div id="modal" className="model-add-watchlist">
                        <div className='heading-container'>
                            <button className="close-button" onClick={handleAddDialogClose}>
                                <span className="close-button-span">X</span>
                            </button>
                            <div className="title-watchlist">
                                <h2 className="heading">Create Watchlist</h2>
                            </div>
                        </div>
                        <div className="content-area">
                            <div className="input-container">
                                <label htmlFor="txtListName" className="label-list-name">List Name</label>
                                <input required={true} type="text" maxLength="15" className="input-add-watchlist" id="txtListName" placeholder="Watchlist name"
                                value={newWatchlistName}
                                onChange={(e) => setWatchlistName(e.target.value)} />
                                <span>{error}</span>
                                <button className="add-button"
                                onClick={addWatchlist}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Popover>

            {/* Settings Dialog */}
            <Popover
                open={Boolean(anchorElSettings)}
                anchorEl={anchorElSettings}
                onClose={handleSettingsDialogClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div className='manage-watchlist'>
                    <div id="modal" className="model-manage-watchlist">
                        <div className='heading-container'>
                            <button className="close-button" onClick={handleSettingsDialogClose}>
                                <span className="close-button-span">X</span>
                            </button>
                            <div className="title-watchlist">
                                <h2 className="heading">Manage watchlists</h2>
                            </div>
                        </div>
                        <div className="content-area">
                            <div className="manage-container">
                                <ul className="watchlist-settings">
                                    {watchlists.map((watchlist, index) => (
                                        <li key={index} className="watchlist-settings-item">
                                            <span className='watchlist-name-span'>{watchlist.watchlist.name}</span>
                                            <div className='settings-icons-container'>
                                                <DeleteIcon className='delete-icon' style={{ cursor: 'pointer' }} fontSize='2rem' onClick={() => deletewatchlist(watchlist.watchlist.name)}/>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Popover>
        </div>
    );
}

export default WatchControl;
