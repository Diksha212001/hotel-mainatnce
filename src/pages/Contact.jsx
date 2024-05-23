// import React from 'react'
// const Contact = () => {
// return (
// <div className="container contact">
//     <div className="row">
//         <div className="col-md-8 col-12 mx-auto">
//             <div className="card shadow-lg border-0 p-4">
//                 <h1 className="text-center bg-dark text-white display-4 d-inline-block">Contact us</h1>
//                 <div className="form-group my-5">
//                     <div className="row">
//                         <div className="col-md-6 col-12 mx-auto my-2">
//                             <input type="text" className="form-control-lg" placeholder="First Name" required />
//                         </div>
//                         <div className="col-md-6 col-12 mx-auto my-2">
//                             <input type="text" className="form-control-lg" placeholder="last Name" required />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="form-group mb-5">
//                     <div className="row">
//                         <div className="col-md-6 col-12 mx-auto my-2">
//                             <input type="email" className="form-control-lg" placeholder="Email Address" required />
//                         </div>
//                         <div className="col-md-6 col-12 mx-auto my-2">
//                             <input type="tel" className="form-control-lg" placeholder="Phone no." required />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="col-11">
//                         <textarea className="form-control" row="20" placeholder="Your message" required></textarea>
//                     </div>
//                 </div>
//                 <div className="mt-5 col-md-6 col-12 mx-auto">
//                     <button className="btn btn-outline-dark btn-lg btn-block">Send Message</button>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
// )
// }
// export default Contact
import React, { useState } from 'react';

const Contact = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
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
    setShowAlert(true);
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('YOUR_BACKEND_ENDPOINT', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          setShowAlert(true);
          // Reset form fields after successful submission
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: ''
          });
          // Hide the alert after 3 seconds
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };
    
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    });
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
            <div className="form-group my-5">
              <div className="row">
                <div className="col-md-6 col-12 mx-auto my-2">
                  <input
                    type="text"
                    className="form-control-lg"
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
                    className="form-control-lg"
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
                    className="form-control-lg"
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
                    className="form-control-lg"
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
              <div className="col-11">
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
              <button type="submit" className="btn btn-outline-dark btn-lg btn-block" onClick={handleSubmit}>
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
