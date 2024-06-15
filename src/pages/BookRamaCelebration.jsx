import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';

const BookRamaCelebration = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    lawn: '',
    catering: '',
    decoration: '',
    date: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
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
      bookingDate: formData.date,
      lawn: formData.lawn,
      catering: formData.catering,
      decoration: formData.decoration,
      yourCompanyName: 'Rama Celebration',
      yourCompanyPhone: 'Your Company Phone',
      yourCompanyEmail: 'ramacelebration@gmail.com',
      yourCompanyWebsite: 'Your Company Website',
      yourCompanyAddress: 'Your Company Address'
    };

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        emailParams,
        'YOUR_PUBLIC_KEY'
      );
      setShowAlert(true);
      setFormData({
        lawn: '',
        catering: '',
        decoration: '',
        date: '',
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
      window.alert('Booking request sent successfully!');
    } catch (error) {
      console.error('FAILED...', error);
    }
  };

  return (
    <Container className="my-5">
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Booking request sent successfully!
        </Alert>
      )}
      <h1 className="text-center mb-4">Book Rama Celebration Services</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formLawn">
              <Form.Label>Lawn</Form.Label>
              <Form.Control
                as="select"
                name="lawn"
                value={formData.lawn}
                onChange={handleChange}
              >
                <option value="">Select Lawn</option>
                <option value="Lawn 1">Lawn 1</option>
                <option value="Lawn 2">Lawn 2</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formCatering">
              <Form.Label>Catering</Form.Label>
              <Form.Control
                as="select"
                name="catering"
                value={formData.catering}
                onChange={handleChange}
              >
                <option value="">Select Catering</option>
                <option value="Catering 1">Catering 1</option>
                <option value="Catering 2">Catering 2</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formDecoration">
              <Form.Label>Decoration</Form.Label>
              <Form.Control
                as="select"
                name="decoration"
                value={formData.decoration}
                onChange={handleChange}
              >
                <option value="">Select Decoration</option>
                <option value="Decoration 1">Decoration 1</option>
                <option value="Decoration 2">Decoration 2</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Book Now
        </Button>
      </Form>
    </Container>
  );
};

export default BookRamaCelebration;
