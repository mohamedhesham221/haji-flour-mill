import jwt from "jsonwebtoken";

/**
 * 
 * @param {Number} length required length of the random numeric string.
 * @returns a random numeric string of provided length.
 */
const generateRandomNumericString = (length) => {
  return Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
};

/**
 * Generates a unique username from the first name of the user.
 * 
 * @param {String} firstName first name of the user to add in username.
 * @param {Array} existingUsernames array of the existing usernames.
 * @returns a unique username not present in database.
 */
export const generateUsername = async (firstName, existingUsernames) => {
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
    };
  };
  return username;
};

/**
 * Generates a JWT token
 *
 * @param {Object} obj payload to generate token
 * @param {String} expiresIn expressed in seconds or a string describing a time span [zeit/ms](https://github.com/vercel/ms). Eg: 60, "2 days", "10h", "7d"
 * @returns a resolved promise with jwt token
 * @returns a rejected promise with HTTp status 500
 */
export const signJWT = (obj, expiresIn) =>
  new Promise((resolve, reject) => {
    jwt.sign(obj, process.env.JWT_SECRET, { expiresIn }, (error, token) => {
      if (error) {
        console.error(error);
        return reject({ status: 500 });
      };

      return resolve(token);
    });
  });
