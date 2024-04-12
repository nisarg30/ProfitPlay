import React, { useState, useEffect } from 'react';
import './account.css';
import DropdownMenuDel from './dropdown/dropdowndel.jsx';
import DropdownMenuIntra from './dropdown/dropdownintra.jsx';
import axios from 'axios';
import BackendLink from '../../datasource/backendlink.js';
import Modal from './dropdown/dropdownticker/dropdowndelticker.jsx';

const Account = () => {
    const [deliveryItems, setDeliveryItems] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(BackendLink.account, { token : token });
                if(response.status === 200) {
                    console.log(response.data);
                }
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
                    <span className="name-title">Gol Nisarg Ashokkumar</span>
                </div>
                <div className="balance-card">
                    <div className="balance-info">
                        <span className="label">Trading Balance</span>
                        <span className="amount">₹3,187.68</span>
                        <button className="check-balance">↻<span className="tooltip">Check Updated Balance</span></button>
                    </div>
                </div>
            </div>
            <div className="trades">
                <div className="total-balance-cont">
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
