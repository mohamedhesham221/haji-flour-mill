// Function to generate a random numeric string
const generateRandomNumericString = (length) => {
  return Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
}

// Function to generate a unique username
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
      }
  }
  return username;
}