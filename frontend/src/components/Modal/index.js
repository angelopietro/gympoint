import React, { useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    bottom: 'auto',
    maxWidth: '600px',
    maxHeight: '500px',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.6)',
  },
};

export default function CustomModal({ isOpen, closeModal, children }) {
  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
}

CustomModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,

  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
