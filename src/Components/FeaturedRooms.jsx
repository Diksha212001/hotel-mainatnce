import React from "react";
import { useSelector } from "react-redux";
// import Room from "./Room";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Title from "./Title";
import Room1 from "../images/rooms/mark-champs-Id2IIl1jOB0-unsplash.jpg"
import Room2 from "../images/rooms/point3d-commercial-imaging-ltd-D9HHY5h9qlw-unsplash.jpg"
import Room3 from "../images/rooms/point3d-commercial-imaging-ltd-v51tNk10oU8-unsplash.jpg"


const FeaturedRooms = () => {
  const state = useSelector((state) => state);

  return (
    <section className="featured-rooms container">
      <Title title="Featured Rooms" />
      <div className="container ">
        <CardGroup>
          <Card>
            <Card.Img variant="top" src={Room1} />
            <Card.Body>
              <Card.Title>ROOMS AVAILABLE</Card.Title>
              <Card.Text>
                <ul>
                  <li>  Complimentary Wi-Fi: Stay connected with high-speed internet access available throughout the room.</li>
                  <li>Flat-Screen TV: Enjoy your favorite shows and movies on a large, high-definition flat-screen TV.</li>
                
                </ul>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted font-weight-bold ">Starting From 3,000 per/day</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src={Room2} />
            <Card.Body>
              <Card.Title>ROOMS AVAILABLE</Card.Title>
              <Card.Text>
                <ul>
                  <li> Work Desk: Stay productive with a spacious work desk, perfect for catching up on emails or finishing up work.</li>
                  <li>Coffee Maker: Start your day right with a fresh cup of coffee brewed in the comfort of your room.</li>
                 
                </ul>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted font-weight-bold ">Starting From 4,000 per/day</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src={Room3} />
            <Card.Body>
              <Card.Title>ROOMS AVAILABLE</Card.Title>
              <Card.Text>
                <ul>
                  <li> In-Room Safe: Keep your valuables secure with an in-room safe, providing you with peace of mind throughout your stay.</li>
                  <li>Ensuite Bathroom: Enjoy the convenience and privacy of your own ensuite bathroom, complete with a shower, bathtub, and complimentary toiletries.</li>
                  
                </ul>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted font-weight-bold ">Starting From 6,000 per/day</small>
            </Card.Footer>
          </Card>
        </CardGroup>
      </div>
    </section>
  );
};

export default FeaturedRooms;
