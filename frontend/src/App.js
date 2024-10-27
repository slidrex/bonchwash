import './App.css';
import './components/BookingPage/AuthPage.css'
import AuthPage from "./components/BookingPage/AuthPage";
import BasicCredentialsPage from "./components/BookingPage/BasicCredentialsPage";
import BookingPage from "./components/BookingPage/BookingPage";
import {useState} from "react";

function App() {
    const [getPageIndex, setPageIndex] = useState(0);

    return (
        <div className="App">
            <div className="test-container">
                <button className="test1001" onClick={() => setPageIndex(0)}>Auth</button>
                <button className="test1001" onClick={() => setPageIndex(1)}>Credit</button>

                <button className="test1001" onClick={() => setPageIndex(2)}>Table</button>

            </div>

            <div className='background-container'
            >
                {getPageIndex === 0 ? (
                    <AuthPage/>
                ) : getPageIndex === 1 ? (
                    <BasicCredentialsPage/>
                ) : getPageIndex === 2 ? (
                    <BookingPage/>
                ) : null}
            </div>
        </div>
    );
}

export default App;