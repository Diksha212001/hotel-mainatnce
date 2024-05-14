import React from "react";
import { useSelector } from "react-redux";
import Room from "./Room";
import Title from "./Title";


const FeaturedRooms = () => {
  const state = useSelector((state) => state);

  return (
    <section className="featured-rooms container">
      <Title title="Featured Rooms" />
      
    </section>
  );
};

export default FeaturedRooms;
