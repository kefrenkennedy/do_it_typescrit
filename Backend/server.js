// Import required packages
const cors = require('cors');
const jsonServer = require('json-server');
const auth = require('json-server-auth');

// Create a new json-server instance
const server = jsonServer.create();

// Create a new router instance and set it up to use db.json as its data source
const apiRouter = jsonServer.router('db.json');

// Set the port number to either the PORT environment variable or 3333 as the default
const serverPort = process.env.PORT || 3333;

// Set the db property of the server instance to the db property of the apiRouter instance
server.db = apiRouter.db;

// Set up authentication rewriter rules to create a separate namespace for users and tasks
const authRules = auth.rewriter({
  '/users*': '/600/users$1',
  '/tasks*': '/600/tasks$1',
});

// Use the cors middleware to handle CORS requests
server.use(cors());

// Use the authentication rewriter middleware to handle authentication rewriter rules
server.use(authRules);

// Use the auth middleware to handle authentication and authorization for the API
server.use(auth);

// Use the apiRouter middleware to handle API requests
server.use(apiRouter);

// Start the server and listen on the specified port
server.listen(serverPort, () => {
  console.log(`Server is running on port: ${serverPort}`);
});
