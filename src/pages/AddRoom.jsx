import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';

const AddRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [roomImage, setRoomImage] = useState(null);

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
    }
  };

  const deleteRoom = async (roomId) => {
    await deleteDoc(doc(db, 'rooms', roomId));
    setRooms(rooms.filter(room => room.id !== roomId));
  };

  return (
    <div className="container my-5">
      <h2>Add Room</h2>
      <div className="form-group">
        <label htmlFor="roomName">Room Name</label>
        <input
          type="text"
          className="form-control"
          id="roomName"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="roomDescription">Room Description</label>
        <textarea
          className="form-control"
          id="roomDescription"
          value={roomDescription}
          onChange={(e) => setRoomDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="roomImage">Room Image</label>
        <input
          type="file"
          className="form-control"
          id="roomImage"
          onChange={(e) => setRoomImage(e.target.files[0])}
        />
      </div>
      <button className="btn btn-primary mt-2" onClick={addRoom}>
        Add Room
      </button>
      <h3 className="mt-5">Registered Rooms</h3>
      <div className="d-flex flex-wrap">
        {rooms.map(room => (
          <div key={room.id} className="card m-2" style={{ width: '18rem' }}>
            <img src={room.imageUrl} className="card-img-top" alt={room.name} />
            <div className="card-body">
              <h5 className="card-title">{room.name}</h5>
              <p className="card-text">{room.description}</p>
              <button className="btn btn-danger" onClick={() => deleteRoom(room.id)}>
                Delete Room
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddRoom;
