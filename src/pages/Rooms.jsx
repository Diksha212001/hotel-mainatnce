// import React from "react";
// import Hero from "../Components/Hero";
// import Banner from "../Components/Banner";
// import { Link } from "react-router-dom";
// import Room1 from "../images/rooms/mark-champs-Id2IIl1jOB0-unsplash.jpg"
// import Room2 from "../images/rooms/point3d-commercial-imaging-ltd-D9HHY5h9qlw-unsplash.jpg"
// import Room3 from "../images/rooms/point3d-commercial-imaging-ltd-v51tNk10oU8-unsplash.jpg"
// import { Card, Button } from 'react-bootstrap';

// const RoomCard = ({ image, title, text }) => {
//   return (
   
   
//     <Card style={{ width: '18rem', marginBottom: '1rem' }}>
//       <Card.Img variant="top" src={image} />
//       <Card.Body>
//         <Card.Title>{title}</Card.Title>
//         <Card.Text>{text}</Card.Text>
//         <Button variant="primary" >Book Now</Button>
//       </Card.Body>
//     </Card>
//   );
// };

// const Rooms = () => {
//   const roomData = [
//     // Add your room data here
//     { image:Room1, title: 'Room No1', text: 'Description for Room 1' },
//     { image:Room2, title: 'Room No2', text: 'Description for Room 2' },
//     { image:Room1, title: 'Room No3', text: 'Description for Room 1' },
//     { image:Room2, title: 'Room No4', text: 'Description for Room 2' },
//     { image:Room1, title: 'Room No5', text: 'Description for Room 1' },
//     { image:Room2, title: 'Room No6', text: 'Description for Room 2' },
//     { image:Room1, title: 'Room No7', text: 'Description for Room 1' },
//     { image:Room2, title: 'Room No8', text: 'Description for Room 2' },
//     { image:Room1, title: 'Room No9', text: 'Description for Room 1' },
//     { image:Room2, title: 'Room No10', text: 'Description for Room 2' },
//     { image:Room1, title: 'Room No11', text: 'Description for Room 1' },
//     { image:Room2, title: 'Room No12', text: 'Description for Room 2' },
//     { image:Room1, title: 'Room No13', text: 'Description for Room 1' },
//     { image:Room2, title: 'Room No14', text: 'Description for Room 2' },
//     { image:Room1, title: 'Room No15', text: 'Description for Room 1' },
//     { image:Room2, title: 'Room No16', text: 'Description for Room 2' },
//     // ... add more room data
//   ];

//   return (
//     <>
//     <Hero hero="roomsHero"></Hero>
//     <Banner title="Available Rooms" subtitle="Best in Class Room">
//       <Link to="/" className="btn btn-warning">
//         RETURN HOME
//       </Link>
//     </Banner>
//     <div className="container-fluid p-5">
//       <div className="d-flex flex-wrap justify-content-around">
//         {roomData.map((room, index) => (
//           <RoomCard key={index} {...room} />
//         ))}
//       </div>
//     </div>
//     </>
//   );
  
// };

// export default Rooms;
import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Hero from '../Components/Hero';
import Banner from '../Components/Banner';
import Room1 from '../images/rooms/mark-champs-Id2IIl1jOB0-unsplash.jpg';
import Room2 from '../images/rooms/point3d-commercial-imaging-ltd-D9HHY5h9qlw-unsplash.jpg';
import Room3 from '../images/rooms/point3d-commercial-imaging-ltd-v51tNk10oU8-unsplash.jpg';

const RoomCard = ({ image, title, text, onBook }) => {
  return (
    <Card style={{ width: '18rem', marginBottom: '1rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Button variant="primary" onClick={onBook}>Book Now</Button>
      </Card.Body>
    </Card>
  );
};

const Rooms = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleBooking = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const roomData = [
    { image: Room1, title: 'Room No1', text: 'Description for Room 1' },
    { image: Room2, title: 'Room No2', text: 'Description for Room 2' },
    { image: Room3, title: 'Room No3', text: 'Description for Room 3' },
    { image: Room1, title: 'Room No4', text: 'Description for Room 1' },
    { image: Room2, title: 'Room No5', text: 'Description for Room 2' },
    { image: Room3, title: 'Room No6', text: 'Description for Room 3' },
    { image: Room1, title: 'Room No7', text: 'Description for Room 1' },
    { image: Room2, title: 'Room No8', text: 'Description for Room 2' },
    { image: Room3, title: 'Room No9', text: 'Description for Room 3' },
    { image: Room1, title: 'Room No10', text: 'Description for Room 1' },
    { image: Room2, title: 'Room No11', text: 'Description for Room 2' },
    { image: Room3, title: 'Room No12', text: 'Description for Room 3' },
    // ... add more room data
  ];

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
          {roomData.map((room, index) => (
            <RoomCard key={index} {...room} onBook={handleBooking} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Rooms;


