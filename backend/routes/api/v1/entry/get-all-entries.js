import { getAllEntries } from "../../../../controllers/entry/EntryController.js";

export default async (req, res) => {

  try {
    const { entries } = await getAllEntries();

    res.status(201).json({ entries });
  } catch (error) {
    res.status(error.status).json({...error, message: "Server error."});
  }
}