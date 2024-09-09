import User from "../../models/User.js";
import { generateUsername, signJWT } from "../../services/services.js";

/**
 * Creates a new user in database.
 *
 * @param {Object} userDetails contains details of user to save in database.
 * @returns a resolved promise with newly created user.
 * @returns a rejected promise with reason (error).
 */
export const registerUser = async (userDetails) => {
  // Extract all the user details from the userDetails object.
  const { first_name, last_name, email, mobile, payment_mode, password } =
    userDetails;

  // Before saving the user details in database, create a unique username for the user.
  // To create a unique username first get all the existing usernames.
  // Create a username by calling the @function generateUsername with first-name and existing usernames.
  // Once the username has been created, save the user in database and return resolved promise with username.
  try {
    const existingUsernames = await User.find({}, { username: 1, _id: 0 });

    const username = await generateUsername(first_name, existingUsernames);

    let user = await User.create({
      first_name,
      last_name,
      username,
      email,
      mobile,
      payment_mode,
      password,
    });

    return Promise.resolve({ user });
  } catch (error) {
    return Promise.reject(error);
  };
};

/**
 * Performs verification on credentials and generates token.
 *
 * @param {Object} credentials to search the database and verify.
 * @returns a resolved promise with user details and jwt token.
 * @returns a rejected promise with HTTP status code.
 */
export const loginUser = async (userDetails) => {
  const { username, password } = userDetails;

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
        
        // Prepare payload for jwt sign method to generate jwt token.
        let jwt_payload = {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          isAdmin: user.isAdmin
        };

        // Call signJWT method with payload and expiration time and get the token.
        let token = await signJWT(jwt_payload, "2h");

        // Return resolved promise with user details and token.
        return Promise.resolve({
          user: { id: user._id, username: user.username, isAdmin: user.isAdmin },
          token: `Bearer ${token}`
        });

      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      };
    };
  } catch (error) {
    console.error(error);
    return Promise.reject({ status: 500 });
  };
};

/**
 * Finds all users.
 * 
 * @returns a resolved promise with users
 */
export const getAllUsers = async () => {
  try {
    // Find all the users by escaping the password and auto generated field __v from the result.
    // Sort the result in ascending order of first names.
    const users = await User.find({}, { password: 0, __v: 0 }).sort({ first_name: 1 }).exec();
    return Promise.resolve({ users });
  } catch (error) {
    return Promise.reject({ status: 500 });
  };
};

/**
 * Finds a user in database and returns it.
 * @param {String} identifier can be username or objectId of the user to find
 * @returns a resolved promise with user.
 */
export const getUser = async (identifier) => {
  try {

    let user;
    // Check if the identifier is ObjectId or username.
    const isObjectId = identifier.match(/^[0-9a-fA-F]{24}$/);

    // If the identifier is ObjectId, then search by id or else search by username.
    isObjectId
      ? user = await User.findById(identifier, { password: 0, __v: 0 })
      : user = await User.findOne({ username: identifier }, { password: 0, __v: 0 });
    
    return Promise.resolve({ user });
  } catch (error) {
    return Promise.reject({ status: 500 });
  };
};