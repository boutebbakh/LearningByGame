import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { FaBook } from 'react-icons/fa';
import './CourseDetails.css';


export const CourseDetails = () => {
  const navigate =useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Assuming user login state

  const { access_token ,id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await axios.get(`http://localhost:8080/api/v1/student/Course/${id}`);
        setCourse(courseResponse.data);
        
        const lessonsResponse = await axios.get(`http://localhost:8080/api/v1/student/Course/${id}/lessons`);
        setLessons(lessonsResponse.data);

       if (access_token) {
          // Validate the token here if necessary
          localStorage.setItem('token', access_token);
          setIsLoggedIn(true);

        } 
       
        console.log(courseResponse.data);
        console.log(lessonsResponse.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchData();
  }, [access_token,id]);

  const handleLessonClick = (lesson) => {
    // Assuming user login state management
    if (isLoggedIn) {
      navigate(`/${access_token}/course/${id}/lesson/${lesson.id}`);
      console.log(isLoggedIn)
    } else {
      // Redirect to login or display a message
      navigate('/login');

    }
  };

  return (
    <div className="r-container">
      <div className="Lcontainer">
        {course && (
          <div className="course-details">
            <img src={"data:image/png;base64," + course.photoBase64} alt={course.title} className="card-img" />
            <div className="card-content">
              <h3 className="card-title">{course.title}</h3>
              <span className="card-info">{course.teacher}</span>
              <p className="card-description">{course.description}</p>
              <div className="card-details">
                <div className="card-detail">
                  <span className="card-info">{course.level}</span>
                </div>
                <div className="card-detail">
                  <FaBook className="card-icon" />
                  <span className="card-info">{course.nbr_lessons} Lessons</span>
                </div>
              </div>
              <div className="evaluation">{course.evaluation}</div>
            </div>
          </div>
        )}
        <div className="lesson-section">
          <h3>Lessons</h3>
          <div className="lesson-list">
          {lessons.map((lesson, index) => (
              <div key={index} className="lesson-item" onClick={() => handleLessonClick(lesson)}>
                <span>{lesson.title}</span>
              </div>
            ))}
          </div>
        </div>
      
      </div>
    </div>
  );
};
