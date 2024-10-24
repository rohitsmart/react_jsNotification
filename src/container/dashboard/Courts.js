import React, { useState, useEffect } from 'react';
import './Courts.css';

const Courts = () => {
  const [courts, setCourts] = useState([]);
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [sportFilter, setSportFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [courtsPerPage] = useState(5);
  const [newCourt, setNewCourt] = useState({
    name: '',
    location: '',
    gameID: '',
    tennisCourts: 0,
    pickleballCourts: 0,
    environment: '',
    lighted: false,
    surfaceQuality: '',
    free: false,
    link: '',
    phone: '',
    description: '',
    images: [],
    editableByUser: true,
    deletableByUser: false,
  });

  useEffect(() => {
    const fetchedCourts = [
      {
        name: 'Central Park Tennis Courts',
        location: 'Central Park, New York',
        gameID: 1,
        tennisCourts: 4,
        pickleballCourts: 2,
        environment: 'OUTDOOR',
        lighted: true,
        surfaceQuality: 'High',
        free: false,
        link: 'https://www.example.com/central-park-tennis',
        phone: '+1234567890',
        description: 'Beautiful tennis courts located in Central Park, with night lighting available.',
        images: ['https://www.example.com/images/court1.jpg', 'https://www.example.com/images/court2.jpg'],
        editableByUser: true,
        deletableByUser: false,
      },
      {
        name: 'Brooklyn Tennis Arena',
        location: 'Brooklyn, New York',
        gameID: 2,
        tennisCourts: 6,
        pickleballCourts: 3,
        environment: 'INDOOR',
        lighted: true,
        surfaceQuality: 'Medium',
        free: true,
        link: 'https://www.example.com/brooklyn-tennis-arena',
        phone: '+1234567891',
        description: 'Indoor pickleball courts with adjustable lighting and temperature control.',
        images: ['https://www.example.com/images/court3.jpg'],
        editableByUser: false,
        deletableByUser: true,
      },
    ];
    setCourts(fetchedCourts);
    setFilteredCourts(fetchedCourts);
  }, []);

  const handleFilter = () => {
    setFilteredCourts(
      courts.filter((court) =>
        court.location.toLowerCase().includes(locationFilter.toLowerCase()) ||
        court.gameID === parseInt(sportFilter)
      )
    );
    setCurrentPage(1);
  };

  const handleAddCourt = () => {
    if (newCourt.name && newCourt.location) {
      setCourts([...courts, newCourt]);
      setFilteredCourts([...courts, newCourt]);
      setNewCourt({
        name: '',
        location: '',
        gameID: '',
        tennisCourts: 0,
        pickleballCourts: 0,
        environment: '',
        lighted: false,
        surfaceQuality: '',
        free: false,
        link: '',
        phone: '',
        description: '',
        images: [],
        editableByUser: true,
        deletableByUser: false,
      });
    }
  };

  const handleDeleteCourt = (index) => {
    const updatedCourts = courts.filter((_, i) => i !== index);
    setCourts(updatedCourts);
    setFilteredCourts(updatedCourts);
  };

  const handleEditCourt = (index) => {
    const courtToEdit = courts[index];
    setNewCourt(courtToEdit);
    handleDeleteCourt(index);
  };

  const indexOfLastCourt = currentPage * courtsPerPage;
  const indexOfFirstCourt = indexOfLastCourt - courtsPerPage;
  const currentCourts = filteredCourts.slice(indexOfFirstCourt, indexOfLastCourt);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredCourts.length / courtsPerPage);
  const pages = [...Array(totalPages).keys()].map(i => i + 1);

  return (
    <div className="courts-container">
      <h2 className="title">Tennis Courts Dashboard</h2>
      <p>Track court availability, add new courts, and search by location or sport.</p>

      <div className="add-court-form">
        <h3>Add New Court</h3>
        <input
          type="text"
          placeholder="Court Name"
          value={newCourt.name}
          onChange={(e) => setNewCourt({ ...newCourt, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={newCourt.location}
          onChange={(e) => setNewCourt({ ...newCourt, location: e.target.value })}
        />
        <select
          value={newCourt.gameID}
          onChange={(e) => setNewCourt({ ...newCourt, gameID: parseInt(e.target.value) })}
        >
          <option value="">Select Sport</option>
          <option value="1">Tennis</option>
          <option value="2">Pickleball</option>
        </select>
        <input
          type="number"
          placeholder="Number of Tennis Courts"
          value={newCourt.tennisCourts}
          onChange={(e) => setNewCourt({ ...newCourt, tennisCourts: parseInt(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Number of Pickleball Courts"
          value={newCourt.pickleballCourts}
          onChange={(e) => setNewCourt({ ...newCourt, pickleballCourts: parseInt(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Environment (INDOOR/OUTDOOR)"
          value={newCourt.environment}
          onChange={(e) => setNewCourt({ ...newCourt, environment: e.target.value })}
        />
        <label>
          <input
            type="checkbox"
            checked={newCourt.lighted}
            onChange={(e) => setNewCourt({ ...newCourt, lighted: e.target.checked })}
          />
          Lighted
        </label>
        <label>
          <input
            type="checkbox"
            checked={newCourt.free}
            onChange={(e) => setNewCourt({ ...newCourt, free: e.target.checked })}
          />
          Free
        </label>
        <input
          type="text"
          placeholder="Surface Quality"
          value={newCourt.surfaceQuality}
          onChange={(e) => setNewCourt({ ...newCourt, surfaceQuality: e.target.value })}
        />
        <input
          type="text"
          placeholder="Link"
          value={newCourt.link}
          onChange={(e) => setNewCourt({ ...newCourt, link: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={newCourt.phone}
          onChange={(e) => setNewCourt({ ...newCourt, phone: e.target.value })}
        />
        <textarea
          placeholder="Enter court description here..."
          value={newCourt.description}
          onChange={(e) => setNewCourt({ ...newCourt, description: e.target.value })}
          rows="4"
        />
        <button onClick={handleAddCourt} className="add-court-btn">Add Court</button>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="search-input"
        />
        <select
          value={sportFilter}
          onChange={(e) => setSportFilter(e.target.value)}
          className="sport-filter"
        >
          <option value="">Filter by Sport</option>
          <option value="1">Tennis</option>
          <option value="2">Pickleball</option>
        </select>
        <button onClick={handleFilter} className="search-btn">Search</button>
      </div>

      <div className="table-container">
        <table className="court-table">
          <thead>
            <tr>
              <th>Court Name</th>
              <th>Location</th>
              <th>Sport</th>
              <th>Status</th>
              <th>Environment</th>
              <th>Lighted</th>
              <th>Free</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCourts.length === 0 ? (
              <tr><td colSpan="8">No courts found for the specified criteria.</td></tr>
            ) : (
              currentCourts.map((court, index) => (
                <tr key={index}>
                  <td>{court.name}</td>
                  <td>{court.location}</td>
                  <td>{court.gameID === 1 ? 'Tennis' : 'Pickleball'}</td>
                  <td>{court.lighted ? 'Available' : 'Unavailable'}</td>
                  <td>{court.environment}</td>
                  <td>{court.lighted ? 'Yes' : 'No'}</td>
                  <td>{court.free ? 'Yes' : 'No'}</td>
                  <td>
                    <button onClick={() => handleEditCourt(index)}>Edit</button>
                    <button onClick={() => handleDeleteCourt(index)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        {pages.map((number) => (
          <button key={number} onClick={() => handlePageChange(number)} className={currentPage === number ? 'active' : ''}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Courts;
