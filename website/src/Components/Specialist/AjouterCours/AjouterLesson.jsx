import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Lesson.css';
import { useParams } from 'react-router-dom';
import { NavbarS } from '../SpecialistNavbar/NavbarS';

export const AjouterLesson = () => {
  const { id } = useParams();

  // State variables for lesson details
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');
  const [questiontitle, setquestiontitle] = useState('');
  const [answers, setAnswers] = useState([{ optiontext: '', correct: false }]);
  const [allInputsFilled, setAllInputsFilled] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Function to check if all input fields are filled
  useEffect(() => {
    const inputs = [
      lessonTitle,
      lessonDescription,
      questiontitle,
      ...answers.map(answer => answer.optiontext)
    ];
    const areAllInputsFilled = inputs.every(input => input !== '');
    setAllInputsFilled(areAllInputsFilled);
  }, [lessonTitle, lessonDescription, questiontitle, answers]);

  // Function to add a new answer to the answers array
  const addAnswer = () => {
    setAnswers([...answers, { optiontext: '', correct: false }]);
  };

  // Function to handle lesson submission
  const handleAddLesson = async (e) => {
    e.preventDefault();

    try {
      // Construct lesson object
      const lesson = {
        title: lessonTitle,
        description: lessonDescription,
        questiontitle: questiontitle,
        answers,
      };

      // Make POST request to add lessons for the given courseId
      await axios.post(`http://localhost:8080/api/v1/specialist/addLessons/${id}`, [lesson]);
      // Handle success
      console.log('Lesson added successfully!');
      setShowSuccessMessage(true);

      // Clear form fields after adding lesson
      setLessonTitle('');
      setLessonDescription('');
      setquestiontitle('');
      setAnswers([{ optiontext: '', correct: false }]);
      console.log(lesson)
    } catch (error) {
     
      console.error('Error adding lesson:', error);
      
      // Handle error
    }
  };

  // Function to handle changes in answer text
  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index].optiontext = value;
    setAnswers(newAnswers);
  };

  // Function to handle changes in answer correctness
  const handleCorrectChange = (index) => {
    const newAnswers = answers.map((answer, i) => ({
      ...answer,
      correct: i === index // Ensuring only one correct answer
    }));
    setAnswers(newAnswers);
  };

  return (
    <div className="r-container">
      <NavbarS />
      <div className='lesson-container'>
        <h2>Add Lessons</h2>
        <form className='form' onSubmit={handleAddLesson}>
          <div>
            <label className='label'>Lesson Title:</label>
            <input className='input-text' type="text" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} />
          </div>
          <div>
            <label className='label'>Lesson Description:</label>
            <textarea className='input-text' value={lessonDescription} onChange={(e) => setLessonDescription(e.target.value)} />
          </div>
          <div>
            <label className='label'>Question Title:</label>
            <input className='input-text' type="text" value={questiontitle} onChange={(e) => setquestiontitle(e.target.value)} />
          </div>

          <button className='button' type="button" onClick={addAnswer}>Add optionText</button>
          {answers.map((answer, index) => (
            <div key={index}>
              <input
                className='input-text'
                type="text"
                value={answer.optiontext}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                placeholder={`optiontext ${index + 1}`}
              />
              <label>
                <input
                  type="checkbox"
                  checked={answer.correct}
                  onChange={() => handleCorrectChange(index)}
                />
                Correct
              </label>
            </div>
          ))}
          <div>
            <button className='button' type="submit" disabled={!allInputsFilled}>Save</button>
          </div>
          {showSuccessMessage && <p className='success-message'>Lesson added successfully!</p>}
        </form>
      </div>
    </div>
  );
};
