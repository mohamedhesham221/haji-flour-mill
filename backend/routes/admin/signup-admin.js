import { signupAdmin } from "../../controllers/admin/AdminController.js";

export default async (req, res) => {
  const userDetails = req.body;
  console.log(userDetails);
  try {
    let {username} = await signupAdmin(userDetails);
    res.render("adminSignUpSuccess", {username});
  } catch (error) {
    res.redirect("/admin/signup");
  }
}