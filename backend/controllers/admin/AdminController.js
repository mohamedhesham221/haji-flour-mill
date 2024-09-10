import User from "../../models/User.js";

import { generateUsername, signJWT } from "../../services/services.js";

/**
 * Creates a new admin user in database.
 *
 * @param {Object} userDetails contains data to save in databse.
 * @returns a resolved promise with `username`.
 * @returns a rejected promise with `error`.
 */
export const signupAdmin = async (userDetails) => {
  const { first_name, last_name, email, mobile, password } = userDetails;

  // Before saving the user details in database, create a unique username for the user.
  // To create a unique username first get all the existing usernames.
  // Create a username by calling the @function generateUsername with first-name and existing usernames.
  // Once the username has been created, save the user in database and return resolved promise with username.
  try {
    const existingUsernames = await User.find({}, { username: 1, _id: 0 });

    const username = await generateUsername(first_name, existingUsernames);

    User.create({
      first_name,
      last_name,
      username,
      email,
      mobile,
      password,
      isAdmin: true,
    });

    return Promise.resolve({ username });
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Performs verification on credentials and generates token.
 *
 * @param {Object} credentials to search the database and verify.
 * @returns a resolved promise with user details and jwt token.
 * @returns a rejected promise with HTTP status code.
 */
export const loginAdmin = async ({ username, password }) => {
  try {
    // Find the user with username.
    let user = await User.findOne({ username });

    // If no user found return rejected promise with status 400: bad request. Else check for further verification.
    if (!user) {
      return Promise.reject({ status: 400 });
    } else {
      try {
        // Check password validation.
        await user.checkPassword(password);

        // If password is valid but user is not admin, return the rejected promise with status 403: forbidden.
        if (!user.isAdmin) {
          return Promise.reject({ status: 403 });
        };

        // Prepare payload for jwt sign method to generate jwt token.
        let jwt_payload = {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          isAdmin: user.isAdmin,
        };

        // Call signJwT method with payload and expiration time and get the token.
        let token = await signJWT(jwt_payload, "6h");

        // Return resolved promise with user details and token.
        return Promise.resolve({
          user: {
            id: user._id,
            username: user.username,
            isAdmin: user.isAdmin,
          },
          token: `Bearer ${token}`,
        });
      } catch (error) {
        return Promise.reject(error);
      };
    };
  } catch (error) {
    return Promise.reject({ status: 500 });
  };
};