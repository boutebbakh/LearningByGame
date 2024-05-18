import React from "react";
import "./Glogin.css";
import { useForm } from "react-hook-form";

import { useNavigate} from 'react-router-dom';

export const Glogin = () => {
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const onSubmit = async (data) => {
    const response = await fetch(
      "http://localhost:8080/api/v1/auth/authenticate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      // handle successful authentication
      
      const responseData = await response.json();
      console.log("access Token:", responseData.access_token);

      switch(responseData.role){
        case 'STUDENT':
      navigate(`/Rcourses/${responseData.access_token}`);
      break;
        case 'TEACHER':

      navigate(`/${responseData.access_token}/Specialist`); 
      break;
        case 'ADMIN':

      navigate(`/Rcourses/${responseData.access_token}`);
      break;
      case 'SPECIALIST':
      navigate(`/Rcourses/${responseData.access_token}`);
      break;

      default:
        console.log("User authentication failed");
      }
    }else{
      console.log("User authentication failed");
    }
  };

  return (
    <div className="log-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="password-login">
          <div>
            <input
              placeholder="Enter your professional gmail"
              {...register("gmail", {
                required: true,
                pattern: /^[a-z]+\.[a-z]+@[a-z]+-[a-z0-9]+\.[a-z]+$/i,
              })}
            />
            {errors.gmail && errors.gmail.type === "required" && (
              <p className="error">Email is required</p>
            )}
            {errors.gmail && errors.gmail.type === "pattern" && (
              <p className="error">Entered email is in the wrong format</p>
            )}
          </div>
          <div>
            <input
              placeholder="Enter password"
              type="password"
              {...register("password", {
                required: true,
                minLength: 8,
                maxLength: 20,
                pattern:
                  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
              })}
            />
            {errors.password && errors.password.type === "required" && (
              <p className="error">Password is required</p>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <p className="error">
                Password should be at least 8 characters long
              </p>
            )}
            {errors.password && errors.password.type === "maxLength" && (
              <p className="error">Password should not exceed 20 characters</p>
            )}
            {errors.password && errors.password.type === "pattern" && (
              <p className="error">
                Password should include at least 1 letter, 1 number, and 1
                special character
              </p>
            )}
          </div>
          <input className="btn--outline" type="submit" />
        </div>
      </form>
      
      {/* Links */}
      <div className="links">
        <p>
          Don't have an account? <a href="/Singup">Create an account</a>
        </p>
        <p>
          <a href="/reset-password">Reset your password</a>
        </p>
      </div>
      
    </div>
  );
};
