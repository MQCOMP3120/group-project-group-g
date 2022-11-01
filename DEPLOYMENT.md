# Deployment

- Clone project to local machine with HTTPS URL, [https://github.com/MQCOMP3120/group-project-group-g.git].

- `.env` file settings.

In practice, we found that 90% of deployment problems are related to manually setting `.env`. So we removed `.env` from `.gitignore`.
Users can directly use the `.env` file attached to the directory, thus skipping the two steps of env file and database data initialization.
`MONGODB_URL` is a settable variable used to connect to MongoDB. Modify the `MONGODB_URL` in `.env` if you want to use your database.
The `PORT` variable is the port on which the background server is running

- `npm install`

The software dependencies will be downloaded into the project's `node_modules` folder according to package.json.

- `npm run devserver`

The backend server will run on port `8102` and in the development environment. Since `Nodemon` is enabled in the development environment, all source code changes will be reflected on save.

- `npm run start`

this runs the front-end react application in [localhost:3000].
The pages will reload if you make a change to the source code.

- Database data initialization

You need to add a database initialization operation if you use a new database link.
Open [http://localhost:3000/devhome], and register a new account. After the registration is complete, switch to the stage page according to the prompt, and press the three buttons of `Del All,` `Init Brands,` and `Init Products,` in turn. The page will automatically refresh to display the data from the database.