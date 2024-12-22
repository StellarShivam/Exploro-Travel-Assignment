import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./registerPage.scss";
import { AuthContext } from "../../context/auth-context";

export default function RegisterPage() {
  const auth = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [redirect, setRedirect] = useState(false);

  async function registerUser(ev) {
    console.log(name, email, password);
    ev.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log(role);
      const { data } = await axios.post(
        "http://localhost:3002/api/users/signup",
        { name, email, password, role: role },
        config
      );
      auth.login(data.userId, data.token, data.role, data.name);
      alert("Registration successful.");
      setRedirect(true);
    } catch (e) {
      alert("Registration failed. Please try again later");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="title">Register</h1>
        <form className="form" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <div className="checkbox-container">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={role === "organiser"}
                onChange={(ev) =>
                  setRole(ev.target.checked ? "organiser" : "customer")
                }
              />
              <span className="checkbox-text">Register as Organiser</span>
            </label>
          </div>
          <button className="register-button">Register</button>
          <div className="login-text">
            Already a member?{" "}
            <Link className="login-link" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
