import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaTimes, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../features/auth/authSlice";
import { ShowOnLogin, ShowOnLogOut } from "../HiddenLinks";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Cart <FaShoppingCart size={20} /> <p>0</p>
    </Link>
  </span>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName == null) {
          const getName = user.email.substring(0, user.email.indexOf("@"));
          const nameFromEmail =
            getName.charAt(0).toUpperCase() + getName.slice(1);
          console.log("NAME:", nameFromEmail);
          setDisplayName(nameFromEmail);
        } else {
          const firstName = user.displayName.split(" ")[0];
          const googleDisplayName =
            firstName.charAt(0).toUpperCase() + firstName.slice(1);
          user.displayName = googleDisplayName;
          setDisplayName(user.displayName);
        }

        console.log("DIPLAY NAME:", displayName);

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [displayName, dispatch]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <header>
        <div className={styles.header}>
          {logo}

          <nav
            className={
              showMenu ? `${styles["show-nav"]}` : `${styles["hide-menu"]}`
            }
          >
            <div
              className={
                showMenu
                  ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                  : `${styles["nav-wrapper"]}`
              }
              onClick={hideMenu}
            ></div>
            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} color="#fff" onClick={hideMenu} />
              </li>
              <li>
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={activeLink}>
                  Contact Us
                </NavLink>
              </li>
            </ul>
            <div className={styles["header-right"]} onClick={hideMenu}>
              <span className={styles.links}>
                <ShowOnLogOut>
                  {" "}
                  <NavLink to="/login" className={activeLink}>
                    Login
                  </NavLink>
                </ShowOnLogOut>
                <ShowOnLogin>
                  <a src="/" style={{ color: '#ff7722' }}>
                    <FaUserCircle size={16} />
                    Hi, {displayName}
                  </a>

                  <NavLink to="/order-history" className={activeLink}>
                    My Orders
                  </NavLink>
                  <NavLink to="/" className={activeLink} onClick={logoutUser}>
                    Logout
                  </NavLink>
                </ShowOnLogin>
              </span>
              {cart}
            </div>
          </nav>

          <div className={styles["menu-icon"]}>
            {cart}
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
