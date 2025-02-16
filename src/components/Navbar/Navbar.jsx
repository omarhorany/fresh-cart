import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Logo from "../../assets/images/freshcart-logo.svg";
import { FaBars, FaTimes } from "react-icons/fa";
import { CartContext } from "../Context/CartContext";
const Navbar = () => {
  const { token, setToken } = useContext(AuthContext);
  const { numberOfCartItem } = useContext(CartContext)
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }


  // useEffect(() => {
  //   getCartItems()
  // }, [])

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="FreshCart Logo" className="h-10" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-semibold">
          {token && (
            <>
              <li>
                <Link to="/" className="hover:text-green-600">Home</Link>
              </li>
              <li className="relative">
                <Link to="/cart" className="hover:text-green-600 flex items-center gap-1">
                  Cart
                  {numberOfCartItem > 0 && (
                    <span className="bg-green-500 text-white text-xs font-bold rounded-3xl w-7 h-5 flex items-center justify-center">
                      {numberOfCartItem}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-green-600">Categories</Link>
              </li>
              <li>
                <Link to="/brands" className="hover:text-green-600">Brands</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-green-600">Products</Link>
              </li>
            </>
          )}
        </ul>

        {/* Social Icons */}
        <div className="hidden md:flex space-x-4 text-gray-500">
          <i className="fab fa-facebook hover:text-blue-600"></i>
          <i className="fab fa-twitter hover:text-blue-400"></i>
          <i className="fab fa-instagram hover:text-pink-500"></i>
          <i className="fab fa-snapchat hover:text-yellow-500"></i>
          <i className="fab fa-linkedin hover:text-blue-700"></i>
          <i className="fab fa-tiktok hover:text-black"></i>
          <i className="fab fa-youtube hover:text-red-600"></i>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          {token ? (
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg p-4 space-y-4">
          <ul className="flex flex-col space-y-4 text-gray-700 font-semibold">
            {token && (
              <>
                <li>
                  <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                </li>
                <li>
                  <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
                </li>
                <li>
                  <Link to="/categories" onClick={() => setMenuOpen(false)}>Categories</Link>
                </li>
                <li>
                  <Link to="/brands" onClick={() => setMenuOpen(false)}>Brands</Link>
                </li>
                <li>
                  <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
                </li>
              </>
            )}
          </ul>

          {/* Social Icons */}
          <div className="flex justify-center space-x-4 text-gray-500">
            <i className="fab fa-facebook hover:text-blue-600"></i>
            <i className="fab fa-twitter hover:text-blue-400"></i>
            <i className="fab fa-instagram hover:text-pink-500"></i>
            <i className="fab fa-snapchat hover:text-yellow-500"></i>
            <i className="fab fa-linkedin hover:text-blue-700"></i>
            <i className="fab fa-tiktok hover:text-black"></i>
            <i className="fab fa-youtube hover:text-red-600"></i>
          </div>

          {/* Auth Buttons */}
          <div className="flex justify-center space-x-4">
            {token ? (
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;