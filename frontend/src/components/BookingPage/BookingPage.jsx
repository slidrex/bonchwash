import React, {useState} from "react";
import BookingTable from "../BookingTable";
import './BookingPage.css'

function BookingPage() {
    const [selectedSlot, setSelectedSlot] = useState({ carNumber: 2, time: "9:00" });

    const carNumbers = [1, 2, 3, 4, 5, 6, 7];

    return (
        <div className='container'>
            <div className="body-content">
                <div className="schedule-content">
                    {carNumbers.map((value, rowIndex) => (
                        <BookingTable index={value}/>

                    ))}
                </div>
            </div>
            <div className="footer-content">

            </div>
        </div>
    );
}

export default BookingPage;