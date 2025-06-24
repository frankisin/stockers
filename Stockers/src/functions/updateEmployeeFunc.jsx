import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Cancel } from './browseRouter.jsx';

import React, { useState } from 'react';
import EmployeeService from "../services/EmployeeService.js";

//The parameter we're accepting is an employee id...
export default function UpdateEmployeeComponent(props) {

    const navigate = useNavigate();
    const location = useLocation();

    const firstName = location.state.first_name;
    const lastName = location.state.last_name;
    const email= location.state.email;

    //const [value_id, setValue_id] = useState(location.state.id);
    const [value_firstname, setValue_first] = useState(firstName);
    const [value_lastname, setValue_last] = useState(lastName);
    const [value_emailId, setValue_email] = useState(email);

    const handleFirstChange = (event) => {
        setValue_first(event.target.value);
    };
    const handleLastChange = (event) => {
        setValue_last(event.target.value);
    };
    const handleEmailChange = (event) => {
        setValue_email(event.target.value);
    };

    //Function for when we hit submit...
    function OnSubmit() {
        if (value_firstname !== '' && value_lastname !== '' && value_emailId !== '') {
            let employee = { id: location.state.id, first_name: value_firstname, last_name: value_lastname, email: value_emailId, gender:location.state.gender,ip_address:location.state.ip_address, password: location.state.password,first_address:location.state.first_address,second_address: location.state.second_address, city:location.state.city, state:location.state.state, zip:location.state.zip}
            
            EmployeeService.updateEmployee(employee);

            console.log('Object sent=> ' + JSON.stringify(employee));

            navigate("/employee")
        }
    }

    return (
        <div className='addEmployeeContainer'>
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6">
                            <div className="card bg-white">
                                <div className="card-body p-5">
                                    <form className="mb-3 mt-md-4">

                                        <h2 className="fw-bold mb-2 text-uppercase ">Update User Credentials</h2>
                                        <p className=" mb-5">Change a user's credentials.</p>
                                        <div className="mb-3">
                                            <label className="form-label ">First Name</label>
                                            <input type="firstName" className="form-control" id="firstName" placeholder={firstName}
                                                name='firstName' value={value_firstname} onChange={handleFirstChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label ">Last Name</label>
                                            <input type="lastName" className="form-control" id="lastName" placeholder={lastName}
                                                name='lastName' value={value_lastname} onChange={handleLastChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label ">Email</label>
                                            <input type="email" className="form-control" id="emailId" placeholder={email}
                                                name='email' value={value_emailId} onChange={handleEmailChange} />
                                        </div>
                                        <div className="d-grid">
                                            <button className="btn btn-outline-dark" type="submit" onClick={() => OnSubmit()}>Update User</button>
                                        </div>
                                        <div className='d-grid'>
                                            <Cancel></Cancel>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export const Delete = (param) => {

    const onDelete = e => {
        e.preventDefault()

        EmployeeService.deleteEmployee(param.user)

        window.location.reload(true);
    }

    return (
        <button className="btn btn-outline-dark" type="submit" onClick={onDelete}>Delete</button>
    )
}
