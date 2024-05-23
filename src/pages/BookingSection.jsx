import { Card, Button } from 'react-bootstrap';
import Bg from '../images/defaultBcg.jpg'

// Mock data for booked rooms
const bookedRoomsData = [
  {
    id: 1,
    roomName: 'Deluxe Suite',
    description: 'A luxurious suite with an ocean view.',
    imageUrl: 'path-to-your-image/deluxe-suite.jpg',
  },
  // ... more booked rooms
];

const BookedRoomCard = ({ room }) => {
  return (
    <Card style={{ width: '18rem', marginBottom: '1rem' }}>
      <Card.Img variant="top" src={room.imageUrl} />
      <Card.Body>
        <Card.Title>{room.roomName}</Card.Title>
        <Card.Text>{room.description}</Card.Text>
        <Button variant="primary">View Details</Button>
      </Card.Body>
    </Card>
  );
};

const Hero = ({ title, subtitle }) => {
  return (
    <div className="hero-section" style={{ backgroundImage: <Bg/> }}>
      <h1 className="hero-title">{title}</h1>
      <p className="hero-subtitle">{subtitle}</p>
    </div>
  );
};

const BookingSection = () => {
  return (
    <>
      <Hero title="Your Bookings" subtitle="All your room bookings in one place" />
      <div className="container my-5">
        <div className="d-flex flex-wrap justify-content-around">
          {bookedRoomsData.map((room) => (
            <BookedRoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BookingSection;