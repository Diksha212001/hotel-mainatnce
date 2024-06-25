import React from 'react'
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";
import Title from './Title';

const Services = () => {
    const service = {
      services: [
        {
          icon: <FaCocktail />,
          title: "Free DRINK",
          info: "Hotel service refers to the services provided by a hotel to its guests, such as accommodation, food and beverage, housekeeping, and concierge services.",
        },
        {
          icon: <FaHiking />,
          title: "Endless Hiking",
          info: "Hotel service refers to the management and provision of various services in a hotel, such as room management, dining room management, staff management",
        },
        {
          icon: <FaShuttleVan />,
          title: "Free Shuttle",
          info: "Hotel service refers to the provision of room accommodation for individuals who are on vacation, attending meetings, or traveling for work.",
        },
        {
          icon: <FaBeer />,
          title: "Unlimited Beer",
          info: "Hotel service refers to the services provided by a hotel to its guests, such as accommodation, room service, and other amenities.",
        },
      ],
    };
    return (
      <div className="container-fluid services">
        <Title title="Services" />
        <div className="row">
          {service.services.map((item, index) => {
            return (
              <div
                className="col-md-4 col-lg-3 col-12 mx-auto my-3"
                key={index}
              >
                <div className="card shadow-lg border-0 p-4">
                  <article className="service">
                    <span>{item.icon}</span>
                    <h6>{item.title}</h6>
                    <p>{item.info}</p>
                  </article>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default Services
