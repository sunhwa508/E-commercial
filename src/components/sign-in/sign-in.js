import React, { useState } from "react";
import FormInput from "../form-input/form-input-component";
import "./sign-in.style.scss";
import CustomButton from "../custom-button/custom-button";
import { auth, signInWithGoogle } from "../../Firebase/firebase.utils";

export default function Signin() {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(user.email, user.password);
      setUser({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  
  const handleChange = (event) => {
    const { value, name } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={user.email}
          handleChange={handleChange}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          handleChange={handleChange}
          value={user.password}
          label="password"
          required
        />
        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn >
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
}
