import React from "react";
import styles from "./auth.module.scss";
import registerImg from "../../assets/register.png";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>Register</h2>
          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
            <button className="--btn --btn-primary --btn-block">Register</button>
          </form>
         
          <span className={styles.register}>
            <p>Already have an account? </p> <Link to="/login"> Login </Link>
          </span>
        </div>
      </Card>
      <div className={styles.img}>
        <img src={registerImg} alt="Register" width={400} />
      </div>
    </section>
  );
};

export default Register;
