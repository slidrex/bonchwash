import './App.css';
import BookingPage from "./components/BookingPage/BookingPage";
import './components/BookingPage/AuthPage.css'
import AuthPage from "./components/BookingPage/AuthPage";


function App() {

    return (
        <div className="App">
            <div className='background-container'
            >
                <AuthPage/>
            </div>
        </div>
    );
}

export default App;