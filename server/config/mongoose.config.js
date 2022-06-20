const mongoose = require("mongoose");
const db = "Exams"


mongoose.connect(`mongodb://localhost/${db}`, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => {console.log(`Connection to ${db} Database was succesful.`)})
.catch((err) => {console.log(`Something went wrong in the conection to ${db} Database`)})
