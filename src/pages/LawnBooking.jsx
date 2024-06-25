import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Hero from '../Components/Hero';
import Banner from '../Components/Banner'
import Lawn01 from '../images/lawn/1.png';
import Lawn02 from '../images/lawn/2.png';
import Lawn03 from '../images/lawn/3.png';
import Lawn04 from '../images/lawn/4.png';
import '../CSS/LawnBooking.css';
import { db } from '../firebase'; // Import Firestore

const LawnBooking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    event: '',
    date: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the date is already booked
      const bookingsRef = db.collection('lawnBookings');
      const snapshot = await bookingsRef.where('date', '==', formData.date).get();

      if (!snapshot.empty) {
        toast.error('Booking is already taken for this date. Please choose another date.');
        return;
      }

      // Add booking to Firestore
      await bookingsRef.add(formData);
      toast.success('Booking confirmed successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        event: '',
        date: '',
        message: ''
      });
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Failed to confirm booking. Please try again.');
    }
  };

  const events = [
    { title: 'Birthday Party', description: 'Celebrate your birthday with us.', image: Lawn01 },
    { title: 'Reception', description: 'Host your reception with elegance.', image: Lawn02 },
    { title: 'Wedding', description: 'Make your wedding day special.', image: Lawn03 },
    { title: 'Corporate Event', description: 'Professional setup for corporate events.', image: Lawn04 },
    { title: 'Other Event', description: 'Book for any other special event.', image: Lawn03 },
  ];

  return (
    <div>
      <Hero hero="defaultHero" />
      <Banner title="Lawn Booking Section" subtitle="Book a Lawn for Your Special Event">
        <Link to="/rooms" className="btn btn-warning">
          Check Booking
        </Link>
      </Banner>
      <div className="container mx-auto my-5 p-5">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Lawn Booking</li>
          </ol>
        </nav>
        <h2 className="text-2xl font-bold mb-5 text-center">Our Lawn Booking Services</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
          {events.map((event, index) => (
            <div key={index} className="col">
              <div className="card">
                <img src={event.image} className="card-img-top" alt={event.title} />
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-5 text-center">Book Our Lawn Services</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 border">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="event" className="form-label">Event</label>
            <select
              id="event"
              name="event"
              value={formData.event}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select an event</option>
              {events.map((event, index) => (
                <option key={index} value={event.title}>{event.title}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Event Date</label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Additional Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="form-control"
              rows="4"
            />
          </div>
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
            >
              Book Now
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LawnBooking;
