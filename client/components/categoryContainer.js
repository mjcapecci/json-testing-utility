import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import data from '../utils/data';
import EditCaseModal from '../components/editCaseModal';
import AddCaseModal from '../components/addCaseModal';
import Link from 'next/link';

const CategoryContainer = ({ category }) => {
  const [cases, setCases] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  useEffect(async () => {
    const res = await data().getAll(category);
    if (res?.data) {
      setCases(res.data);
    } else {
      setCases([]);
    }
  }, []);

  function capitalCategory() {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  async function handlePass(testCase) {
    const postData = {
      scenario: testCase.scenario,
      data: testCase.data,
      result: testCase.result,
      passed: true,
    };
    await data().passCase(category, testCase.id, postData);
    location.reload();
  }

  async function handleFail(testCase) {
    console.log(testCase);
    const postData = {
      scenario: testCase.scenario,
      data: testCase.data,
      result: testCase.result,
      passed: false,
    };
    await data().failCase(category, testCase.id, postData);
    location.reload();
  }

  useEffect(() => {
    if (selectedCase) setEditModalOpen(true);
  }, [selectedCase]);

  return cases ? (
    <>
      <section className={styles.main}>
        <h1>{capitalCategory()} Tests</h1>
        <div className={styles.topControls}>
          <button onClick={() => setAddModalOpen(true)}>
            Add New {capitalCategory()} Test
          </button>
          <button onClick={() => data().resetCategory(category)}>
            Reset All {capitalCategory()} Tests
          </button>
        </div>
        <Link href='/'>Back to Home</Link>
        <div className={styles.grid}>
          {cases.map((testCase, i) => {
            return (
              <div>
                <div
                  className={styles.card}
                  style={
                    testCase.passed
                      ? { background: '#bfe3b4' }
                      : { background: '#ffcccb' }
                  }
                  key={i}
                  onClick={() => setSelectedCase(testCase)}
                >
                  <p>Scenario:</p>
                  <p className={styles.cardData}>{testCase.scenario}</p>
                  <hr />
                  <p>Input Data:</p>
                  <p className={styles.cardData}>{testCase.data}</p>
                  <hr />
                  <p>Result:</p>
                  <p className={styles.cardData}>{testCase.result}</p>
                </div>
                <div className={styles.passFailButtons}>
                  <button
                    className='pass-button'
                    onClick={() => handlePass(testCase)}
                  >
                    Pass
                  </button>
                  <button
                    className='fail-button'
                    onClick={() => handleFail(testCase)}
                  >
                    Fail
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <AddCaseModal
        open={addModalOpen}
        setModalOpen={setAddModalOpen}
        category={category}
      />
      <EditCaseModal
        open={editModalOpen}
        setModalOpen={setEditModalOpen}
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
