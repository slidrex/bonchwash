import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

function ProfilePage() {
    const [userInfo] = useState({ name: 'Вячеслав', surname: 'Носов' });
    const navigate = useNavigate();
    const currentDay = new Date().getDay();

    const handleLogout = () => {
        navigate('/auth');
    };

    const showerSchedule = [
        { day: 'Понедельник', hours: '6:00 - 11:00 и 20:00 - 01:00' },
        { day: 'Вторник', hours: '06:00 - 13:00 и 16:00 - 01:00' },
        { day: 'Среда', hours: '06:00 - 13:00 и 16:00 - 01:00' },
        { day: 'Четверг', hours: '06:00 - 13:00 и 16:00 - 01:00' },
        { day: 'Пятница', hours: '06:00 - 13:00 и 16:00 - 01:00' },
        { day: 'Суббота', hours: '06:00 - 13:00 и 16:00 - 01:00' },
        { day: 'Воскресенье', hours: '06:00 - 13:00 и 16:00 - 01:00' },
    ];

    const laundrySchedule = [
        { day: 'Понедельник', hours: '09:00 - 20:00' },
        { day: 'Вторник', hours: '09:00 - 20:00' },
        { day: 'Среда', hours: '09:00 - 20:00' },
        { day: 'Четверг', hours: '09:00 - 20:00' },
        { day: 'Пятница', hours: '09:00 - 20:00' },
        { day: 'Суббота', hours: '09:00 - 20:00' },
        { day: 'Воскресенье', hours: '09:00 - 20:00' },
    ];

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1 className="profile-name">{userInfo.name} {userInfo.surname}</h1>
                <button className="logout-button" onClick={handleLogout}>Выйти</button>
            </div>
            <div className="schedules">
                <div className="schedule">
                    <h2>Расписание работы душа</h2>
                    {showerSchedule.map((schedule, index) => (
                        <p key={index}>
                            {schedule.day}: {schedule.hours} {currentDay === index ? '❮' : ''}
                        </p>
                    ))}
                </div>
                <div className="schedule">
                    <h2>Расписание работы прачечной</h2>
                    {laundrySchedule.map((schedule, index) => (
                        <p key={index}>
                            {schedule.day}: {schedule.hours} {currentDay === index ? '❮' : ''}
                        </p>
                    ))}
                </div>
            </div>


            <div className="developers">
                <p>Кандаров И.Е - Team Lead, Backend</p>
                <p>Хоризонов Серафим - Frontend</p>
                <p>Джон Доу - Design</p>
                <a className="github-button" href="https://github.com/slidrex/bonchwash" target="_blank" >GitHub</a>
            </div>
        </div>
    );
}

export default ProfilePage;