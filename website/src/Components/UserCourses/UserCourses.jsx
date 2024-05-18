import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Search/Searchbar.css'
import './UserCourses.css';
import { Card } from '../Card/Card';
import { Navbar } from '../Navbar/Navbar';
import {useNavigate } from 'react-router-dom';


export const UserCourses = () => {
  const  navigate=useNavigate();

  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const handleSearch = async () => {
    try {
      // Make an HTTP GET request to your Spring Boot backend
      const response = await axios.get(`http://localhost:8080/api/v1/student/search/${searchQuery}`);
      setCourses(JSON.parse(JSON.stringify(response.data)));
      
      // Handle the response data as needed, such as updating state or rendering results
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/student/Courses");
        setCourses(JSON.parse(JSON.stringify(response.data)));
        
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []);
  

  const handleClick=(id)=>{
    navigate(`/course/${id}`)
    
   
     console.log({id}); 

  };

  return (
    <div className="rcontainer">
      <Navbar />
      
      <div className="courses-container">
      <div className="srch-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <i className="fas fa-search search-icon" onClick={handleSearch}></i>
    </div>
        <div className='card-container'>
          {courses.map((course,index ) => (
            <Card
              key={index}
              photoBase64={course.photoBase64}
              title={course.title}
              description={course.description}
              nbr_lessons={course.lessons.length}
              level={course.level}
              buttonText="Enroll Now"
              onClick={()=>handleClick(course.id)}
            />
          ))}
        </div>
      </div>
      
    </div>
  );
};