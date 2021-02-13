import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import data from '../utils/data';
import EditCaseModal from '../components/editCaseModal';

const CategoryContainer = ({ category }) => {
  const [cases, setCases] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  useEffect(async () => {
    const res = await data().getAll(category);
    setCases(res.data);
  }, []);

  useEffect(() => {
    if (selectedCase) setModalOpen(true);
  }, [selectedCase]);

  return cases.length > 0 ? (
    <>
      <section className={styles.main}>
        <h1>General Tests</h1>
        <button>Add New General Test</button>
        <div className={styles.grid}>
          {cases.map((testCase, i) => {
            return (
              <div
                className={styles.card}
                key={i}
                onClick={() => setSelectedCase(testCase)}
              >
                <p>{testCase.scenario}</p>
              </div>
            );
          })}
        </div>
      </section>
      <EditCaseModal
        open={modalOpen}
        setModalOpen={setModalOpen}
        selectedCase={selectedCase}
        setSelectedCase={setSelectedCase}
        category={category}
      />
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default CategoryContainer;
