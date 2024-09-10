// A page component to show login form of Admin.
import Login from "../../components/Login";

const LoginAdmin = () => {
  return <Login navigateTo="/admin" admin={true} />
}

export default LoginAdmin;