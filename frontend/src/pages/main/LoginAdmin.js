import Login from "../../components/Login";

const LoginAdmin = () => {
  return <Login navigateTo="/admin" admin={true} />
}

export default LoginAdmin;