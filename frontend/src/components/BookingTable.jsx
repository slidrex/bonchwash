import './BookingTable.css'
function BookingTable({index}) {

    //const timeSlots = ["9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];
    const timeSlots = ["15", "16", "17", "18", "19", "-1", "-1", "-1", "-1", "-1", "-1"];
    const color = ['#FFFFFA', '#FFF9ED', '#FEF5E4', '#FFF1DF', '#FDEBDB', '#FAE6D4', '#FAE2D4', '#EEE0D9', '#EADBDC', '#E5D6DA', '#DCD4DD', '#D5CBE1']
    return (
        <div className="column">
            <div className="wash-index">
                {index}
            </div>
            {timeSlots.map((time, rowIndex) => (
                <div
                    key={rowIndex}
                    className={`timestamp ${time === "-1" ? "invisible" : ""}`}
                    style={{backgroundColor: color[rowIndex % color.length]}}
                >
                            {time}:00


                </div>

            ))}
        </div>
    );
}

export default BookingTable;