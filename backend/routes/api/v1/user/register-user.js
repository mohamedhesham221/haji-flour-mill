import { registerUser } from "../../../../controllers/user/UserController.js";

export default async (req, res) => {
  const userDetails = req.body;
  try {
    let {user} = await registerUser(userDetails);
    res.status(201).json({user});
  } catch (error) {
    res.status(500).json({error});
  }
}