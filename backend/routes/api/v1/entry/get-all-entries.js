import { getAllEntries } from "../../../../controllers/entry/EntryController.js";

/**
 * Sends newly all entries in response along with the success status.
 * 
 * In case of error sends the error in response along with failure status.
 */
export default async (req, res) => {

  try {
    const { entries } = await getAllEntries();

    res.status(201).json({ entries });
  } catch (error) {
    res.status(error.status).json({ ...error, message: "Server error." });
  };
};