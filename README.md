## Project Overview
A web app for the Attractions Salon in Gainesville, FL. It aims for users to be able to find the salon, see the services offered, make payments, and make appointments in an easy to use fashion.

## Features
- Salon Client (User)
    - View Information about the Business - Users can view information about the business on the home, services, and about page. They can see such information as where the business is located, the phone number of the business, reviews of the business, the services offered (including a price and description for those services), and the history of the business. 
    - Create an Account - Customers/users can sign up for an account. After creating the account they can login and view their name and email, change their password, see past appointments, and make appointments.
    - Reset Password - If a user forgets their password, the user can click on the “Forgot Password?” button on the Login page. This takes them to a new page that prompts them for their email. Upon the submission of their email, instructions are sent to their email on how to reset their password.
    - Navigation Bar changes on Login  - When a user logs in, the “Login” button disappears, replaced with a “Logout” button and “Welcome [first name] [last name]”. On mobile, the “Welcome” button becomes “Profile”. When a user clicks on the personalized “Welcome” button, they can access their profile.
    - Request an Appointment - Users can request an appointment on the appointments page only after creating an account as a customer. After filling out the necessary information, including choice of service, an email will be sent to the salon owner, who can confirm or contact the user as necessary. A confirmation by the salon owner will result in the user receiving an email informing them of the decision.
    - See Appointments Information - When a user goes to their profile, they will be able to see all of the past appointments they made in a table. They can see the appointment number, their preferred stylist, the service requested and its price, the time of the appointments, whether or not the appointment is confirmed, and  whether or not payment has occurred.
    - Option to Pay for Appointment after Confirmation - After an appointment has been confirmed by the admin, the user has the option to pay for the service before the appointment occurs. After the admin confirms an appointment, in the email that is sent to the user to notify them that their appointment has been confirmed, there is a link that directs them to a payments page on the website where the user can enter their payment information and pay through Square.
    - Change User Password - After logging in, a user can hover over the profile picture which will display a change password option. Clicking on this will allow the user to change their password securely.
- Salon Owner (Admin)
    - Add Non-Service Images - Once logged in, the admin can add images to the web app through the admin dashboard.The types of images the admin can add are separated into different categories, which are the logo image, and images in the slideshow, which is located on the About Us page.
    - Delete Non-Service Images - Once logged in, the admin can delete images from the web app through the Admin Dashboard.The types of images the admin can delete are separated into different categories, which are the logo images and the images in the slideshow, which is located on the About Us page.
    - Add, Delete, and Edit Services Information and Images - Once logged in, the admin can change the information about the services through the Admin Dashboard, including the name, price, description, category, and image of a specific service. 
    - Confirming, Denying, and Sending Additional Times for Appointments - An admin does not need to be logged in to access this feature. When a user requests an appointment, the admin is sent an email and text. Within the email and text body, the admin is sent two links, one to confirm the appointment and another to provide the client with a list of times for which they can reschedule their appointment. Once the client has chosen a time that works for the admin and the admin has clicked the confirm appointment link, the client is then sent an email that states that their appointment has been confirmed and within the body of that email is a link so that the client can pay online. Furthermore, in every email to the admin, the client’s contact information is sent, so if more detailed discussion should occur, the admin can feel free to contact the client by phone or email.


## APIs and Replacements Procedure
To replace an API key, either go to its location in the code, or go to the heroku environment variables and change it there (see instructions under 9.4)

- Payments (Square)
    - website: [https://squareup.com/login?lang_code=en-US&return_to=%2Fsignup%2Fus%3Flang_code%3Den-US%26v%3Ddevelopers](https://squareup.com/login?lang_code=en-US&return_to=%2Fsignup%2Fus%3Flang_code%3Den-US%26v%3Ddevelopers)
    - username: gary0422wu@yahoo.com
	- password: Thunderbolt
    - API Keys Locations: (applicationid and locationid) are under client/src/components/views/payments/PaymentPage.js on line 111 and 112
- MongoDB
	- website: [https://www.mongodb.com/](https://www.mongodb.com/)
	- username: attractions.salon.noreply@gmail.com
    - password:  M.vqYjFdJT!s";9tb
    - API Key Location: heroku environment variable DB_URI
- Standard Messaging Service
	- API Key Location: heroku environment variable SMS_AUTH_TOKEN
    - Phone Number Receiving Appointment Confirmation Texts Variable Location: heroku environment variable SMS_RX_PHONE_NUM
- No Reply Email
	- email: attractions.salon.noreply@gmail.com
    - password: M.vqYjFdJT!s";9tb
- Twilio
	- website: https://www.twilio.com/
	- email: attractions.salon.noreply@gmail.com
    - password: M.vqYjFdJT!s";9tb
- Heroku
	- website: https://dashboard.heroku.com/apps
	- email: biaggiaddison@ufl.edu
	- password: Thunderbolt37
- Google Review API
    - Location: client > src > components > ReviewSection > Review.js
    - Google Review API Key: line 6
    - The place ID is located on line 7 of this file. It is a public place ID given by Google to access information about an address. If the business should ever move addresses, this ID should be replaced.


## Getting Started
To run the wep app locally run the following commands from the root to install the dependencies needed.
1. `npm install`  
2. `npm run-script install-all` 

## Available Scripts
To run the app locally, the following scripts are avaliable: 

To run both the client app and the server app in development mode, use `npm run-script dev`. To view the client in the browser, open [http://localhost:3000](http://localhost:3000).

To run just the client app in development mode use `npm run-script client`. Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

To run just the server in development mode use `npm run-script server`.

To build the app for production to the `build` folder use `npm run build`.

This last command correctly bundles React in production mode and optimizes the build for the best performance. This does not need to be run since it is handled by the heroku-postbuild script, but if the app should be hosted anywhere else, it may need to be utilized.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## File structure
`client` - Holds the client application
- `public` - This holds all of our static files
- `src`
    - `assets` - This folder holds assets such as images, docs, and fonts
    - `components` - This folder holds all of the different components that will make up our views
    - `views` - These represent a unique page on the website i.e. Home or About. These are still normal react components
    - `App.js` - This is what renders all of our browser routes and different views
    - `index.js` - This is what renders the react app by rendering App.js, should not change
- `package.json` - Defines npm behaviors and packages for the client
`server` - Holds the server application
- `config` - This holds our configuration files, like mongoDB uri
- `controllers` - These hold all of the callback functions that each route will call
- `models` - This holds all of our data models
- `routes` - This holds all of our HTTP to URL path associations for each unique url
- `tests` - This holds all of our server tests that we have defined
- `server.js` - Defines npm behaviors and packages for the client
`package.json` - Defines npm behaviors like the scripts defined in the next section of the README
`.gitignore` - Tells git which files to ignore
`README` - This file!
`client` - Holds the server application
- `config` - This holds all of the API keys for the database/email services as well as setup for the Express server
- `controllers` - This holds definitions for various queryable Express routes as well as behavior for payments
- `models` - This holds definitions and setup for appointment objects
- `routes` - Holds more routing information
	- `api` - This holds how each route should communicate with a HTTP request
- `server.js` - Specifues on which port server should be hosted
