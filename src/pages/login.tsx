import { useGoogleLogin } from "@react-oauth/google";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../auth/use-auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = useGoogleLogin({
    onSuccess: (res) => {
      auth.signin(res, () => {
        navigate(from, { replace: true });
      });
    },
  });

  return (
    <div className="loginform">
      <h3>LOGIN</h3>
      <button className="login-with-google-btn" onClick={() => handleLogin()}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
