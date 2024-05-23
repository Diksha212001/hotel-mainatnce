// BookingContext.js
import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookedRooms, setBookedRooms] = useState([]);

  const addBooking = (room) => {
    setBookedRooms((prevBookings) => [...prevBookings, room]);
  };

  return (
    <BookingContext.Provider value={{ bookedRooms, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
