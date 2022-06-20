const  mongoose  = require("mongoose");

const PetSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            unique:true,
            index:true,
            required: [true, "Name fields cannot be empty"],
            minlength: [3, "Name must be at least 3 characters long"],
            // validate : [(name) => {    const counter = mongoose.models.Pets.countDocuments({name})
            //     console.log(counter)
            //     return !counter
            //     }, 'name already exists']
        },

        skills1: String,

        skills2:  String,
            
        skills3: String,

        likes: {
            type:Number,
            default:0
        },

        petType: {
            type: String,
            required: [true, "Pet Type fields cannot be empty"],
            minlength: [3, "Pet Type must be at least 3 characters long"]
        },

        description: {
            type:String,
            required: [true, "Description fields cannot be empty"],
            minlength: [3, "Description must be at least 3 characters long"]
        }
    
    },
    {timestamps:true}
);



// PetSchema.path('name').validate((name) =>{
//     const counter = mongoose.models.Pets.countDocuments({name})
//     console.log(counter)
    
    
// }, 'name already exists')




// PetSchema.path('skills').validate(() => {
//     const skills = mongoose.models.Pets
//     console.log("skills:", skills)
    
// }, 'cannot have more than 3 skills')

const Pet = mongoose.model('Pets', PetSchema);
module.exports = Pet;