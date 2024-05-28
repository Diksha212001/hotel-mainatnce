import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com'; // Import EmailJS SDK

const Contact = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  // Create a form reference
  const form = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const emailParams = {
      clientFirstName: formData.firstName,
      clientLastName: formData.lastName,
      clientEmail: formData.email,
      clientPhone: formData.phone,
      clientMessage: formData.message,
      yourCompanyName: 'Rama Celebration',
      yourCompanyPhone: 'Your Company Phone',
      yourCompanyEmail: 'ramacelebration@gmail.com',
      yourCompanyWebsite: 'Your Company Website',
      yourCompanyAddress: 'Your Company Address'
    };
  
    try {
      await emailjs.send(
        'service_27ncvtr', // Replace with your EmailJS service ID
        'template_ro151s7', // Replace with your EmailJS template ID
        emailParams,
        'lsp18HCfhoF4rev2y' // Replace with your EmailJS user ID
      );
      setShowAlert(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      
      // Display alert message
      window.alert('Email sent successfully!');
    } catch (error) {
      console.error('FAILED...', error);
    }
  };
  

  return (
    <div className="container contact">
      {showAlert && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          Thank you for your message! We will get back to you soon.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
      <div className="row">
        <div className="col-md-8 col-12 mx-auto">
          <div className="card shadow-lg border-0 p-4">
            <h1 className="text-center bg-dark text-white display-4 d-inline-block">Contact us</h1>
            <form ref={form} onSubmit={handleSubmit}>
              <div className="form-group my-5">
                <div className="row">
                  <div className="col-md-6 col-12 mx-auto my-2">
                    <input
                      type="text"
                      className="form-control-lg form-control"
                      placeholder="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 col-12 mx-auto my-2">
                    <input
                      type="text"
                      className="form-control-lg form-control"
                      placeholder="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-group mb-5">
                <div className="row">
                  <div className="col-md-6 col-12 mx-auto my-2">
                    <input
                      type="email"
                      className="form-control-lg form-control"
                      placeholder="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 col-12 mx-auto my-2">
                    <input
                      type="tel"
                      className="form-control-lg form-control"
                      placeholder="Phone no."
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-11 mx-auto my-2">
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Your message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="mt-5 col-md-6 col-12 mx-auto">
                <button type="submit" className="btn btn-outline-dark btn-lg btn-block">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
