import React from 'react'
import H1 from "../h1"
import Button from "../button"
import {  Modal, ModalHeader, ModalBody } from 'reactstrap'
import './modal.css'

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <>
        <Button href="#" onClick={this.toggle}>Click to Open Modal</Button>
          <Modal backdrop={true} size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
                <H1>This is a Header</H1>
            </ModalHeader>
          <ModalBody>
            {this.props.children}
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default ModalExample;