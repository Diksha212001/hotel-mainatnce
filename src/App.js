import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import Navbar from './Components/Navbar';
import { db } from './firebase';
import { ReadFromFirebase } from './Redux/actions';
import Home from './pages/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import Error from './pages/Error';
import ProtectedRoute from './Components/ProtectedRoute';
import { UserAuthContextProvider } from './contexts/UserAuthContext';
import SingleRooms from './pages/SingleRooms';
import Footer from './Components/Footer';
import Rooms from './pages/Rooms';
import BookingSection from './pages/BookingSection';
import AddRoom from './pages/AddRoom';
import Decorations from './pages/Decorations';
import Caterers from './pages/Caterers';
import LawnBooking from './pages/LawnBooking';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRooms = async () => {
      const roomsCollection = collection(db, 'rooms');
      const roomSnapshot = await getDocs(roomsCollection);
      const roomsList = roomSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      dispatch(ReadFromFirebase(roomsList));
    };

    fetchRooms();
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <UserAuthContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:slug" element={<SingleRooms />} />
            <Route path="/about" element={<About />} />
            <Route path="/decorations" element={<Decorations />} />
            <Route path="/caterers" element={<Caterers />} />
            <Route path="/lawn-booking" element={<LawnBooking />} />
            <Route path="/bookings" element={
              <ProtectedRoute>
                <BookingSection />
              </ProtectedRoute>
            } />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </UserAuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
