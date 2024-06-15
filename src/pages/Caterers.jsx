import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../Components/Hero';

const Caterers = () => {
  return (
    <div>
      <Hero title="Caterers" subtitle="Book catering services for your event" />
      <div className="container mx-auto my-5 p-5">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Caterers</li>
          </ol>
        </nav>
        <h2 className="text-2xl font-bold mb-5">Our Catering Services</h2>
        {/* Add cards or features for caterers */}
      </div>
    </div>
  );
};

export default Caterers;
