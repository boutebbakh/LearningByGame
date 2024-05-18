import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const  ViewUser=() =>{
   
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

    const { id } = useParams();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/getUser/${id}`);
        setUser(result.data);
    };

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/deleteUser/${id}`)
        navigate("/");
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">User {user.id} Details</h2>

                    <div className="card">
                        <div className="card-header">
                            
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Firstname: </b>
                                    {user.firstName}
                                </li>
                                <li className="list-group-item">
                                    <b>Lastname: </b>
                                    {user.lastName}
                                </li>
                                <li className="list-group-item">
                                    <b>Birthdate: </b>
                                    {user.birthdate}
                                </li>
                                <li className="list-group-item">
                                    <b>Age: </b>
                                    {user.age}
                                </li>
                                <li className="list-group-item">
                                    <b>Email: </b>
                                    {user.email}
                                </li>
                                <li className="list-group-item">
                                    <b>Address: </b>
                                    {user.address.city}, {user.address.country}
                                </li>
                                
                                    
                                
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to={`/edituser/${user.id}`}>
                        Edit User
                    </Link>
                    <button className='btn btn-danger mx-2'
                        onClick={() => deleteUser(user.id)}
                    >Delete</button>
                </div>
            </div>
        </div>
    );
}