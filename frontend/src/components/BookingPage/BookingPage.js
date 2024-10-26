import React, { useState, useEffect } from "react";
import "./bookingPage.css";

function getDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    const dayAfterTomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${day}.${month}`;
    };

    return {
        today: formatDate(today),
        tomorrow: formatDate(tomorrow),
        dayAfterTomorrow: formatDate(dayAfterTomorrow)
    };
}

function BookingPage() {
    const [activeButton, setActiveButton] = useState(null);
    const [transitionedButton, setTransitionedButton] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [isCentered, setIsCentered] = useState(false);
    const { today, tomorrow, dayAfterTomorrow } = getDates();

    const handleButtonClick = (index) => {
        setActiveButton(index);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
    };

    const handleBookClick = () => {
        setTransitionedButton(activeButton);
        setIsCentered(true);
    };

    const hasRoomNumber = /\d+/.test(inputValue);

    useEffect(() => {
        if (!hasRoomNumber) {
            setActiveButton(null);
            setTransitionedButton(null);
        }
    }, [hasRoomNumber]);

    return (
        <div className={`book_announcement ${isCentered ? "centered" : ""}`}>
            <div className="main-header">
                <h1 className="book-header">Забронировать стиральную машинку</h1>
                <h2>Пожалуйта, авторизируйтесь</h2>

            </div>
            <div className="data-center">
                <div className="vk-auth-button">
                    <div className="logo">
                        <img src="./vk.png" alt="" />
                    </div>
                    <div className="inline-text">
                        Войти по VK ID
                    </div>

                </div>
            </div>
            {hasRoomNumber && (
                <div className="date_choose">
                    {[today, tomorrow, dayAfterTomorrow].map((date, index) => (
                        <div
                            key={index}
                            className={`date_button ${activeButton === index ? "active" : ""} ${transitionedButton === index ? "transitioned" : ""} ${transitionedButton !== null && transitionedButton !== index ? "hidden" : ""}`}
                        >
                            <div>{index === 0 ? "Сегодня" : index === 1 ? "Завтра" : "Послезавтра"}</div>
                            <div>{date}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BookingPage;