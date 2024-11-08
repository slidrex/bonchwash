import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BasicCredentialsPage from "./components/BookingPage/BasicCredentialsPage";
import BookingPage from "./components/BookingPage/BookingPage";
import VKIDButton from "./components/VKIDButton";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    { <Route path="/" element={<VKIDButton />} />   }
                    <Route path="/credentials" element={<BasicCredentialsPage />} />
                    <Route path="/booking" element={<BookingPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
