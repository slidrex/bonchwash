import React, { useState } from 'react';
import './App.css';
import BookingPage from './components/BookingPage/BookingPage';

function App() {
    const [showHeaderContainer, setShowHeaderContainer] = useState(true);

    const handleBookClick = () => {
        setShowHeaderContainer(false);
    };

    return (
        <div className="App">
            <div className='background-container'
            >
                <BookingPage onBookClick={handleBookClick}/>

            </div>
        </div>
    );
}

export default App;