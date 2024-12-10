import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BasicCredentialsPage from "./components/BookingPage/BasicCredentialsPage";
import BookingPage from "./components/BookingPage/BookingPage";
import AuthPage from "./components/BookingPage/AuthPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/credentials" element={<BasicCredentialsPage />} />
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
