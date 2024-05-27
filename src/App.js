import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { collection, getDocs,addDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
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

function App() {
  const dispatch = useDispatch();
  const [bookedRooms, setBookedRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const roomsCollection = collection(db, 'rooms');
      const roomSnapshot = await getDocs(roomsCollection);
      const roomsList = roomSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      dispatch(ReadFromFirebase(roomsList));
    };

    fetchRooms();
  }, [dispatch]);

  const addRoomToBooking = async (room) => {
    const roomWithTimestamp = {
      ...room,
      bookedAt: serverTimestamp(),
    };
    await addDoc(collection(db, 'bookings'), roomWithTimestamp);
    setBookedRooms([...bookedRooms, roomWithTimestamp]);
  };

  const removeRoomFromBooking = async (roomId) => {
    await deleteDoc(doc(db, 'bookings', roomId));
    setBookedRooms(bookedRooms.filter(room => room.id !== roomId));
  };

  const clearBooking = async () => {
    const bookingsSnapshot = await getDocs(collection(db, 'bookings'));
    bookingsSnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    setBookedRooms([]);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <UserAuthContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/rooms" element={<Rooms addRoomToBooking={addRoomToBooking} />} />
            <Route path="/rooms/:slug" element={<SingleRooms />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <BookingSection
                    bookedRooms={bookedRooms}
                    removeRoomFromBooking={removeRoomFromBooking}
                    clearBooking={clearBooking}
                  />
                </ProtectedRoute>
              }
            />
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
