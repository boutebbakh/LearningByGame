import React, { useState } from "react";
import { FormStepperHeader } from "./FormStepperHeader";
import "./Formstepper.css";
import { Gbutton } from "../Gbutton/Gbutton";
import { FormInput } from "./FormInput";

export const FormStepper = ({ onStepChange, step }) => {
  // State variable to track whether the level has been selected
  const [levelSelected, setLevelSelected] = useState(false);

  const [data, setData] = useState({
    level: "",
    tcourses: [],
    recomendedcourses: [],
    role: "",
  });

 

  // // Handle role selection
  const handleRoleSelection = (role) => {
    const _tempObject = { ...data, role };
    setData(_tempObject);
    onStepChange(2);
  };

  // // Handle checkbox change for student's topic selection
  const handleTopicChange = (e) => {
    const selectedTopic = e.target.value;
    const newtcourses = data.tcourses.includes(selectedTopic)
      ? data.tcourses.filter((topic) => topic !== selectedTopic)
      : [...data.tcourses, selectedTopic];

    const _tempObject = { ...data, tcourses: newtcourses };
    setData(_tempObject);
  };
  const handleSelectedLevel = (e) => {
    const selectedLevel = e.target.value;
    setData({ ...data, level: selectedLevel });
    setLevelSelected(true);
  };

  const handlerecomendedcoursesChange = (e) => {
    const selectedcourse = e.target.value;
    const newtcourses = data.recomendedcourses.includes(selectedcourse)
      ? data.recomendedcourses.filter((topic) => topic !== selectedcourse)
      : [...data.recomendedcourses, selectedcourse];

    const _tempObject = { ...data, recomendedcourses: newtcourses };
    setData(_tempObject);
  };
  const handleNextClick = () => {
    if (step === 3 && data.role === "STUDENT" && !levelSelected) {
      alert("Please select a level.");
      
      return;
    }
    onStepChange(step + 1);
  };

  return (
    <div className="form-stepper">
      <FormStepperHeader step={step} />

      <div className="form-stepper__body">
        {/* Basic info form i.e step 1 */}
        {step === 1 && (
          <div className="form-stepper__step1">
            <h1>Which describes you best? </h1>
            <div className="input-group check-group">
              <input
                type="checkbox"
                id="TEACHER"
                name="role"
                value="TEACHER"
                checked={data.role === "TEACHER"}
                onChange={() => handleRoleSelection("TEACHER")}
                className="styled-checkbox visually-hidden"
              />
              <label htmlFor="TEACHER" className="styled-label">
                Teacher
              </label>
            </div>
            <div className="input-group check-group">
              <input
                type="checkbox"
                id="STUDENT"
                name="role"
                value="STUDENT"
                checked={data.role === "STUDENT"}
                onChange={() => handleRoleSelection("STUDENT")}
                className="styled-checkbox visually-hidden"
              />
              <label htmlFor="STUDENT" className="styled-label">
                Student
              </label>
            </div>
          </div>
        )}
        {step === 3 && data.role === "TEACHER" && (
          <div className="form-stepper__step2">
            <h2>GemiLearn Team</h2>
            <div className="input-group">
              <p>
                We are delighted to express our heartfelt gratitude to Professor
                for joining our team. Your expertise, dedication, and passion
                for courses are invaluable additions to our team. We look
                forward to collaborating with you and achieving great success
                together. Welcome aboard!
              </p>
            </div>
          </div>
        )}
        {/* Form based on role */}
        {step === 4 && data.role === "TEACHER" && (
          <div className="form-stepper__step2">
            <h2>Signup as Teacher</h2>
            <div className="input-group">
              <FormInput data={data} setData={setData} />
            </div>
          </div>
        )}

        {data.role === "STUDENT" && step === 2 && (
          <div className="form-stepper__step2">
            <h2>Which topic you want to explore?</h2>
            <div className="input-group check-group">
              <input
                type="radio"
                id="Java"
                name="Java"
                value="Java"
                checked={data.recomendedcourses.includes("Java")}
                onChange={handlerecomendedcoursesChange}
                className="styled-checkbox visually-hidden"
              />
              <label htmlFor="Java" className="styled-label">
              Java
              </label>
            </div>
            <div className="input-group check-group">
              <input
                type="radio"
                id="topic2"
                name="topic"
                value="Topic 2"
                checked={data.recomendedcourses.includes("Topic 2")}
                onChange={handlerecomendedcoursesChange}
                className="styled-checkbox visually-hidden"
              />
              <label htmlFor="topic2" className="styled-label">
                Topic 2
              </label>
            </div>
            <div className="input-group check-group">
              <input
                type="radio"
                id="topic3"
                name="topic"
                value="Topic 3"
                checked={data.recomendedcourses.includes("Topic 3")}
                onChange={handlerecomendedcoursesChange}
                className="styled-checkbox visually-hidden"
              />
              <label htmlFor="topic3" className="styled-label">
                Topic 3
              </label>
            </div>
          </div>
        )}
        {data.role === "STUDENT" && step === 3 && (
          <div className="form-stepper__step2">
            <h2>in Which level you are?</h2>
            <div className="input-group check-group">
              <input
                type="radio"
                id="license1"
                name="license"
                value="License 1"
                checked={data.level.includes("License 1")}
                onChange={handleSelectedLevel}
                className="styled-checkbox visually-hidden"
              />
              <label htmlFor="license1" className="styled-label">
                License 2
              </label>
            </div>
            <div className="input-group check-group">
              <input
                type="radio"
                id="license2"
                name="license"
                value="License 2"
                checked={data.level.includes("License 2")}
                onChange={handleSelectedLevel}
                className="styled-checkbox visually-hidden"
              />
              <label htmlFor="license2" className="styled-label">
                License 2
              </label>
            </div>
            <div className="input-group check-group">
              <input
                type="radio"
                id="license3"
                name="license"
                value="License 3"
                checked={data.level.includes("License 3")}
                onChange={handleSelectedLevel}
                className="styled-checkbox visually-hidden"
              />
              <label htmlFor="license3" className="styled-label">
                License 3
              </label>
            </div>
          </div>
        )}
        {data.role === "TEACHER" && step === 2 && (
          <div className="form-stepper__step2">
            <h2>Which courses you teach?</h2>
            <div className="input-group check-group">
              <input
                type="checkbox"
                id="Python"
                name="Python"
                value="Python"
                checked={data.tcourses.includes("Python")}
                onChange={handleTopicChange}
                className="styled-checkbox visually-hidden"
              />
              <label htmlFor="Python" className="styled-label">
                Python{" "}
              </label>
            </div>
            <div className="input-group check-group">
              <input
                type="checkbox"
                id="topic2"
                name="topic"
                value="Topic 2"
                checked={data.tcourses.includes("Topic 2")}
                onChange={handleTopicChange}
                className="styled-checkbox visually-hidden"
              />
              <label htmlFor="topic2" className="styled-label">
                Machinelearning
              </label>
            </div>
            <div className="input-group check-group">
              <input
                type="checkbox"
                id="topic3"
                name="topic"
                value="Topic 3"
                checked={data.tcourses.includes("Topic 3")}
                onChange={handleTopicChange}
                className="styled-checkbox visually-hidden"
              />
              <label htmlFor="topic3" className="styled-label">
                Topic 3
              </label>
            </div>
          </div>
        )}

        {data.role === "STUDENT" && step === 4 && (
          <div className="form-stepper__step3">
            <h2>Signup as Student</h2>
            <div className="input-group">
              <h1>Register</h1>

              <FormInput data={data} setData={setData} />
            </div>
          </div>
        )}

        <div className="form-stepper__action">
          {data.role && step < 4 ? (
            <Gbutton
              className="next-btn"
              buttonStyle="btn--outline"
              onClick={handleNextClick}
            >
              <i className="fa-solid fa-angles-right"></i>
            </Gbutton>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
