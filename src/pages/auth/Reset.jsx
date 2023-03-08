import React from "react";
import styles from "./auth.module.scss";
import resetImg from "../../assets/forgot.png";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Card from "../../components/Card";

const Reset = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={resetImg} alt="login" width={400} />
      </div>
      <Card>
        <div className={styles.form}>
          <h2>Reset Password</h2>
          <form>
            <input type="email" placeholder="Email" required />
            <button className="--btn --btn-primary --btn-block">
              Reset Password
            </button>
            <span className={styles.links}>
            <p>
              <Link to="/login"> - Login </Link>
            </p>
            <p>
              <Link to="/register"> - Register </Link>
            </p>
          </span>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default Reset;
