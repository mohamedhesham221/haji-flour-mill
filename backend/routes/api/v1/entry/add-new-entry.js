import { addNewEntry } from "../../../../controllers/entry/EntryController.js";

/**
 * Sends newly added entry in response along with the success status.
 * 
 * In case of error sends the error in response along with failure status.
 */
export default async (req, res) => {

  const entryDetails = req.body;

  try {

    const { entry } = await addNewEntry(entryDetails);
    res.status(201).json({ entry });

  } catch (error) {

    error.status === 400
      ? error.message = "Incorrect username or serviceId."
      : error.message = "Server error."
    res.status(error.status).json({ error });
    
  };
};