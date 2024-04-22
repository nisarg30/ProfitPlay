import React, { useState, useEffect } from 'react';
import './dropdown.css';
import Modal from './dropdownticker/dropdowndelticker'; 
import axios from 'axios'; 
import BackendLink from '../../../datasource/backendlink';
import formatNumber from '../../../datasource/formatter';

const DropdownMenuDel = ({ items }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [additionalData, setAdditionalData] = useState(null);

    const handleRowClick = async (item) => {
        setSelectedItem(item);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedItem(null);
        setAdditionalData(null); // Reset additional data on close
    };

    useEffect(() => {
        const fetchData = async () => {
            if (selectedItem) {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.post(BackendLink.deliveryfetch, { token: token, stockname: selectedItem.stockname }); 
                    console.log(response);
                    setAdditionalData(response.data.deliveryfetch);
                } catch (error) {
                    console.error('Failed to fetch data', error);
                }
            }
        };

        fetchData();
    }, [selectedItem]); // Fetch data when selectedItem changes

    return (
        <div className="dropdown-menu">
            <div className="dropdowndel-container">
                <table className="positions-table">
                    <thead>
                        <tr className="drop-heading">
                            <th>Stock Name</th>
                            <th>Realised Gain / Loss</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length !== 0 && items.map((item, index) => (
                            <tr className="del-stocks" key={index} onClick={() => handleRowClick(item)}>
                                <td className='del-stock'>{item.stockname}</td>
                                <td className='del-stock'>{formatNumber(item.realised)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={modalOpen} onClose={closeModal}>
                <div className="modal-header">
                    <div className="modal-stockname">{selectedItem && selectedItem.stockname}</div>
                    <div className="modal-realised">{selectedItem && `Realised Gain / Loss: ${formatNumber(selectedItem.realised)}`}</div>
                </div>
                {additionalData && (
                    <div className="additional-data">
                        <div className="data-header">
                                <div className="data-cell">Date</div>
                                <div className="data-cell">Direction</div>
                                <div className="data-cell">Quantity</div>
                                <div className="data-cell">Executed Price</div>
                            </div>
                        <div className="data-table">
                            {additionalData.map((trade, idx) => (
                                <div className="data-row" key={idx}>
                                    <div className="data-cell">{trade.date}</div>
                                    <div className="data-cell">{trade.direction == 0 ? "BUY" : "SELL"}</div>
                                    <div className="data-cell">{trade.quantity}</div>
                                    <div className="data-cell">{trade.ex_price}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default DropdownMenuDel;
