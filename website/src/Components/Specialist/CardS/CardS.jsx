import React from 'react';
import './CardS.css';
import { useNavigate } from 'react-router-dom';

export const  CardS = ({id,photoBase64, title, description, level, numberOfLessons, onDelete }) => {

  const navigate =useNavigate();
  const handleEdit=()=>{
    navigate(`/edit/${id}`);
  }
  return (
    <div className="cards">
      <img src={"data:image/png;base64," + photoBase64} alt="Course" className="course-image" />
      <div className="card-content">
        <h2 className="title">{title}</h2>
        <p className="description">{description}</p>
        <p className="level">Level: {level}</p>
        <p className="lessons">Number of Lessons: {numberOfLessons}</p>
        <div className="icons">
          <i className="fas fa-trash" onClick={onDelete}></i>
          <i className="fas fa-edit" onClick={handleEdit}></i>
        </div>
      </div>
    </div>
  );
};


