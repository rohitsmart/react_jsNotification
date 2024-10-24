import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, Form, FormGroup, Input, Button, Label,
} from 'reactstrap';

const AddCourtForm = ({ onAddCourt, onEditCourt, courtToEdit }) => {
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
    images: [],  // This will hold File objects instead of URLs
    editableByUser: false,
    deletableByUser: false,
  };

  const [newCourt, setNewCourt] = useState(initialCourtState);
  const [isEditing, setIsEditing] = useState(false);  // Track editing mode

  // If courtToEdit is provided, populate the form with its data
  useEffect(() => {
    if (courtToEdit) {
      setNewCourt(courtToEdit);
      setIsEditing(true);  // Set editing mode
    } else {
      setNewCourt(initialCourtState);  // Reset to initial state when not editing
      setIsEditing(false); // Reset editing mode
    }
  }, [courtToEdit]);

  // Handle image selection
  const handleImageUpload = (e) => {
    setNewCourt({ ...newCourt, images: Array.from(e.target.files) });
  };

  const handleSubmit = () => {
    if (newCourt.name && newCourt.location) {
      const courtToSubmit = {
        ...newCourt,
        images: newCourt.images.map((imageFile) => URL.createObjectURL(imageFile))  // Convert to URLs
      };

      if (isEditing) {
        onEditCourt(courtToSubmit); // Call edit function if in edit mode
      } else {
        onAddCourt(courtToSubmit); // Call add function if in add mode
      }

      // Reset form after submission
      handleReset();
    }
  };

  const handleReset = () => {
    setNewCourt(initialCourtState); // Reset to initial state
    setIsEditing(false); // Reset editing mode
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
                onChange={(e) => setNewCourt({ ...newCourt, gameID: parseInt(e.target.value) })}
              >
                <option value="">Select Sport</option>
                <option value="1">Tennis</option>
                <option value="2">Pickleball</option>
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
          <Col md={6}>
            <FormGroup>
              <Label for="link">Website</Label>
              <Input
                type="url"
                id="link"
                placeholder="Court Link"
                value={newCourt.link}
                onChange={(e) => setNewCourt({ ...newCourt, link: e.target.value })}
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
                placeholder="Enter court description"
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

        <Button color="success" className="mt-3" onClick={handleSubmit}>
          {isEditing ? 'Update Court' : 'Add Court'}
        </Button>
        <Button color="secondary" className="mt-3 ml-2" onClick={handleReset}>
          Reset
        </Button>
      </Form>
    </Container>
  );
};

export default AddCourtForm;
