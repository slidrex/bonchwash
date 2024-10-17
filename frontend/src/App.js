import React, { useState } from 'react';
import './App.css';
import BookingPage from './components/BookingPage/BookingPage';
import Header from "./components/Header/Header";

function App() {
    const [showHeaderContainer, setShowHeaderContainer] = useState(true);

    const handleBookClick = () => {
        setShowHeaderContainer(false);
    };

    return (
        <div className="App">
            <Header showHeaderContainer={showHeaderContainer} />
            <BookingPage onBookClick={handleBookClick} />
        </div>
    );
}

export default App;