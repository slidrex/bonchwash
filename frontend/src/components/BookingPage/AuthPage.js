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
        <div className="data-center">
            <div className="body-data">
                <h2>Бронируйте<br/>
                    стиральные машины<br/>
                    в вашем общежитии<br/>
                    с удобством</h2>
                <img src={`${process.env.PUBLIC_URL}/eyes.png`} alt="Описание картинки"
                     style={{width: '100px', height: 'auto'}}/>

                <h2 className="book-header">Войдите<br/> через ВКонтакте,<br/> чтобы начать пользоваться сервисом<br/>
                    стиральную
                    машинку</h2>

                <VKIDButton/>
            </div>


        </div>

    );
}

export default AuthPage;