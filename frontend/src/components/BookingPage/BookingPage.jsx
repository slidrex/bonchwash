import React, {useState} from "react";
import BookingTable from "../BookingTable";
import './BookingPage.css'

function BookingPage() {
    const [selectedSlot, setSelectedSlot] = useState({ carNumber: 2, time: "9:00" });

    const carNumbers = [1, 2, 3, 4, 5, 6, 7];

    return (
        <div className='container'>
            <div className="header-content">
                <div className="book-header">
                    <div className="today">Сегодня</div>
                    <div className="tomorrow">Завтра</div>
                    <div className="after-tomorrow">Послезавтра</div>
                </div>
            </div>
            <div className="body-content">
                    {carNumbers.map((value, rowIndex) => (
                        <BookingTable index={value}/>

                    ))}
            </div>
            <div className="footer-content">

            </div>
        </div>
    );
}

export default BookingPage;