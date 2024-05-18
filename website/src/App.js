import React,{useState} from 'react';
import { Homepage } from './Components/Homepage/Homepage';
import { Rcourses } from './Components/recommandescourse/Rcourses';
import './App.css';
import { Glogin } from './Components/GamifiedLogin/Glogin';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { FormStepper } from './Components/GamifiedSingup/FormStepper';
import { Home } from './Components/AdminDashboard/Home';
import { UserCourses } from './Components/UserCourses/UserCourses';
import { CourseDetails } from './Components/CourseDetails/CourseDetails';
import { UserInfo } from './Components/UserInfoComponent/UserInfo';
import { Dashboard } from './Components/Specialist/specialistdashboard/Dashboard';
import { AjouterCours } from './Components/Specialist/AjouterCours/AjouterCours';
import { AjouterLesson } from './Components/Specialist/AjouterCours/AjouterLesson';
import { EditCourse } from './Components/Specialist/Edit/EditCourse';
import { LessonDetails } from './Components/LessonDetails/LessonDetails';
import { Quizz } from './Components/Quizz/Quizz';




function App() {
  const [step, setStep] = useState(1); // Start with step 1

  // Handle step change
  const handleStep = (step) => {
    setStep(step);
  };

  return (
  
    <Router>
      <div >
        <Routes>
          <Route path='/' exact element={<Homepage />} />
          <Route path='/Rcourses/:access_token' element={<Rcourses />} />
          <Route path='/Courses' element={<UserCourses />} />
          <Route path='/admin' element={<Home />} />
          <Route path='/Singup' element={<FormStepper onStepChange={handleStep} step={step} />} />
          <Route path='/login' element={<Glogin />} />
          <Route path='/course/:id' element={<CourseDetails />} />
          <Route path='/:access_token/course/:id' element={<CourseDetails />} />
          <Route path='/profile' element={<UserInfo />} />
          <Route path='/Specialist' element={<Dashboard/>} />
          <Route path='/addCourse'  element={<AjouterCours />} />
         <Route path='/addLesson/:id'  element={<AjouterLesson />} />
         <Route path='/edit/:id'  element={<EditCourse />} />
         <Route path='/:access_token/course/:id/lesson/:lessonId' element={<LessonDetails  />} />
         <Route path='/:access_token/course/:id/lesson/:lessonId/Quizz' element={<Quizz />} />
         {/* <Route path='/addContent' element={<AddContent />} /> */}
        
        </Routes>
      </div>
    </Router>


  );
}

export default App;
