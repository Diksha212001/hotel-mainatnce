import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Hero from '../Components/Hero';
import Banner from '../Components/Banner';
import { serverTimestamp } from 'firebase/firestore';

const RoomCard = ({ room, onBook }) => {
  return (
    <Card style={{ width: '18rem', marginBottom: '1rem' }}>
      <Card.Img variant="top" src={room.imageUrl} />
      <Card.Body>
        <Card.Title>{room.name}</Card.Title>
        <Card.Text>{room.description}</Card.Text>
        <Button variant="primary" onClick={() => onBook(room.id)}>Book Now</Button>
      </Card.Body>
    </Card>
  );
};

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      const roomsCollection = collection(db, 'rooms');
      const roomSnapshot = await getDocs(roomsCollection);
      const roomsList = roomSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRooms(roomsList);
    };

    fetchRooms();
  }, []);

  const handleBooking = async (roomId) => {
    const roomRef = doc(db, 'rooms', roomId);
    await updateDoc(roomRef, { booked: true, bookingTime: serverTimestamp() });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <>
      <Hero hero="roomsHero" />
      <Banner title="Available Rooms" subtitle="Best in Class Room">
        <Link to="/" className="btn btn-warning">
          RETURN HOME
        </Link>
      </Banner>
      {showAlert && (
        <Alert variant="success" className="text-center">
          Booking successful! Thank you for choosing our service.
        </Alert>
      )}
      <div className="container-fluid p-5">
        <div className="d-flex flex-wrap justify-content-around">
          {rooms.filter(room => !room.booked).map((room, index) => (
            <RoomCard key={index} room={room} onBook={handleBooking} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Rooms;
