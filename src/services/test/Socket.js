import io from 'socket.io-client';

//Connect to the server only once
const socket = io('http://localhost:4000');

//Define two functions to simplify the implementation of the test event in the components
function startSocket(func) {
    socket.on("test", (data) => {
        func(data)
    });

}

function closeSocket() {
    socket.off("test");
}

//Export the functions
export {startSocket, closeSocket}