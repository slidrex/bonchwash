import BookingTable from "../BookingTable";
import './BookingPage.css'
import { redirect } from "react-router-dom";

function BookingPage() {

    let response = fetch('https://bonchwash.ru/api/v1/auth', {
        method: 'GET',
        credentials: 'include'  // Включаем куки в запросе
    });

    if (response.ok) { 
        let data = response.json();
        if (!data.authorized) {
            alert("BookingPage - Unauthorized. Redirect to login.");
            return redirect('/'); 
        }
    }

    const carNumbers = [1, 2, 3, 4, 5, 6, 7];
    

    return (

        <div className='container'>
            <div className="header">
                <div className="book-buttons">
                    <div className="time-holder btn primary">
                        <div className="today">Сегодня</div>
                        <div className="inline-book">27 ноября</div>
                    </div>
                    <div className="time-holder btn secondary">
                        <div className="tomorrow">Завтра</div>
                        <div className="inline-book">28 ноября</div>

                    </div>
                    <div className="time-holder btn secondary">
                        <div className="after-tomorrow">Послезавтра</div>
                        <div className="inline-book">29 ноября</div>

                    </div>
                </div>
            </div>
            <div className="body-content">
                    {carNumbers.map((value, rowIndex) => (
                        <BookingTable index={value}/>
                    ))}
            </div>
        </div>
    );
}

export default BookingPage;