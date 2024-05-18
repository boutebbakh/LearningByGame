import React ,{useState ,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { NavbarS } from '../SpecialistNavbar/NavbarS';
import axios from 'axios';

export const EditCourse = () => {
    const navigate=useNavigate();
    const {id}=useParams();
    const [course, setCourse] = useState({
        title: "",
        description: "",
        level: "",
        nbr_lessons: "",
        teacherName: "",
        teacherLastname: ""
    });
    const { title, description, level, nbr_lessons, teacherName, teacherLastname } = course;

    const onInputChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadCourse();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/api/v1/specialist/updateCourse/${id}`, course);
        navigate("/Specialist");
    };

    const loadCourse = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/specialist/Course/${id}`);
        setCourse(result.data);
    };


  return (
    <div className="r-container">
      <NavbarS />
      <div className="specialist-addCourse">
        <form className="form" onSubmit={onInputChange}>
          <input
            className="input-text"
            type="text"
            name="title"
            value={title}
            onChange={onInputChange}
            placeholder="Title"
          />
          <textarea
            className="input-text"
            name="description"
            value={description}
            onChange={onInputChange}
            placeholder="Description"
          />
          <select
            className="select"
            name="level"
            value={level}
            onChange={onInputChange}
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <input
            className="input-text"
            type="number"
            name="Nbr_lessons"
            value={nbr_lessons}
            onChange={onInputChange}
            placeholder="Number of Lessons"
          />
          <input
            className="input-text"
            type="text"
            name="teacherName"
            value={teacherName}
            onChange={onInputChange}
            placeholder="Teacher Name"
          />
          <input
            className="input-text"
            type="text"
            name="teacherLastname"
            value={teacherLastname}
            onChange={onInputChange}
            placeholder="Teacher Lastname"
          />
          <button className="button" type="submit" onClick={onSubmit}>
            save
          </button>
        </form>
      </div>
    </div>
  )
}
