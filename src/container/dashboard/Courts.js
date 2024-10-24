import React, { useState, useEffect } from 'react';
import { Container, Row, Table, Pagination, PaginationItem, PaginationLink, Button } from 'reactstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import AddCourtForm from './court/AddCourtForm';
import axios from 'axios';
import { courtFetch } from '../../api/endpoint';

const Courts = () => {
  const [courts, setCourts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [courtsPerPage] = useState(50);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchCourts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(courtFetch, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage - 1,
          size: courtsPerPage,
        },
      });

      const { content, totalElements, totalPages } = response.data; 
      setCourts(content);
      setTotalElements(totalElements);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching courts:', error);
    }
  };

  useEffect(() => {
    fetchCourts();
  }, [currentPage]);

  const indexOfLastCourt = currentPage * courtsPerPage;
  const indexOfFirstCourt = indexOfLastCourt - courtsPerPage;
  const currentCourts = courts.slice(indexOfFirstCourt, indexOfLastCourt);
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const handleAddCourt = (newCourt) => {
    if (isEditMode) {
      setCourts(courts.map((court) => (court.name === selectedCourt.name ? newCourt : court)));
    } else {
      setCourts([...courts, newCourt]);
    }
    fetchCourts();
    setSelectedCourt(null);
    setIsEditMode(false);
  };
  const handleEditCourt = (court) => {
    setSelectedCourt(court); 
    setIsEditMode(true);
  };
  const handleDeleteCourt = (courtName) => {
    setCourts(courts.filter((court) => court.name !== courtName));
  };
  return (
    <Container>
      <Row>
        <AddCourtForm onAddCourt={handleAddCourt} courtToEdit={selectedCourt} isEditMode={isEditMode} />
      </Row>
      <Row>
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
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
                <td>{court.environment}</td>
                <td>{court.lighted ? 'Yes' : 'No'}</td>
                <td>{court.free ? 'Yes' : 'No'}</td>
                <td>
                  <Button color="primary" size="sm" onClick={() => handleEditCourt(court)}>
                    Edit
                  </Button>{' '}
                  <Button color="danger" size="sm" onClick={() => handleDeleteCourt(court.name)}>
                    Delete
                  </Button>
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
