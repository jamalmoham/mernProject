import React, {useState} from "react";
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import Format from "../reusables/Format";
import io from 'socket.io-client';


function NewPet () {
    const [errors, setErrors] = useState([])
    const [socket] = useState(() => io(':8000'))


    const navigate = useNavigate()
    const submitForm = (e, data) =>{
        e.preventDefault();
        
        axios.post("http://localhost:8000/api/pets", data)
        .then((res) => {
            console.log(res);
            navigate("/")
        })
        .catch((err) => {
            console.log("something went wrong with API request", err);
            // console.log(err.reponse.data.err.errors)
            setErrors(err.response.data.error.errors)
        }
        )

        socket.emit('newpet', data)

}
    return(
        <div>
            <div className=''>
                <div className='container-fluid'>
                    <h1 className='navbar-brand'>Pet Shelter</h1>
                    <Link to={"/"} className="btn btn-primary btn-sm">Home</Link>
                </div>
            </div>
            <div>
                {errors.name && <p className="text-danger">{errors.name.message}</p>}
                {errors.petType && <p className="text-danger">{errors.petType.message}</p>}
                {errors.description && <p className="text-danger">{errors.description.message}</p>}
                <h4>Know a pet needing a home?</h4>
                <Format  
                submitForm = {submitForm}
                initialName = ''
                initialPeType = ''
                initialDescription = ''
                initialSkills1 = ''
                initialSkills2 = ''
                initialSkills3 = ''

                />
            </div>
        </div>
    );
}

export default NewPet;