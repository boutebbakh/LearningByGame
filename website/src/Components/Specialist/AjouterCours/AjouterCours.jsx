import React, { useState } from "react";
import axios from "axios";
import "./AjouterCours.css";
import { useNavigate } from "react-router-dom";
import { NavbarS } from "../SpecialistNavbar/NavbarS";

export const AjouterCours = ({ onNext }) => {
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [teacherLastname, setTeacherLastname] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true); // State variable to track button disabled state
  const navigate = useNavigate();

  // Function to check if all input fields are filled
  const isFormFilled = () => {
    return (
      photo !== null &&
      title.trim() !== "" &&
      description.trim() !== "" &&
      level.trim() !== "" &&
      teacherName.trim() !== "" &&
      teacherLastname.trim() !== ""
    );
  };

  // Function to handle changes in input fields and update button disabled state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "photo":
        setPhoto(e.target.files[0]);
        break;
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "level":
        setLevel(value);
        break;
      case "teacherName":
        setTeacherName(value);
        break;
      case "teacherLastname":
        setTeacherLastname(value);
        break;
      default:
        break;
    }
    // Update button disabled state based on form filled status
    setButtonDisabled(!isFormFilled());
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("photo", photo);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("level", level);
      formData.append("teacherName", teacherName);
      formData.append("teacherLastname", teacherLastname);

      const response = await axios.post(
        "http://localhost:8080/api/v1/specialist/addCourse",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Course added successfully. ID:", response.data);
      // Handle success - maybe show a success message to the user
      navigate(`/addLesson/${response.data}`);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <div className="r-container">
      <NavbarS />
      <div className="specialist-addCourse">
        <form className="form" onSubmit={handleSubmit}>
          <label className="upload-label">
            Upload Photo
            <input
              type="file"
              className="file-input"
              name="photo"
              onChange={handleInputChange}
            />
          </label>
          <input
            className="input-text"
            type="text"
            name="title"
            value={title}
            onChange={handleInputChange}
            placeholder="Title"
          />
          <textarea
            className="input-text"
            name="description"
            value={description}
            onChange={handleInputChange}
            placeholder="Description"
          />
          <select
            className="select"
            name="level"
            value={level}
            onChange={handleInputChange}
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <input
            className="input-text"
            type="text"
            name="teacherName"
            value={teacherName}
            onChange={handleInputChange}
            placeholder="Teacher Name"
          />
          <input
            className="input-text"
            type="text"
            name="teacherLastname"
            value={teacherLastname}
            onChange={handleInputChange}
            placeholder="Teacher Lastname"
          />
          <button className="button" type="submit" disabled={buttonDisabled}>
            Next
          </button>
        </form>
      </div>
    </div>
  );
};
