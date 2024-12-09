import { Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Locations from './pages/Locations';
import Booking from './pages/Booking';

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/booking" element={<Booking />} />
          </Routes>
        </main>
      </div>
    </I18nextProvider>
  );
}
