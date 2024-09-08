import { signupAdmin } from "../../controllers/admin/AdminController.js";

export default async (req, res) => {
  const userDetails = req.body;
  try {
    let {username} = await signupAdmin(userDetails);
    res.render("adminSignUpSuccess", {username});
  } catch (error) {
    console.error(error);
    res.redirect("/admin/signup");
  }
}