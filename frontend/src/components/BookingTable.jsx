import React, {useState} from 'react';
import './BookingTable.css'
function BookingTable({index}) {
    const carNumbers = [1, 2, 3, 4, 5, 6, 7];
    const timeSlots = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
    const color = ['#FFFFFA', '#FFF9ED', '#FEF5E4', '#FFF1DF', '#FDEBDB', '#FAE6D4', '#FAE2D4', '#EEE0D9', '#EADBDC', '#E5D6DA', '#DCD4DD', '#D5CBE1']
    return (
        <div className="column">
            <div className="wash-index">
                {index}
            </div>
            {timeSlots.map((time, rowIndex) => (
                <div
                    key={rowIndex}
                    className="timestamp"
                    style={{backgroundColor: color[rowIndex % color.length]}}
                >
                    {time}
                </div>
            ))}
        </div>
    );
}

export default BookingTable;