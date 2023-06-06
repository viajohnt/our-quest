import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import useUserStore from "../hooks/UserStore";
import LogoutButton from "./LogoutButton";

function Header() {
  const { user } = useUserStore();

  return (
    <header className="main-header bg-gray-700">
      <img className="main-logo max-h-[8rem] pl-[3rem] pt-5 pb-5" src={logo} alt="logo" />
      {
        user ? (
          <>
            <p>Welcome, {user.username}!</p> {/* Assuming the user object has a 'name' property */}
            <LogoutButton />
          </>
        ) : (
          <Link to="/login" className="login-link">Login</Link>
        )
      }
    </header>
  );
}

export default Header;
