import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../Components/Hero';

const LawnBooking = () => {
  return (
    <div>
      <Hero title="Lawn Booking" subtitle="Book a lawn for your event" />
      <div className="container mx-auto my-5 p-5">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Lawn Booking</li>
          </ol>
        </nav>
        <h2 className="text-2xl font-bold mb-5">Our Lawn Booking Services</h2>
        {/* Add cards or features for lawn booking */}
      </div>
    </div>
  );
};

export default LawnBooking;
