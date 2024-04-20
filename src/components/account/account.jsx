import React, { useState, useEffect } from 'react';
import './account.css';
import DropdownMenuDel from './dropdown/dropdowndel.jsx';
import DropdownMenuIntra from './dropdown/dropdownintra.jsx';
import axios from 'axios';
import BackendLink from '../../datasource/backendlink.js';
import Modal from './dropdown/dropdownticker/dropdowndelticker.jsx';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import formatNumber from '../../datasource/formatter.js';

const Account = () => {
    const navigate = useNavigate()

    const balance = useSelector(state => state.user.userBalance)
    const [deliveryItems, setDeliveryItems] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleResetUser = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.post(BackendLink.resetuser, {token : token});

        if(response.status === 200) {
            if(response.data.success === 1001) {
                navigate('/login');
            }
        }
    };

    const handleDeleteUser = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.post(BackendLink.deleteuser, {token : token});

        if(response.status === 200) {
            if(response.data.success === 1001) {
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(BackendLink.account, { token : token });
                setDeliveryItems(response.data.delivery);
            } catch (error) {
                console.log(error);
            }
        }
        fetch();
    }, [])

    return (
        <div className="Account">
            <div className="total-balance-cont">
                <div className="total-balance-header">
                    <span className="name-title">USER ACCOUNT SUMMARY</span>
                    <div className="button-user-action">
                        <button className="action-button" onClick={handleResetUser}>Reset User</button>
                        <button className="action-button" onClick={handleDeleteUser}>Delete User</button>
                    </div>
                </div>
                <div className="balance-card">
                    <div className="balance-info">
                        <span className="label">Trading Balance</span>
                        <span className="amount">₹ {formatNumber(balance.toFixed(2))}</span>
                    </div>
                    <div className="balance-info">
                        <span className="label">Total Gain / Loss Realised</span>
                        <span className="amount">₹ {formatNumber(balance.toFixed(2) - 1000000)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{((balance - 1000000) / 1000000).toFixed(2)} %</span>
                    </div>
                </div>
            </div>
            <div className="trades">
                <div className="total-balance-cont2">
                    <div className="total-balance-header">
                        <span className="name-title">Trade History by Date</span>
                    </div>
                    <div className="total-balance-header">
                        <span className="name-title" >Delivery</span>
                    </div>
                    <DropdownMenuDel items={deliveryItems} />
                    <div className="total-balance-header" onClick={() => setModalOpen(true)}>
                        <span className="name-title" >Intraday</span>
                    </div>
                    <Modal isOpen={modalOpen} onClose={closeModal}>
                        <DropdownMenuIntra />
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Account;
