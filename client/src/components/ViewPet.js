import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import io from 'socket.io-client';


function ViewPet() {
    const {id} = useParams()
    const [pet, setPet] = useState({});
    const [socket] = useState(() => io(':8000'))
    // const [numLikes, setNumLikes] = useState(0);

    useEffect ( () => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
        .then((res) => {
            setPet(res.data.pet)
            })
        .catch((err) => {console.log("something went wrong in api request", err)})
    
    }, [id,socket]
    
    )

    const navigate = useNavigate()

    const DeletePet = () => {
        axios.delete(`http://localhost:8000/api/pets/${id}`)
        .then((res) => {
            console.log(res);
            navigate('/')
            socket.emit('update', res)
        })
        .catch((err) => {console.log("something went wrong with API request", err)})
    }

    const likePet = () => {

        document.getElementById('lik').disabled = true

        axios.patch(`http://localhost:8000/api/pets/${id}`, {likes : pet.likes + 1})
        .then((res) => {
            console.log(res);
            setPet(res.data.pet)
        })
        .catch((err) => {console.log("something went wrong with API request", err)})

        // const n = numLikes + 1;
        // setNumLikes(n)
        // console.log('num likes: ', numLikes)


    }

    return(
        <div>
            <div className='navbar, navbar-inverse bg-dark text-white'>
                <div className='container-fluid'>
                    <h1 className='navbar-brand'>Pets Shelter</h1>
                    <Link to={"/"} className="btn btn-sm btn-primary">Home</Link>
                    {/* <Link to={"/"} className="btn btn-sm btn-warning"></Link> */}
                </div>
            </div>

            <div className="m-2">
                <h3 className="card-header "> Details about: {pet.name}
                    <span > <button onClick={(e) => DeletePet(pet._id)} className="btn btn-sm btn-danger ">Adopt {pet.name}</button></span>
                </h3>
                
                <div className="card col-6 mx-auto p-3 shadow-lg mb-5 bg-white rounded border border-dark">
                    
                    <p><strong>Name: </strong>{pet.name}</p>
                    <p><strong>Pet Type: </strong>{pet.petType}</p>
                    <p><strong>Description: </strong>{pet.description}</p>
                    
                    <div className="d-flex mx-auto"><strong>Skills:</strong>
                        <div>
                            <p>{pet.skills1 }</p>
                            <p>{pet.skills2 }</p>
                            <p>{pet.skills3 }</p>
                        </div>
                    </div>
                    <div>
                          {/* <Link to={`/editPet/${pet._id}`} className="btn btn-sm btn-warning">Update Pet Info</Link> */}
                    <span><button onClick={(e) => likePet(pet._id)} className="btn btn-sm btn-primary" id="lik">Like {pet.name}</button> </span>
                    <span> {pet.likes} like(s)</span>
                    </div>
                
                </div>
            </div>
        </div>
    );

}

export default ViewPet