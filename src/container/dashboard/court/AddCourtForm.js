import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, Form, FormGroup, Input, Button, Label,
} from 'reactstrap';
import { courtAdd, fetchSports } from '../../../api/endpoint'; // Import API endpoints
import toast from 'react-hot-toast';

const AddCourtForm = ({ onAddCourt, courtToEdit }) => {
  const token = localStorage.getItem("token");
  const initialCourtState = {
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
    editableByUser: false,
    deletableByUser: false,
  };

  const [newCourt, setNewCourt] = useState(initialCourtState);
  const [isEditing, setIsEditing] = useState(false);
  const [sports, setSports] = useState([]);

  useEffect(() => {
    const fetchSportsList = async () => {
      try {
        const response = await axios.get(fetchSports, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setSports(response.data);
      } catch (error) {
        console.error('Error fetching sports:', error);
        toast.error('Failed to load sports.');
      }
    };
    fetchSportsList();
  }, [token]);

  useEffect(() => {
    console.log('courtToEdit:', courtToEdit);
    console.log('sports:', sports);
    if (courtToEdit) {
        setNewCourt({
            ...courtToEdit,
            gameID: courtToEdit.sportsId || '',
        });
        setIsEditing(true);
    } else {
        setNewCourt(initialCourtState);
        setIsEditing(false);
    }
}, [courtToEdit]);


  const handleImageUpload = (e) => {
    setNewCourt({ ...newCourt, images: Array.from(e.target.files) });
  };

  const handleSubmit = async () => {
    if (newCourt.name && newCourt.location) {
      const courtToSubmit = {
        ...newCourt,
        images: newCourt.images.map((imageFile) => URL.createObjectURL(imageFile)),
      };
      console.log("court to submit:", courtToSubmit);
      try {
        const response = await axios.post(courtAdd, courtToSubmit, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('Court submitted successfully:', response.data);
        toast.success('Court submitted successfully!');
        if (onAddCourt) onAddCourt(response.data);
      } catch (error) {
        if (error.response && error.response.data) {
          const { user_description } = error.response.data;
          toast.error(`${user_description}`);
        } else {
          toast.error('An unexpected error occurred.');
        }
        console.error('Error submitting court:', error);
      } finally {
        handleReset();
      }
    } else {
      toast.error('Court name and location are required.');
    }
  };

  const handleReset = () => {
    setNewCourt(initialCourtState);
    setIsEditing(false);
  };

  return (
    <Container>
      <Form>
        <h3 className="mb-4">{isEditing ? 'Edit Court' : 'Add New Court'}</h3>

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="courtName">Court Name</Label>
              <Input
                type="text"
                id="courtName"
                placeholder="Court Name"
                value={newCourt.name}
                onChange={(e) => setNewCourt({ ...newCourt, name: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="location">Location</Label>
              <Input
                type="text"
                id="location"
                placeholder="Location"
                value={newCourt.location}
                onChange={(e) => setNewCourt({ ...newCourt, location: e.target.value })}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="gameID">Sport</Label>
              <Input
                type="select"
                id="gameID"
                value={newCourt.gameID}
                onChange={(e) => setNewCourt({ ...newCourt, gameID: parseInt(e.target.value) })}>
                <option value="">Select Sport</option>
                {sports.map((sport) => (
                  <option key={sport.id} value={sport.id}>
                    {sport.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="tennisCourts">Tennis Courts</Label>
              <Input
                type="number"
                id="tennisCourts"
                min="0"
                value={newCourt.tennisCourts}
                onChange={(e) => setNewCourt({ ...newCourt, tennisCourts: parseInt(e.target.value) })}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="pickleballCourts">Pickleball Courts</Label>
              <Input
                type="number"
                id="pickleballCourts"
                min="0"
                value={newCourt.pickleballCourts}
                onChange={(e) => setNewCourt({ ...newCourt, pickleballCourts: parseInt(e.target.value) })}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={4}>
            <FormGroup>
              <Label for="environment">Environment</Label>
              <Input
                type="select"
                id="environment"
                value={newCourt.environment}
                onChange={(e) => setNewCourt({ ...newCourt, environment: e.target.value })}
              >
                <option value="">Select Environment</option>
                <option value="INDOOR">INDOOR</option>
                <option value="OUTDOOR">OUTDOOR</option>
                <option value="BOTH">BOTH</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="surfaceQuality">Surface Quality</Label>
              <Input
                type="text"
                id="surfaceQuality"
                placeholder="Surface Quality"
                value={newCourt.surfaceQuality}
                onChange={(e) => setNewCourt({ ...newCourt, surfaceQuality: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  checked={newCourt.lighted}
                  onChange={(e) => setNewCourt({ ...newCourt, lighted: e.target.checked })}
                />
                Lighted
              </Label>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  checked={newCourt.free}
                  onChange={(e) => setNewCourt({ ...newCourt, free: e.target.checked })}
                />
                Free
              </Label>
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="link">Website Link</Label>
              <Input
                type="text"
                id="link"
                placeholder="Website Link"
                value={newCourt.link}
                onChange={(e) => setNewCourt({ ...newCourt, link: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="phone">Phone</Label>
              <Input
                type="text"
                id="phone"
                placeholder="Phone"
                value={newCourt.phone}
                onChange={(e) => setNewCourt({ ...newCourt, phone: e.target.value })}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={12}>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                id="description"
                rows="3"
                value={newCourt.description}
                onChange={(e) => setNewCourt({ ...newCourt, description: e.target.value })}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={12}>
            <FormGroup>
              <Label for="images">Upload Images</Label>
              <Input
                type="file"
                id="images"
                multiple
                onChange={handleImageUpload}
              />
            </FormGroup>
          </Col>
        </Row>

        <Button color="primary" onClick={handleSubmit}>
          {isEditing ? 'Update Court' : 'Add Court'}
        </Button>
        <Button color="secondary" onClick={handleReset} className="ml-2">
          Reset
        </Button>
      </Form>
    </Container>
  );
};

export default AddCourtForm;
