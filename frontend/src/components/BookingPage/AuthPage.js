import "./AuthPage.css";
import VKIDButton from "../VKIDButton";
import React from 'react';
// import { redirect } from "react-router-dom";

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
    // let response = fetch('https://bonchwash.ru/api/v1/auth', {
    //     method: 'GET',
    //     credentials: 'include'  // Включаем куки в запросе
    // });

    // if (response.ok) { 
    //     let data = response.json();
    //     if (data.authorized) {
    //         alert("AuthPage - authorized. Redirect to booking.");
    //         console.log("AUTH:", data);
    //         return redirect('/booking'); 
    //     } else {
    //         console.error(data);
    //     }
    // } else {
    //     console.log('Неавторизован');
    // }


    return (
        <div className="data-center">
            <div className="body-data">
                <h2>Бронируйте<br/>
                    стиральные машины<br/>
                    в вашем общежитии<br/>
                    с удобством</h2>
                <img src={`${process.env.PUBLIC_URL}/eyes.png`} alt="Описание картинки"
                     style={{width: '100px', height: 'auto'}}/>

                <h2 className="book-header">Войдите<br/> через ВКонтакте,<br/> чтобы начать <br/>пользоваться сервисом<br/></h2>

                <VKIDButton/>
            </div>
        </div>
    );
}

export default AuthPage;