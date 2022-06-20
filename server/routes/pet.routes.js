const PetController = require("../controllers/pet.controller")

module.exports = app => {
    app.get("/api/pets", PetController.getAllPets);
    app.put("/api/pets/:id", PetController.updateOnePet);
    app.post("/api/pets", PetController.createPet);
    app.patch("/api/pets/:id", PetController.updateOnePet);
    app.get("/api/pets/:id", PetController.getOnePet);
    app.delete("/api/pets/:id", PetController.deleteOnePet);
    
}