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


## Use in development environment
- First fork and clone the repository to your local device.
- Run `npm install` to install all the dependencies.
- Create a `.env` file and add the following variables: 
  - `DATABASE_CONNECTION_STRING` - set it's value to a mongodb cluster connection string.
  - `JWT_SECRET` - set a unique and secure jwt secret key.
- Run `npm start` to start the server. (It will run on port 3030)
  
