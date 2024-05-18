import React from 'react';
import './Card.css';
import { FaBook } from 'react-icons/fa';

export const Card = ({ photoBase64, title, description, level, nbr_lessons, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={"data:image/png;base64," + photoBase64} alt='title' className='card-img'/>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <div className="card-details">
          <div className="card-detail">
            <span className="card-info">{level}</span>
          </div>
          <div className="card-detail">
            <FaBook className="card-icon" />
            <span className="card-info">{nbr_lessons} Lessons</span>
          </div>
        </div>
      </div>
    </div>
  );
};
