import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import { generateUsername } from "../../services/generate-username.js";

export const signupAdmin = async (userDetails) => {
  const { first_name, last_name, email, mobile, password } = userDetails;

  try {
    const existingUsernames = await User.find({}, { username: 1, _id: 0});

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

    if (!admin) {
      return Promise.reject({ status: 400 });
    } else {

      try {
        await admin.checkPassword(password);
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