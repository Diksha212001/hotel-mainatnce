import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Hero from '../Components/Hero';
import Banner from '../Components/Banner';
import Dec01 from '../images/decoration/1.png';
import Dec02 from '../images/decoration/2.png';
import Dec03 from '../images/decoration/3.png';
import '../CSS/Decorations.css';
import { db } from '../firebase'; // Import Firestore

const Decorations = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
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
      const bookingsRef = db.collection('bookings');
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
        service: '',
        date: '',
        message: ''
      });
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Failed to confirm booking. Please try again.');
    }
  };

  const services = [
    { title: 'Wedding Decorations', description: 'Elegant and beautiful wedding decorations.', image: Dec01 },
    { title: 'Birthday Parties', description: 'Fun and vibrant decorations for birthday parties.', image: Dec02 },
    { title: 'Corporate Events', description: 'Professional decorations for corporate events.', image: Dec03 },
  ];

  return (
    <div>
      <Hero hero="defaultHero" />
      <Banner title="Decoration Section" subtitle="Get Best Decoration According to you">
        <Link to="/rooms" className="btn btn-warning">
          Check Booking
        </Link>
      </Banner>
      <div className="container mx-auto my-5 p-5">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Decorations</li>
          </ol>
        </nav>
        <h2 className="text-2xl font-bold mb-5 text-center">Our Decoration Services</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
          {services.map((service, index) => (
            <div key={index} className="col">
              <div className="card">
                <img src={service.image} className="card-img-top" alt={service.title} />
                <div className="card-body">
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-5 text-center">Book Our Decoration Services</h2>
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
            <label htmlFor="service" className="form-label">Service</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select a service</option>
              {services.map((service, index) => (
                <option key={index} value={service.title}>{service.title}</option>
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
              required
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

export default Decorations;
