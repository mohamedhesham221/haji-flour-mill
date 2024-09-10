import { signupAdmin } from "../../controllers/admin/AdminController.js";

export default async (req, res) => {
  // Extract userDetails from request object
  const userDetails = req.body;

  // Call @function signupAdming and get the username from the response.
  // Render the adminSignUpSuccess page with username after successfull signup.
  try {

    let {username} = await signupAdmin(userDetails);
    res.render("adminSignUpSuccess", { username });
    
  } catch (error) {
    // Redirect the user to the signup page in case of error in signing up.
    console.error(error);
    res.redirect("/admin/signup");
  }
}