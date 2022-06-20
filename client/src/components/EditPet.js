import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate, useParams, Link} from "react-router-dom"
import Format from "../reusables/Format";


function EditPet () {
    const [pet, setPet] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState([])


    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
        .then((res) => {
            console.log(res);
            setPet(res.data.pet);
            setLoaded(true)
        })
    }, [id])

    const submitForm = (e, data) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/pets/${id}`, data)
        .then((res) => {
            console.log(res);
            navigate('/')
        })
        .catch((err) => {
            console.log("something went wrong with API request", err);
            // console.log(err.reponse.data.err.errors)
            setErrors(err.response.data.error.errors);
        })
    }

    return(
        <div>
            <div className='navbar, navbar-inverse bg-dark text-white'>
                <div className='container-fluid'>
                    <h1 className='navbar-brand'>Pet Shelter</h1>
                    <Link to={"/"} className="btn btn-sm btn-primary">Home</Link>
                </div>
            </div>

            <div>  
                
                {errors.name && <p className="">{errors.name.message}</p>}
                {errors.petType && <p className="">{errors.petType.message}</p>}
                {errors.description && <p className="">{errors.description.message}</p>}
                
                <h4>Edit {pet.name}</h4>
                {
                    loaded &&
                
                <Format 
                submitForm={submitForm}
                initialName = {pet.name}
                initialPetType = {pet.petType}
                initialDescription = {pet.description}
                initialSkills1 = {pet.skills1}
                initialSkills2 = {pet.skills2}
                initialSkills3 = {pet.skills3}
                
                />
                }
            </div>
        </div>
    );
};

export default EditPet;