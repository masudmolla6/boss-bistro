import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaCartPlus } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";

const NavBar = () => {

  const { user, logOut } = useContext(AuthContext);

  const [cart] = useCart();


  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(error => console.error(error));
  }

    const navOption = (
      <>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/menu">Our Menu</Link>
        </li>
        <li>
          <Link to="/order/salad">Order Food</Link>
        </li>
        <li>
          <Link to="/secret">Secret</Link>
        </li>
        <li>
          <Link to="/dashboard">
            <button className="btn btn-sm">
              <FaCartPlus />
              <div className="badge badge-secondary">+{ cart.length}</div>
            </button>
          </Link>
        </li>
        {user ? (
          <>
            {/* <li><Link>{ user?.displayName}</Link></li> */}
            <li>
              <Link onClick={handleLogOut}>LogOut</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="login">LogIn</Link>
            </li>
          </>
        )}
      </>
    );
    return (
      <div className="navbar sticky top-0 z-30 bg-black bg-opacity-35">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
                {navOption }
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Bistro Boss</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navOption}
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    );
};

export default NavBar;