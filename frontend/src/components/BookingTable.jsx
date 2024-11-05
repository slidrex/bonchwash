import React from 'react';
import './BookingTable.css';

function BookingTable({ index, occupiedSlots, confirmedSlots, onSlotClick }) {
    const timeSlots = ["9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];

    const isOccupied = (carIndex, timeSlot) => {
        for (const [room, slots] of Object.entries(occupiedSlots)) {
            if (slots.includes(`${carIndex}-${timeSlot}`)) {
                return room;
            }
        }
        return null;
    };

    const isConfirmed = (slot) => {
        return confirmedSlots.includes(slot);
    };

    const handleSlotClick = (carIndex, timeSlot) => {
        if (!isOccupied(carIndex, timeSlot)) {
            onSlotClick(`${carIndex}-${timeSlot}`);
        }
    };

    return (
        <div className="column">
            <div className="wash-index book-placeholder">
                {index}
            </div>
            {timeSlots.map((time, rowIndex) => (
                <div
                    key={rowIndex}
                    className={`book-placeholder timestamp ${isOccupied(index, time) ? "occupied" : ""} ${isConfirmed(`${index}-${time}`) ? "confirmed" : ""}`}
                    onClick={() => handleSlotClick(index, time)}
                >
                    {isOccupied(index, time) ? (
                        <div className="occupied-room">{isOccupied(index, time)}</div>
                    ) : (
                        <>
                            <div className="main-time">{time}:00</div>
                            <div className="inline-time"><span className="innes">по </span>{parseInt(time) + 1}:00</div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default BookingTable;