import React from 'react';
import Modal from 'react-modal';
import styles from '../styles/Home.module.css';

Modal.setAppElement('#__next');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const EditCaseModal = ({ open, setModalOpen }) => {
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log('MODAL WAS OPENED');
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <Modal
      isOpen={open}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Example Modal'
    >
      <h2>Add Test Case</h2>
      <button onClick={closeModal}>close</button>
      <form>
        <label>Scenario:</label>
        <textarea></textarea>
        <label>Input Data:</label>
        <input type='text' />
        <label>Expected Result:</label>
        <input type='text' />
        <button>Submit</button>
      </form>
    </Modal>
  );
};

export default EditCaseModal;
