# G Technology-phone sell

## Project Members
- Weibin Chen 46427333
- Braydon Chi 46564616
- Mitchell Hrnjak 45902178
- Ruike Xu 46271481

Braydon and Mitchell mainly responsible for front-end development, Weibin and Ruike mainly responsible for back-end development.

## Way of Communication
  During the operation of this project, we often use trello to determine the weekly project progress, and we often ask each other for programming suggestions and goals through DIscode.


## Project Introduction
Our goal is to customize and write the website for customers, so the example used this time is a website related to mobile phone sales, and we hope to show the performance and price of each mobile phone more clearly through the website, as well as the core competitiveness of our website.

## Website outline

### What we want reached for but had no time:
- Google Authentication Login (nearly completed)
- Product Feedback
- Downloadable PDF Invoices


## Target Users
- our aim: Any business or company that needs help designing a website
- website target: any people who want get a phone

## MVP
- More than fifty different types of phone models and details
- Wish List and Cart
- search bar and Brand pick
- sort by method, price:high-low/low-high, rating:high-low/low-high
- order history and check the history detail
- stripe payment Page

## Next Step
- complete google login

- Stripe Payment SystemS

Stripe integrates up to 25 payment methods and integrates with a variety of indispensable financial tools in its back-end dashboard. Stripe enables the perfect combination of raw sales data and financial analysis tools. It opens up another door for e-commerce. If we continue to work hard to develop our back-end software to connect with MYOB using stripe, this software will become an e-commerce company's central information system. It will control all finance, stock, all operation of this company. The above will be It will be our next development goal.


## Project Breakdown

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
- We have enabled multiple payment methods on the Stripe checkout page, such as ApplePlay, GooglePlay, Credit Card, Afterpay, and Alipay. Customers can adjust item quantity during checkout. Shipping addresses also will be collected. 

## API
- `doc/API.txt`: API definition and example description.
- `doc/API.postman_collection.json`: Use Postman to test the backend alone. Postman's settings file.

## DB intial utility
- `src/services/axioserver.js`: Axios to each API.
- `src/services/sample.json`: initial product data for testing and setup purposes.
- `src/services/devhomepage.js`: the utility needs a user and password to access the database.
- `src/services/stage.js`: the front-end page can load `sample.json` to MongoDB via back-end API. Fetch and list all information on the page.

## Backend
- `.env` is used to authenticate against the MongoDB database, Stripe payment and the working port of the backend server.
- `server/src/models/index.js`: schema of the data table.
- `server/src/controllers`: This is where all API routers are controlled and is used to handle specific operations of each API router, such as GET, POST, PUT, DELETE, etc.
- `server/src/app.js`: set up express, cors, API router, and middleware.
- `server/src/routes.js`: Assign each specific sub-API router to the corresponding processing function in controllers.


## Frontend
- `src/assets/logo.jpg`: This is the logo of this online shop.
- `src/components`: They are the components in pages. `CartButton`, `DropDownSearchBar`, `Hero`, `NavBar`, `Pagination`, `PaymentForm`, `ProductCard`, `SerchModal`, `Loading`.
- `src/features`: `cartSlice`, `searchSlice`, `filterSlice`, `authSlice`, `wishlistSlice`. Each file corresponds to a Redux Toolkit slice. They will handle the state of the Redux and Redux network flow.
- `src/pages`: `Cart`, `Error`, `Home`, `index`, `Login`, `Payment`, `Product`, `Register`, `SingleBrand`, `SingleProduct`, `UserProfile`, `WishList`. Each file corresponds to an HTML page.
- `src/util/api.js`: API Url address.
- `src/util/constants.js`: the initial data before connecting to the database
- `src/store.js`: the setup of the Redux store.
- `src/index.css`: global styles.

## SCREENSHOTS

![AddCartReminding](https://user-images.githubusercontent.com/100172814/200114402-55464ea2-ca9b-4646-9675-ce8538b023eb.PNG)
![AfterUseBrandSearch](https://user-images.githubusercontent.com/100172814/200114403-60bcce35-2c31-4e95-be3c-2ecb71749f8a.PNG)
![CartPage](https://user-images.githubusercontent.com/100172814/200114405-d02bb6d4-1a0a-448d-bf6a-f9c858e7c3ac.png)
![HighToLow](https://user-images.githubusercontent.com/100172814/200114406-df429616-7e23-4dea-a87d-7e5cd27db229.PNG)
![homepage](https://user-images.githubusercontent.com/100172814/200114407-10bcc1cd-2969-43d9-a501-7ae3dd9a358b.PNG)
![LowToHigh](https://user-images.githubusercontent.com/100172814/200114409-39e73c38-8693-4817-a661-a62143a6d8a1.PNG)
![ManyBrand](https://user-images.githubusercontent.com/100172814/200114410-a1bc10fa-8708-41f4-abed-cb2885c3fd40.PNG)
![OrderHistory](https://user-images.githubusercontent.com/100172814/200114411-0034b8d2-b529-460f-a2d7-b64067a25ffa.PNG)
![PasswordWarningPage](https://user-images.githubusercontent.com/100172814/200114413-567862ec-232a-4711-b06a-d40dc1a9fee4.PNG)
![PaymentPage](https://user-images.githubusercontent.com/100172814/200114416-0ff37334-1ac7-423f-991f-90c9d68f0493.PNG)
![PaymentSuccess](https://user-images.githubusercontent.com/100172814/200114418-c45f4723-ef5b-4356-9490-f57008869ff8.PNG)
![PhoneType](https://user-images.githubusercontent.com/100172814/200114419-65d1e3f6-e9a5-4c98-b379-627aafedeb15.PNG)
![ProductsIntroPage](https://user-images.githubusercontent.com/100172814/200114420-ebd68ff0-c8a8-4e93-b0ed-3456d67a5d07.PNG)
![ProductsPage](https://user-images.githubusercontent.com/100172814/200114422-3e0c029f-ffce-42bb-9a83-3ee77af33565.PNG)
![RatingHighToLow](https://user-images.githubusercontent.com/100172814/200114423-fefccb41-0ff0-4e79-95ff-18794d845b9e.PNG)
![RatingLowToHigh](https://user-images.githubusercontent.com/100172814/200114424-cb876fe2-1e85-4518-9b1e-f881c26ffe10.PNG)
![RegisterPage](https://user-images.githubusercontent.com/100172814/200114426-fb7e3709-a5e8-474a-be4e-50cdd087e9a5.PNG)
![SearchMethod](https://user-images.githubusercontent.com/100172814/200114428-a592922d-3471-446e-823e-d0ba56879341.PNG)
![SelectMethod](https://user-images.githubusercontent.com/100172814/200114432-1157820c-e3ad-4178-91a8-2d4ae6de0545.PNG)
![SignInPage](https://user-images.githubusercontent.com/100172814/200114434-4e3286a5-857f-4b02-ac5c-599b0f84e624.PNG)
![UserInfo](https://user-images.githubusercontent.com/100172814/200114437-1673a69b-2a31-4f37-966f-ff0e3da4020c.PNG)
![VIewHistoryPage](https://user-images.githubusercontent.com/100172814/200114439-d306c584-3b69-43d7-91ca-38a38d6ffa00.PNG)
