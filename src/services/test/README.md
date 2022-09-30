# Test data (without Redux)

While we aren't using Redux yet, we can still use socket.io to send random data to the views. This is a good way to test the views without having to write a lot of code.

From the root of the project, run the following command:

```npm run test_server```

This will start a socket.io server on port 4000. The server will send a random number every 2 seconds. The number will be between 0 and 100.

Also have to import the sockets function in our component (from the component folder):

```import { startSocket, closeSocket } from '../services/test/Sockets';```

Then we can add a useEffect hook and a useState hook to our component to listen for the data using the functions:

```const [mesg, setMesg] = useState('');```

```useEffect(() => { startSocket(setMesg);```

```return () => {closeSocket(); }; }, []);```

With this now we have a socket.io server running and a random number being sent to the component. We can now use the number to display in the component or do some logic.

```<p>{mesg}</p>```

**Note: If you want to change the way the data is sent, you can change the code in the index.js file.**
