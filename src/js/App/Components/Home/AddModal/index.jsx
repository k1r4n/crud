import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Form,
  Label,
  Modal,
  Input,
  Button,
  ModalBody,
  FormGroup,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';

const AddModal = ({
  note,
  activeModal,
  toggleModal,
  handleAddNote,
  handleInputChange,
}) => (
  <Modal isOpen={activeModal} toggle={() => toggleModal()}>
    <ModalHeader toggle={() => toggleModal('')}>Add Note</ModalHeader>

    <Form onSubmit={handleAddNote}>
      <ModalBody>
        <FormGroup row>
          <Label for="title" sm={2}>Title</Label>
          <Col sm={10}>
            <Input
              required
              type="text"
              name="title"
              id="title"
              onChange={(event) => handleInputChange(event.target.value, 'title')}
              value={note.title}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="description" sm={2}>Description</Label>
          <Col sm={10}>
            <Input
              type="textarea"
              required
              name="description"
              id="description"
              onChange={(event) => handleInputChange(event.target.value, 'description')}
              value={note.description}
            />
          </Col>
        </FormGroup>

      </ModalBody>

      <ModalFooter>
        <Button color="primary" type={'submit'}>Submit</Button>
      </ModalFooter>
    </Form>
  </Modal>
);

AddModal.propTypes = {
  note: PropTypes.object,
  errors: PropTypes.array,
  toggleModal: PropTypes.func,
  activeModal: PropTypes.bool,
  handleAddNote: PropTypes.func,
  handleInputChange: PropTypes.func,
};

export default AddModal;
