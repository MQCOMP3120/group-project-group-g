# Project Breakdown

The entire project is divided into two parts: front-end and back-end, which exchange data through API communication, and CORS components to achieve cross-domain resource sharing.
- The back-end uses the Express framework, which processes and transforms the data received from the front-end, and queries and writes to MongoDB. The results are then returned to the front-end.
- The front-end uses the Redux Toolkit, which simplifies global store configuration and asynchronous Redux network flow, and creates actions and reducers more streamlined by abstracting the Redux API as much as possible.
- About the definition and description of the API, we will explain it in detail in the `doc/API.txt` file separately.
- The server uses two optional authentication methods, single-site authentication, and Auth0. All API requests require user encryption tokens, except for APIs that public query information such as products.
- Because in the development process, the data structure will be continuously adjusted according to the new requirements put forward by customers and the problems found in the development. After each data structure modification, we have to reload the data.
We have written a development tool for database initialization, loading the JSON file in the front-end. Clearing and loading data to the back-end through the API so that we can test the back-end function and solve the problem that every time data is generated, the object ID of the link between tables will change. During the development process, we can read all the data of MongoDB and compare it with the input without accessing the MongoDB portal.
- `.env` file for authenticating to the MongoDB database, and working port for the back-end server
- The front-end uses boostrap and styled-components to make the styling more efficient and organized  
- The front-end uses Toastify for pop up notifications
- React router v6 is resiponsible for the front-end page navigations
- The front-end imports all icons from React-icons library
- Stripe payment form was replaced with a prebuild boostrap form due to tight timefrme. To incoporate with Stripe we will need to modify both the front-end and the back-end including some data structures, and consider that there are other essential tasks to do before the deadline (e.g., delopyment and documentations) we have decided to not include Stripe in our application.   

## API
- `doc/API.txt`: API definition and example description.
- `doc/API.postman_collection.json`: Use Postman to test the backend alone. Postman's settings file.

## DB intial utility
- `src/services/axioserver.js`: Axios to each API.
- `src/services/sample.json`: initial product data for testing and setup purposes.
- `src/services/devhomepage.js`: the utility needs a user and password to access the database.
- `src/services/stage.js`: the front-end page can load `sample.json` to MongoDB via back-end API. Fetch and list all information on the page.

## Backend
- `.env` is used to authenticate against the MongoDB database and the working port of the backend server.
- `server/src/models/index.js`: schema of the data table.
- `server/src/controllers`: This is where all API routers are controlled and is used to handle specific operations of each API router, such as GET, POST, PUT, DELETE, etc.
- `server/src/app.js`: set up express, cors, API router, and middleware.
- `server/src/routes.js`: Assign each specific sub-API router to the corresponding processing function in controllers.


## Frontend
- `src/assets/logo.jpg`: This is the logo of this online shop.
- `src/components`: They are the components in pages. `CartButton`, `DropDownSearchBar`, `Hero`, `NavBar`, `Pagination`, `PaymentForm`, `ProductCard`, `SerchModal`.
- `src/features`: `cartSlice`, `searchSlice`, `filterSlice`, `authSlice`, `wishlistSlice`. Each file corresponds to a Redux Toolkit slice. They will handle the state of the Redux and Redux network flow.
- `src/pages`: `Cart`, `Error`, `Home`, `index`, `Login`, `Payment`, `Product`, `Register`, `SingleBrand`, `SingleProduct`, `UserProfile`, `WishList`. Each file corresponds to an HTML page.
- `src/util/api.js`: API Url address.
- `src/util/constants.js`: the initial data before connecting to the database
- `src/store.js`: the setup of the Redux store.
- `src/index.css`: global styles.
