import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { AiOutlineDelete } from 'react-icons/ai';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { useUserAuth } from '../contexts/UserAuthContext';
import styled from 'styled-components';

const StatusTD = styled.td`
  font-weight: bold;
  color: ${(props) => (props.type === 'Pending' ? 'blue' : props.type === 'Accepted' ? 'green' : 'red')};
`;

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useUserAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsRef = db.collection('decorationBookings');
        const snapshot = await bookingsRef.where('userId', '==', user.uid).get();
        if (!snapshot.empty) {
          const fetchedBookings = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setBookings(fetchedBookings);
        } else {
          setBookings([]);
        }
      } catch (error) {
        console.error('Error fetching decoration bookings:', error);
      }
    };

    fetchBookings();
  }, [user.uid]);

  const deleteBooking = async (id) => {
    try {
      await db.collection('decorationBookings').doc(id).delete();
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id));
    } catch (error) {
      console.error('Error deleting decoration booking:', error);
    }
  };

  return (
    <>
      {bookings.length > 0 ? (
        <Table striped bordered hover size="sm" style={{ marginTop: '80px', width: '80%', margin: '80px auto' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Service</th>
              <th>Event Date</th>
              <th>Additional Message</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.phone}</td>
                <td>{booking.service}</td>
                <td>{booking.date}</td>
                <td>{booking.message}</td>
                <StatusTD type={booking.status}>{booking.status}</StatusTD>
                <td style={{ textAlign: 'center' }}>
                  <AiOutlineDelete
                    color="red"
                    style={{ cursor: 'pointer', fontSize: '20px' }}
                    onClick={() => deleteBooking(booking.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="container roomerror">
          <div className="row my-5">
            <div className="col-md-6 col-12 mx-auto">
              <div className="card shadow-lg border-0 p-4 error">
                <h1 className="text-center display-4">No decoration bookings.</h1>
                <h3>Click below to start Booking!</h3>
                <Link to="/decorations" className="btn btn-warning mt-4">
                  Start Booking
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bookings;
