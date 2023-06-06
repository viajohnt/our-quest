import logo from "../assets/images/logo.png";
import userImg from "../assets/images/default-user-img.png";
import { Link } from "react-router-dom";
import useUserStore from "../hooks/UserStore";
import LogoutButton from "./LogoutButton";

function Header() {
  const { user } = useUserStore();

  return (
    <header className="main-header bg-gray-700 flex justify-between items-center font-dm-sans">
      <div>
        <Link to="/"> 
          <img className="main-logo max-h-[8rem] pl-[3rem] pt-5 pb-5" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="flex items-center mr-10">
          <img className="user-image max-h-[3rem] mr-3" src={userImg} alt="User" />
        {user ? (
          <>
            <p className="font-bold font-dm-sans text-white">Welcome, {user.username}!</p>
            <LogoutButton />
          </>
        ) : (
          <Link to="/login" className="login-link text-white font-bold text-lg">LOGIN</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
