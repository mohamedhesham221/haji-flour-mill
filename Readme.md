# Haji Flour Mill
'Haji Flour Mill' is a commercial site for a my own small mill business to keep track of users(customers) and daily entries. \
Link to site [Haji Flour Mill](https://haji-flour-mill.onrender.com/)

## Main Functionalities
- Anyone can view the home, services and pricing of the services page.
- Logged in users can see their profile details and all of their entries from the business. They can also give review to service. (Users themself can not register, only admin can register new user.)
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
    - See all reviews
    - See a service's reviews
    - See reviews by a user

## Features

- Allows user to explore services and their prices that business provide.
- Admin is created using a specific route, not disclosed or accessible from the app, which will be known to owners of the business and high level development administrators only.
  - Currently it's a normal signup form, working on a feature that will allow only owner and the administrative person to create admin, even if route has been known to someone else.
- Generates an automated unique username for every user to differentiate between users.
  - It is automated, as only admins are allowed to register new users, and it's unneccessary load for them to think of a unique username for every registered user.
- A customer or user of the business can log-in and see it's profile details and history about his/her entries.
- A customer or user can give review to a service.
- Admins can log-in and manage the business tasks discussed in [Main Functionalities](#main-functionalities) section.
- It has good and attractive UI.
- It provides good User Experience(UX) by showing clear navigation links through out the application.
- It is fully responsive for Desktop and Tablet screens but can break design on some pages in Mobile screens.
  - It is because it's a commercial website and most of the time it will be used in Desktop or Tablet screens.
  - Another reason is, it's pages contains tables to show data, which takes required space even in mobile screens and causes the design break.
  - However I am constantly working to make it more responsive for Mobile screens too.


## How to use
#### As a admin
- Create admin by going to the route `/admin/signup`.
  - Server will create a `unique username` and show it on the screen, remember it for further login.
- Login as a admin by clicking the `Login-Admin` button.
  - Enter the credentials to login as admin.
  - If a normal user tries to login as admin, it will show `access forbidden` error.
- After successfully logging in, admin will see the `New Entry` page. (It is default render as it is the primary work of the admin.)
- From here admin has access to many administrative tasks.
- When admin crates a new user, a `unique username` for the user is generated and displayed on the screen, admin must tell the user it's `username` and `password` for login process.
- For ease, I suggest use the mobile no. as password, it will be easy for the user to remember. But it's not compulsory.

#### As a user
- Login as user by clicking the `Login-User` button.
  - Enter the credentials to login.
- After successfully logging in , user will see the Profile page.
- User can also see it's history of entries of the business.
- User can give review to a service.


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


In case if you want to run frontend separately.
#### Setup frontend
First run the backend.

- Go to the frontend direactory by typing the command (from haji-flour-mill directory):
  - `cd frontend`
- Run `npm install` to install all the dependencies.
- Open the `src/store/APISlice.js` file.
  - Set the variable `apiBaseUrl` from `/api/v1` to `http://localhost:3030/api/v1`.
  - Set the variable `adminBaseUrl` from `""` to `http://localhost:3030`.
- Run `npm start` to start the server. 


To run the app locally this is all you need to do.\
In case you want to contribute or optimise the code, see the steps below.

## How to contribute
First fork and clone the repository to your local device.

#### Setup backend
- Setup the backend as described [Here](#setup-backend)

#### Setup frontend
- Do all the steps in [Setup frontend](#setup-frontend) 
- Do the desired changes in code.
- Before making the build, change the base urls to their previous value in `src/store/APISlice.js` :
  - Set the variable `apiBaseUrl` from `http://localhost:3030/api/v1` to `/api/v1`.
  - Set the variable `adminBaseUrl` from `http://localhost:3030` to `""`.
- After making changes run `npm build` to build the production build of the app. There will be a new folder named `build` inside `frontend`.

Copy the content of `build` folder.\
Go back to `backend` directory, go to `public/client` folder, `delete` the existing content of the `client` folder and paste the content of the `build` folder.

Now run `npm start` in `backend` and test your changes by going to url `http://localhost:3030`.


To contribute to the project, push your local changes to your forked repository.\
Make a pull request to original repository and start conversation about the changes.

\
\
With that said at the end I would like to say:


> **A project is never complete and there is always something to improve.**

So, I am constantly working on code optimization and adding new features. You Can always come back and check updates.

## UI Showcase
To explore public pages go to the [Haji Flour Mill](https://haji-flour-mill.onrender.com/)

Here are the UI screenshots of the protected pages which require login.

### User pages
1. User Login page  \
  It will show error message if credantials are wrong.
\
![User Login Page](/screenshots/01.%20user%20login%20page.png?raw=true "User Login Page")

2. User Profile page
\
![User Profile Page](/screenshots/02.%20user%20profile%20page.png?raw=true "User Profile Page")

3. User Entries page
\
![User Entries Page](/screenshots/03.%20user%20my%20entries%20page.png?raw=true "User Entries Page") 

4. Give Review page
\
![Give Review Page](/screenshots/04.%20user%20give%20review%20page.png?raw=true "Give Review Page")

### Admin pages
1. Admin Login page \
  It will show error message if credantials are wrong or user is unauthorized.
\
![Admin Login Page](/screenshots/05.%20admin%20login%20page.png?raw=true "Admin Login Page")

2. New Entry page
\
![New Entry Page](/screenshots/06.%20admin%20new%20entry%20page.png?raw=true "New Entry Page")

3. New Entry success alert  \
  Success alert will contain the amount of the entry.
\
![New Entry Success Alert](/screenshots/07.%20admin%20new%20entry%20success%20alert.png?raw=true "New Entry Success Alert")

4. All Entries page
\
![All Entries Page](/screenshots/08.%20admin%20all%20entries%20page.png?raw=true "All Entries Page")

5. Single User's Entries page
\
![Single User's Entries Page](/screenshots/09.%20admin%20single%20user%20entries%20page.png?raw=true "Single User's Entries Page")

6. Create User page
\
![Create User Page](/screenshots/10.%20admin%20create%20user%20page.png?raw=true "Create User Page")

7. Create User success alert  \
  Success alert will contain the `unique username` for the newly registered user, required for login process and filling the entry.
\
![Create User Success Alert](/screenshots/11.%20admin%20create%20user%20success%20alert.png?raw=true "Create User Success Alert")

8. All Users page
\
![All Users Page](/screenshots/12.%20admin%20all%20users%20page.png?raw=true "All Users Page")

9. Single User's Details page
\
![Single User's Details Page](/screenshots/13.%20admin%20single%20user%20details%20page.png?raw=true "Single User's Details Page")

10. Add Service page
\
![Add Service Page](/screenshots/14.%20admin%20add%20service%20page.png?raw=true "Add Service Page")

11. All Services page \
  Each service card contains `edit` and `delete` button.
\
![All Services Page](/screenshots/15.%20admin%20all%20services%20page.png?raw=true "All Services Page")

12. Update Service page \
  Clicking the `edit` button in above service card will open the this page.
\
![Update Service Page](/screenshots/16.%20admin%20update%20service%20page.png?raw=true "Update Service Page")

13. Confirm Delete Service alert  \
  Clicking the `delete` button will ask the user for confirmation to delete the service.
\
![Confirm Delete Service Alert](/screenshots/17.%20admin%20confirm%20delete%20service%20alert.png?raw=true "Confirm Delete Service Alert")

14. Delete Service success alert
\
![Delete Service success Alert](/screenshots/18.%20admin%20delete%20service%20success%20alert.png?raw=true "Delete Service success Alert")

15. All Reviews page
\
![All Reviews Page](/screenshots/19.%20admin%20all%20reviews%20page.png?raw=true "All Reviews Page")

16. Service Reviews page  \
  Reviews for a perticular service.
\
![Service Reviews Page](/screenshots/20.%20admin%20service%20reviews%20page.png?raw=true "Service Reviews Page")

17. Reviews by User page  \
  Reviews given by a perticular user.
\
![Reviews by User Page](/screenshots/21.%20admin%20reviews%20by%20user%20page.png?raw=true "Reviews by User Page")
