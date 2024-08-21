import User from "../../models/User.js";
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