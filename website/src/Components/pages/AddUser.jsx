import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export const AddUser =() =>{
    let navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        birthdate: "",
        age: "",
        email: "",
        address: {
            city: "",
            country: "",
        },
    });

    const { firstName, lastName, birthdate, age, email, city, country } = user;

    // const onInputChange = (e) => {
    //     setUser({ ...user, [e.target.name]: e.target.value });
    // };

    const onInputChange = (e) => {
        // If the input field name starts with "address."
        if (e.target.name.startsWith("address.")) {
            // Extract the nested property key
            const addressKey = e.target.name.split(".")[1];

            // Update the state with the nested property
            setUser((prevUser) => ({
                ...prevUser,
                address: {
                    ...prevUser.address,
                    [addressKey]: e.target.value,
                },
            }));
        } else {
            // If it's a non-nested property, update the state directly
            setUser((prevUser) => ({
                ...prevUser,
                [e.target.name]: e.target.value,
            }));
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/addUser", user);
        navigate("/");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Add User</h2>
                   
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Firstname" className="form-label">  Firstname  </label>
                            <input type={"text"} className="form-control" placeholder="Enter your firstname"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="LastName" className="form-label"> Lastname  </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your birthdate"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="Birthdate" className="form-label"> Birthdate  </label>
                            <input
                                type={"date"}
                                className="form-control"
                                placeholder="Enter your birthdate"
                                name="birthdate"
                                value={birthdate}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Age" className="form-label"> Age  </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your age"
                                name="age"
                                value={age}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label"> E-mail </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your e-mail address"
                                name="email"
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="City" className="form-label"> City  </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter the city"
                                name="address.city"
                                value={city}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Country" className="form-label"> Country  </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter the country"
                                name="address.country"
                                value={country}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}