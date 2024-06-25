import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast notification library
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import Hero from '../Components/Hero';
import Banner from '../Components/Banner';
// import Cat01 from '../images/catering/1.png';
// import Cat02 from '../images/catering/2.png';
// import Cat03 from '../images/catering/3.png';
// import '../CSS/Caterers.css'; // Ensure you have the necessary CSS
import { db } from '../firebase'; // Import the Firebase database
import { set, ref } from "firebase/database";

const Caterers = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate booking confirmation logic (you can replace this with actual API call)
    const bookingId = Date.now().toString();
    const newBooking = { ...formData, id: bookingId, status: 'Pending', refID: 'user@example.com' }; // Replace with actual user email
    set(ref(db, `/cateringBookings/${bookingId}`), newBooking)
      .then(() => {
        toast.success('Booking confirmed successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          date: '',
          message: ''
        });
      })
      .catch((error) => {
        toast.error('Error saving booking: ' + error.message);
      });
  };

  const services = [
    { title: 'Wedding Catering', description: 'Delicious and elegant wedding catering services.' },
    { title: 'Birthday Catering', description: 'Fun and vibrant catering for birthday parties.' },
    { title: 'Corporate Catering', description: 'Professional catering for corporate events.' },
    // Add more services as needed
  ];

  return (
    <div>
      <Hero hero="defaultHero" />
      <Banner title="Catering Section" subtitle="Get the Best Catering Services">
        <Link to="/rooms" className="btn btn-warning">
          Check Booking
        </Link>
      </Banner>
      <div className="container mx-auto my-5 p-5">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Catering</li>
          </ol>
        </nav>
        <h2 className="text-2xl font-bold mb-5">Our Catering Services</h2>
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
        <h2 className="text-2xl font-bold mb-5">Book Our Catering Services</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 border">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
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
            <label htmlFor="email" className="form-label">
              Email
            </label>
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
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
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
            <label htmlFor="service" className="form-label">
              Service
            </label>
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
            <label htmlFor="date" className="form-label">
              Event Date
            </label>
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
            <label htmlFor="message" className="form-label">
              Additional Message
            </label>
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
      </div>
    </div>
  );
};

export default Caterers;
