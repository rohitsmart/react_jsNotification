import React, { useState } from 'react';
import {
  Container, Row, Col, Form, FormGroup, Input, Button, Label,
} from 'reactstrap';

const AddCourtForm = ({ onAddCourt }) => {
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
    images: '',
    editableByUser: true,
    deletableByUser: false,
  });

  const handleAddCourt = () => {
    if (newCourt.name && newCourt.location) {
      // Convert images input from string to array of URLs
      const courtToAdd = { ...newCourt, images: newCourt.images.split(',').map(img => img.trim()) };
      onAddCourt(courtToAdd);
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
        images: '',
        editableByUser: true,
        deletableByUser: false,
      });
    }
  };

  return (
    <Container>
      <Form>
        <h3>Add New Court</h3>
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
                value={newCourt.tennisCourts}
                onChange={(e) => setNewCourt({ ...newCourt, tennisCourts: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="pickleballCourts">Pickleball Courts</Label>
              <Input
                type="number"
                id="pickleballCourts"
                value={newCourt.pickleballCourts}
                onChange={(e) => setNewCourt({ ...newCourt, pickleballCourts: e.target.value })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={4}>
            <FormGroup>
              <Label for="environment">Environment</Label>
              <Input
                type="text"
                id="environment"
                placeholder="INDOOR/OUTDOOR"
                value={newCourt.environment}
                onChange={(e) => setNewCourt({ ...newCourt, environment: e.target.value })}
              />
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
              <Label for="images">Images (comma separated URLs)</Label>
              <Input
                type="text"
                id="images"
                placeholder="Image URLs"
                value={newCourt.images}
                onChange={(e) => setNewCourt({ ...newCourt, images: e.target.value })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="success" onClick={handleAddCourt}>Add Court</Button>
      </Form>
    </Container>
  );
};

export default AddCourtForm;
