import React from "react";
import { useForm } from "react-hook-form";
import './formInpurt.css'
export const  FormInput=({ data, setData }) =>{

  const onSubmit = async (formData) => {
    const newData = {  ...formData,...data };
    console.log(newData);
    const response = await fetch(
      "http://localhost:8080/api/v1/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      }
    );

    if (response.ok) {
      // handle successful authentication
      console.log("User registred");
      
      // const userData = await response.json();
      // {userData === 'admin' }
      // {userRole === 'student' && <StudentDashboard />}
      // {userRole === 'teacher' && <TeacherDashboard />}
      // {userRole === 'specialist' && <SpecialistDashboard />}
    } else {
      // handle authentication failure
      console.log(newData);
    }
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  // const onSubmit = (formData) => {
  //   const newData = { ...data, ...formData };
  //   console.log(newData);
  // };
 return (
    <div >
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <div className="password-login">
          
        <div>
          
          <input
            placeholder="Enter your firstname"
            {...register("firstname", { required: true })}
          />
          <error>
            {errors.firstname?.type === "required" && "Firstname is required"}
          </error>
        </div>
        <div>
          
          <input
            placeholder="Enter your Lastname"
            {...register("lastname", { required: true })}
          />
          <error>
            {errors.lastname?.type === "required" && "Lastname is required"}
          </error>
        </div>
        <div>
        
          <input
            placeholder="Enter your professionel email"
            {...register("gmail", {
              required: true,
              pattern: /^[a-z]+\.[a-z]+@[a-z]+-[a-z0-9]+\.[a-z]+$/i,
            })}
          />
          <error>
            {errors.gmail?.type === "required" && "Email is required"}
            {errors.gmail?.type === "pattern" &&
              "Entered email is in wrong format"}
          </error>
        </div>
        <div>
         
          <input
            placeholder="Enter password"
            {...register("password", {
              required: true,
              minLength: 5,
              maxLength: 20,
              pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            })}
          />
          <error>
          {errors.password?.type === "required" && "password is required"}
            {errors.password?.type === "minLength" &&
              "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!"}
            {errors.password?.type === "maxLength" &&
              "Entered password is more than 20 characters"}
          </error>
        </div>
        <div>
          <input className="btn--outline" type="submit" />
        </div>
        </div>
      </form>
    </div>
  );
}