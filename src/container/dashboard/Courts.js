import React, { useState, useEffect } from 'react';
import {
  Container, Row, Table, Pagination, PaginationItem, PaginationLink,
  Button,
} from 'reactstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // React Icons for previous and next
import AddCourtForm from './court/AddCourtForm';

const Courts = () => {
  const [courts, setCourts] = useState([]);
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [courtsPerPage] = useState(5);

  useEffect(() => {
    // Simulated court data
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
      // Add more courts here if needed...
    ];
    setCourts(fetchedCourts);
    setFilteredCourts(fetchedCourts);
  }, []);

  const indexOfLastCourt = currentPage * courtsPerPage;
  const indexOfFirstCourt = indexOfLastCourt - courtsPerPage;
  const currentCourts = filteredCourts.slice(indexOfFirstCourt, indexOfLastCourt);

  const totalPages = Math.ceil(filteredCourts.length / courtsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return; // Prevent going out of bounds
    setCurrentPage(pageNumber);
  };

  const handleAddCourt = (newCourt) => {
    setCourts([...courts, newCourt]);
    setFilteredCourts([...filteredCourts, newCourt]);
  };

  return (
    <Container>
      <Row>
        <AddCourtForm onAddCourt={handleAddCourt} />
      </Row>
      <Row>
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Tennis Courts</th>
              <th>Pickleball Courts</th>
              <th>Environment</th>
              <th>Lighted</th>
              <th>Free</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCourts.map((court, index) => (
              <tr key={index}>
                <td>{court.name}</td>
                <td>{court.location}</td>
                <td>{court.tennisCourts}</td>
                <td>{court.pickleballCourts}</td>
                <td>{court.environment}</td>
                <td>{court.lighted ? 'Yes' : 'No'}</td>
                <td>{court.free ? 'Yes' : 'No'}</td>
                <td>
                  <Button color="danger" size="sm">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <Row className="justify-content-center">
        <Pagination>
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)}>
              <FaArrowLeft />
            </PaginationLink>
          </PaginationItem>
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <PaginationItem key={pageNumber + 1} active={pageNumber + 1 === currentPage}>
              <PaginationLink onClick={() => handlePageChange(pageNumber + 1)}>
                {pageNumber + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem disabled={currentPage === totalPages}>
            <PaginationLink next onClick={() => handlePageChange(currentPage + 1)}>
              <FaArrowRight />
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </Row>
    </Container>
  );
};

export default Courts;
