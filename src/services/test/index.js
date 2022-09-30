//We included the modules we need
const app = require('express')(); // Servidor
const server = require('http').createServer(app); // Servidor;
//We create a socket.io instance
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
});


const port = process.env.PORT || 4000 // Port of the server
console.log("Starting server...");


//We create the connection event
io.on('connection', (socket) => {
    console.log("Connected to " + socket.id);
    start_test(socket);
});

//We start the server
server.listen(port, () => { // A lambda that log a confirmation
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

//This is the function that implement the logic that send the data
function start_test(socket){
    //We create a function that will send a random number every 2 seconds
        setTimeout(() => {
            socket.emit('test', Math.ceil(Math.random(0,100)*100));
            start_test(socket);
        }, 2000);
}