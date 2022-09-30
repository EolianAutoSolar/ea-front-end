# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Test data (without Redux)

While we aren't using Redux yet, we can still use socket.io to send random data to the views. This is a good way to test the views without having to write a lot of code.

From the root of the project, run the following command to start with nodemon:

```npm run test_server```

Or to start only with node from src/services/test:

```node index.js```

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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
