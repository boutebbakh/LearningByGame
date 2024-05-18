import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { CardS } from '../CardS/CardS';
import { NavbarS } from '../SpecialistNavbar/NavbarS';
import test from '../../../assets/test.svg'
import { useNavigate } from 'react-router-dom';


export const Dashboard = () => {
  const navigate =useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses data from the server
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/specialist/Courses');
        setCourses(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteCourse = async (courseId) => {
    try {
      // Send delete request to the server
      await axios.delete(`http://localhost:8080/api/v1/specialist/deleteCourse/${courseId}`);
      // Update the courses state after successful deletion

      setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };
  const handleClick = () => {
    navigate('/addCourse');
  };
  const handleCardClick =()=>{
    navigate('/Lessons');
  }
  

  return (
    <div className="dashboard-container">
        <NavbarS />
      <div className="dashboard-specialist">
        <div className="whole">
        <div className="greeting">
          <div className="greeting-container">
            <h1>Hi {}</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tene facilis tenetur, at sequi facere error ab dolore hic in.</p>
        </div>
       <div className="greeting-img">
            <img src={test} alt="" />
        </div></div>
        <div className="Courses">
        
          <h1 className='whole-courses'>The whole Courses</h1>
          <button   className="btn-courses" onClick={handleClick} >create new course  <i class="fa-solid fa-plus"></i> </button>
          </div>
        <div className="coursesContainer">
          {courses.map(course => (
            <CardS
              
              id={course.id}
              photoBase64={course.photoBase64}
              title={course.title}
              description={course.description}
              level={course.level}
              numberOfLessons={course.lessons.length}
              onDelete={() => handleDeleteCourse(course.id)}
              onClick={()=>handleCardClick(course.id)}
            />
          ))}
        </div>
      </div>
    </div>
    </div>
     
  );
};
