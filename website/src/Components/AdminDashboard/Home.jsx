import React from 'react';
// Import your CSS file here

const styles = {
  container: {
    backgroundColor: '#FFED4A',
    minHeight: '100vh',
    padding: '2rem',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: '600',
  },
  subheading: {
    fontSize: '1.5rem',
    fontWeight: '600',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
  },
  purpleBox: {
    backgroundColor: '#B794F4',
    padding: '1rem',
    borderRadius: '0.5rem',
  },
  pinkBox: {
    backgroundColor: '#F687B3',
    padding: '1rem',
    borderRadius: '0.5rem',
  },
  redBox: {
    backgroundColor: '#FC8181',
    padding: '1rem',
    borderRadius: '0.5rem',
  },
  button: {
    backgroundColor: '#8B5CF6',
    color: '#FFFFFF',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
  },
};

export const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.flex}>
          <h1 style={styles.heading}>Dashboard</h1>
          <div>AJ Alyssa Jones ▼</div>
        </div>
        <div>
          <h2 style={styles.subheading}>Hi, Alyssa</h2>
          <p>Ready to start your day with some pitch decks?</p>
        </div>
        <div style={styles.grid}>
          <div style={styles.purpleBox}>
            <h3 style={styles.subheading}>Overview</h3>
            <div>83% Complete</div>
          </div>
          <div style={styles.pinkBox}>
            <div>77% Complete</div>
          </div>
          <div style={styles.redBox}>
            <div>91 Unique Views</div>
          </div>
        </div>
        <div>
          <h3 style={styles.subheading}>Next in Fashion</h3>
          <div style={{ ...styles.flex, ...styles.purpleBox, ...styles.grid }}>
            <div>
              <p style={{ fontWeight: '600' }}>Digital Marketing Today</p>
              <p>10 Slides</p>
            </div>
            <button style={styles.button}>View</button>
          </div>
        </div>
      </div>
    </div>
  );
};
