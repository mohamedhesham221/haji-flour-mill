import { getUserEntries } from "../../../../controllers/entry/EntryController.js";

/**
 * Sends entries of a user in response along with the success status.
 * 
 * In case of error sends the error in response along with failure status.
 */
export default async (req, res) => {

  const { username } = req.params;

  try {

    const { entries } = await getUserEntries(username);
    res.status(201).json({ entries });

  } catch (error) {

    res.status(error.status).json({ ...error, message: "Server error." });
    
  };
};