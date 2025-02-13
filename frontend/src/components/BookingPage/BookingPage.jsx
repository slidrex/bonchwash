import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BookingTable from '../BookingTable';
import Modal from './Modal';
import profileIcon from './profile_icon.svg';
import './BookingPage.css';

function BookingPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const room = location.state?.room || '314';
    const [userInfo, setUserInfo] = useState({ name: 'Вячеслав Носов', room });
    const [activeButton, setActiveButton] = useState('today');
    const [occupiedSlots] = useState({
        "201": ["1-9", "3-11", "5-12"],
        "202": ["2-11", "4-13", "1-10"],
    });
    const [confirmedSlots, setConfirmedSlots] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isCancelMode, setIsCancelMode] = useState(false);

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const response = await fetch('https://bonchwash.ru/api/v1/auth', {
                    method: 'GET',
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserInfo({ name: data.name, room: data.room });
                } else {
                    console.error('Failed to fetch user info');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchUserInfo().then(r => console.log('User info fetched'));
    }, []);

    const handleSlotClick = (slot) => {
        if (confirmedSlots.includes(slot)) {
            setIsCancelMode(true);
        } else {
            setIsCancelMode(false);
        }
        setSelectedSlot(slot);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedSlot(null);
    };

    const handleConfirm = () => {
        if (isCancelMode) {
            setConfirmedSlots(confirmedSlots.filter(slot => slot !== selectedSlot));
        } else {
            setConfirmedSlots([...confirmedSlots, selectedSlot]);
        }
        setShowModal(false);
        setSelectedSlot(null);
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const machineNumbers = [1, 2, 3, 4, 5, 6, 7];

    return (
        <div className='container'>
            <div className="header">
                <div className="upper-hdr">
                    <div className="user-info">
                        <p>{userInfo.name}, к. {userInfo.room}</p>
                    </div>
                    <div className="profile secondary" onClick={handleProfileClick}>
                        <img src={profileIcon} alt="Profile icon"/>
                        <p>Профиль</p>
                    </div>
                </div>
                <div className="book-buttons">
                    <div
                        className={`time-holder ${activeButton === 'today' ? 'primary' : 'secondary'}`}
                        onClick={() => setActiveButton('today')}
                    >
                        <div className="today">Сегодня</div>
                        <div className="inline-book">27 ноября</div>
                    </div>
                    <div
                        className={`time-holder ${activeButton === 'tomorrow' ? 'primary' : 'secondary'}`}
                        onClick={() => setActiveButton('tomorrow')}
                    >
                        <div className="tomorrow">Завтра</div>
                        <div className="inline-book">28 ноября</div>
                    </div>
                    <div
                        className={`time-holder ${activeButton === 'after-tomorrow' ? 'primary' : 'secondary'}`}
                        onClick={() => setActiveButton('after-tomorrow')}
                    >
                        <div className="after-tomorrow">Послезавтра</div>
                        <div className="inline-book">29 ноября</div>
                    </div>
                </div>
            </div>
            <div className="body-content">
                {machineNumbers.map((value, rowIndex) => (
                    <BookingTable
                        index={value}
                        key={rowIndex}
                        occupiedSlots={occupiedSlots}
                        confirmedSlots={confirmedSlots}
                        onSlotClick={handleSlotClick}
                    />
                ))}
            </div>
            <Modal show={showModal} onClose={handleCloseModal} onConfirm={handleConfirm} isCancelMode={isCancelMode} />
        </div>
    );
}

export default BookingPage;