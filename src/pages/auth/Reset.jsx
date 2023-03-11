import React, { useState } from "react";
import styles from "./auth.module.scss";
import resetImg from "../../assets/forgot.png";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import { Loader } from "../../components";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success("Check your email for a reset link");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsLoading(false);
        toast.error(errorCode, errorMessage);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={resetImg} alt="login" width={400} />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Reset Password</h2>
            <form onSubmit={resetPassword}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
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
    </>
  );
};

export default Reset;
