const Pet = require("../models/pet.model");

module.exports.getAllPets = (req, res) => {
    Pet.find()
    .then((allPets) => {
        res.json({pets : allPets});
        console.log("Running mongoose Query Find()", allPets)
})
    .catch((err) => {res.json({message: "something went wrong running Query find()", error:err})})
};

module.exports.createPet = (req, res) => {
    Pet.create(req.body)
    .then((newPet) => {
        res.json({pet:newPet});
        console.log("Running mongoose Query create()", newPet)
})
    .catch((err) => {res.status(400).json({message: "something went wrong running Query create()", error:err})})
};

module.exports.getOnePet = (req, res) => {
    Pet.findOne({_id: req.params.id})
    .then((onePet) => {
        res.json({pet: onePet});
        console.log("Running mongoose Query findOne()", onePet)
    })
    .catch((err) => {res.json({message:"something went wrong running the Query findOne()", error : err})})
};

module.exports.updateOnePet = (req, res) =>{
    Pet.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators:true})
    .then((upated) => {
        res.json({pet : upated});
        console.log("Running mongoose Query findOneAndUpdate()", upated)
    })
    .catch((err) => {res.status(400).json({message:"something went wrong running the Query findOneAndUpdate()", error : err})})
};

module.exports.deleteOnePet = (req, res) => {
    Pet.deleteOne({_id: req.params.id})
    .then((results) => { 
        res.json({results:results});
        console.log("Running mongoose Query deleteOne().", results)
    })
    .catch((err) => {res.json({message:"something went wrong running the Query deleteOne()", error : err})})
};