import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Search/Searchbar.css";
import "./Rcourses.css";

import { Card } from "../Card/Card";
import { StdNavbar } from "../StudentNavbar/StdNavbar";
import { useParams, useNavigate } from "react-router-dom";

export const Rcourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [RecomendedC, setRecomendedC] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      // Make an HTTP GET request to your Spring Boot backend
      const response = await axios.get(
        `http://localhost:8080/api/v1/student/search/${searchQuery}`
      );
      setCourses(JSON.parse(JSON.stringify(response.data)));
      console.log(response.data);
      // Handle the response data as needed, such as updating state or rendering results
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const { access_token } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/student/Courses`
        );
        setCourses(JSON.parse(JSON.stringify(response.data)));
        const result = await axios.get(
          `http://localhost:8080/api/v1/student/recomendedcourses/${access_token}`
        );
        setRecomendedC(JSON.parse(JSON.stringify(result.data)));
        console.log(JSON.parse(JSON.stringify(result.data)));
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, [access_token]);

  const handleClick = (id) => {
    navigate(`/${access_token}/course/${id}`);

    console.log({ id });
  };
  return (
    <div>
      <StdNavbar />
      <div className="rcontainer">
        <div className="courses-container">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fas fa-search search-icon" onClick={handleSearch}></i>
          </div>
          <h2>Recomended Courses For you </h2>
          <div className="card-container">
            {RecomendedC.map((course, index) => (
              <Card
                key={index}
                photoBase64={course.photoBase64}
                title={course.title}
                description={course.description}
                nbr_lessons={course.lessons.length}
                level={course.level}
                buttonText="Enroll Now"
                onClick={() => handleClick(course.id)}
              />
            ))}
          </div>
          <h2>Gemilearn courses </h2>
          <div className="card-container">
            {courses.map((course, index) => (
              <Card
                key={index}
                photoBase64={course.photoBase64}
                title={course.title}
                description={course.description}
                nbr_lessons={course.lessons.length}
                level={course.level}
                buttonText="Enroll Now"
                onClick={() => handleClick(course.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
