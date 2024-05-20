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
import { motion } from 'framer-motion';
import firebase from './firebase-config'; // make sure to configure this file with Firebase credentials

const Contact = () => {
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
    alert(`Thank you, ${formData.firstName}, we will contact you shortly!`);
    const contactRef = firebase.database().ref('contacts');
    contactRef.push(formData);
  };

  return (
    <motion.div 
      className="container contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <form onSubmit={handleSubmit}>
        {/* ... rest of your form */}
        <div className="mt-5 col-md-6 col-12 mx-auto">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="btn btn-outline-dark btn-lg btn-block"
            type="submit"
          >
            Send Message
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default Contact;
