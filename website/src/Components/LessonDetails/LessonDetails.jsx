import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


export const LessonDetails = () => {
  const navigate=useNavigate();
  const { access_token,id,lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
 
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/student/Course/${id}/lesson/${lessonId}`);
        setLesson(response.data);
      } catch (error) {
        console.error("Error fetching lesson:", error);
      }
    };

    fetchLesson();
  }, [id,lessonId]);
  const onNext=()=>{
    navigate(`/${access_token}/course/${id}/lesson/${lessonId}/Quizz`)
  }
  return (
    <div className="lesson-details-page">
      {lesson ? (
        <div>
          <h1>{lesson.title}</h1>
          <p>{lesson.description}</p>
          <button onClick={onNext}>Next</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
