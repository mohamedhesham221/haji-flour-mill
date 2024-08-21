import User from "../../models/User.js";
import jwt from "jsonwebtoken"
import { generateUsername } from "../../services/generate-username.js";

export const registerUser = async (userDetails) => {
  const { first_name, last_name, email, mobile, password } = userDetails;

  try {
    const existingUsernames = await User.find({}, { username: 1, _id: 0});
    console.log(existingUsernames);

    const username = await generateUsername(first_name, existingUsernames);

    let user = await User.create({ first_name, last_name, username, email, mobile, password });
    console.log(user);

    return Promise.resolve({user});

  } catch (error) {
    return Promise.reject(error);
  }
}

const sign = (obj) => 
  new Promise((resolve, reject) => {
    jwt.sign(obj, process.env.JWT_SECRET, {expiresIn: "2h"}, (error, token) => {
      if (error) return reject({ status: 500 });

      return resolve(token);
    })
  })

export const loginUser = async (userDetails) => {
  const { username, password } = userDetails;

  try {
    let user = await User.findOne({ username });
    console.log("user is present in database");

    if (!user) {
      return Promise.reject({ status: 400 });
    } else {

      try {
        await user.checkPassword(password);
        console.log("Checkpassword executed");

        let jwt_payload = {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          isAdmin: user.isAdmin
        };

        let token = await sign(jwt_payload);

        return Promise.resolve({
          user: { id: user._id, username: user.username, isAdmin: user.isAdmin },
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

export const getAllUsers = async () => {
  try {
    const users = await User.find({}, { password: 0, __v: 0 }).sort({first_name: 1}).exec();
    console.log("This is before the users");
    console.log(users);
    console.log("This is after the users");
    return Promise.resolve({ users });
  } catch (error) {
    return Promise.reject({ status: 500 });
  }
}

export const getUser = async (id) => {
  try {
    const user = await User.findById(id, { password: 0, __v: 0 });

    if (!user) {
      return Promise.reject({ status: 400 });
    }
    return Promise.resolve({ user });
  } catch (error) {
    return Promise.reject({status: 500});
  }
}