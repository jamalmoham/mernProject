import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import io from 'socket.io-client';



function AllPets () {
    const [pets, setPets] = useState([]);
    const [socket] = useState(() => io(':8000'))

    useEffect(() => {
        axios.get("http://localhost:8000/api/pets")
        .then((res) => {
            setPets(res.data.pets);
            console.log(res)
        })
        .catch((err) => console.log("something went wrong in API request", err))

        socket.on('connection', (socket) => {
            console.log(socket.id)
        })

        // socket.on('likes', (data) => {
        //     console.log('recieved:', data)
        // })

        socket.on('update', (data) => {
            axios.get("http://localhost:8000/api/pets")
            .then((res) => {
                setPets(res.data.pets);
                console.log(res)
            })
        })

        socket.on('newpet', (data) => {
                axios.get("http://localhost:8000/api/pets")
                .then((res) => {
                    setPets(res.data.pets);
                    console.log(res)
                })
        })

    }, [socket])


    // const DeletePet = (petId) =>{
    //     axios.delete(`http://localhost:8000/api/pets/${petId}`)
    //     .then((res) => {
    //         console.log(res);
    //         socket.emit('update', res)
    //     })
    //     .catch((err) => {console.log("something went wrong with API request", err)})
        
    //     setPets(pets.filter((pet) => pet._id !== petId))
    // } 


    return(
        <div>
            <div>
                <div className='container-fluid'>
                    <h1 className='navbar-brand'>Pet Shelter</h1>
                    <Link to={"/new"} className="btn btn-sm btn-primary">Add New Pet</Link>
                </div>
            </div>
            <div className="col-8 mx-auto">
                <h3>These pets are looking for a good home</h3>
                <table  className="table table-hover table-bordered table-striped ">
                    <thead>
                        <tr>
                                <th>Pets</th>
                                <th>Type</th>
                                <th>Actions</th>
                        </tr>    
                        </thead>
                    <tbody>
                            
                        {
                            pets.map((pet, i) => (
                            <tr key={pet._id}>
                                <td>{pet.name}</td>
                                <td>{pet.petType}</td>
                                <td>
                                    <span> <Link to={`/viewPet/${pet._id}`} className="btn btn-sm btn-info">Details</Link></span>
                                    <span> <Link to={`/editPet/${pet._id}`} className="btn btn-sm btn-warning">Edit</Link></span>
                                    {/* <span>  <button onClick={(e) => DeletePet(pet._id)} className="btn btn-sm btn-success">Adopt</button> </span> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllPets;