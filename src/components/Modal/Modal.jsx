import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalWindowOverlay, ModalWindow } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.clickEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.clickEscape);
  }

  clickEscape = event => {
    if (event.code !== 'Escape') {
      return;
    }
    this.props.closeModal();
  };

  clickOverlay = event => {
    if (event.target !== event.currentTarget) {
      return;
    }
    this.props.closeModal();
  };

  render() {
    const { image } = this.props;
    return createPortal(
      <ModalWindowOverlay onClick={this.clickOverlay}>
        <ModalWindow>
          <img src={image} alt="" />
        </ModalWindow>
      </ModalWindowOverlay>,
      document.querySelector('#modal-root')
    );
  }
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
