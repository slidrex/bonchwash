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

function BookingPage({ onBookClick }) {
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
        onBookClick();
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
            <h1 className={isCentered ? "hidden" : ""}>Забронировать стиральную машинку</h1>
            <div className={`name_inputbox ${isCentered ? "no-margin fit-content" : ""}`}>
                <input
                    type="text"
                    placeholder="Имя Фамилия, к. 666"
                    value={inputValue}
                    onChange={handleInputChange}
                    spellCheck={false}
                    readOnly={transitionedButton !== null}
                />
            </div>
            {hasRoomNumber && (
                <div className="date_choose">
                    {[today, tomorrow, dayAfterTomorrow].map((date, index) => (
                        <div
                            key={index}
                            className={`date_button ${activeButton === index ? "active" : ""} ${transitionedButton === index ? "transitioned" : ""} ${transitionedButton !== null && transitionedButton !== index ? "hidden" : ""}`}
                            onClick={() => handleButtonClick(index)}
                        >
                            <div>{index === 0 ? "Сегодня" : index === 1 ? "Завтра" : "Послезавтра"}</div>
                            <div>{date}</div>
                        </div>
                    ))}
                </div>
            )}
            {hasRoomNumber && activeButton !== null && transitionedButton === null && (
                <div className="book_button" onClick={handleBookClick}>
                    Перейти к брони
                </div>
            )}
        </div>
    );
}

export default BookingPage;