const express = require("express");
const app = express();
const cors = require("cors")
const socket = require('socket.io')
const port = 8000;

app.use(cors());
app.use(express.json(), express.urlencoded({extended:true}))
require("./config/mongoose.config");
require("./routes/pet.routes")(app)

const server = app.listen(port, () => console.log(`Server is up and running on Port:${port}`));

const io = socket(server, {
    cors : {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        creentials: true
    }
})

io.on('connection', (socket) => {
    console.log('New User: ', socket.id)

    socket.on('newpet', (data) => {
        socket.broadcast.emit('newpet', data)
    })

    socket.on('update', (data) => {
        socket.broadcast.emit('update', data)
    })


    socket.on('disconnect', (socket) => {
        console.log("User: " + socket.id + " disconnected")
    })
}
)