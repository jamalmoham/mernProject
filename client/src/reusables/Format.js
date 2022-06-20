import React, {useState} from 'react';
import {Link} from 'react-router-dom'


function Format (props) {
    const {submitForm, initialName, initialPetType, initialDescription, initialSkills1,initialSkills2,initialSkills3} = props
    const [name, setName] = useState(initialName);
    const [petType, setPetType] = useState(initialPetType);
    const [description, setDescription] = useState(initialDescription);
    const [skills1, setSkills1] = useState(initialSkills1);
    const [skills2, setSkills2] = useState(initialSkills2);
    const [skills3, setSkills3] = useState(initialSkills3);


    return(
        <div className='card mx-auto col-6 p-5  shadow p-3 mb-5 bg-white rounded'>
            <form onSubmit={(e) => submitForm(e, {name, petType, description, skills1,skills2,skills3})}>
                <div className=''>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input type="text" className="form-control" name='name' value={name} onChange={(e) =>{setName(e.target.value)}}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='petType'>Pet Type</label>
                        <input type="text" className="form-control" name='petType' value={petType} onChange={(e) =>{setPetType(e.target.value)}}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>Description</label>
                        <input type="text" className="form-control" name='description' value={description} onChange={(e) =>{setDescription(e.target.value)}}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='skills'>Skills 1</label>
                        <input type="text" className="form-control" name='skills' value={skills1} onChange={(e) =>{setSkills1(e.target.value)}}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='skills'>Skills 2</label>
                        <input type="text" className="form-control" name='skills' value={skills2} onChange={(e) =>{setSkills2(e.target.value)}}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='skills'>Skills 3</label>
                        <input type="text" className="form-control" name='skills' value={skills3} onChange={(e) =>{setSkills3(e.target.value)}}/>
                    </div>
                    <Link to={"/"} className="btn btn-danger btn-sm m-1 ">Cancel</Link>
                    <button className='btn btn-sm btn-info m-1 '>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Format;