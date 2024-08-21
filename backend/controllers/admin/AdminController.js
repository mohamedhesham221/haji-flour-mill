import User from "../../models/User.js";
import jwt from "jsonwebtoken";

// Function to generate a random numeric string
const generateRandomNumericString = (length) => {
  return Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
}

// Function to generate a unique username
const generateUsername = async (firstName, existingUsernames) => {
  let username;
  let isUnique = false;
  
  while (!isUnique) {
      // Generate a random numeric string of 4 digits
      const randomNumericString = generateRandomNumericString(4);

      // Create the username by concatenating the first name and the random numeric string
      username = `${firstName.toLowerCase()}${randomNumericString}`;

      // Check if the username is unique
      if (!existingUsernames.some((el) => el.username === username)) {
          isUnique = true;
      }
  }

  return username;
}

export const signupAdmin = async (userDetails) => {
  const { first_name, last_name, email, mobile, password } = userDetails;

  try {
    const existingUsernames = await User.find({}, { username: 1, _id: 0});
    console.log(existingUsernames);

    const username = await generateUsername(first_name, existingUsernames);

    User.create({ first_name, last_name, username, email, mobile, password, isAdmin: true });

    return Promise.resolve({username});

  } catch (error) {
    return Promise.reject(error);
  }
}

const sign = (obj) => 
  new Promise((resolve, reject) => {
    jwt.sign(obj, process.env.JWT_SECRET, {expiresIn: "24h"}, (error, token) => {
      if (error) return reject({ status: 500 });

      return resolve(token)
    })
  })

export const loginAdmin = async ({username, password}) => {

  try {
    let admin = await User.findOne({ username });
    console.log("admin is present in database");

    if (!admin) {
      return Promise.reject({ status: 400 });
    } else {

      try {
        await admin.checkPassword(password);
        console.log("Checkpassword executed");
        if (!admin.isAdmin) {
          return Promise.reject({ status: 403 });
        }

        let jwt_payload = {
          id: admin._id,
          first_name: admin.first_name,
          last_name: admin.last_name,
          isAdmin: admin.isAdmin
        };

        let token = await sign(jwt_payload);

        return Promise.resolve({
          user: { id: admin._id, username: admin.username, isAdmin: admin.isAdmin },
          token: `Bearer ${token}`
        });

      } catch (error) {
        return Promise.reject(error);
      }
    }
  } catch (error) {
    return Promise.reject({ status: 500 });
  }
}