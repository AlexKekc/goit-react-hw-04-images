import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalWindowOverlay, ModalWindow } from './Modal.styled';

export const Modal = ({ image, closeModal }) => {
  const clickEscape = useCallback(
    event => {
      if (event.code !== 'Escape') {
        return;
      }
      closeModal();
    },
    [closeModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', clickEscape);

    return () => {
      window.removeEventListener('keydown', clickEscape);
    };
  }, [clickEscape]);

  const clickOverlay = event => {
    if (event.target !== event.currentTarget) {
      return;
    }
    closeModal();
  };

  return createPortal(
    <ModalWindowOverlay onClick={clickOverlay}>
      <ModalWindow>
        <img src={image} alt="" />
      </ModalWindow>
    </ModalWindowOverlay>,
    document.querySelector('#modal-root')
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
