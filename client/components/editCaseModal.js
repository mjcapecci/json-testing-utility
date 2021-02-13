import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from '../styles/Home.module.css';
import data from '../utils/data';

Modal.setAppElement('#__next');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '30rem',
    transform: 'translate(-50%, -50%)',
  },
};

const EditCaseModal = ({
  open,
  setModalOpen,
  selectedCase,
  setSelectedCase,
}) => {
  const [scenarioValue, setScenarioValue] = useState('');
  const [inputDataValue, setInputDataValue] = useState('');
  const [expectedResultValue, setExpectedResultValue] = useState('');

  useEffect(() => {
    if (selectedCase) {
      setScenarioValue(selectedCase.scenario);
      setInputDataValue(selectedCase.data || '');
      setExpectedResultValue(selectedCase.result);
    }
  }, [selectedCase]);

  async function submitEdit() {
    const postData = {
      scenario: scenarioValue,
      data: inputDataValue,
      result: expectedResultValue,
    };
    await data().updatePost('general', selectedCase.id, postData);
  }

  function closeModal() {
    setSelectedCase(null);
    setModalOpen(false);
  }

  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Edit Test Case'
    >
      <h2>Edit Test Case</h2>
      <button onClick={closeModal}>close</button>
      <form className={styles.modalForm}>
        <label>Scenario:</label>
        <textarea
          value={scenarioValue}
          onChange={(e) => setScenarioValue(e.target.value)}
        ></textarea>
        <label>Input Data:</label>
        <input
          type='text'
          value={inputDataValue}
          onChange={(e) => setInputDataValue(e.target.value)}
        />
        <label>Expected Result:</label>
        <input
          type='text'
          value={expectedResultValue}
          onChange={(e) => setExpectedResultValue(e.target.value)}
        />
        <button onClick={submitEdit}>Submit</button>
      </form>
    </Modal>
  );
};

export default EditCaseModal;