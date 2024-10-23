import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import './Courts.css';

const Courts = () => {
  const [courts, setCourts] = useState([]);
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [courtStats, setCourtStats] = useState({
    busy: 0,
    free: 0,
    average: 0
  });

  useEffect(() => {
    // Fetch courts from API (for now, we're using dummy data)
    const fetchedCourts = [
      {
        name: 'Central Park Tennis Courts',
        location: 'Central Park, New York',
        status: 'busy',
        tennisCourts: 4,
        pickleballCourts: 2,
        environment: 'OUTDOOR',
        lighted: true,
        free: false,
      },
      {
        name: 'Brooklyn Tennis Arena',
        location: 'Brooklyn, New York',
        status: 'free',
        tennisCourts: 6,
        pickleballCourts: 3,
        environment: 'INDOOR',
        lighted: true,
        free: true,
      },
      // Add more courts as needed
    ];
    setCourts(fetchedCourts);
    setFilteredCourts(fetchedCourts);
  }, []);

  useEffect(() => {
    // Calculate statistics for busy, free, and average courts
    const busyCount = courts.filter(court => court.status === 'busy').length;
    const freeCount = courts.filter(court => court.status === 'free').length;
    const avgCount = courts.filter(court => court.status === 'average').length;

    setCourtStats({
      busy: busyCount,
      free: freeCount,
      average: avgCount
    });
  }, [courts]);

  const handleFilter = () => {
    setFilteredCourts(
      courts.filter(court =>
        court.location.toLowerCase().includes(locationFilter.toLowerCase())
      )
    );
  };

  const data = {
    labels: ['Busy Courts', 'Free Courts', 'Average Courts'],
    datasets: [
      {
        data: [courtStats.busy, courtStats.free, courtStats.average],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56'],
        hoverBackgroundColor: ['#ff6384', '#36a2eb', '#ffcd56'],
      },
    ],
  };

  return (
    <div className="courts-container">
      <h2 className="title">Tennis Courts Dashboard</h2>
      <p>Welcome to the Tennis Mate Dashboard, track court status, add new courts, and search based on location.</p>
      
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="search-input"
        />
        <button onClick={handleFilter} className="search-btn">Search</button>
      </div>

      <div className="statistics-section">
        <h3>Court Statistics</h3>
        <div className="pie-chart">
          <Pie data={data} />
        </div>
      </div>

      <div className="court-list">
        <h3>Available Courts</h3>
        {filteredCourts.length === 0 ? (
          <p>No courts found for the specified location.</p>
        ) : (
          filteredCourts.map((court, index) => (
            <div key={index} className={`court-item ${court.status}`}>
              <h4>{court.name}</h4>
              <p>Location: {court.location}</p>
              <p>Status: {court.status}</p>
              <p>Tennis Courts: {court.tennisCourts}</p>
              <p>Pickleball Courts: {court.pickleballCourts}</p>
              <p>Environment: {court.environment}</p>
              <p>Lighted: {court.lighted ? 'Yes' : 'No'}</p>
              <p>Free to Use: {court.free ? 'Yes' : 'No'}</p>
            </div>
          ))
        )}
      </div>

      <div className="add-court-btn-container">
        <button className="add-court-btn">Add New Court</button>
      </div>
    </div>
  );
};

export default Courts;
