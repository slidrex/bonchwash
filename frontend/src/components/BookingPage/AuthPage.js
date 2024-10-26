import "./AuthPage.css";
import VKIDButton from "../VKIDButton";
/*
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
*/
function AuthPage() {



    return (
        <div className='book_announcement'>
            <div className="main-header">
                <h1 className="book-header">Забронировать стиральную машинку</h1>
                <h2>Пожалуйта, авторизируйтесь</h2>

            </div>
            <div className="data-center">
                <VKIDButton/>
            </div>
        </div>
    );
}

export default AuthPage;