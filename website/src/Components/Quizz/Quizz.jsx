import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const Quizz = () => {
    const [question, setQuestion] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [startTime, setStartTime] = useState(null); // New state to store the start time
    const { access_token, id, lessonId } = useParams();

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/student/Course/${id}/lesson/${lessonId}/Quizz`);
                setQuestion(response.data);
                setStartTime(new Date().getTime()); // Set the start time when fetching the question
            } catch (error) {
                console.error("Error fetching lesson:", error);
            }
        };

        fetchLesson();
    }, [access_token, id, lessonId]);
    const sendScore = async (score) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/student/${access_token}/${lessonId}/score`, {  score });
            console.log('Score stored successfully:', response.data);
            // You can handle the response if needed
        } catch (error) {
            console.error('Error storing score:', error);
        }
    };
    
    const handleCheckAnswers = () => {
        const correctAnswers = question.answers.filter(answer => answer.correct);
        const isCorrect = selectedAnswers.every(answerId =>
            correctAnswers.some(correctAnswer => correctAnswer.id === answerId)
        );
    
        let score = 0; // Initialize score
    
        if (isCorrect) {
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - startTime;
    
            if (elapsedTime <= 10000) { // 10 seconds
                score = 25;
                alert(`Your answer is correct! You earned ${score} XP.`);
            } else {
                score = 17;
                alert(`Your answer is correct! You earned ${score} XP.`);
            }
            sendScore(score);
        }
          else {
            alert('Your answer is incorrect. You earned 0 XP.');
            sendScore(score);
        }
    };
    

    return (
        <div>
            <h1>Quizz</h1>
            {question && (
                <div>
                    <h2>{question.questiontitle}</h2>
                    <ul>
                        {question.answers.map((answer, index) => (
                            <li key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        onChange={() => {
                                            setSelectedAnswers(prevState => {
                                                if (prevState.includes(answer.id)) {
                                                    return prevState.filter(id => id !== answer.id);
                                                } else {
                                                    return [...prevState, answer.id];
                                                }
                                            });
                                        }}
                                    />
                                    {answer.optionText}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleCheckAnswers}>Check Answers</button>
                </div>
            )}
        </div>
    );
};
