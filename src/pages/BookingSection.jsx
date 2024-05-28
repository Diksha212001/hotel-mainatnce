import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import Hero from '../Components/Hero';
import './BookingSection.css'; // Import custom CSS file for styling

const BookedRoomCard = ({ room, onRemove }) => {
  const bookingTime = room.bookingTime?.toDate().toLocaleString();

  return (
    <Card className="booked-room-card mb-4">
      <Card.Img variant="top" src={room.imageUrl} />
      <Card.Body>
        <Card.Title>{room.name}</Card.Title>
        <Card.Text>{room.description}</Card.Text>
        {bookingTime && <Card.Text><strong>Booked at:</strong> {bookingTime}</Card.Text>}
        <Button variant="danger" onClick={() => onRemove(room.id)}>Remove</Button>
      </Card.Body>
    </Card>
  );
};

const BookingSection = () => {
  const [bookedRooms, setBookedRooms] = useState([]);

  useEffect(() => {
    const fetchBookedRooms = async () => {
      const roomsCollection = collection(db, 'rooms');
      const roomSnapshot = await getDocs(roomsCollection);
      const bookedRoomsList = roomSnapshot.docs
        .filter(doc => doc.data().booked)
        .map(doc => ({ id: doc.id, ...doc.data() }));
      setBookedRooms(bookedRoomsList);
    };

    fetchBookedRooms();
  }, []);

  const handleRemove = async (roomId) => {
    const roomRef = doc(db, 'rooms', roomId);
    await updateDoc(roomRef, { booked: false, bookingTime: null });
    setBookedRooms(bookedRooms.filter(room => room.id !== roomId));
  };

  return (
    <>
      <Hero title="Your Bookings" subtitle="All your room bookings in one place" />
      <Container className="booked-rooms-container my-5">
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {bookedRooms.map((room) => (
            <Col key={room.id}>
              <BookedRoomCard room={room} onRemove={handleRemove} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default BookingSection;
