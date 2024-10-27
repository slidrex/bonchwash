import './BookingTable.css'
function BookingTable({index}) {

    const timeSlots = ["9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];
    //const timeSlots = ["15", "16", "17", "18", "19", "-1", "-1", "-1", "-1", "-1", "-1"];

    return (
        <div className="column">
            <div className="wash-index book-placeholder">
                {index}
            </div>
            {timeSlots.slice(0).map((time, rowIndex) => (
                <div
                    key={rowIndex}
                    className={`book-placeholder timestamp ${time === "-1" ? "invisible" : ""}`}
                >
                    <div className="main-time">{time}:00</div>
                    <div className="inline-time"><span className="innes">по </span>{parseInt(time) + 1}:00</div>




                </div>

            ))}
        </div>
    );
}

export default BookingTable;