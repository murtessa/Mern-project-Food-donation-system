import React, { useState, useEffect } from 'react';
import './OurWorks.css';

const OurWorks = () => {
  // Define state to store works data
  const [works, setWorks] = useState([]);

  // Simulating fetching data with useEffect
  useEffect(() => {
    // Fetch works data from API or local storage
    const fetchedWorks = [
      {
        id: 1,
        title: 'Donate Food ',
        description:
          'You can Donate food throu these platform and save another peoples lives',
        imageUrl: '/Image_our_1.jpg',
      },
      {
        id: 2,
        title: 'Registered NGO',
        description:
          'Take the donated food and distributed to the people who need the food',
        imageUrl: '/Image_our_2.jpg',
      },
      {
        id: 1,
        title: 'Delivery',
        description:
          'take food from donated indivisuals, hotels, and other organization and take to NGO ',
        imageUrl: '/Image_our_3.jpg',
      },
      // Add more work items as needed
    ];

    // Update state with fetched data
    setWorks(fetchedWorks);
  }, []); // Empty dependency array to run effect only once on mount

  // render my frist

  return (
    <div className="our-works-container">
      <h2 className="section-title">Our Works</h2>
      <h4 className="section-sub-title">"Look What We Can Do Together" </h4>
      <div className="works-list">
        {works.map((work) => (
          <div className="work-item" key={work.id}>
            <img src={work.imageUrl} alt={`Work ${work.id}`} />
            <h3>{work.title}</h3>
            <p>{work.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurWorks;
