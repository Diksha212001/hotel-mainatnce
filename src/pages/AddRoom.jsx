import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  background: #f8f9fa;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled(Form)`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const StyledButton = styled(Button)`
  background-color: #007bff;
  border: none;
  margin-top: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

const FormGroup = styled(Form.Group)`
  margin-bottom: 20px;
`;

const CustomFileInput = styled.input`
  padding: 10px;
`;

const AddRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [roomImage, setRoomImage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      const roomsCollection = collection(db, 'rooms');
      const roomSnapshot = await getDocs(roomsCollection);
      const roomsList = roomSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRooms(roomsList);
    };

    fetchRooms();
  }, []);

  const handleImageUpload = async (file) => {
    const storage = getStorage();
    const storageRefInstance = storageRef(storage, `rooms/${file.name}`);
    await uploadBytes(storageRefInstance, file);
    const url = await getDownloadURL(storageRefInstance);
    return url;
  };

  const addRoom = async () => {
    if (roomName && roomDescription && roomImage) {
      try {
        const imageUrl = await handleImageUpload(roomImage);
        const newRoom = {
          name: roomName,
          description: roomDescription,
          imageUrl,
        };
        const docRef = await addDoc(collection(db, 'rooms'), newRoom);
        setRooms([...rooms, { id: docRef.id, ...newRoom }]);
        setRoomName('');
        setRoomDescription('');
        setRoomImage(null);
        setError('');
      } catch (err) {
        setError('Failed to add room. Please try again.');
      }
    } else {
      setError('All fields are required.');
    }
  };

  const deleteRoom = async (roomId) => {
    await deleteDoc(doc(db, 'rooms', roomId));
    setRooms(rooms.filter(room => room.id !== roomId));
  };

  return (
    <StyledContainer>
      <h2 className="text-center mb-4">Add Room</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <StyledForm>
        <FormGroup controlId="roomName">
          <Form.Label>Room Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="roomDescription">
          <Form.Label>Room Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter room description"
            value={roomDescription}
            onChange={(e) => setRoomDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="roomImage">
          <Form.Label>Room Image</Form.Label>
          <CustomFileInput
            type="file"
            onChange={(e) => setRoomImage(e.target.files[0])}
            accept="image/*"
          />
        </FormGroup>
        <StyledButton onClick={addRoom}>
          Add Room
        </StyledButton>
      </StyledForm>
      <h3 className="mt-5">Registered Rooms</h3>
      <Row>
        {rooms.map(room => (
          <Col key={room.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={room.imageUrl} />
              <Card.Body>
                <Card.Title>{room.name}</Card.Title>
                <Card.Text>{room.description}</Card.Text>
                <Button variant="danger" onClick={() => deleteRoom(room.id)}>
                  Delete Room
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </StyledContainer>
  );
};

export default AddRoom;
