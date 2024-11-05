import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from "./components/BookingPage/AuthPage";
import BasicCredentialsPage from "./components/BookingPage/BasicCredentialsPage";
import BookingPage from "./components/BookingPage/BookingPage";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* <Route path="/" element={<AuthPage />} /> */  }
                    <Route path="/credentials" element={<BasicCredentialsPage />} />
                    <Route path="/booking" element={<BookingPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
