import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BasicCredentials.css';

function BasicCredentialsPage(props) {
    const [inputValue, setInputValue] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const navigate = useNavigate();

    const validateRoot = (number) => {
        return number >= 100 && number <= 1000;
    };

    useEffect(() => {
        setIsValid(validateRoot(Number(inputValue)));
    }, [inputValue]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        setIsTouched(true);
    };

    const handleSubmit = () => {
        if (isValid) {
            navigate('/booking', { state: { room: inputValue } });
        }
    };

    return (
        <div className="container">
            <div className="content-table">
                <h1 className="header">Укажите базовые данные</h1>
                <div className="home-input"></div>
                <div className="room-input">
                    <label>Ваша комната</label>
                    <input type="number" className={`${!isValid && isTouched ? "invalid-input" : ""}`} onChange={handleInputChange} value={inputValue} />
                </div>
                <button className={`btn ${isValid ? "primary" : ""}`} type="button" onClick={handleSubmit}>Готово</button>
                <div className="footer-info">
                    <label className="footer-label">Важно! Указывайте настоящие данные. Они проходят проверку модерацией</label>
                </div>
            </div>
        </div>
    );
}

export default BasicCredentialsPage;