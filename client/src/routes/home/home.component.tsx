import React from "react";
import CreepyCarousel from "../../components/carousel";

const Home = () => (
  <div className="container">
    <h1>Welcome to nuFright</h1>
    <h2>The one stop shop for all of you freaks out there 😈 </h2><br></br>
    
    <h3>Top Shows/Movies</h3>
    <CreepyCarousel /><br></br>
    <h3>Top Haunts!</h3>
    <CreepyCarousel />
    <h3>Favorite horror books!</h3>
    <CreepyCarousel />
    <h3>chilling tales from around the web...</h3>
    <CreepyCarousel />
  </div>
);

export default Home;
