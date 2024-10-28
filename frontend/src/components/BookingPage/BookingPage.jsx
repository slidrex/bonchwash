import BookingTable from "../BookingTable";
import './BookingPage.css'
import { redirect } from "react-router-dom";
import {useEffect, useState} from "react";

function BookingPage() {

    const [userInfo, setUserInfo] = useState({ name: 'Вячеслав Носов', room: '314' });
    const [activeButton, setActiveButton] = useState('today');

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

    // let response = fetch('', {
    //     method: 'GET',
    //     credentials: 'include'  // Включаем куки в запросе
    // });

    // if (response.ok) {
    //     let data = response.json();
    //     if (!data.authorized) {
    //         alert("BookingPage - Unauthorized. Redirect to login.");
    //         return redirect('/');
    //     }
    // }

    const carNumbers = [1, 2, 3, 4, 5, 6, 7];


    return (
        <div className='container'>
            <div className="header">
                <div className="user-info">
                    <p>{userInfo.name}, к. {userInfo.room}</p>
                </div>
                <div className="book-buttons">
                    <div
                        className={`time-holder btn ${activeButton === 'today' ? 'primary' : 'secondary'}`}
                        onClick={() => setActiveButton('today')}
                    >
                        <div className="today">Сегодня</div>
                        <div className="inline-book">27 ноября</div>
                    </div>
                    <div
                        className={`time-holder btn ${activeButton === 'tomorrow' ? 'primary' : 'secondary'}`}
                        onClick={() => setActiveButton('tomorrow')}
                    >
                        <div className="tomorrow">Завтра</div>
                        <div className="inline-book">28 ноября</div>
                    </div>
                    <div
                        className={`time-holder btn ${activeButton === 'after-tomorrow' ? 'primary' : 'secondary'}`}
                        onClick={() => setActiveButton('after-tomorrow')}
                    >
                        <div className="after-tomorrow">Послезавтра</div>
                        <div className="inline-book">29 ноября</div>
                    </div>
                </div>
            </div>
            <div className="body-content">
                {carNumbers.map((value, rowIndex) => (
                    <BookingTable index={value} key={rowIndex} />
                ))}
            </div>
        </div>
    );
}

export default BookingPage;