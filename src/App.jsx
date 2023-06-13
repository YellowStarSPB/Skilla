import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import './scss/main.scss';
import { addCalls, fetchCalls } from './store/calls/calls-slice';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCalls());
    }, []);

    return (
        <div className="container">
            <Navigation />
            <main className="content">
                <Header />
                <Dashboard />
            </main>
        </div>
    );
}

export default App;
