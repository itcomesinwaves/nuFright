import React from "react";
import StoriesPage from '../../components/Stories-components/Stories';


const Stories = () => (
  <div className="container">
    <h1 style={{fontSize: '2.5em', color: 'white', fontFamily: 'Montserrat', display: 'flex', justifyContent: "center", alignContent: 'center'}}>Horror Stories</h1>
    <StoriesPage/>
  </div>
);

export default Stories;
