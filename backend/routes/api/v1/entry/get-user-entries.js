import { getUserEntries } from "../../../../controllers/entry/EntryController.js";

export default async (req, res) => {
  const { username } = req.params;

  try {
    const { entries } = await getUserEntries(username);

    res.status(201).json({ entries });
  } catch (error) {
    res.status(error.status).json({...error, message: "Server error."});
  }
}