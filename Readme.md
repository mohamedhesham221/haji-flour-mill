# Haji Flour Mill
'Haji Flour Mill' is a commercial site for a my own small mill business to keep track of users(customers) and daily entries. \
Link to site [Haji Flour Mill](https://haji-flour-mill.onrender.com/)

## Main Functionalities
- Anyone can view the home, services and pricing of the services page.
- Logged in users can see their profile details and all of their entries from the business. (Users themself can not register, only admin can register new user.)
- Logged in admin can manage administrative tasks such as:
    - Add a new entry
    - See all the entries
    - See a user's entries
    - Create a new user
    - See all users
    - See a user's details
    - Add a new service
    - Update a service
    - Delete a service

## How to use
#### As a admin
- Create admin by going to the route `/admin/signup`.
  - Server will create a unique username and show it on the screen, remember it for further login.
- Login as a admin by clicking the `Login-Admin` button.
  - Enter the credentials to login as admin.
  - If a normal user tries to login as admin, it will show access forbidden error.
- After successfully logging in, admin will see the New Entry page. (It is default render as it is the primary work of the admin.)
- From here admin has access to many administrative tasks.
- When admin crates a new user, a unique username for the user is generated and displayed on the screen, admin must tell the user it's username for login process.
- For ease, I suggest use the mobile no. as password, it will be easy for the user to remember. But it's not compulsory.

#### As a user
- Login as user by clicking the `Login-User` button.
  - Enter the credentials to login.
- After successfully logging in , user will see the Profile page.
- User can also see it's entries of the business.


## Run in local environment
First fork and clone the repository to your local device.

#### Setup backend
- Go to the backend directory by typing the command:
  - `cd backend`
- Run `npm install` to install all the dependencies.
- Create a `.env` file and add the following variables: 
  - `DATABASE_CONNECTION_STRING` - set it's value to a mongodb cluster connection string.
  - `JWT_SECRET` - set a unique and secure jwt secret key.
  - `CORS_ORIGIN` - set it to the client app url if any. (In case of development environment, it is going to be `http://localhost:3000`).
- Run `npm start` to start the server. It will run on port `3030`. (In case of development you can run `npm run dev` to automatically restart the server after making changes.)

To run the app locally this is all you need to do.\
In case you want to contribute or optimise the code, see the steps below.

## How to contribute
First fork and clone the repository to your local device.

#### Setup backend
- Setup the backend as described [Here](#setup-backend)

#### Setup frontend
- Go to the frontend direactory by typing the command (from haji-flour-mill directory):
  - `cd frontend`
- Run `npm install` to install all the dependencies.
- Open the `src/store/APISlice.js` file.
  - Set the variable `apiBaseUrl` from `/api/v1` to `http://localhost:3030/api/v1`.
  - Set the variable `adminBaseUrl` from `""` to `http://localhost:3030`.
- Run `npm start` to start the server. 
- After making changes run `npm build` to build the production build of the app. There will be a new folder named `build` inside `frontend`.

Copy the content of `build` folder.\
Go back to `backend` directory, go to `public/client` folder, `delete` the existing content of the `client` folder and paste the content of the `build` folder.

Now run `npm start` in `backend` and test your changes by going to url `http://localhost:3030`.


To contribute to the project, push your local changes to your forked repository.\
Make a pull request to original repository and start conversation about the changes.

